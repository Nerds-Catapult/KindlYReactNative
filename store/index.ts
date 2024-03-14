// Using the auth response from the { AUTH_URL } as the store's state
import { AuthResponse } from "../interfaces/Auth";
import { create } from "zustand";
import {persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from "@react-native-async-storage/async-storage"


interface AppStore extends AuthResponse {
	redirectUrl: string;
}


const useAuthStore = create<AppStore>()(
	persist((set, get) => ({
		access_token: '',
		expires_in: 0,
		token_type: '',
		redirectUrl: '',
	}),
	{
		name: 'auth-store',
		storage: createJSONStorage(() => AsyncStorage)
	}
	)
)

export default useAuthStore;