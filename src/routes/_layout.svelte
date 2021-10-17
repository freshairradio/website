<script context="module">
  export function preload({ path, params, query }) {
    return this.fetch(`https://data.freshair.radio/v1/public/shows`)
      .then((r) => r.json())
      .then((shows) => ({ shows }));
  }
</script>

<script>
  import { sample } from 'lodash';
  import { nowplaying } from './_nowplaying.store.js';
  const sort = (shows) => {
    let byDay = {};
    shows.forEach((show) => {
      byDay[show.when.day] = (
        byDay[show.when.day] ? [...byDay[show.when.day], show] : [show]
      ).sort((a, b) =>
        a.when.hour && b.when.hour ? a.when.hour.localeCompare(b.when.hour) : 0
      );
    });
    return byDay;
  };
  export let shows = [];
  $: byDate = sort(shows);
  const toDay = (i) =>
    [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ][i];

  const updateBroadcastInfo = async () => {
    let date = new Date();
    let clientHour = date.getUTCHours();
    let clientDay = toDay((date.getUTCDay() - 1) % 7);

    if (byDate[clientDay].find((s) => s.meta.time == `${clientHour}:00`)) {
      nowplaying.set(
        byDate[clientDay].find((s) => s.meta.time == `${clientHour}:00`)
      );
    } else {
      nowplaying.set({});
    }
    setTimeout(updateBroadcastInfo, 30000);
  };
  const gradients = [
    ['#5939da', '#7401a7']
    // ["#1488cc", "#2b32b2"],
    // ["#c31432", "#240b36"],
    // ["#f12711", "#f5af19"],
    // ["#659999", "#f4791f"],
    // ["#8360c3", "#2ebf91"],
    // ["#009fff", "#ec2f4b"]
  ];

  import { onMount } from 'svelte';

  onMount(() => {
    updateBroadcastInfo();
  });
  import Navitem from './_navitem.svelte';
  import { audio, seeking } from './_audio.store.js';
  import { writable } from 'svelte/store';
  import ShowCover from './_showcover.svelte';
  import Control from './_control.svelte';
  import { stores } from '@sapper/app';
  const { page, session } = stores();
  import Loader from './_loader.svelte';
  import { navigating } from './_pagefade';
  const width = writable();
  $: playingLive = $audio.live && $audio.volume == 1;
  let menuOpen = false;

  const analyse = () => {
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let analyser = audioCtx.createAnalyser();

    let source = audioCtx.createMediaElementSource($audio.ref);
    source.connect(analyser);

    analyser.connect(audioCtx.destination);

    analyser.fftSize = $audio.bufferLength;
    let bufferLength = analyser.fftSize;
    let dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);
    $audio.analyser = analyser;
  };

  if (typeof document != 'undefined')
    document.addEventListener('mousedown', analyse, { once: true });
</script>

<div
  class="{menuOpen
    ? 'z-30 bg-gray-800 bg-opacity-75'
    : 'bg-gray-800 behind'}  fixed top-0 left-0 h-full w-full"
/>

<div
  class="gradient behind fixed top-0 left-0 h-full w-full opacity-1"
  style="background: linear-gradient(to top right, #5939da, #7401a7)"
