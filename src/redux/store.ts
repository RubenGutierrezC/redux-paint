import { Action, configureStore, getDefaultMiddleware, ThunkAction } from "@reduxjs/toolkit";
import historyIndex from "./historyIndex/slice";
import currentStroke from "./currentStroke/slice";
import strokes from "./strokes/slice";
import modalVisible from "./modals/slice";
import projectsList from "./projectLists/slice";
import logger from "redux-logger";
import { RootState } from "../types/types";

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

const middleware = [...getDefaultMiddleware(), logger]

export const store = configureStore({
    reducer: {
        historyIndex,
        currentStroke,
        strokes,
        modalVisible,
        projectsList
    },
    middleware
})