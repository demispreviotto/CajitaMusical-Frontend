<script lang="ts">
    import { goto } from '$app/navigation';
    import { login as performLogin } from '$lib/stores/authStore';
    import { loginUser } from '$lib/api/auth'; // Aún no lo hemos creado, pero lo haremos
    import type { LoginUserInput } from '$lib/types/auth'; // Tu interfaz de TypeScript

    let username = '';
    let password = '';
    let errorMessage: string | null = null; // Para mostrar errores al usuario
    let isLoading = false; // Para deshabilitar el botón mientras se envía la solicitud

    // Función para manejar el envío del formulario
    const handleSubmit = async () => {
        errorMessage = null; // Limpiar errores anteriores
        isLoading = true; // Indicar que la carga está en progreso

        const credentials: LoginUserInput = { username, password };

        try {
            const response = await loginUser(credentials); // Llama a la función de la API

            if (response && response.user) {
                performLogin(response.user); // Actualiza el authStore
                goto('/library'); // Redirige a la página de la biblioteca tras login exitoso
            } else {
                // Esto debería ser manejado por la función loginUser en src/lib/api/auth.ts
                // si devuelve un error o un estado inesperado.
                // Por ahora, un placeholder.
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
    .login-container {
        max-width: 400px;
        margin: 50px auto;
        padding: 30px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    h1 {
        color: #333;
        margin-bottom: 25px;
        font-size: 2em;
    }

    .form-group {
        margin-bottom: 20px;
        text-align: left;
    }

    label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        color: #555;
        font-size: 0.95em;
    }

    input[type="text"],
    input[type="password"] {
        width: calc(100% - 20px); /* Ajusta el padding */
        padding: 12px 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1em;
        box-sizing: border-box; /* Incluye padding en el ancho */
    }

    button {
        background-color: #007bff;
        color: white;
        padding: 12px 25px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1.1em;
        font-weight: bold;
        transition: background-color 0.3s ease;
        width: 100%;
        box-sizing: border-box;
    }

    button:hover:not(:disabled) {
        background-color: #0056b3;
    }

    button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }

    .error-message {
        color: #dc3545; /* Rojo de Bootstrap para errores */
        background-color: #f8d7da; /* Fondo suave para el error */
        border: 1px solid #f5c6cb;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 20px;
        font-size: 0.9em;
    }

    .register-link {
        margin-top: 20px;
        font-size: 0.9em;
        color: #666;
    }

    .register-link a {
        color: #007bff;
        text-decoration: none;
        font-weight: bold;
    }

    .register-link a:hover {
        text-decoration: underline;
    }
</style>