// src/lib/stores/themeStore.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
    if (!browser) {
        console.log('themeStore: getInitialTheme - Not in browser, defaulting to dark.');
        return 'dark';
    }
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
        console.log('themeStore: getInitialTheme - Found stored theme:', storedTheme);
        return storedTheme;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('themeStore: getInitialTheme - System prefers dark.');
        return 'dark';
    }
    console.log('themeStore: getInitialTheme - No preference, defaulting to dark.');
    return 'dark'; // Default to light if no preference
}

export const theme = writable<Theme>(getInitialTheme());

// This subscriber runs whenever the 'theme' store's value changes
theme.subscribe((value) => {
    if (browser) {
        console.log('themeStore: Subscriber running. Setting theme to:', value);
        localStorage.setItem('theme', value);
        // Ensure classes are removed first, then add the correct one
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(`${value}-theme`);
    }
});

export function toggleTheme() {
    theme.update((currentTheme) => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        console.log('themeStore: Toggling theme from', currentTheme, 'to', newTheme);
        return newTheme;
    });
}

if (browser) {
    // Listen for system theme changes (only if no explicit user preference stored)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        if (!localStorage.getItem('theme')) { // Only apply if user hasn't set a manual theme
            theme.set(event.matches ? 'dark' : 'light');
            console.log('themeStore: System theme changed. Setting theme to:', event.matches ? 'dark' : 'light');
        }
    });
}