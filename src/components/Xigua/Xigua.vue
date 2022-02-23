<template>
  <div class="mmedia">
    <iframe
      ref="mmplayer"
      class="xgplayer"
      :src="src"
      :allowfullscreen="allowfullscreen"
      scrolling="no"
      frameborder="0"
      :sandbox="sandbox"
    ></iframe>
  </div>
</template>

<script src="./XiguaVue.js"></script>

<style src="./XiguaStyle.css"></style>
