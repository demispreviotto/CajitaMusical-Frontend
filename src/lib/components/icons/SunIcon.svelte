<script lang="ts">
    export let size: string = '24';
    export let color: string = 'currentColor';
    export let fill: string = color;
    export let stroke: string = 'none';
    export let title: string = 'Sun Icon (Light Mode)';
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
    <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/>
</svg>
  
  <style>
    .icon {
      display: inline-block;
      vertical-align: middle;
    }
  </style>