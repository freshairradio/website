<script>
  export let show;
  let facebook =
    show.meta && show.meta.facebook
      ? "https://www.facebook.com/" + show.meta.facebook
      : null;
  let instagram =
    show.meta && show.meta.instagram
      ? "https://www.instagram.com/" + show.meta.instagram
      : null;
  let twitter =
    show.meta && show.meta.twitter
      ? "https://twitter.com/" + show.meta.twitter
      : null;

  let day = show.meta.day
    ? [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ][show.meta.day]
    : null;
</script>

<div>
  <a
    class="rss w-10 h-10 inline-block cursor-pointer -ml-2"
    target="_blank"
    href="https://data.freshair.radio/v1/rss/{show.slug}"
  >
    <svg
      id="emoji"
      x="0"
      y="0"
      viewBox="0 0 72 72"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="line">
        <path
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
          d="M58.3698,30.524c-5.6511-5.6511-13.458-9.1464-22.0813-9.1464c-8.6366,0-16.4544,3.5061-22.1075,9.1726l-3.813-3.7631
            c6.6245-6.6507,15.7919-10.7667,25.9205-10.7667c10.1026,0,19.2488,4.0949,25.8694,10.7154L58.3698,30.524z"
        />
        <path
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
          d="M21.9165,38.2856c3.7224-3.7905,8.9056-6.1416,14.6379-6.1416c5.5973,0,10.671,2.2416,14.3724,5.876l3.7837-3.7919
            c-4.6705-4.6014-11.0817-7.4409-18.1561-7.4409c-7.2115,0-13.7339,2.9506-18.4258,7.7105L21.9165,38.2856z"
        />
        <path
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
          d="M43.3518,45.5965c-1.7623-1.6966-4.158-2.7397-6.7974-2.7397c-2.7741,0-5.2791,1.1524-7.0623,3.0046l-3.8144-3.8145
            c2.7547-2.8372,6.6098-4.6001,10.8766-4.6001c4.1307,0,7.8755,1.6522,10.6097,4.3319L43.3518,45.5965z"
        />
        <circle
          cx="36.2886"
          cy="52.6053"
          r="2.6723"
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
        />
      </g>
    </svg>
  </a>
  {#if instagram}
    <a
      class="instagram w-10 h-10 inline-block cursor-pointer"
      target="_blank"
      href={instagram}
    >
      <svg
        id="emoji"
        x="0"
        y="0"
        viewBox="0 0 72 72"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="line">
          <path
            fill="none"
            stroke="#fff"
            stroke-miterlimit="10"
            stroke-width="2"
            d="M46.7845,12.6136h-21.569
            c-6.9598,0-12.6019,5.6421-12.6019,12.6019v21.5689c0,6.9598,5.6421,12.6019,12.6019,12.6019h21.5689
            c6.9598,0,12.6019-5.6421,12.6019-12.6019V25.2155C59.3864,18.2557,53.7443,12.6136,46.7845,12.6136z"
          />
          <circle
            cx="36"
            cy="36"
            r="11.29"
            fill="none"
            stroke="#fff"
            stroke-miterlimit="10"
            stroke-width="2"
          />
          <circle cx="49.7092" cy="22.2908" r="2.4193" />
        </g>
      </svg>
    </a>
  {/if}
  {#if twitter}
    <a
      class="twitter w-10 h-10 inline-block cursor-pointer"
      target="_blank"
      href={twitter}
    >
      <svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
        <g id="line">
          <path
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
            d="M58.0417,16.6667c0,0-2.5833,2.0833-6.2083,2.4583c0,0-5.7083-6.375-13.875-0.8333c-3.6667,2.5833-4,8.0417-3.375,10
            c0,0-11.0833,0.875-20.75-10.4583c0,0-4.3333,7.5,2.8333,13.5c0,0-2.1182,0.3333-4.1317-1.3333c0,0-0.9517,7.75,7.715,9.9167
            c0,0-0.5833,1-4.0833,0c0,0,0.5833,6.3333,8.8333,7.25c0,0-4.4569,4.5833-14.4784,4c0,0,16.5618,12.4167,34.4784-2.5833
            c10-8.5,9.6667-20.75,9.5-22.5833c0,0,3.9491-3,4.9746-4.9167c0,0-3.0579,1-5.5579,1
            C53.9167,22.0833,57.25,20.3333,58.0417,16.6667z"
          />
        </g>
      </svg>
    </a>
  {/if}

  {#if facebook}
    <a
      class="facebook w-10 h-10 inline-block cursor-pointer"
      target="_blank"
      href={facebook}
    >
      <svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
        <g id="line">
          <path
            fill="none"
            stroke="#fff"
            stroke-miterlimit="10"
            stroke-width="2"
            d="M45.6188,62h12.1554
            C59.5558,62,61,60.5558,61,58.7742V15.2258C61,13.4442,59.5558,12,57.7742,12H14.2258C12.4442,12,11,13.4442,11,15.2258v43.5484
            C11,60.5558,12.4442,62,14.2258,62h23.4761"
          />
          <path
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
            d="M45.6183,62V42.208h7.1251l0.7917-7.9168h-7.9168v-4.7501c0-3.1667,2.375-3.1667,3.1667-3.1667s4.7501,0,4.7501,0v-7.1251
            c-3.1997-0.3243-15.8336-3.1667-15.8336,10.2918v4.7501h-6.3334v7.9168h6.3334V62"
          />
        </g>
      </svg>
    </a>
  {/if}
</div>
{#if day && show.meta.time}
  <h3 class="text-xl font-thin text-white">
    <strong>{day}</strong>
    at
    <strong>{show.meta.time}</strong><span class="text-sm">GMT</span>
  </h3>
{/if}

<style>
  .rss {
    transform: rotate(45deg) translateX(5px);
  }
</style>
