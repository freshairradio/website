<script context="module">
  export function preload({ path, params, query }) {
    return this.fetch(
      `https://data.freshair.radio/v1/public/shows/${params.show}`
    )
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

  let today = Date.now();
  // Filter out episodes which have not yet aired
  let sortedEpisodes = show.episodes.filter(function (episode) {
    let day = new Date(episode.scheduling.week);
    day.setDate(day.getDate() + show.meta.day + 1);
    day.setHours(show.meta.time.substring(0, 2));

    return episode.scheduling.week == null || day <= today;
  });
  // Sort the episodes by most recently created
  sortedEpisodes
    .sort(function (episodeA, episodeB) {
      return new Date(episodeA.created) - new Date(episodeB.created);
    })
    .reverse();
</script>

<svelte:head>
  <title>{show.title} | Freshair</title>
</svelte:head>
<section
  class="transition-opacity duration-300 {$navigating
    ? 'opacity-0'
    : 'opacity-1'}"
>
  <h1 class="text-4xl text-white p-6 px-6 font-thin">
    <strong>{show.title}</strong>
    {#if show.meta && show.meta.byline}with {show.meta.byline}{/if}
  </h1>
  <section class="grid grid-cols-1 md:grid-cols-2 px-6 gap-4">
    <ShowCover {show} size="1000/1000" class="bg-transparent" />
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
        {#each sortedEpisodes as episode}
          <Episode {episode} {show} />
        {/each}
      </section>
    {/if}
  </div>
</section>
