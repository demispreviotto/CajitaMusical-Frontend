<script lang="ts">
    import { goto } from '$app/navigation';
    import { authStore, login as performLogin } from '$lib/stores/authStore';
    import { loginUser } from '$lib/api/auth'; // Aún no lo hemos creado, pero lo haremos
    import type { LoginUserInput } from '$lib/types/auth';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    let username = '';
    let password = '';
    let errorMessage: string | null = null;
    let isLoading = false;

    onMount(() => {
        authStore.update(state => ({ ...state, isLoading: false }));
    });

    // Función para manejar el envío del formulario
    const handleSubmit = async () => {
        errorMessage = null;
        isLoading = true;

        const credentials: LoginUserInput = { username, password };

        try {
            const response = await loginUser(credentials);

            if (response && response.user) {
                performLogin(response.user);
                const redirectTo = $page.url.searchParams.get('redirectedFrom') || '/';
                await goto(redirectTo);
            } else {
                errorMessage = "Login failed: No user info received.";
            }
        } catch (error: any) {
            // Captura errores de la red o de la API
            console.error("Login error:", error);
            errorMessage = error.message || "An unexpected error occurred during login.";
        } finally {
            isLoading = false; // Restablecer el estado de carga
        }
    };
</script>

<div class="login-container">
    <h1>Iniciar Sesión</h1>

    {#if errorMessage}
        <p class="error-message">{errorMessage}</p>
    {/if}

    <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
            <label for="username">Usuario:</label>
            <input
                type="text"
                id="username"
                bind:value={username}
                placeholder="Tu nombre de usuario"
                required
            />
        </div>

        <div class="form-group">
            <label for="password">Contraseña:</label>
            <input
                type="password"
                id="password"
                bind:value={password}
                placeholder="Tu contraseña"
                required
            />
        </div>

        <button type="submit" disabled={isLoading}>
            {#if isLoading}
                Iniciando sesión...
            {:else}
                Login
            {/if}
        </button>
    </form>

    <p class="register-link">
        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
    </p>
</div>

<style>
</style>