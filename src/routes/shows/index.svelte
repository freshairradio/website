<script context="module">
  export function preload({ path, params, query }) {
    return this.fetch(`https://data.freshair.radio/v1/public/shows`)
      .then((r) => r.json())
      .then((shows) => ({
        shows: shows.filter((s) => s?.when?.year === '2021/22')
      }));
  }
</script>

<script>
  import { navigating } from '../_pagefade';

  import ShowCover from '../_showcover.svelte';
  export let shows = [];
</script>

<svelte:head>
  <title>All Shows | Freshair</title>
</svelte:head>
<section
  class="transition-opacity duration-300 {$navigating
    ? 'opacity-0'
    : 'opacity-1'}"
>
  <h1 class="text-4xl text-white py-6 px-4 font-thin lowercase">
    On Air Shows
    <strong>2021</strong>
  </h1>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 pb-4">
    {#each shows as show}
      <ShowCover {show} />
    {/each}
  </div>
</section>
