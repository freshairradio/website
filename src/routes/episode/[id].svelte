<script context="module">
  export function preload({ path, params, query }) {
    return this.fetch(
      `https://data.freshair.radio/v1/public/episodes/${params.id}`
    )
      .then((r) => r.json())
      .then((episode) => ({
        episode
      }));
  }
</script>

<script>
  import Play from '../spotlight/_play.svelte';
  export let episode;
</script>

<div class="fixed top-0 left-0 w-screen h-screen bg-black z-50" />
<img
  class="object-cover w-screen h-screen fixed top-0 left-0 bg-white z-50"
  style="filter:blur(20px)"
  src={`https://imgproxy.freshair.radio/signature/rs:fill:1000:1000:1/g:sm/plain/${episode.Show.picture}@jpg`}
/>
<div
  class="fixed w-screen left-0 top-0 z-50 p-6 bg-opacity-50 bg-white h-screen overflow-auto mb-12 pt-16"
>
  <img
    class="object-contain h-64 w-64 md:h-72 md:w-72 mx-auto rounded-3xl bg-white z-50 relative"
    src={`https://imgproxy.freshair.radio/signature/watermark:1:nowe:0:0:0.3/rs:fill:800:800:1/g:sm/plain/${episode.Show.picture}@jpg`}
  />
  <Play show={episode.Show} {episode} />
  <span class="text-xl font-thin text-black mx-auto text-center block mb-4"
    >or</span
  >
  <div class="max-w-xl mx-auto flex flex-wrap gap-2 justify-center">
    <a href={episode.Show.meta.spotify} class="inline-block">
      <img src="/listenspotify.png" class="h-12" /></a
    >
    <a href={episode.Show.meta.applePodcasts} class="inline-block">
      <img src="/apple.svg" class="h-12" /></a
    >
  </div>
  <h1 class="mx-auto text-4xl text-center mt-4 font-thin">{episode.title}</h1>

  <div
    class="text-lg font-thin text-black whitespace-pre-wrap mx-auto max-w-xl mb-12"
  >
    {episode.description}
  </div>
</div>
<a href="/">
  <img
    class="object-contain h-12 w-12 bg-gray-800 p-1 rounded-full z-50 absolute top-0 left-0 m-2"
    src="/FreshairWhiteLogo.png"
  /></a
>
