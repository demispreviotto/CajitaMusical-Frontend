// src/routes/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { AUTH_ME } from '$lib/constants/api';

export const load: LayoutServerLoad = async ({ fetch, url }) => {
    // Whitelist paths that don't require authentication check
    if (url.pathname === '/login' || url.pathname === '/register') {
        console.log(`[LayoutServerLoad] Bypassing auth check for: ${url.pathname}`);
        return {};
    }

    try {
        const backendUrl = `${PUBLIC_BACKEND_URL}${AUTH_ME}`;
        console.log(`[LayoutServerLoad] Attempting to verify authentication by fetching: ${backendUrl}`);

        const response = await fetch(backendUrl);

        // Log the actual response status and 'ok' status from the backend
        console.log(`[LayoutServerLoad] Auth check response - Status: ${response.status}, OK: ${response.ok}`);

        if (response.ok) { // This will be true for 2xx status codes
            console.log('[LayoutServerLoad] User authenticated (2xx status).');
            const user = await response.json();
            return { user };
        } else if (response.status === 401) { // This will be true for a 401
            console.log('[LayoutServerLoad] User not authenticated (401 Unauthorized). Redirecting to login.');
            // This is the expected path for unauthenticated users
            throw redirect(302, `/login?redirectedFrom=${url.pathname}`);
        } else {
            // Handle other non-2xx, non-401 errors from the backend (e.g., 500, 404, etc.)
            let errorMessage = `backend_error_${response.status}`;
            try {
                const errorData = await response.json();
                if (errorData && errorData.error) {
                    errorMessage = encodeURIComponent(errorData.error); // URL-encode the error message
                }
            } catch (jsonParseError) {
                console.error(`[LayoutServerLoad] Could not parse JSON for status ${response.status}:`, jsonParseError);
            }
            console.error(`[LayoutServerLoad] Unexpected backend response status: ${response.status}. Error: ${errorMessage}`);
            throw redirect(302, `/login?error=${errorMessage}&redirectedFrom=${url.pathname}`);
        }
    } catch (error) {
        // This catch block should primarily be for genuine network errors (e.g., backend is down, DNS issues)
        console.error('[LayoutServerLoad] **CRITICAL NETWORK ERROR** during authentication check:', error);
        // It's possible for `fetch` to throw if the connection itself fails.
        throw redirect(302, `/login?error=network_error&redirectedFrom=${url.pathname}`);
    }
};