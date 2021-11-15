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
  import { prefetch, goto } from '@sapper/app';

  import { navigating } from './_pagefade';

  import ShowCover from './_showcover.svelte';
  const sort = (shows) => {
    let byDay = {};
    shows.forEach((show) => {
      byDay[show.when.day] = (
        byDay[show.when.day] ? [...byDay[show.when.day], show] : [show]
      ).sort((a, b) => a.when.hour.localeCompare(b.when.hour));
    });
    return byDay;
  };
  export let shows = [];
  $: byDate = sort(shows);
  const toDay = (i) => i;
</script>

<svelte:head>
  <title>All Shows | Freshair</title>
</svelte:head>
<section
  class="transition-opacity duration-300 {$navigating
    ? 'opacity-0'
    : 'opacity-1'}"
>
  <h1 class="px-4 pt-6 text-4xl font-thin text-white lowercase">
    Schedule
    <strong>2021</strong>
  </h1>

  {#each Object.keys(byDate) as day}
    <div>
      <h2 class="px-4 pt-6 text-3xl font-thin text-white lowercase">
        {toDay(day)}
      </h2>
      <div class="grid grid-cols-1 gap-4 px-4 pb-4 md:grid-cols-2">
        {#each byDate[day] as show}
          <div>
            <h3 class="w-full py-2 text-xl text-white">
              <strong>{show.when.hour}</strong>
            </h3>
            <a
              rel="prefetch"
              on:click|preventDefault={async () => {
                navigating.start();
                await prefetch(`/shows/${show.slug}`);
                await goto(`/shows/${show.slug}`);
                navigating.end();
              }}
              href="/shows/{show.slug}"
              class="flex gap-2 bg-white bg-opacity-25 rounded-lg"
            >
              <ShowCover {show} class="w-40 h-40" />
              <h3 class="self-center w-full p-2 text-2xl font-thin text-white">
                {show.title}
              </h3>
            </a>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</section>
