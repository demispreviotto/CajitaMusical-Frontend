<script lang="ts">
    import { initializeAuthStoreWithServerData } from '$lib/stores/authStore';    
    import type { LayoutData } from './$types';
    export let data: LayoutData;
    import '$lib/styles/global.scss';
	import Header from '$lib/components/layouts/Header.svelte';
	import Footer from '$lib/components/layouts/Footer.svelte';

    // Esta declaración reactiva se ejecutará cuando `data` cambie (al cargar la página o al navegar).
    $: {
        if (data && data.user !== undefined) { // Check if `data` and `data.user` property exist
            initializeAuthStoreWithServerData(data.user);
        }
    }
</script>

<Header />
<main>
    <slot /> </main>

    <!-- <Footer /> -->
<style>
</style>