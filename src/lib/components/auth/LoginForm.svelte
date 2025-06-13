<script lang="ts">
    import type { LoginUserInput } from '$lib/types/auth';
    import Input from '$lib/components/common/Input.svelte';
    import Form from '$lib/components/common/Form.svelte';

    export let isLoading: boolean = false;
    export let errorMessage: string | null = null;
    export let successMessage: string | null = null;
    export let onSubmit: ((credentials: LoginUserInput) => void) | undefined = undefined;

    let username = '';
    let password = '';

    function handleFormSubmit(event: SubmitEvent) {

        console.log("LoginForm: handleFormSubmit called.");
        console.log("LoginForm: Captured Username:", username);
        console.log("LoginForm: Captured Password:", password);

        const credentials: LoginUserInput = { username, password };

        console.log("LoginForm: Credentials prepared for submission:", credentials);
        
        if (onSubmit) {
            onSubmit(credentials);
        }
    }
    
    </script>

<Form
    onSubmit={handleFormSubmit}
    {isLoading}
    {errorMessage}
    {successMessage}
    submitButtonText="Login"
    submitButtonClass="btn-primary"
>
    <Input
        id="username"
        label="Usuario"
        type="text"
        placeholder="Tu nombre de usuario"
        required
        bind:value={username}
    />

    <Input
        id="password"
        label="Contraseña"
        type="password"
        placeholder="Tu contraseña"
        required
        bind:value={password}
    />

    </Form>