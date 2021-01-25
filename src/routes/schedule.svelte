<script context="module">
  export function preload({ path, params, query }) {
    return this.fetch(`https://api.freshair.radio/public/shows`)
      .then((r) => r.json())
      .then((shows) => ({ shows }));
  }
</script>

<script>
  import { prefetch, goto } from "@sapper/app";

  import { navigating } from "./_pagefade";

  import ShowCover from "./_showcover.svelte";
  const sort = (shows) => {
    let byDay = {};
    shows.forEach((show) => {
      byDay[show.meta.day] = (byDay[show.meta.day]
        ? [...byDay[show.meta.day], show]
        : [show]
      ).sort((a, b) => a.meta.time.localeCompare(b.meta.time));
    });
    console.log(byDay);
    return byDay;
  };
  export let shows = [];
  $: byDate = sort(shows);
  const toDay = (i) =>
    [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ][i];
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
    Schedule
    <strong>2021</strong>
  </h1>

  {#each Object.keys(byDate) as day}
    <div>
      <h2 class="text-3xl text-white pt-6 px-4 font-thin lowercase">
        {toDay(day)}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pb-4">
        {#each byDate[day] as show}
          <div>
            <h3 class="text-xl text-white w-full py-2">
              <strong>{show.meta.time}</strong>
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
              class="flex gap-2 bg-white bg-opacity-25 rounded-lg">
              <ShowCover {show} tailwind="w-40 h-40 " />
              <h3 class="text-2xl text-white  font-thin w-full p-2 self-center">
                {show.title}
              </h3>
            </a>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</section>
