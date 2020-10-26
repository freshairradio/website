<script context="module">
  const teams = {
    music: {
      name: "Music",
      picture:
        "https://cdn.freshair.radio/images/large/009fc28ec0593bf133390072c6d49e39"
    },
    arts: {
      name: "Arts",
      picture:
        "https://cdn.freshair.radio/images/large/2c64352f6500c8ac204fa6d362ff7970"
    },
    sports: {
      name: "Sports",
      picture:
        "https://cdn.freshair.radio/images/large/2c64352f6500c8ac204fa6d362ff7970"
    },
    news: {
      name: "News",
      picture:
        "https://cdn.freshair.radio/images/large/2c64352f6500c8ac204fa6d362ff7970"
    }
  };
  export function preload({ path, params, query }) {
    return this.fetch(
      `https://content.freshair.org.uk/ghost/api/canary/content/posts/?key=335cdc08c8018af3c8cbb85c64&filter=tag:hash-${params.team}-team%2btag:hash-article&limit=30&fields=id,title,slug,feature_image&include=authors,tags`
    )
      .then((r) => r.json())
      .then(({ posts }) => {
        return { posts, team: teams[params.team] };
      });
  }
</script>

<script>
  import PostPreview from "../_postpreview.svelte";
  import { navigating } from "../_pagefade";
  export let posts;
  export let team;
  import { stores } from "@sapper/app";
  const { preloading, page, session } = stores();
</script>

<section
  class="transition-opacity duration-300 {$navigating ? 'opacity-0' : 'opacity-1'}">
  <div class="mx-4">
    <img
      class="object-cover w-full h-72 lg:h-96 rounded-3xl bg-white bg-opacity-50 "
      src={`https://imgproxy.freshair.radio/signature/fill/2000/2000/sm/1/plain/${team.picture}@jpg`} />
  </div>
  <h1 class="text-4xl text-white py-6 px-4 font-thin lowercase">
    the
    <strong>{team.name}</strong>
    team
  </h1>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 pb-4">
    {#each posts as post}
      <PostPreview {post} />
    {/each}
  </div>
</section>
