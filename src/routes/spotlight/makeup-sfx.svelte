<script context="module">
  export function preload({ path, params, query }) {
    return this.fetch(
      `https://data.freshair.radio/v1/public/shows/society-spotlight`
    )
      .then((r) => r.json())
      .then((show) => ({
        show,
        episode: show.episodes.find(
          (e) => e.identifier === "e58531e5-c4ee-4865-9e6e-d8fe57987988"
        )
      }));
  }
</script>

<script>
  import Play from "./_play.svelte";
  export let episode;
  export let show;
</script>

<div class="fixed top-0 left-0 w-screen h-screen bg-black z-50" />
<img
  class="object-contain w-screen h-screen fixed top-0 left-0 bg-white z-50"
  style="filter:blur(20px);background:#b6184b"
  src={`https://cdn.freshair.radio/spotlight/makeup.jpg`}
/>
<div
  class="fixed w-screen left-0 top-0 z-50 p-6 bg-opacity-50 bg-white h-screen overflow-auto mb-12"
>
  <img
    style="background:#b6184b"
    class="object-contain h-64 lg:h-72 w-full lg:w-1/2 lg:mx-auto border-2 border-black rounded-3xl bg-white  z-50 relative"
    src={`https://cdn.freshair.radio/spotlight/makeup.jpg`}
  />
  <Play {show} {episode} />
  <span class="text-xl font-thin text-black mx-auto text-center block mb-4"
    >or</span
  >
  <div class="max-w-xl mx-auto flex flex-wrap gap-2 justify-center">
    <a
      href="https://open.spotify.com/show/6Te70Jaxjt1mfxwaNlWWrT?si=ugeck99ES-aMCdHRivoziQ"
      class="inline-block"
    >
      <img src="/listenspotify.png" class="h-12" /></a
    >
    <a
      href="https://podcasts.apple.com/gb/podcast/society-spotlight/id1541509856"
      class="inline-block"
    >
      <img src="/apple.svg" class="h-12" /></a
    >
    <a
      href="https://overcast.fm/itunes1541509856"
      class="inline-block bg-black p-2 rounded-xl"
    >
      <img src="/overcast.svg" class="h-8 w-8 inline-block align-middle" /><span
        class="inline-block text-xl font-thin align-middle ml-2 text-white mr-1"
        >Overcast</span
      ></a
    >
    <a href="https://pca.st/q81i096g" class="inline-block">
      <img src="/pocketcasts.png" class="h-12" /></a
    >
  </div>
  <h1 class="mx-auto text-4xl text-center mt-4 font-thin">{episode.title}</h1>

  <div
    class="text-lg font-thin text-black whitespace-pre-wrap mx-auto max-w-xl mb-12"
  >
    {episode.description}
  </div>
</div>
