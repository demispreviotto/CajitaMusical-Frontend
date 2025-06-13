<script lang="ts">
    export let size: string = '24';
    export let color: string = 'currentColor';
    export let fill: string = color;
    export let stroke: string = 'none';
    export let title: string = 'Logout';
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
    class="icon icon-sun"
    {...$$restProps}
  >
    {#if title}
      <title id="{title ? 'title-' + title.toLowerCase().replace(/\s/g, '-') : undefined}">{title}</title>
    {/if}
    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
</svg>
  
  <style>
    .icon {
      display: inline-block;
      vertical-align: middle;
    }
  </style>
