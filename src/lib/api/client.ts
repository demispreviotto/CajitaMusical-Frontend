import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { browser } from '$app/environment';
import { authStore, logout } from '$lib/stores/authStore';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiFetchOptions {
    method?: HttpMethod;
    body?: any;
    headers?: HeadersInit;
    authRequired?: boolean;
    credentials?: RequestCredentials;
}

const API_BASE_URL = PUBLIC_BACKEND_URL;

export async function apiFetch<T>(
    path: string,
    options?: ApiFetchOptions
): Promise<T> {
    const {
        method = 'GET',
        body,
        headers,
        authRequired = true,
        credentials = 'include',
        ...restFetchOptions
    } = options || {};

    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const url = `${API_BASE_URL}${cleanPath}`;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(headers as Record<string, string>)
    };

    const fetchOptions: RequestInit = {
        method,
        headers: defaultHeaders,
        body: body ? JSON.stringify(body) : undefined,
        credentials,
        ...restFetchOptions
    };

    try {
        const response = await fetch(url, fetchOptions);

        if (response.status === 401 && authRequired) {
            // If unauthorized and authentication was expected for this call
            if (browser) {
                console.warn("Unauthorized access. Redirecting to login.");
                logout();
                goto('/login');
            }
            // Throw an error to stop further processing in the calling function
            throw new Error("Unauthorized");
        }

        if (!response.ok) {
            let errorData: any;
            try {
                // Try to parse error response as JSON, if it fails, provide a generic message
                errorData = await response.json();
            } catch (e) {
                errorData = { message: `Server error: ${response.status} ${response.statusText}` };
            }
            // Use the backend's error message, or a default one
            const errorMessage = errorData.error || errorData.message || `API Error: ${response.status} ${response.statusText}`;
            throw new Error(errorMessage);
        }

        // Handle 204 No Content: Return a default empty object or null depending on preference
        if (response.status === 204) {
            return {} as T; // Or null as T; if you prefer null for 204 responses
        }

        // Parse and return JSON response
        return await response.json() as T;

    } catch (error: any) {
        console.error(`API Fetch Error for ${method} ${url}:`, error);
        // Re-throw the error so the component/calling function can handle it
        throw error;
    }
}

// Helper function for public API calls (e.g., fetching general library items if no auth is needed)
export async function apiFetchPublic<T>(
    path: string,
    options?: Omit<ApiFetchOptions, 'authRequired'> // 'authRequired' is implicitly false
): Promise<T> {
    return apiFetch<T>(path, { ...options, authRequired: false });
}