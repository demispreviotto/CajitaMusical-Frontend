import { apiFetch } from './client';
import type { LoginUserInput, RegisterUserInput, UserInfo } from '$lib/types';
import { authStore, login as authStoreLogin, logout as authStoreLogout, initializeAuthStoreWithServerData } from '$lib/stores/authStore';

// --- Login User ---
export async function loginUser(credentials: LoginUserInput): Promise<UserInfo> {
    try {
        // Use the new apiFetch signature with an options object
        const user = await apiFetch<UserInfo>('/login', {
            method: 'POST',
            body: credentials,
            authRequired: false
        });
        authStoreLogin(user);
        return user;
    } catch (error) {
        console.error("Login failed:", error);
        // Update the store with an error message and stop loading
        authStore.update(state => ({ ...state, error: (error as Error).message, isLoading: false }));
        throw error;
    }
}

// --- Register User ---
export async function registerUser(userData: RegisterUserInput): Promise<UserInfo> {
    try {
        // Use the new apiFetch signature with an options object
        const user = await apiFetch<UserInfo>('/register', {
            method: 'POST',
            body: userData,
            authRequired: false
        });
        // Optionally, log the user in immediately after successful registration
        authStoreLogin(user);
        return user;
    } catch (error) {
        console.error("Registration failed:", error);
        authStore.update(state => ({ ...state, error: (error as Error).message, isLoading: false }));
        throw error;
    }
}

// --- Logout User ---
export async function logoutUser(): Promise<void> {
    try {
        // Use the new apiFetch signature with an options object
        await apiFetch<void>('/logout', {
            method: 'POST',
            // No body typically needed for logout
            authRequired: true
        });
        authStoreLogout();
    } catch (error) {
        console.error("Logout failed:", error);
        authStore.update(state => ({ ...state, error: (error as Error).message, isLoading: false }));
        throw error;
    }
}

// --- Get Authenticated User Info (e.g., on app load) ---
export async function getUserInfo(): Promise<UserInfo | null> {
    try {
        // Set loading state before fetching
        authStore.update(state => ({ ...state, isLoading: true, error: null }));
        // Use the new apiFetch signature with an options object
        const user = await apiFetch<UserInfo>('/me', {
            method: 'GET',
            authRequired: true
        });
        initializeAuthStoreWithServerData(user);
        return user;
    } catch (error) {
        console.error("Failed to get user info:", error);
        initializeAuthStoreWithServerData(null);
        return null;
    }
}