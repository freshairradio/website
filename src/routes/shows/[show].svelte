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
  import dayjs from 'dayjs';
  import isoWeek from 'dayjs/plugin/isoWeek';
  dayjs.extend(isoWeek);
  import ShowMetadata from '../_showmetadata.svelte';
  import ShowCover from '../_showcover.svelte';
  import Episode from '../_episode.svelte';
  export let show;
  import { stores } from '@sapper/app';
  import { navigating } from '../_pagefade';
  const { preloading, page, session } = stores();
  let today = dayjs();
  // Filter out episodes which have not yet aired
  let sortedEpisodes = show.episodes.sort(function (episodeA, episodeB) {
    return dayjs(episodeA.created).isAfter(dayjs(episodeB.created)) ? 1 : -1;
  });

  // Sort the episodes by most recently created
</script>

<svelte:head>
  <title>{show.title} | Freshair</title>
</svelte:head>
<section
  class="transition-opacity duration-300 {$navigating
    ? 'opacity-0'
    : 'opacity-1'}"
>
  <h1 class="p-6 px-6 text-4xl font-thin text-white">
    <strong>{show.title}</strong>
    {#if show.meta && show.meta.byline}with {show.meta.byline}{/if}
  </h1>
  <section class="grid grid-cols-1 gap-4 px-6 md:grid-cols-2">
    <ShowCover {show} size="1000:1000" class="bg-transparent" />
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
