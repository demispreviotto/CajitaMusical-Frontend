import { writable } from 'svelte/store';
import type { UserInfo } from '$lib/types/auth';


interface AuthState {
    isLoggedIn: boolean;
    user: UserInfo | null;
    isLoading: boolean;
}

const initialAuthState: AuthState = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
};

// Crea el store writable
export const authStore = writable<AuthState>(initialAuthState);

// Funciones para actualizar el store fácilmente
export const login = (user: UserInfo) => {
    authStore.set({
        isLoggedIn: true,
        user: user,
        isLoading: false,
    });
};

export const logout = () => {
    authStore.set({
        isLoggedIn: false,
        user: null,
        isLoading: false,
    });
};

export const initializeAuthStoreWithServerData = (user: UserInfo | null) => {
    console.log("Initializing auth store with server data:", user);
    authStore.set({
        isLoggedIn: user !== null,
        user: user,
        isLoading: false,
    });
};