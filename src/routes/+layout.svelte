<script lang="ts">
    import { authStore, logout as clientLogout, initializeAuth } from '$lib/stores/authStore';
    import { logoutUser } from '$lib/api/auth'; // Importar la nueva función de logout del backend
    import { goto } from '$app/navigation'; // Para redirigir programáticamente

    // Llama a initializeAuth cuando el layout se monte en el cliente
    // Esto es crucial para rehidratar el estado de autenticación en cada carga de página
    // o navegación directa si la sesión ya existe (por la cookie).
    import { onMount } from 'svelte';
    onMount(async () => {
         // Puedes llamar a una función que intente verificar la sesión
         // directamente aquí o al inicio del authStore.
         // Para esta fase, la forma en que lo tenemos en authStore.ts es suficiente.
         // Aquí iría una llamada a tu API para verificar la sesión si es necesario
         // (ej. apiFetch('/me')). Por ahora, initializeAuth simplemente resetea si no hay nada.
         await initializeAuth(); // Asegurarse de que el estado inicial se carga al montar.
    });


    const handleLogout = async () => {
        await logoutUser(); // Llama al backend para invalidar la sesión
        clientLogout(); // Resetea el store de auth en el frontend
        goto('/login'); // Redirige al usuario a la página de login
    };
</script>

<header>
    <nav>
        <a href="/">Home</a>
        {#if !$authStore.isLoggedIn}
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        {:else}
            <a href="/library">Library</a>
            <a href="/profile">Profile</a>
            <button on:click={handleLogout}>Logout</button>
        {/if}
    </nav>
</header>

<main>
    <slot /> </main>

<footer>
    <p>&copy; {new Date().getFullYear()} Cajita Musical</p>
</footer>

<style>
    /* Estilos globales para el body (aplicados solo una vez con :global) */
    :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #f0f2f5; /* Un gris claro suave */
        color: #333;
        line-height: 1.6;
    }

    header {
        background-color: #333;
        padding: 1rem 20px;
        color: white;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    nav {
        display: flex;
        justify-content: center;
        gap: 1.5rem; /* Espacio entre enlaces */
    }

    nav a, nav button {
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        transition: background-color 0.3s ease;
        font-weight: bold;
        background: none; /* Para el botón */
        border: none; /* Para el botón */
        cursor: pointer;
        font-size: 1em;
    }

    nav a:hover, nav button:hover {
        background-color: #555;
    }

    main {
        padding: 20px;
        max-width: 960px;
        margin: 20px auto;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.05);
        min-height: calc(100vh - 180px); /* Ajusta para que el footer no quede flotando */
    }

    footer {
        text-align: center;
        padding: 20px;
        color: #777;
        font-size: 0.9em;
        margin-top: 20px;
    }
</style>