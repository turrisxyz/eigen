import { ActionType, ContextModule, CustomService, OwnerType, share, Share as ShareType } from "@artsy/cohesion"
import Clipboard from "@react-native-community/clipboard"
import {
  CustomShareSheet_ArtworkQuery,
  CustomShareSheet_ArtworkQueryResponse,
} from "__generated__/CustomShareSheet_ArtworkQuery.graphql"
import { InstagramStoryViewShot } from "lib/Scenes/Artwork/Components/InstagramStoryViewShot"
import { unsafe__getEnvironment } from "lib/store/GlobalStore"
import { Schema } from "lib/utils/track"
import { useCanOpenURL } from "lib/utils/useCanOpenURL"
import { useScreenDimensions } from "lib/utils/useScreenDimensions"
import { take } from "lodash"
import {
  ChevronIcon,
  Flex,
  InstagramAppIcon,
  LinkIcon,
  MoreIcon,
  ShareIcon,
  Text,
  Touchable,
  WhatsAppAppIcon,
} from "palette"
import React, { useRef } from "react"
import { ScrollView } from "react-native"
import Share from "react-native-share"
import ViewShot from "react-native-view-shot"
import { useTracking } from "react-tracking"
import { graphql, useQuery } from "relay-hooks"
import RNFetchBlob from "rn-fetch-blob"
import { FancyModal } from "../FancyModal/FancyModal"
import { FancyModalHeader } from "../FancyModal/FancyModalHeader"
import { useToast } from "../Toast/toastHook"
import { useCustomShareSheetStore } from "./CustomShareSheetStore"

export const CustomShareSheet: React.FC<{}> = () => {
  const { item, ...store } = useCustomShareSheetStore()
  const showInstagramStoriesItem = useCanOpenURL("instagram-stories://test")
  const showWhatsAppItem = useCanOpenURL("whatsapp://test")
  const { height: screenHeight } = useScreenDimensions()
  const toast = useToast()
  const shotRef = useRef<ViewShot>(null)
  const { trackEvent } = useTracking()
  const { props } = useQuery<CustomShareSheet_ArtworkQuery>(artworkQuery, { slug: item?.slug ?? "" }, { skip: !item })

  if (!props || !props.artwork) {
    return null
  }

  const currentImage = (props.artwork.images ?? [])[item?.currentImageIndex ?? 0]
  const currentImageUrl = (currentImage?.url ?? "").replace(":version", "normalized")
  const smallImageURL = (currentImage?.url ?? "").replace(":version", "small")

  const shareArtworkOnInstagramStory = async () => {
    const base64RawData = await shotRef.current!.capture!()
    const base64Data = `data:image/png;base64,${base64RawData}`

    await Share.shareSingle({
      social: Share.Social.INSTAGRAM_STORIES,
      backgroundImage: base64Data,
    })
    trackEvent(
      share(tracks.customShare(CustomService.instagram_stories, props.artwork!.internalID, props.artwork?.slug))
    )
    store.hide()
  }

  const shareArtworkOnWhatsApp = async () => {
    const details = shareContent(props.artwork!)

    await Share.shareSingle({
      social: Share.Social.WHATSAPP,
      message: details.message ?? "",
      url: details.url,
    })
    trackEvent(share(tracks.customShare(CustomService.whatsapp, props.artwork!.internalID, props.artwork?.slug)))
    store.hide()
  }

  const shareArtworkCopyLink = () => {
    Clipboard.setString(`${unsafe__getEnvironment().webURL}${props.artwork?.href}`)
    trackEvent(share(tracks.customShare(CustomService.copy_link, props.artwork!.internalID, props.artwork?.slug)))
    store.hide()
    toast.show("Copied to Clipboard", "middle", { Icon: ShareIcon })
  }

  const shareArtwork = async () => {
    trackEvent({
      action_name: Schema.ActionNames.Share,
      action_type: Schema.ActionTypes.Tap,
      context_module: Schema.ContextModules.ArtworkActions,
    })

    const details = shareContent(props.artwork!)

    const resp = await RNFetchBlob.config({
      fileCache: true,
    }).fetch("GET", smallImageURL)

    const base64RawData = await resp.base64()
    const base64Data = `data:image/png;base64,${base64RawData}`

    try {
      const res = await Share.open({
        title: details.title ?? "",
        url: base64Data,
        message: details.message + "\n" + details.url,
      })
      trackEvent(share(tracks.iosShare(res.message, props.artwork!.internalID, props.artwork?.slug)))
    } catch (err) {
      console.log({ err })
    } finally {
      store.hide()
    }
  }

  return (
    <FancyModal maxHeight={screenHeight / 2} visible={store.visible} onBackgroundPressed={() => store.hide()}>
      <FancyModalHeader useXButton onLeftButtonPress={() => store.hide()}>
        Share
      </FancyModalHeader>
      <ScrollView>
        <InstagramStoryViewShot
          shotRef={shotRef}
          href={currentImageUrl}
          artist={props.artwork.artists![0]?.name!}
          title={props.artwork.title!}
        />

        {showWhatsAppItem ? (
          <CustomShareSheetItem title="WhatsApp" Icon={<WhatsAppAppIcon />} onPress={shareArtworkOnWhatsApp} />
        ) : null}
        {showInstagramStoriesItem ? (
          <CustomShareSheetItem
            title="Instagram Stories"
            Icon={<InstagramAppIcon />}
            onPress={shareArtworkOnInstagramStory}
          />
        ) : null}

        <CustomShareSheetItem title="Copy link" Icon={<LinkIcon />} onPress={shareArtworkCopyLink} />
        <CustomShareSheetItem title="More" Icon={<MoreIcon />} onPress={shareArtwork} />
      </ScrollView>
    </FancyModal>
  )
}

