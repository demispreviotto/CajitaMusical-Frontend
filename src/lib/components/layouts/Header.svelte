<script lang="ts">
    import { authStore, logout as clientLogout } from '$lib/stores/authStore';
    import { logoutUser } from '$lib/api/auth';
    import { goto } from '$app/navigation';

    import HomeIcon from '$lib/components/icons/HomeIcon.svelte';
    
    // Theme related imports
    import { theme, toggleTheme } from '$lib/stores/themeStore';

    // Common UI components
    import Button from '$lib/components/common/Button.svelte';
    // import Toggle from '$lib/components/common/Toggle.svelte';
	import LogoutIcon from '../icons/LogoutIcon.svelte';
	import PlaylistPlayIcon from '../icons/PlaylistPlayIcon.svelte';
	import BadgeIcon from '../icons/BadgeIcon.svelte';

    // Reactive declaration for the Toggle component's checked state
    // $: isDarkMode = $theme === 'dark';

    // The handler for the Toggle's 'change' event
    // function handleThemeToggle() {
    //     console.log('Header: handleThemeToggle fired!');
    //     toggleTheme(); // This function from themeStore.ts already handles the actual theme switching
    // }

    // Handler for logout button
    const handleLogout = async () => {
        try {
            await logoutUser(); // Call backend logout API
            clientLogout();     // Update frontend auth store
            await goto('/login'); // Redirect to login page
        } catch (error) {
            console.error('Error during logout:', error);
            // Optionally, display an error message to the user here
        }
    };
</script>

<header class="app-header">
    <nav class="main-nav">
        <a href="/"><HomeIcon size="20" color="var(--accent-color)"/></a>
        {#if $authStore.isLoading}
            <span>Cargando...</span>
        {:else if !$authStore.isLoggedIn}
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        {:else}
            <a href="/library"><PlaylistPlayIcon size="20" color="var(--accent-color)"/></a>
            <a href="/profile"><BadgeIcon size="20" color="var(--accent-color)"/></a>
            <Button on:click={handleLogout} variant="secondary"><LogoutIcon size="20" color="var(--accent-color)" /></Button>
        {/if}

        <!-- <div class="theme-toggle-container">
            <Toggle
                id="theme-switcher"
                label="Dark Mode"
                bind:checked={isDarkMode}
                onToggle={handleThemeToggle}
            />
        </div> -->
    </nav>
</header>

<style>
    /* Styles for the header component itself */
    .app-header {
        background-color: var(--bg-secondary);
        box-shadow: 0 2px 4px var(--shadow-color);
        padding: var(--spacing-sm) var(--spacing-md);
    }

    .main-nav {
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: var(--spacing-md);
        max-width: 1200px;
        margin: 0 auto;
    }

    .main-nav a,
    .main-nav span {
        color: var(--text-primary);
        text-decoration: none;
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--border-radius);
        transition: background-color 0.2s ease;
        white-space: nowrap; /* Prevent items from wrapping */
    }

    .main-nav a:hover {
        background-color: var(--border-color);
    }

    /* .theme-toggle-container {
        margin-left: auto;
    } */
</style>