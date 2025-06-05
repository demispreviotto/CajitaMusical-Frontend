// src/lib/api/auth.ts
import { apiFetch } from './client';
import type { LoginUserInput, LoginResponse, RegisterUserInput, UserResponse, UserInfo } from '$lib/types/auth';

export async function loginUser(credentials: LoginUserInput): Promise<LoginResponse> {
    try {
        const response = await apiFetch<LoginResponse>('/login', 'POST', credentials);
        return response;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error; // Propaga el error para que el componente lo maneje
    }
}

export async function registerUser(userData: RegisterUserInput): Promise<UserResponse> {
    try {
        const response = await apiFetch<UserResponse>('/register', 'POST', userData);
        return response;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

// Puedes añadir una función para logout aquí
export async function logoutUser(): Promise<void> {
    try {
        await apiFetch('/logout', 'POST'); // Asume que tienes un endpoint /logout
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
}

export async function getUserInfo(): Promise<UserInfo | null> {
    try {
        const user = await apiFetch<UserInfo>('/me', 'GET');
        return user;
    } catch (error) {
        console.error("Error fetching user info:", error);
        // Si hay un error (ej. 401 Unauthorized), significa que la sesión no es válida.
        // authStore.logout(); // Esto se podría hacer aquí o en apiFetch globalmente
        return null;
    }
}