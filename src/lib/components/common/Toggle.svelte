<script lang="ts">
    import '$lib/styles/global.scss';

    export let checked: boolean = false;
    export let id: string = `toggle-${Math.random().toString(36).substr(2, 9)}`;
    export let label: string | undefined = undefined;
    export let disabled: boolean = false;

    export let onToggle: ((checked: boolean) => void) | undefined = undefined;
    function handleClick() {
        if (onToggle) {
            onToggle(checked);
        }
    }
</script>

<div class="toggle-wrapper">
    <input
        type="checkbox"
        {id}
        bind:checked
        {disabled}
        class="toggle-checkbox"
        on:click={handleClick}
        {...$$restProps} />
    <label for={id} class="toggle-label">
        <span class="toggle-switch"></span>
        {#if label}
            <span class="toggle-text">{label}</span>
        {/if}
    </label>
</div>

<style>
    .toggle-wrapper {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-sm);
        user-select: none;
    }

    .toggle-checkbox {
        /* Visually hide the checkbox but keep it accessible */
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }

    .toggle-label {
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
        color: var(--text-primary); /* Use primary text color */
        font-size: 1rem;
    }

    /* Style the switch track */
    .toggle-switch {
        position: relative;
        width: 26px; /* Width of the track */
        height: 14px; /* Height of the track */
        background-color: var(--border-color); /* Off state background */
        border-radius: 7px; /* Half of height for rounded ends */
        transition: background-color 0.3s ease;
        flex-shrink: 0; /* Prevent it from shrinking */
    }

    /* Style the switch thumb (the movable circle) */
    .toggle-switch::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 10px; /* Size of the thumb */
        height: 10px;
        background-color: var(--bg-primary); /* Thumb color */
        border-radius: 50%;
        transition: transform 0.3s ease, background-color 0.3s ease;
        box-shadow: 0 1px 3px var(--shadow-color); /* Subtle shadow for depth */
    }

    /* Checked state for the toggle */
    .toggle-checkbox:checked + .toggle-label .toggle-switch {
        background-color: var(--accent-color); /* On state background */
    }

    .toggle-checkbox:checked + .toggle-label .toggle-switch::after {
        transform: translateX(12px); /* Move thumb to the right (48-3-3-20 = 22) */
        background-color: var(--bg-secondary); /* Thumb color when checked */
    }

    /* Focus styling for accessibility (when checkbox is focused) */
    .toggle-checkbox:focus-visible + .toggle-label .toggle-switch {
        outline: 2px solid var(--accent-color); /* Highlight with accent color */
        outline-offset: 2px; /* Add some space */
    }

    /* Disabled state */
    .toggle-checkbox:disabled + .toggle-label {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .toggle-checkbox:disabled + .toggle-label .toggle-switch {
        background-color: var(--border-color); /* Consistent disabled background */
    }

    .toggle-checkbox:disabled + .toggle-label .toggle-switch::after {
        background-color: var(--text-secondary); /* Consistent disabled thumb color */
    }

    .toggle-text {
        margin-left: var(--spacing-sm); /* Space between switch and text label */
        color: var(--text-primary);
    }
</style>