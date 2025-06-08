<script lang="ts">
	import { authStore } from '$lib/stores/authStore';
</script>

{#if $authStore.isLoggedIn && $authStore.user}
    <h1>¡Bienvenido de nuevo, {$authStore.user.name}!</h1>
    <p>¡Nos alegra verte en Cajita Musical!</p>
{:else}
    <h1>Cargando información del usuario...</h1>
{/if}

<style>
</style>
