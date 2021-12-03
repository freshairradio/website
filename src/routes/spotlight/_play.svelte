<script>
  import { audio, others } from '../_audio.store.js';
  import Control from '../_control.svelte';
  export let episode;
  export let show;
  let w;
  let h;
  let canvas;
  $: playing = !$audio.paused && $audio.src == episode.meta.audio;
  let scrubber;
  let held = false;
  import { onMount } from 'svelte';
  const onMousedown = (e) => {
    const rect = scrubber.getBoundingClientRect();
    audio.goto(((e.clientX - rect.x) / rect.width) * $audio.duration);
    held = true;
  };
  const onMousemove = (e) => {
    if (held) {
      const rect = scrubber.getBoundingClientRect();
      audio.goto(((e.clientX - rect.x) / rect.width) * $audio.duration);
      held = true;
    }
  };
  const onMouseup = (e) => {
    held = false;
  };

  onMount(() => {
    if (!navigator.userAgent.match('jsdom')) {
      let canvasCtx = canvas.getContext('2d');
      let dataArray = new Uint8Array($audio.bufferLength);
      let bufferLength = $audio.bufferLength;
      let frame;
      const draw = () => {
        frame = requestAnimationFrame(draw);
        if (!playing) return;
        const WIDTH = w;
        const HEIGHT = h;
        $audio.analyser.getByteTimeDomainData(dataArray);

        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.strokeStyle = '#000';
        canvasCtx.fillStyle = '#000';

        let sliceWidth = (WIDTH * 1.0) / (bufferLength / 64);
        canvasCtx.lineWidth = sliceWidth / 2;

        let x = 0;
        //   let y = 0;
        let lastV = 0;
        let zeroes = [];
        canvasCtx.beginPath();

        for (let i = 0; i < bufferLength; i += 64) {
          let avg = Math.max(...dataArray.slice(i, i + 64));
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
        if (playing) {
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
    }
  });
</script>

<div
  id={`episode-${episode.identifier}`}
  class="my-4   bg-white max-w-xl mx-auto rounded-3xl shadow-inner"
>
  <div
    class="h-20 relative overflow-hidden cursor-pointer rounded-3xl"
    bind:clientWidth={w}
    bind:clientHeight={h}
    bind:this={scrubber}
    on:pointerdown={onMousedown}
    on:pointerup={onMouseup}
    on:pointermove={onMousemove}
  >
    <Control
      tailwind="bg-gray-900 rounded-full z-20 w-16 h-16 m-2 relative"
      click={() => {
        if (playing) {
          audio.pausePodcast();
        } else {
          audio.playPodcast(episode, show);
        }
      }}
      {playing}
    />
    {#if $others && $others[episode.meta.audio]}
      <div>
        <div
          class="absolute top-0 h-20 left-0 bg-gray-300"
          style="width:{($others[episode.meta.audio].current /
            $others[episode.meta.audio].duration) *
            w}px"
        />
        <div
          class="h-20 text-white font-thin text-lg bottom-0 absolute right-0 p-1 pr-2"
        >
          {Math.round(
            ($others[episode.meta.audio].duration -
              $others[episode.meta.audio].current) /
              60
          ).toString()}m left
        </div>
      </div>
    {/if}
    <canvas
      class="waveform absolute top-0"
      bind:this={canvas}
      width={w}
      height={h}
    />
  </div>
</div>
