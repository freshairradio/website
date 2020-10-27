<script context="module">
  export function preload({ path, params, query }) {
    return this.fetch(`https://api.freshair.radio/public/shows/${params.show}`)
      .then((r) => r.json())
      .then((show) => ({ show }));
  }
</script>

<script>
  import ShowMetadata from "../_showmetadata.svelte";
  import ShowCover from "../_showcover.svelte";
  import Episode from "../_episode.svelte";
  export let show;
  import { stores } from "@sapper/app";
  import { navigating } from "../_pagefade";
  const { preloading, page, session } = stores();

  console.log(show.episodes);
  let sortedEpisodes = show.episodes;

</script>

<svelte:head>
  <title>{show.title} | Freshair</title>
</svelte:head>
<section
  class="transition-opacity duration-300 {$navigating ? 'opacity-0' : 'opacity-1'}">
  <h1 class="text-4xl text-white p-6 px-6 font-thin">
    <strong>{show.title}</strong>
    {#if show.meta && show.meta.byline}with {show.meta.byline}{/if}
  </h1>
  <section class="grid grid-cols-1 md:grid-cols-2 px-6 gap-4">
    <ShowCover {show} size="1000/1000" tailwind="bg-transparent" />
    <div>
      {#if show.meta}
        <ShowMetadata {show} />
      {/if}
      <div class="text-xl font-thin text-white whitespace-pre-wrap">
        {show.description}
      </div>
    </div>
  </section>
  <div class="pb-2">
    {#if show.episodes}
      <section>
        {#each show.episodes as episode}
          <Episode {episode} {show} />
        {/each}
      </section>
    {/if}
  </div>
</section>
