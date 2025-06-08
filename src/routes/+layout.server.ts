import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, url }) => {
    if (url.pathname === '/login') {
        return {};
    }

    try {
        // Llama a tu endpoint de backend /me para verificar la autenticación.
        const backendUrl = 'http://localhost:8080/me';

        const response = await fetch(backendUrl);

        if (response.ok) {
            // Si la respuesta es 200 OK, el usuario está autenticado.
            const user = await response.json();
            return { user };
        } else if (response.status === 401) {
            // Si la respuesta es 401 Unauthorized, el usuario no está logueado.
            // Redirige a la página de login.
            throw redirect(302, `/login?redirectedFrom=${url.pathname}`); // Añadimos `redirectedFrom` para que, después de un login exitoso, puedas redirigir al usuario de vuelta a donde intentaba ir.
        } else {
            // Maneja otros posibles errores del backend (ej. 500 Internal Server Error)
            console.error(`Backend /me responded with status ${response.status}`);
            // Podrías redirigir a una página de error genérica o simplemente a login
            throw redirect(302, `/login?error=auth_check_failed&redirectedFrom=${url.pathname}`);
        }
    } catch (error) {
        // Esto captura errores de red (ej. el backend no está corriendo, CORS bloqueado, etc.)
        console.error('Error de red durante la verificación de autenticación:', error);
        throw redirect(302, `/login?error=network_error&redirectedFrom=${url.pathname}`);
    }
};