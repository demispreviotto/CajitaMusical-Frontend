<script lang="ts">
    import Input from '$lib/components/common/Input.svelte'; // Reusable Input component
    import Form from '$lib/components/common/Form.svelte'; // The new generic Form component
    import type { RegisterUserInput } from '$lib/types'; // Make sure your type import is correct

    // Props passed down from the parent page (e.g., register/+page.svelte)
    export let isLoading: boolean = false;
    export let errorMessage: string | null = null;
    export let successMessage: string | null = null;

    // Callback prop: This function will be provided by the parent page
    // and will be called when the form is submitted.
    // It will receive the form data as an argument.
    export let onSubmit: (data: RegisterUserInput) => void;

    // Internal state for form fields
    let username = '';
    let email = '';
    let name = '';
    let password = '';

    // This internal handler prepares the data and calls the parent's onSubmit prop
    const handleFormSubmission = () => {
        const newUser: RegisterUserInput = { username, email, name, password };
        onSubmit(newUser); // Call the parent's provided function
    };
</script>

<Form
    onSubmit={handleFormSubmission}
    {isLoading}
    {errorMessage}
    {successMessage}
    submitButtonText="Registrarse"
    submitButtonClass="btn-primary"
>
    <Input
        id="register-username"
        label="Usuario"
        type="text"
        placeholder="Elige un nombre de usuario"
        required
        bind:value={username}
    />

    <Input
        id="register-email"
        label="Email"
        type="email"
        placeholder="Tu correo electrónico"
        required
        bind:value={email}
    />

    <Input
        id="register-name"
        label="Nombre Completo"
        type="text"
        placeholder="Tu nombre completo"
        required
        bind:value={name}
    />

    <Input
        id="register-password"
        label="Contraseña"
        type="password"
        placeholder="Crea una contraseña"
        required
        bind:value={password}
    />
</Form>