import { InquiryPurchaseButton_artwork } from "__generated__/InquiryPurchaseButton_artwork.graphql"
import { InquiryPurchaseButtonOrderMutation } from "__generated__/InquiryPurchaseButtonOrderMutation.graphql"
import { navigate } from "app/navigation/navigate"
import { defaultEnvironment } from "app/relay/createEnvironment"
import { Button, ButtonProps } from "palette"
import React, { useState } from "react"
import { Alert } from "react-native"
import { commitMutation, createFragmentContainer, graphql } from "react-relay"

export interface InquiryPurchaseButtonProps {
  artwork: InquiryPurchaseButton_artwork
  editionSetID: string | null
  conversationID: string
  replaceModalView?: boolean
  onPress?: ButtonProps["onPress"]
  disabled?: ButtonProps["disabled"]
}

export const InquiryPurchaseButton: React.FC<InquiryPurchaseButtonProps> = ({
  artwork,
  editionSetID,
  conversationID,
  children,
  replaceModalView = true,
  onPress,
  disabled = false,
}) => {
  const [isCommittingMutation, setIsCommittingMutation] = useState(false)

  const onMutationError = (error: any) => {
    Alert.alert(
      "Sorry, we couldn't process the request.",
      "Please try again or contact orders@artsy.net for help.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Retry",
          onPress: () => {
            handleCreateInquiryOrder()
          },
        },
      ]
    )
    console.log(
      "src/app/Scenes/Inbox/Components/Conversations/InquiryPurchaseButton.tsx",
      JSON.stringify(error, null, 2)
    )
  }

  const handleCreateInquiryOrder = () => {
    const { internalID } = artwork

    if (isCommittingMutation) {
      return
    }

    setIsCommittingMutation(true)
    commitMutation<InquiryPurchaseButtonOrderMutation>(defaultEnvironment, {
      mutation: graphql`
        mutation InquiryPurchaseButtonOrderMutation(
          $input: CommerceCreateInquiryOrderWithArtworkInput!
        ) {
          createInquiryOrder(input: $input) {
            orderOrError {
              __typename
              ... on CommerceOrderWithMutationSuccess {
                order {
                  internalID
                  mode
                }
              }
              ... on CommerceOrderWithMutationFailure {
                error {
                  type
                  code
                  data
                }
              }
            }
          }
        }
      `,
      variables: {
        input: {
          artworkId: internalID,
          editionSetId: editionSetID,
          impulseConversationId: conversationID,
        },
      },
      onCompleted: (data) => {
        setIsCommittingMutation(false)

        const orderOrError = data.createInquiryOrder?.orderOrError!
        if (orderOrError.__typename === "CommerceOrderWithMutationFailure") {
          onMutationError(orderOrError.error)
          return
        }

        if (orderOrError.__typename === "CommerceOrderWithMutationSuccess") {
          navigate(`/orders/${orderOrError.order.internalID}`, {
            modal: true,
            replace: !!replaceModalView,
            passProps: {
              orderID: orderOrError.order.internalID,
              title: "Purchase",
            },
          })
        }
      },
      onError: (error) => {
        setIsCommittingMutation(false)
        onMutationError(error)
      },
    })
  }

  return (
    <Button
      onPress={(event) => {
        onPress?.(event)
        handleCreateInquiryOrder()
      }}
      disabled={disabled}
      loading={isCommittingMutation}
      size="large"
      block
      haptic
    >
      {children}
    </Button>
  )
}

export const InquiryPurchaseButtonFragmentContainer = createFragmentContainer(
  InquiryPurchaseButton,
  {
    artwork: graphql`
      fragment InquiryPurchaseButton_artwork on Artwork {
        internalID
      }
    `,
  }
)
