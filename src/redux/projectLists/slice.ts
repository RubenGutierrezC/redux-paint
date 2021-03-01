import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../types/types";

type ProjectListState = {
    error: string | null
    pending: boolean
    projects: Project[]
}

const initialState: ProjectListState = {
    error: null,
    pending: true,
    projects: []
}

const slice = createSlice({
    name: 'projectsList',
    initialState,
    reducers: {
        getProjectsListSuccess: (state, action: PayloadAction<Project[]>) => {
            state.error = null
            state.pending = false
            state.projects = action.payload
        },
        getProjectsListFailed: (state, action: PayloadAction<string>) => {
            state = {
                error: action.payload,
                pending: false,
                projects: []
            }
        }
    }
})

export default slice.reducer

export const {
    getProjectsListFailed,
    getProjectsListSuccess
} = slice.actions