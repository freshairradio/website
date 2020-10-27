<script context="module">
  export function preload({ path, params, query }) {
    return this.fetch(
      `https://content.freshair.org.uk/ghost/api/canary/content/posts/?key=335cdc08c8018af3c8cbb85c64&filter=tag:hash-article&limit=6&fields=id,title,slug,feature_image&include=authors,tags`
    )
      .then((r) => r.json())
      .then(({ posts }) => {
        return { posts };
      });
  }
</script>

<script>
  import { currentShowInfo } from "./_nowplaying.store.js";
  import { navigating } from "./_pagefade.js";
  import { audio } from "./_audio.store.js";
  import { onMount } from "svelte";
  import ShowCover from "./_showcover.svelte";
  import Control from "./_control.svelte";
  import PostPreview from "./_postpreview.svelte";
  let canvas;
  export let posts;
  let w;
  let h;
  $: playingLive = $audio.live && $audio.volume == 1;

  onMount(() => {
    window.canvas = canvas;
    let canvasCtx = canvas.getContext("2d");
    let dataArray = new Uint8Array($audio.bufferLength);
    let bufferLength = $audio.bufferLength;
    let frame;
    const draw = () => {
      frame = requestAnimationFrame(draw);
      const WIDTH = w;
      const HEIGHT = h;
      $audio.analyser.getByteTimeDomainData(dataArray);

      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.strokeStyle = "#fff";
      canvasCtx.fillStyle = "#fff";

      let sliceWidth = (WIDTH * 1.0) / (bufferLength / 128);
      canvasCtx.lineWidth = sliceWidth / 2;

      let x = 0;
      //   let y = 0;
      let lastV = 0;
      let zeroes = [];
      canvasCtx.beginPath();

      for (let i = 0; i < bufferLength; i += 128) {
        let avg =
          dataArray.slice(i, i + 128).reduce((acc, e) => acc + e, 0) / 128;
        var v = avg / 128.0;
        var y = (v * HEIGHT) / 2;
        var otherV = v == 1 ? v : v > 1 ? 1 - (v - 1) : 1 + (1 - v);
        var otherY = (otherV * HEIGHT) / 2;
        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.moveTo(x, y);

          canvasCtx.lineTo(x, otherY);
        }

        x += sliceWidth;
      }
      // canvasCtx.lineTo(WIDTH, HEIGHT / 2);
      canvasCtx.stroke();
      canvasCtx.closePath();
      return;
    };
    let timeout;
    const run = () => {
      if (playingLive) {
        draw();
      } else {
        timeout = setTimeout(run, 500);
      }
    };
    run();
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  });
</script>

<svelte:head>
  <title>Freshair Radio</title>
</svelte:head>
<section
  class="transition-opacity duration-300 {$navigating ? 'opacity-0' : 'opacity-1'}">
  {#if $currentShowInfo.title}
    <div
      class="rounded-3xl bg-white bg-opacity-25 bg-gray-800 relative mb-6 overflow-hidden mx-4">
      <h1 class="text-3xl text-white p-6 font-thin lowercase my-auto">
        <strong>{$currentShowInfo.title}</strong>
        is live now
        {#if $currentShowInfo.meta.byline}
          with
          <strong>{$currentShowInfo.meta.byline}</strong>
        {/if}
      </h1>
    </div>
  {:else}
    <h1 class="text-4xl text-white py-6 px-4 font-thin lowercase">
      freshair's offair playlist
    </h1>
  {/if}
  <div
    class="h-72 lg:h-96 rounded-3xl  bg-opacity-25 bg-gray-800 flex mx-4"
    bind:clientHeight={h}
    bind:clientWidth={w}>
    <Control
      tailwind="z-20 my-auto mx-auto w-20 h-20 lg:w-32 lg:h-32 bg-gray-800 rounded-full"
      click={() => {
        console.log('click', playingLive);
        if (playingLive) {
          audio.pauseLive();
        } else {
          audio.playLive();
        }
      }}
      playing={playingLive} />
    <canvas
      class="waveform absolute top-0"
      bind:this={canvas}
      width={w}
      height={h} />
  </div>
  <h1 class="text-4xl text-white py-6 px-4 font-thin lowercase">
    recent posts
  </h1>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 pb-4">
    {#each posts as post}
      <PostPreview {post} />
    {/each}
  </div>
</section>
