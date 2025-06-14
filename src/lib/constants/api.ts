// src/lib/constants/api.ts

// Authentication Endpoints
export const AUTH_REGISTER = '/register';
export const AUTH_LOGIN = '/login';
export const AUTH_LOGOUT = '/logout';
export const AUTH_ME = '/me'; // Endpoint to get current user info

// Library Endpoints
export const LIBRARY_ITEMS = '/library';
export const AUDIO_SERVE = '/audio'; // For /audio/:filename
export const ALBUM_ART_SERVE = '/album-art'; // For /album-art/:filename

// Admin Endpoints (if you use them from frontend)
export const ADMIN_CLEANUP_SESSIONS = '/admin/cleanup-sessions';
export const ADMIN_SCAN_MUSIC = '/admin/scan-music';

// Example: Function to get full audio/album art paths (if your backend URLs aren't fixed per endpoint)
// You might not need these if apiFetch automatically handles appending base URL
export function getAudioUrl(filename: string): string {
    return `${AUDIO_SERVE}/${filename}`;
}

export function getAlbumArtUrl(filename: string): string {
    return `${ALBUM_ART_SERVE}/${filename}`;
}