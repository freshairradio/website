<script>
  import { navigating } from "./_pagefade";
  import { prefetch, goto } from "@sapper/app";
  export let post;
  $: rating = updateRating(post.tags);

  const updateRating = (tags) => {
    const rating = tags.find(
      (t) => t.slug.endsWith("star") || t.slug.endsWith("stars")
    );
    const stars = rating ? rating.slug.split("-")[1] : null;
    const empty = stars ? 5 - parseInt(stars) : null;

    return stars
      ? [
          [...Array(parseInt(stars))].map((n) => "*").join(""),
          [...Array(empty)].map((n) => "*").join("")
        ]
      : null;
  };
  $: isReview = post.tags.find((t) => t.slug == "reviews");
  $: isInterview = post.tags.find((t) => t.slug == "interviews");
  $: isOpinion = post && post.tags.find((t) => t.slug == "opinion");
</script>

<a
  rel="prefetch"
  on:click|preventDefault={async () => {
    navigating.start();
    await prefetch(`/posts/${post.slug}`);
    await goto(`/posts/${post.slug}`);
    navigating.end();
  }}
  href="/posts/{post.slug}"
  class="post relative block bg-gray-700 rounded-lg overflow-hidden">
  {#if post.feature_image}
    <img
      class="object-cover absolute top-0 w-full h-full"
      src={`https://imgproxy.freshair.radio/signature/fill/800/800/sm/1/plain/${post.feature_image}@jpg`}
      alt={post.title}
    />
  {/if}
  <div
    class="text-right  absolute {!post.feature_image
      ? 'gradient'
      : ' bg-opacity-75 bg-gray-800'}  bottom-0 right-0 w-full  z-10 text-white text-xl p-4 font-thin rounded-b-lg"
  >
    {#if rating}
      <div class="stars">
        {#each rating[0] as _}
          <svg
            id="emoji"
            viewBox="0 0 72 72"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 inline-block">
            <g id="color">
              <polygon
                fill="#fff"
                stroke="none"
                points="35.9928,10.7363 27.7913,27.3699 9.4394,30.0436
              22.7245,42.9838 19.5962,61.2637 36.0084,52.6276 52.427,61.2515
              49.2851,42.9739 62.5606,30.0239 44.2067,27.3638"
              />
            </g>
            <g id="hair" />
            <g id="skin" />
            <g id="skin-shadow" />
            <g id="line">
              <polygon
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="2"
                points="35.9928,10.7363 27.7913,27.3699 9.4394,30.0436
              22.7245,42.9838 19.5962,61.2637 36.0084,52.6276 52.427,61.2515
              49.2851,42.9739 62.5606,30.0239 44.2067,27.3638"
              />
            </g>
          </svg>
        {/each}
        {#each rating[1] as _}
          <svg
            id="emoji"
            viewBox="0 0 72 72"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 inline-block">
            <g id="color">
              <polygon
                fill="transparent"
                stroke="none"
                points="35.9928,10.7363 27.7913,27.3699 9.4394,30.0436
              22.7245,42.9838 19.5962,61.2637 36.0084,52.6276 52.427,61.2515
              49.2851,42.9739 62.5606,30.0239 44.2067,27.3638"
              />
            </g>
            <g id="hair" />
            <g id="skin" />
            <g id="skin-shadow" />
            <g id="line">
              <polygon
                fill="none"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="2"
                points="35.9928,10.7363 27.7913,27.3699 9.4394,30.0436
              22.7245,42.9838 19.5962,61.2637 36.0084,52.6276 52.427,61.2515
              49.2851,42.9739 62.5606,30.0239 44.2067,27.3638"
              />
            </g>
          </svg>
        {/each}
      </div>
    {/if}
    <h3 class="text-xl">
      <strong
        >{isOpinion ? "Opinion: " : ""}{post.authors[0].name}{isReview || rating
          ? " reviews"
          : ""}{isInterview ? " interviews" : ""}</strong
      >
    </h3>
    <h2 class="text-2xl">{post.title}</h2>
  </div>

  <slot />
</a>

<style>
  .post:before {
    content: "";
    display: block;
    height: 0;
    width: 0;
    padding-bottom: 100%;
  }
  .gradient {
    background: linear-gradient(rgba(35, 7, 77, 0.8), rgba(204, 83, 51, 0.8));
  }
</style>
