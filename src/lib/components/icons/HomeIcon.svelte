<script lang="ts">
    export let size: string = '24'; // Default size in pixels
    export let color: string = 'currentColor'; // Defaults to text color
    export let fill: string = color; // For solid icons
    export let stroke: string = 'none'; // For outline icons
  
    export let title: string = 'Home Icon';
  </script>
  
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 -960 960 960"
    {fill}
    {stroke}
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-labelledby="{title ? 'title-' + title.toLowerCase().replace(/\s/g, '-') : undefined}"
    class="icon icon-home"
    {...$$restProps}
  >
    {#if title}
      <title id="{title ? 'title-' + title.toLowerCase().replace(/\s/g, '-') : undefined}">{title}</title>
    {/if}
    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
</svg>
  
  <style>
    .icon {
      display: inline-block;
      vertical-align: middle; /* Aligns icons nicely with text */
    }
  </style>