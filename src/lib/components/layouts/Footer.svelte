<script lang="ts">
    import Button from '$lib/components/common/Button.svelte'; // Import your reusable Button component
</script>

<footer class="app-footer">
    <p>&copy; {new Date().getFullYear()} Cajita Musical</p>
    <Button variant="tertiary" on:click={() => alert('Privacy Policy clicked!')}>
        Privacy Policy
    </Button>
</footer>

<style>
    /* Styles for the footer component itself */
    .app-footer {
        padding: var(--spacing-md) var(--spacing-xl);
        text-align: center;
        background-color: var(--bg-secondary);
        color: var(--text-secondary);
        border-top: 1px solid var(--border-color);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: var(--spacing-md);
        margin-top: auto;

    }

    .app-footer p {
        margin: 0;
    }
</style>