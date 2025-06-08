<script lang="ts">
    import { authStore, logout as clientLogout, initializeAuthStoreWithServerData } from '$lib/stores/authStore';
    import { logoutUser } from '$lib/api/auth';
    import { goto } from '$app/navigation';

    import type { LayoutData } from './$types';
    export let data: LayoutData;

    // Esta declaración reactiva se ejecutará cuando `data` cambie (al cargar la página o al navegar).
    $: {
        if (data && data.user !== undefined) { // Check if `data` and `data.user` property exist
            initializeAuthStoreWithServerData(data.user);
        }
    }

    const handleLogout = async () => {
        try {
            await logoutUser();
            clientLogout();
            await goto('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
</script>

<header>
    <nav>
        <a href="/">Home</a>
        {#if $authStore.isLoading}
            <span>Cargando...</span>
        {:else if !$authStore.isLoggedIn}
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        {:else}
            <a href="/library">Library</a>
            <a href="/profile">Profile</a>
            <button on:click={handleLogout}>Logout</button>
        {/if}
    </nav>
</header>
<main>
    <slot /> </main>

<footer>
    <p>&copy; {new Date().getFullYear()} Cajita Musical</p>
</footer>

<style>
</style>