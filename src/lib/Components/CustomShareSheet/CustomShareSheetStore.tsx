import create from "zustand"

interface CustomShareSheetState {
  visible: boolean

  item: { type: "artwork"; slug: string; currentImageIndex?: number } | null

  show: (item: this["item"]) => void
  hide: () => void
}

export const useCustomShareSheetStore = create<CustomShareSheetState>((set) => ({
  visible: false,

  item: null,

  show: (item) => set({ visible: true, item }),
  hide: () => set({ visible: false }),
}))
