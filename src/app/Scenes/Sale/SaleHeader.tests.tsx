import { SaleHeaderTestsQuery } from "__generated__/SaleHeaderTestsQuery.graphql"
import { CaretButton } from "app/Components/Buttons/CaretButton"
import OpaqueImageView from "app/Components/OpaqueImageView/OpaqueImageView"
import { __globalStoreTestUtils__ } from "app/store/GlobalStore"
import { extractText } from "app/tests/extractText"
import { renderWithWrappers, renderWithWrappersTL } from "app/tests/renderWithWrappers"
import moment from "moment"
import React from "react"
import { Animated } from "react-native"
import { graphql, QueryRenderer } from "react-relay"
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils"
import { SaleHeaderContainer } from "./Components/SaleHeader"

jest.unmock("react-relay")

describe("SaleHeader", () => {
  let mockEnvironment: ReturnType<typeof createMockEnvironment>
  const TestRenderer = () => (
    <QueryRenderer<SaleHeaderTestsQuery>
      environment={mockEnvironment}
      query={graphql`
        query SaleHeaderTestsQuery @relay_test_operation {
          sale(id: "the-sale") {
            ...SaleHeader_sale
          }
        }
      `}
      variables={{}}
      render={({ props }) => {
        if (props?.sale) {
          return <SaleHeaderContainer sale={props.sale} scrollAnim={new Animated.Value(0)} />
        }
        return null
      }}
    />
  )

  beforeEach(() => {
    mockEnvironment = createMockEnvironment()
  })

  it("renders without throwing an error", () => {
    const tree = renderWithWrappers(<TestRenderer />)

    mockEnvironment.mock.resolveMostRecentOperation((operation) =>
      MockPayloadGenerator.generate(operation, {
        Sale: () => ({
          endAt: "2020-11-01T15:00:00",
          startAt: "2020-10-01T15:00:00",
          timeZone: "Europe/Berlin",
          coverImage: {
            url: "cover image url",
          },
          name: "sale name",
          liveStartAt: "2020-10-01T15:00:00",
          internalID: "the-sale-internal",
        }),
      })
    )

    expect(extractText(tree.root.findByProps({ testID: "saleName" }))).toBe("sale name")
    expect(tree.root.findAllByType(CaretButton)).toHaveLength(1)
  })

  it("renders auction is closed when an auction has passed", () => {
    const tree = renderWithWrappers(<TestRenderer />)

    mockEnvironment.mock.resolveMostRecentOperation((operation) =>
      MockPayloadGenerator.generate(operation, {
        Sale: () => ({
          endAt: moment().subtract(1, "day").toISOString(),
          startAt: "2020-09-01T15:00:00",
          timeZone: "Europe/Berlin",
          coverImage: {
            url: "cover image url",
          },
          name: "sale name",
          liveStartAt: "2020-09-01T15:00:00",
          internalID: "the-sale-internal",
        }),
      })
    )

    expect(extractText(tree.root.findByProps({ testID: "sale-header-hero" }))).toBe(
      "Auction closed"
    )
  })

  describe("when the cascading end time feature flag is on", () => {
    beforeEach(() => {
      __globalStoreTestUtils__?.injectFeatureFlags({
        AREnableCascadingEndTimerSalePageDetails: true,
      })
    })

    it("does not render auction is closed when cascading end time is enabled", () => {
      const { queryByText } = renderWithWrappersTL(<TestRenderer />)

      mockEnvironment.mock.resolveMostRecentOperation((operation) =>
        MockPayloadGenerator.generate(operation, {
          Sale: () => ({
            endAt: moment().subtract(1, "day").toISOString(),
            startAt: "2020-09-01T15:00:00",
            timeZone: "Europe/Berlin",
            coverImage: {
              url: "cover image url",
            },
            name: "sale name",
            liveStartAt: "2020-09-01T15:00:00",
            internalID: "the-sale-internal",
            cascadingEndTimeIntervalMinutes: 1,
          }),
        })
      )

      expect(queryByText("Auction closed")).toBeFalsy()
    })
  })

  it("does not render auction is closed when an auction is still active", () => {
    const tree = renderWithWrappers(<TestRenderer />)

    mockEnvironment.mock.resolveMostRecentOperation((operation) =>
      MockPayloadGenerator.generate(operation, {
        Sale: () => ({
          endAt: moment().add(1, "day").toISOString(),
          startAt: "2020-09-01T15:00:00",
          timeZone: "Europe/Berlin",
          coverImage: {
            url: "cover image url",
          },
          name: "sale name",
          liveStartAt: "2020-09-01T15:00:00",
          internalID: "the-sale-internal",
        }),
      })
    )

    expect(extractText(tree.root.findAllByType(OpaqueImageView)[0])).not.toContain("Auction closed")
  })

  describe("cascading end times", () => {
    const baseSale = {
      timeZone: "Europe/Berlin",
      coverImage: {
        url: "cover image url",
      },
      name: "sale name",
      liveStartAt: "2020-09-01T15:00:00",
      internalID: "the-sale-internal",
    }

    beforeEach(() => {
      Date.now = () => 1525983752000 // Thursday, May 10, 2018 8:22:32.000 PM UTC in milliseconds
    })

    describe("when the cascade end time flag is turned on", () => {
      beforeEach(() => {
        __globalStoreTestUtils__?.injectFeatureFlags({
          AREnableCascadingEndTimerSalePageDetails: true,
        })
      })

      it("shows the cascading end time label", () => {
        const { getByText } = renderWithWrappersTL(<TestRenderer />)

        mockEnvironment.mock.resolveMostRecentOperation((operation) =>
          MockPayloadGenerator.generate(operation, {
            Sale: () => ({
              endAt: "2018-05-16T15:00:00",
              startAt: "2018-05-13T15:00:00",
              endedAt: null,
              cascadingEndTimeIntervalMinutes: 1,
              ...baseSale,
            }),
          })
        )

        const cascadeEndTimeLabel = getByText("Lots close at 1-minute intervals")
        expect(cascadeEndTimeLabel).toBeTruthy()
      })

      describe("absolute date label", () => {
        it("shows the start date if the sale has not started", () => {
          const { getByText } = renderWithWrappersTL(<TestRenderer />)

          mockEnvironment.mock.resolveMostRecentOperation((operation) =>
            MockPayloadGenerator.generate(operation, {
              Sale: () => ({
                endAt: "2018-05-16T15:00:00",
                startAt: "2018-05-11T15:00:00",
                endedAt: null,
                cascadingEndTimeIntervalMinutes: 1,
                ...baseSale,
              }),
            })
          )

          const absoluteTime = getByText("May 11, 2018 • 9:00am EDT")
          expect(absoluteTime).toBeTruthy()
        })

        it("shows the end date if the sale has started", () => {
          const { getByText } = renderWithWrappersTL(<TestRenderer />)

          mockEnvironment.mock.resolveMostRecentOperation((operation) =>
            MockPayloadGenerator.generate(operation, {
              Sale: () => ({
                endAt: "2018-05-16T15:00:00",
                startAt: "2018-05-09T15:00:00",
                endedAt: null,
                cascadingEndTimeIntervalMinutes: 1,
                ...baseSale,
              }),
            })
          )

          const absoluteTime = getByText("May 16, 2018 • 9:00am EDT")
          expect(absoluteTime).toBeTruthy()
        })
      })

      describe("relative date label", () => {
        it("shows Bidding Starts Today if the sale is starting today", () => {
          const { getByText } = renderWithWrappersTL(<TestRenderer />)

          mockEnvironment.mock.resolveMostRecentOperation((operation) =>
            MockPayloadGenerator.generate(operation, {
              Sale: () => ({
                endAt: "2018-05-16T15:00:00",
                startAt: "2018-05-10T20:00:00",
                endedAt: null,
                cascadingEndTimeIntervalMinutes: 1,
                ...baseSale,
              }),
            })
          )

          const relativeTime = getByText("Bidding Starts Today")
          expect(relativeTime).toBeTruthy()
        })

        it("shows 3 Days Until Bidding Starts if the sale is starting 3 days away", () => {
          const { getByText } = renderWithWrappersTL(<TestRenderer />)

          mockEnvironment.mock.resolveMostRecentOperation((operation) =>
            MockPayloadGenerator.generate(operation, {
              Sale: () => ({
                endAt: "2018-05-16T15:00:00",
                startAt: "2018-05-14T15:00:00",
                endedAt: null,
                cascadingEndTimeIntervalMinutes: 1,
                ...baseSale,
              }),
            })
          )

          const relativeTime = getByText("3 Days Until Bidding Starts")
          expect(relativeTime).toBeTruthy()
        })

        it("shows 6 Days Until Lots Start Closing if the sale started and ends in 6+ days", () => {
          const { getByText } = renderWithWrappersTL(<TestRenderer />)

          mockEnvironment.mock.resolveMostRecentOperation((operation) =>
            MockPayloadGenerator.generate(operation, {
              Sale: () => ({
                endAt: "2018-05-16T15:00:00",
                startAt: "2018-05-09T15:00:00",
                endedAt: null,
                cascadingEndTimeIntervalMinutes: 1,
                ...baseSale,
              }),
            })
          )

          const relativeTime = getByText("6 Days Until Lots Start Closing")
          expect(relativeTime).toBeTruthy()
        })

        it("shows 22h37d if the sale started and ends in 22+ hours", () => {
          const { getByText } = renderWithWrappersTL(<TestRenderer />)

          mockEnvironment.mock.resolveMostRecentOperation((operation) =>
            MockPayloadGenerator.generate(operation, {
              Sale: () => ({
                endAt: "2018-05-11T15:00:00",
                startAt: "2018-05-09T15:00:00",
                endedAt: null,
                cascadingEndTimeIntervalMinutes: 1,
                ...baseSale,
              }),
            })
          )

          const relativeTime = getByText("22h 37m Until Lots Start Closing")
          expect(relativeTime).toBeTruthy()
        })

        it("shows 37m28s if the sale started and ends in 37+ minutes", () => {
          const { getByText } = renderWithWrappersTL(<TestRenderer />)

          mockEnvironment.mock.resolveMostRecentOperation((operation) =>
            MockPayloadGenerator.generate(operation, {
              Sale: () => ({
                endAt: "2018-05-10T17:00:00",
                startAt: "2018-05-09T15:00:00",
                endedAt: null,
                cascadingEndTimeIntervalMinutes: 1,
                ...baseSale,
              }),
            })
          )

          const relativeTime = getByText("37m 28s Until Lots Start Closing")
          expect(relativeTime).toBeTruthy()
        })

        it("shows Lots are closing the sale started and the sale end date has passed", () => {
          const { getByText } = renderWithWrappersTL(<TestRenderer />)

          mockEnvironment.mock.resolveMostRecentOperation((operation) =>
            MockPayloadGenerator.generate(operation, {
              Sale: () => ({
                endAt: "2018-05-09T18:00:00",
                startAt: "2018-05-08T15:00:00",
                endedAt: null,
                cascadingEndTimeIntervalMinutes: 1,
                ...baseSale,
              }),
            })
          )

          const relativeTime = getByText("Lots are closing")
          expect(relativeTime).toBeTruthy()
        })

        it("shows Closed date if the last lots closed", () => {
          const { getByText } = renderWithWrappersTL(<TestRenderer />)

          mockEnvironment.mock.resolveMostRecentOperation((operation) =>
            MockPayloadGenerator.generate(operation, {
              Sale: () => ({
                endAt: "2018-05-09T18:00:00",
                endedAt: "2018-05-08T18:00:00",
                startAt: "2018-05-07T15:00:00",
                cascadingEndTimeIntervalMinutes: 1,
                ...baseSale,
              }),
            })
          )

          const absoluteTime = getByText("Closed May 8, 2018 • 12:00pm EDT")
          expect(absoluteTime).toBeTruthy()
        })
      })
    })

    describe("when the cascade end time flag is turned off", () => {
      beforeEach(() => {
        __globalStoreTestUtils__?.injectFeatureFlags({
          AREnableCascadingEndTimerSalePageDetails: false,
        })
      })

      it("does not show the cascading end time label", () => {
        const { queryByText } = renderWithWrappersTL(<TestRenderer />)

        mockEnvironment.mock.resolveMostRecentOperation((operation) =>
          MockPayloadGenerator.generate(operation, {
            Sale: () => ({
              endAt: "2018-05-10T18:00:00",
              startAt: "2018-05-13T15:00:00",
              endedAt: null,
              cascadingEndTimeIntervalMinutes: 1,
              ...baseSale,
            }),
          })
        )

        const cascadeEndTimeLabel = queryByText("Lots close at 1-minute intervals")
        expect(cascadeEndTimeLabel).toBeFalsy()
      })
    })
  })
})
