<script>
  import { sample } from "lodash";
  import sc from "./_schedule.js";
  import { nowplaying, currentShowInfo } from "./_nowplaying.store.js";

  let schedule = sc.schedule;
  const updateBroadcastInfo = async () => {
    let date = new Date();
    let clientHour = "hour" + date.getUTCHours();
    let clientDay = "day" + date.getUTCDay();

    if (schedule[clientDay][clientHour] != "") {
      nowplaying.set(schedule[clientDay][clientHour]);
    }
    setTimeout(updateBroadcastInfo, 30000);
  };
  const gradients = [
    ["rgba(35, 7, 77, 0.8)", "rgba(204, 83, 51, 0.8)"],
    ["#1488cc", "#2b32b2"],
    ["#c31432", "#240b36"],
    ["#f12711", "#f5af19"],
    ["#659999", "#f4791f"],
    ["#8360c3", "#2ebf91"],
    ["#009fff", "#ec2f4b"]
  ];
  let gradientA = sample(gradients);
  let gradientB = sample(gradients);
  let showing = "a";
  import { onMount } from "svelte";
  const switchGradient = () => {
    if (showing === "a") {
      gradientB = sample(gradients);
      showing = "b";
    } else {
      gradientA = sample(gradients);
      showing = "a";
    }
  };
  onMount(() => {
    updateBroadcastInfo();
    let i = setInterval(switchGradient, 20000);
    return () => clearInterval(i);
  });
  import Navitem from "./_navitem.svelte";
  import NavItem from "./_navitem.svelte";
  import { audio, seeking } from "./_audio.store.js";
  import { writable } from "svelte/store";
  import ShowCover from "./_showcover.svelte";
  import Control from "./_control.svelte";
  import { stores } from "@sapper/app";
  const { page, session } = stores();
  import Loader from "./_loader.svelte";
  import Showcover from "./_showcover.svelte";
  import { navigating } from "./_pagefade";
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

  if (typeof document != "undefined")
    document.addEventListener("mousedown", analyse, { once: true });
</script>

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
    z-index: -1;
  }
</style>

<div class="gradient fixed top-0 left-0 h-full w-full" />
<div
  class="gradient fixed top-0 left-0 h-full w-full transition-opacity duration-15000 {showing === 'a' ? 'opacity-1' : 'opacity-0'}"
  style="background: linear-gradient({gradientA.join(',')})" />
<div
  class="gradient fixed top-0 left-0 h-full w-full transition-opacity duration-15000 {showing === 'b' ? 'opacity-1' : 'opacity-0'}"
  style="background: linear-gradient({gradientB.join(',')})" />
<nav class="w-56 h-full fixed">
  <section class="show m-4 -mb-2">
    {#if $currentShowInfo.title && ($audio.live || !$audio.podcast)}
      <ShowCover show={$currentShowInfo}>
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
          playing={playingLive} />
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
          playing={!$audio.paused} />
      </ShowCover>
    {/if}
  </section>
  <ul>
    <Navitem href="/shows" tailwind="pt-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="w-6 h-6 text-white inline-block mr-2"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>Shows
    </Navitem>
    <Navitem href="/teams/arts">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="w-6 h-6 text-white inline-block mr-2"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>Arts
    </Navitem>
    <Navitem href="/teams/music">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="w-6 h-6 text-white inline-block mr-2"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>Music
    </Navitem>
    <Navitem href="/teams/sports">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="w-6 h-6 text-white inline-block mr-2"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>Sports
    </Navitem>
    <Navitem href="/teams/news">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="w-6 h-6 text-white inline-block mr-2"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>News
    </Navitem>
    <Navitem href="/join">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="w-6 h-6 text-white inline-block mr-2"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>Join
    </Navitem>
    <Navitem href="/about">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="w-6 h-6 text-white inline-block mr-2"
        stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>About
    </Navitem>
  </ul>
  <a href="/">
    <img
      class="cover absolute bottom-0 z-10 w-full m-1 right-0 left-0"
      src={`https://imgproxy.freshair.radio/signature/fit/300/100/sm/1/plain/https://cdn.freshair.radio/logos/FreshairFullWhiteLogo.png@png`}
      alt="Logo" /></a>
</nav>
<Loader loading={$navigating} />
<main class=" ml-56  h-full  pt-4 pr-4 pb-4">
  <div class="min-h-full rounded-3xl  overflow-hidden">
    <slot />
  </div>
</main>
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
  on:seeked={() => ($seeking = false)} />
