<script lang="ts">
    export let size: string = '24';
    export let color: string = 'currentColor';
    export let fill: string = color;
    export let stroke: string = 'none';
    export let title: string = 'Playlist Play';
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
    class="icon icon-moon"
    {...$$restProps}
  >
    {#if title}
      <title id="{title ? 'title-' + title.toLowerCase().replace(/\s/g, '-') : undefined}">{title}</title>
    {/if}
    <path d="M120-320v-80h320v80H120Zm0-160v-80h480v80H120Zm0-160v-80h480v80H120Zm520 520v-320l240 160-240 160Z"/>
</svg>
  
  <style>
    .icon {
      display: inline-block;
      vertical-align: middle;
    }
  </style>