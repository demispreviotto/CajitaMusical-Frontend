<script lang="ts">
    export let id: string;
    export let label: string;
    export let type: 'text' | 'email' | 'password' | 'number' = 'text';
    export let placeholder: string = '';
    export let value: string = ''; // This will be bind:value in the parent
    export let required: boolean = false;
    export let errorMessage: string | null = null; // For displaying validation errors

    // Forward props like 'min', 'max', 'step', etc.
    // Use $$restProps for any other attributes passed down
</script>

<div class="form-group">
    <label for={id}>{label}:</label>
    <input
        {id}
        {type}
        {placeholder}
        bind:value
        {required}
        {...$$restProps}
    />
    {#if errorMessage}
        <p class="input-error-message">{errorMessage}</p>
    {/if}
</div>

<style>
    .form-group {
        margin-bottom: var(--spacing-md);
        text-align: left;
    }

    label {
        display: block;
        margin-bottom: var(--spacing-sm);
        font-weight: bold;
        color: var(--text-primary);
    }

    input {
        width: calc(100% - 20px);
        padding: 12px 10px;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        font-size: 16px;
        box-sizing: border-box;
        background-color: var(--bg-secondary);
        color: var(--text-primary);
    }

    input:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }

    .input-error-message {
        color: var(--error-color);
        font-size: 0.85em;
        margin-top: var(--spacing-xs);
    }
</style>