import { writable } from 'svelte/store';
import type { UserInfo } from '$lib/types/auth';
import { getUserInfo } from '$lib/api/auth';


interface AuthState {
    isLoggedIn: boolean;
    user: UserInfo | null;
    isLoading: boolean;
    // Podrías añadir aquí más estados como isLoading, error, etc.
}

// Valor inicial del store
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
        isLoading: false, // Terminamos de cargar
    });
};

export const initializeAuth = async () => {
    console.log("Initializing auth state...");
    authStore.update(state => ({ ...state, isLoading: true })); // Empezar carga
    try {
        const user = await getUserInfo(); // Intenta obtener la info del usuario
        if (user) {
            login(user); // Si hay usuario, loguea
        } else {
            logout(); // Si no hay usuario o falla, desloguea
        }
    } catch (e) {
        console.error("Failed to initialize auth:", e);
        logout(); // En caso de cualquier error, asumir que no hay sesión
    } finally {
        authStore.update(state => ({ ...state, isLoading: false })); // Siempre terminar la carga
    }
};
