import { RootState } from "../../types/types";

export const currentStrokeSelector = (state: RootState) => state.currentStroke
export const currentStrokeLengthSelector = (state: RootState) => !!state.currentStroke.points.length
