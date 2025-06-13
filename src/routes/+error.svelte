<script lang="ts">
    import Button from '$lib/components/common/Button.svelte';
    import '$lib/styles/global.scss';

    export let status: number;
    export let error: Error;

</script>

<div class="error-container">
    <div class="error-content">
        <h1>{status}</h1>
        <h2>{status === 404 ? 'Página No Encontrada' : 'Error del Servidor'}</h2>
        <p>
            {#if error?.message}
                Lo sentimos, {error.message}.
            {:else if status === 404}
                No pudimos encontrar la página que estás buscando.
            {:else}
                Parece que algo salió mal. Intenta de nuevo más tarde.
            {/if}
        </p>
        <Button href="/" variant="primary">
            Volver a la Página de Inicio
        </Button>
    </div>
</div>

<style lang="scss">
    /* Using lang="scss" because we decided to use SCSS for global styles */
    .error-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - var(--spacing-xl) * 2); /* Adjust based on header/footer */
        text-align: center;
        background-color: var(--bg-primary);
        color: var(--text-primary);
        padding: var(--spacing-xl);
    }

    .error-content {
        max-width: 600px;
        padding: var(--spacing-lg);
        background-color: var(--bg-secondary);
        border-radius: var(--border-radius);
        box-shadow: 0 4px 15px var(--shadow-color);
    }

    h1 {
        font-size: 6em; /* Large status code */
        margin-bottom: 0;
        color: var(--accent-color);
    }

    h2 {
        font-size: 2em;
        margin-top: var(--spacing-sm);
        margin-bottom: var(--spacing-lg);
        color: var(--text-primary);
    }

    p {
        font-size: 1.1em;
        line-height: 1.5;
        margin-bottom: var(--spacing-xl);
        color: var(--text-secondary);
    }

    /* Adjust button styling if needed, it should pick up from global.scss */
    /* .error-content button {
        margin-top: var(--spacing-md);
    } */
</style>