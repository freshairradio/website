<script>
  export let href;
  export let tailwind;
  import { prefetch, goto } from "@sapper/app";
  import { navigating } from "./_pagefade";
</script>

<li>
  <a
    rel="prefetch"
    on:click|preventDefault={async () => {
      navigating.start();
      await prefetch(href);
      await goto(href);
      navigating.end();
    }}
    {href}
    class="text-2xl pl-8 py-1 block text-white lowercase font-thin {tailwind}"><slot /></a>
</li>
