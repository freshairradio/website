<script context="module">
  const getRating = (tags) => {
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

  export async function preload({ path, params, query }) {
    const article = await this.fetch(
      `https://content.freshair.org.uk/ghost/api/canary/content/posts/slug/${params.slug}?key=335cdc08c8018af3c8cbb85c64&include=authors,tags`
    )
      .then((r) => r.json())
      .then(({ posts }) => {
        return { post: posts[0], rating: getRating(posts[0].tags || []) };
      });
    const team = article.post.tags.find(
      (t) =>
        t.slug == "hash-music-team" ||
        t.slug == "hash-arts-team" ||
        t.slug == "hash-news-team" ||
        t.slug == "hash-sports-team"
    );
    if (team) {
      let related = await this.fetch(
        `https://content.freshair.org.uk/ghost/api/canary/content/posts/?key=335cdc08c8018af3c8cbb85c64&filter=tag:${team.slug}%2btag:hash-article&limit=3&fields=id,title,slug,feature_image&include=authors,tags`
      )
        .then((response) => response.json())
        .then(({ posts }) => {
          return posts;
        });
      return { ...article, related };
    } else return { ...article, related: [] };
  }
</script>

<script>
  import { navigating } from "../_pagefade";
  import ShowMetadata from "../_showmetadata.svelte";
  import ShowCover from "../_showcover.svelte";
  import Episode from "../_episode.svelte";
  import PostPreview from "../_postpreview.svelte";
  export let post;
  export let rating;
  export let related;
  import { stores } from "@sapper/app";
  const { preloading, page, session } = stores();
</script>

<style>
  .prose :global(*) {
    color: white !important;
  }
</style>

<section
  class="transition-opacity duration-300 {$navigating ? 'opacity-0' : 'opacity-1'}">
  <div class="relative rounded-3xl overflow-hidden mx-4">
    <img
      class="object-cover w-full h-72 lg:h-96 rounded-3xl bg-gray-800"
      src={`https://imgproxy.freshair.radio/signature/fill/2000/2000/sm/1/plain/${post.feature_image || 'https://cdn.freshair.radio/logos/FreshairFullWhiteLogo.png'}@png`}
      alt="Logo" />
    <div
      class="text-right w-full absolute {!post.feature_image ? 'gradient' : ' bg-opacity-75 bg-gray-800'}  bottom-0 right-0   z-10 text-white text-xl  font-thin  rounded-b-3xl">
      <div class="mx-auto max-w-3xl">
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
            49.2851,42.9739 62.5606,30.0239 44.2067,27.3638" />
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
            49.2851,42.9739 62.5606,30.0239 44.2067,27.3638" />
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
            49.2851,42.9739 62.5606,30.0239 44.2067,27.3638" />
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
            49.2851,42.9739 62.5606,30.0239 44.2067,27.3638" />
                </g>
              </svg>
            {/each}
          </div>
        {/if}
        <h3 class="text-lg lg:text-xl">
          <strong>{post.authors ? post.authors[0].name : '...'}</strong>
        </h3>
        <h2 class="text-2xl lg:text-3xl">{post.title || '...'}</h2>
      </div>
    </div>
  </div>

  <div
    class="prose prose-md lg:prose-xl mx-auto mt-4 lg:mt-8 mb-8 px-4 overflow-hidden">
    {@html post.html}
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 pb-4">
    {#each related as post}
      <PostPreview {post} />
    {/each}
  </div>
</section>
