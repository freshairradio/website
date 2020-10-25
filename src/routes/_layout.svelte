<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
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
</style>

<Nav {segment} />

<main>
  <slot />
</main>
