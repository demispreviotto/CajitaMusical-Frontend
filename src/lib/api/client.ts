// src/lib/api/client.ts
// Define la URL base de tu backend Go
// Asegúrate de que esta URL sea correcta para tu entorno local
const BASE_URL = 'http://localhost:8080'; // <-- ¡IMPORTANTE: Verifica este puerto!

// Wrapper para hacer solicitudes HTTP
export async function apiFetch<T>(
    path: string,
    method: string = 'GET',
    body?: object | null
): Promise<T> {
    const url = `${BASE_URL}${path}`;

    const options: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            // SvelteKit y el navegador manejan las cookies HTTP-only automáticamente
            // para la misma origen, así que no necesitamos añadir 'Cookie' aquí directamente.
        },
        credentials: 'include', // Importante para enviar cookies (como la session_id)
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    // Puedes añadir aquí lógica para manejar respuestas 401 (Unauthorized) globalmente
    if (response.status === 401) {
        // authStore.logout(); // Esto podría ser útil si implementas el logout en el cliente
        // goto('/login'); // O redirigir si la sesión expira
    }

    // Si la respuesta no es OK, lanza un error con el mensaje del backend si está disponible
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
    }

    // Si la respuesta es 204 No Content, devuelve null o un objeto vacío
    if (response.status === 204) {
        return null as T; // O {} as T;
    }

    return response.json() as Promise<T>;
}