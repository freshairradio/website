<script>
  import { navigating } from "./_pagefade.js";
</script>

<style>
  .prose :global(*) {
    color: white !important;
  }
</style>
<svelte:head>
  <title>Get Involved</title>
</svelte:head>
<section
  class="transition-opacity duration-300 {$navigating ? 'opacity-0' : 'opacity-1'}">
  <div class="mx-4">
    <img
      class="object-contain w-full h-32 rounded-3xl bg-white bg-opacity-50 "
      src={`https://imgproxy.freshair.radio/signature/fill/800/200/sm/1/plain/https://cdn.freshair.radio/logos/FreshairFullWhiteLogo.png@png`} />
  </div>

  <div
    class="prose prose-md lg:prose-xl mx-auto mt-4 lg:mt-8 mb-8 px-4 overflow-hidden">
    <h2>Hi! 👋</h2>
    <p>
      We'd love to have you involved! There are loads of ways to get involved
      with FreshAir, from presenting a show to managing music tech. Show
      applications are closed for this semester, but they'll be re-opening in
      January 2021, and in the meantime you can find out more about (and join!)
      our different teams at
      <a href="/about" style="color:white">freshair.radio/about</a>.
    </p>
    <p>
      If you're interested or you want to know more, get in touch via
      <a href="https://fb.me/freshairradio">Facebook,</a>

      <a href="https://www.instagram.com/freshairradio/">Instagram,</a>
      or
      <a href="https://twitter.com/freshairradio">Twitter,</a>
      or send an email to
      <a href="mailto:manager@freshair.radio">manager@freshair.org.uk</a>.
    </p>
  </div>
</section>
