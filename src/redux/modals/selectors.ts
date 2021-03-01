import { RootState } from "../../types/types"

export const modalVisibleSelector = (state: RootState) =>
  state.modalVisible

export const modalNameSelector = (state: RootState) =>
  state.modalVisible.modalName
