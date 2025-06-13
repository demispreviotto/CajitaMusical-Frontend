<script lang="ts">
    import { goto } from '$app/navigation';
    import { authStore, login as performLogin } from '$lib/stores/authStore';
    import { loginUser } from '$lib/api/auth';// Ensure this is correctly implemented and used
    import type { LoginUserInput } from '$lib/types';
    import { onMount } from 'svelte';
    import LoginForm from '$lib/components/auth/LoginForm.svelte';

    let errorMessage: string | null = null;
    let isLoading = false;

    onMount(() => {
        authStore.update(state => ({ ...state, isLoading: false }));

        const currentUrl = new URL(window.location.href);
        const params = new URLSearchParams(currentUrl.search);

        if (params.has('error')) {
            errorMessage = params.get('error') === 'network_error' ?
                           'Error de conexión. Asegúrate de que el backend esté funcionando.' :
                           params.get('error');

            // Construct the new URL without the error parameters
            params.delete('error');
            params.delete('redirectedFrom');
            currentUrl.search = params.toString(); // Update the search part of the URL object
            goto(currentUrl.toString(), { replaceState: true }); // Navigate with updated URL
        }
    });

    const handleLoginSubmit = async (credentials: LoginUserInput) => {
        errorMessage = null;
        isLoading = true;

        try {
            const response = await loginUser(credentials); // Now 'credentials' are correct

            if (response && response.user) {
                performLogin(response.user);
                // --- USE window.location.href AGAIN FOR REDIRECTTO ---
                const currentUrlForRedirect = new URL(window.location.href);
                const redirectTo = currentUrlForRedirect.searchParams.get('redirectedFrom') || '/';
                await goto(redirectTo);
            } else {
                errorMessage = "Login failed: No user info received or unexpected response.";
            }
        } catch (error: any) {
            console.error("Login error:", error);
            errorMessage = error.message || "An unexpected error occurred during login.";
        } finally {
            isLoading = false;
        }
    };
</script>

<div class="login-container">
    <h1>Iniciar Sesión</h1>

    <LoginForm
        onSubmit={handleLoginSubmit}
        {isLoading}
        {errorMessage}
    />

    <p class="register-link">
        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
    </p>
</div>

<style>
    /* Ensure these styles are defined either here or in your global.scss */
    .login-container {
        max-width: 400px;
        margin: 50px auto;
        padding: 30px;
        background-color: var(--bg-secondary);
        border-radius: var(--border-radius);
        box-shadow: 0 2px 10px var(--shadow-color);
        text-align: center;
    }
    h1 {
        color: var(--text-primary);
        margin-bottom: var(--spacing-lg);
    }
    .register-link {
        margin-top: var(--spacing-lg);
        font-size: 15px;
        color: var(--text-secondary);
    }
    .register-link a {
        color: var(--accent-color);
        text-decoration: none;
        font-weight: bold;
    }
    .register-link a:hover {
        text-decoration: underline;
    }
</style>