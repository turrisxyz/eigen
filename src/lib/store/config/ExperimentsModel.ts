import { action, Action } from "easy-peasy"
import { assignDeep } from "../persistence"

export interface ExperimentsModel {
  sessionState: { isReady: boolean }
  setState: Action<ExperimentsModel, Partial<{ isReady: boolean }>>
}

export const getExperimentsModel = (): ExperimentsModel => ({
  sessionState: { isReady: false },
  setState: action((state, payload) => {
    assignDeep(state, { sessionState: { ...payload } })
  }),
})
