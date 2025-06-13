<script lang="ts">
    import { goto } from '$app/navigation';
    import { registerUser } from '$lib/api/auth';
    import type { RegisterUserInput } from '$lib/types'; // Ensure correct type import
    import { onMount } from 'svelte';
    import { authStore } from '$lib/stores/authStore';

    // Import the new RegisterForm component
    import RegisterForm from '$lib/components/auth/RegisterForm.svelte'; 

    // States for the form interaction
    let errorMessage: string | null = null;
    let successMessage: string | null = null;
    let isLoading = false;

    onMount(() => {
        // Optional: Reset loading state or clear messages on mount if needed
        authStore.update(state => ({ ...state, isLoading: false }));
    });

    // This function will be passed as a callback prop to RegisterForm.
    // It handles the actual API call and state updates for the page.
    const handleRegister = async (formData: RegisterUserInput) => {
        errorMessage = null;
        successMessage = null;
        isLoading = true;

        try {
            const response = await registerUser(formData); // Use the data from the component

            if (response && response.id) {
                successMessage = "¡Registro exitoso! Ahora puedes iniciar sesión.";
                // Clear the form (can be done in component or by re-rendering component,
                // but if we redirect, it's effectively cleared)
                
                // Redirect to login page after a short delay
                setTimeout(() => {
                    goto('/login');
                }, 2000);
            } else {
                errorMessage = "Registration failed: No user ID received or unexpected response.";
            }
        } catch (error: any) {
            console.error("Registration error:", error);
            errorMessage = error.message || "An unexpected error occurred during registration.";
        } finally {
            isLoading = false; // Reset loading state
        }
    };
</script>

<div class="register-container">
    <h1>Crear Cuenta</h1>

    <RegisterForm
        onSubmit={handleRegister}
        {isLoading}
        {errorMessage}
        {successMessage}
    />

    <p class="login-link">
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
    </p>
</div>

<style>
    /* Specific styles for the register page container */
    .register-container {
        max-width: 400px;
        margin: 50px auto;
        padding: 30px;
        background-color: var(--bg-secondary); /* Use theme variable */
        border-radius: var(--border-radius);
        box-shadow: 0 2px 10px var(--shadow-color); /* Use theme variable */
        text-align: center;
    }
    h1 {
        color: var(--text-primary); /* Use theme variable */
        margin-bottom: var(--spacing-lg);
    }
    .login-link {
        margin-top: var(--spacing-lg);
        font-size: 15px;
        color: var(--text-secondary); /* Use theme variable */
    }
    .login-link a {
        color: var(--accent-color); /* Use theme variable */
        text-decoration: none;
        font-weight: bold;
    }
    .login-link a:hover {
        text-decoration: underline;
    }
</style>