<template>
  <div class="mmedia">
    <iframe
      ref="mmplayer"
      class="bbplayer"
      :src="src"
      :allowfullscreen="allowfullscreen"
      scrolling="no"
      frameborder="0"
      :sandbox="sandbox"
    ></iframe>
  </div>
</template>

<script src="./BilibiliVue.js"></script>
<style src="./BilibiliStyle.css"></style>