interface CustomShareSheetItemProps {
  title: string
  Icon: React.ReactNode
  onPress?: () => void
}

const CustomShareSheetItem: React.FC<CustomShareSheetItemProps> = ({ title, Icon, onPress }) => (
  <Touchable onPress={onPress}>
    <Flex width="100%" height={60} flexDirection="row" alignItems="center" px="2">
      {Icon}
      <Text variant="sm" ml="2">
        {title}
      </Text>
      <Flex flex={1} />
      <ChevronIcon />
    </Flex>
  </Touchable>
)

export const shareContent = (artwork: NonNullable<CustomShareSheet_ArtworkQueryResponse["artwork"]>) => {
  const { title, href, artists } = artwork
  let computedTitle = ""

  if (artists && artists.length) {
    const names = take(artists, 3).map((artist) => artist?.name ?? "")
    computedTitle = `${title} by ${names.join(", ")} on Artsy`
  } else if (title) {
    computedTitle = `${title} on Artsy`
  }

  return {
    title: computedTitle,
    message: computedTitle,
    url: `${unsafe__getEnvironment().webURL}${href}?utm_content=artwork-share`,
  }
}

const artworkQuery = graphql`
  query CustomShareSheet_ArtworkQuery($slug: String!) {
    artwork(id: $slug) {
      slug
      internalID
      href
      images {
        url: imageURL
      }
      title
      artists {
        name
      }
    }
  }
`

export const tracks = {
  customShare: (service: string, id: string, slug?: string): ShareType => ({
    action: ActionType.share,
    context_module: ContextModule.artworkImage,
    context_owner_type: OwnerType.artwork,
    context_owner_id: id,
    context_owner_slug: slug,
    service,
  }),
  iosShare: (app: string, id: string, slug?: string): ShareType => ({
    action: ActionType.share,
    context_module: ContextModule.artworkImage,
    context_owner_type: OwnerType.artwork,
    context_owner_id: id,
    context_owner_slug: slug,
    service: app,
  }),
}
