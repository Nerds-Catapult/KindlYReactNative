import useAuth from "../hooks/useAuth";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface AuthState {
    token: string | null;
}

const authSlice = createSlice({})