/>
<div class="mx-auto max-w-wide">
  <nav
    class="overflow-hidden {menuOpen
      ? 'w-56 z-40'
      : 'w-0'} lg:w-56 h-full fixed"
  >
    <section class="hidden m-4 -mb-2 lg:block show">
      {#if $nowplaying.title && ($audio.live || !$audio.podcast)}
        <ShowCover show={$nowplaying}>
          <Control
            tailwind="z-20 absolute top-0 left-0 m-12 p-1 w-1/2 h-1/2 bg-gray-800 rounded-full"
            click={() => {
              console.log('click', playingLive);
              if (playingLive) {
                audio.pauseLive();
              } else {
                audio.playLive();
              }
            }}
            playing={playingLive}
          />
        </ShowCover>
      {:else if !$audio.live && $audio.podcast}
        <ShowCover show={$audio.show}>
          <Control
            tailwind="z-20 absolute top-0 left-0 m-12 p-1 w-1/2 h-1/2 bg-gray-800 rounded-full"
            click={() => {
              if (!$audio.paused) {
                audio.pausePodcast();
              } else {
                audio.playPodcast($audio.podcast, $audio.show);
              }
            }}
            playing={!$audio.paused}
          />
        </ShowCover>
      {/if}
    </section>
    <ul on:click={() => (menuOpen = false)}>
      <Navitem href="/shows" tailwind="pt-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 mr-2 text-white"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>Shows
      </Navitem>
      <Navitem href="/teams/arts">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 mr-2 text-white"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>Arts
      </Navitem>
      <Navitem href="/teams/music">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 mr-2 text-white"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>Music
      </Navitem>
      <Navitem href="/teams/sports">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 mr-2 text-white"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>Sports
      </Navitem>
      <Navitem href="/teams/news">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 mr-2 text-white"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>News
      </Navitem>
      <Navitem href="/about">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 mr-2 text-white"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>Get Involved
      </Navitem>
      <!-- <Navitem href="/about">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 mr-2 text-white"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>About
      </Navitem> -->
      <Navitem href="/schedule">
        <svg
          class="inline-block w-6 h-6 mr-2 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        >Schedule
      </Navitem>
    </ul>
    <a href="/" class="hidden lg:block">
      <img
        class="absolute bottom-0 left-0 right-0 z-10 object-contain w-full m-1"
        src={`https://cdn.freshair.radio/logos/FreshairFullWhiteLogo.png`}
        alt="Logo"
      /></a
    >
  </nav>
  <nav
    class="fixed bottom-0 left-0 z-40 flex w-screen h-16 bg-gray-800 bg-opacity-75 lg:hidden"
  >
    <button
      class="w-16 h-16 mr-auto text-white cursor-pointer"
      on:click={() => (menuOpen = !menuOpen)}
    >
      <svg
        id="emoji"
        viewBox="0 0 72 72"
        xmlns="http://www.w3.org/2000/svg"
        class=""
      >
        <g id="color" />
        <g id="hair" />
        <g id="skin" />
        <g id="skin-shadow" />
        <g id="line">
          <line
            x1="16"
            x2="56"
            y1="26"
            y2="26"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
          />
          <line
            x1="16"
            x2="56"
            y1="36"
            y2="36"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
          />
          <line
            x1="16"
            x2="56"
            y1="46"
            y2="46"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
          />
        </g>
      </svg>
    </button>
    <a href="/" on:click={() => (menuOpen = false)}>
      <img
        class="bottom-0 right-0 z-10 object-contain w-56 h-full ml-auto"
        src={`https://cdn.freshair.radio/logos/FreshairFullWhiteLogo.png`}
        alt="Logo"
      /></a
    >
  </nav>
  <Loader loading={$navigating} />
  <main class="block h-full pt-4 pb-24 lg:ml-56 lg:pr-4 lg:pb-4">
    <div class="min-h-full overflow-hidden rounded-3xl">
      <slot />
    </div>
  </main>
</div>
<audio
  crossorigin="anonymous"
  src={$audio.src}
  bind:volume={$audio.volume}
  bind:duration={$audio.duration}
  on:timeupdate={(e) => {
    $audio.currentTime = e.target.currentTime;
  }}
  bind:this={$audio.ref}
  on:seeking={() => ($seeking = true)}
  on:seeked={() => ($seeking = false)}
/>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  html,
  body,
  #sapper {
    height: 100%;
  }
  body * {
    border-color: initial;
  }
  .gradient {
    background: linear-gradient(rgba(35, 7, 77, 1), rgba(204, 83, 51, 1));
  }
  .behind {
    z-index: -1;
  }
</style>
