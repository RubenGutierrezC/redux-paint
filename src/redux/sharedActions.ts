import { createAction } from "@reduxjs/toolkit";
import { Stroke } from "../types/types";

export const endStroke = createAction<{
    stroke: Stroke,
    historyIndex: number
}>('endStroke')