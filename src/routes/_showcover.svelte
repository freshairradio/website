<script>
  export let show;
  export let size = '800:800';
  import { navigating } from './_pagefade';
  import { prefetch, goto } from '@sapper/app';
  let tailwind;
  export { tailwind as class };
</script>

<a
  rel="prefetch"
  on:click|preventDefault={async () => {
    navigating.start();
    await prefetch(`/shows/${show.slug}`);
    await goto(`/shows/${show.slug}`);
    navigating.end();
  }}
  href="/shows/{show.slug}"
  class="show relative block bg-gray-700 rounded-lg overflow-hidden {tailwind}"
>
  {#if show.picture}
    <img
      class="object-cover absolute top-0 w-full rounded-lg"
      src={`https://imgproxy.freshair.radio/signature/watermark:1:nowe:0:0:0.3/rs:fill:${size}:1/g:sm/plain/${show.picture}@jpg`}
      alt={show.title}
    />
  {/if}
  {#if !show.picture}
    <div
      class=" text-center title absolute bg-black top-0 left-0 w-full h-full z-10 text-white text-3xl p-4 font-thin"
    >
      {show.title}
    </div>
    <img
      class="object-cover absolute bottom-0 z-10 w-1/2 m-1 right-0"
      src={`https://imgproxy.freshair.radio/signature/fit/300/100/sm/1/plain/https://cdn.freshair.radio/logos/FreshairFullWhiteLogo.png@png`}
      alt="Logo"
    />
  {/if}
  <slot />
</a>

<style>
  .show:before {
    content: '';
    display: block;
    height: 0;
    width: 0;
    padding-bottom: 100%;
  }

  a {
    height: max-content;
  }
</style>
