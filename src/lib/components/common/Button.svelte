<script lang="ts">
    import '$lib/styles/global.scss';
    export let type: 'button' | 'submit' | 'reset' = 'button';

    export let variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
    export let disabled: boolean = false;
    export let isLoading: boolean = false;

    </script>

<button
    {type}
    disabled={disabled || isLoading}
    class={`btn btn-${variant}`}
    {...$$restProps} >
    {#if isLoading}
        <span class="spinner"></span> Loading...
    {:else}
        <slot /> {/if}
</button>

<style>
    /*
       Styles here define the base button look and any variations.
       Many base styles are pulled from global.css, but this is where
       you'd add component-specific tweaks or overrides.
    */
    .btn {
        /* Base styles are already in global.css, but you could add more here */
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm); /* Spacing between icon and text if any */
    }

    /* Basic spinner for loading state */
    .spinner {
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid #fff; /* White for primary/secondary */
        border-radius: 50%;
        width: 1em;
        height: 1em;
        animation: spin 1s linear infinite;
        display: inline-block;
        vertical-align: middle;
        margin-right: var(--spacing-xs); /* Adjust as needed */
    }

    .btn.btn-tertiary .spinner {
        border-top: 2px solid var(--text-primary); /* For tertiary, use text color */
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>