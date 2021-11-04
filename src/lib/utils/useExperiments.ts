import { SplitFactory } from "@splitsoftware/splitio-react-native"
// import { useFeatureFlag } from "lib/store/GlobalStore"
import { useEffect } from "react"
import Config from "react-native-config"
import { GlobalStore } from "../store/GlobalStore"
import { EXPERIMENT_NAME, experiments } from "./experiments"

let client: SplitIO.IClient

export const useExperiments = () => {
  // const enableSplitIOABTesting = useFeatureFlag("AREnableSplitIOABTesting")

  // if (enableSplitIOABTesting) {
  const environment = GlobalStore.useAppState((store) => store.config.environment.env)
  // Instantiate the SDK
  const factory: SplitIO.ISDK = SplitFactory({
    core: {
      authorizationKey:
        environment === "staging" ? Config.SPLIT_IO_STAGING_API_KEY : Config.SPLIT_IO_PRODUCTION_API_KEY,
      key: GlobalStore.useAppState((store) => store.auth.userID) ?? "not-logged",
    },
  })

  // And get the client instance you'll use
  client = factory.client()
  // }

  useEffect(() => {
    // if (enableSplitIOABTesting) {
    client.on(client.Event.SDK_READY, () => {
      setTimeout(() => {
        GlobalStore.actions.config.experiments.setState({ isReady: true })
      }, 4000)
    })

    client.on(client.Event.SDK_READY_TIMED_OUT, () => {
      GlobalStore.actions.config.experiments.setState({ isReady: false })
    })
    // }
  }, [])
  return
}

export const useTreatment = (treatment: EXPERIMENT_NAME) => {
  const isReady = GlobalStore.useAppState((store) => store.config.experiments.sessionState.isReady)

  console.log("SPLITIO::isReady", isReady)
  // console.log("SPLITIO::isReadyClient", isReadyClient)
  if (isReady && client) {
    console.log(
      "SPLITIO::all treatments",
      client.getTreatments(["HomeScreenWorksForYouVsWorksByArtistsYouFollow", "SomeCoolThing"])
    )
    return client.getTreatment(treatment)
  }
  return experiments[treatment].fallbackTreatment
}
