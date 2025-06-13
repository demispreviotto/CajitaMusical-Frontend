<script lang="ts">
    import '$lib/styles/global.scss'; // Ensure global styles are loaded for button/message styles
	import Button from './Button.svelte';

    // Props for controlling form behavior and messages
    export let onSubmit: ((event: SubmitEvent) => void) | undefined = undefined;
    export let isLoading: boolean = false;
    export let errorMessage: string | null = null;
    export let successMessage: string | null = null;

    export let submitButtonText: string = 'Submit';
    export let submitButtonClass: string = 'btn-primary';


    // Internal handler that calls the passed-in handleSubmit prop
    function handleFormSubmit(event: SubmitEvent) {
        event.preventDefault(); // Prevent default browser form submission
        if (onSubmit) {
            onSubmit(event); // Call the parent's handler
        }
    }
</script>

<form on:submit={handleFormSubmit}>
    {#if errorMessage}
        <p class="error-message">{errorMessage}</p>
    {/if}

    {#if successMessage}
        <p class="success-message">{successMessage}</p>
    {/if}

    <slot />

    <slot name="submitButton">
        <Button
            type="submit"
            variant={submitButtonClass.includes('secondary') ? 'secondary' : 'primary'}
            disabled={isLoading}
            isLoading={isLoading}
        >
            {#if isLoading}
                Loading...
            {:else}
                {submitButtonText}
            {/if}
        </Button>
    </slot>
</form>

<style>
</style>