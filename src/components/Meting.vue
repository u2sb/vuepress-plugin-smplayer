// 参考 https://github.com/metowolf/MetingJS/blob/fd5394054c3b28c82a95b799e6c468da0f6f704f/source/Meting.js

<template>
  <APlayer v-if="ready" :src="src" />
</template>

<script>
export default {
  props: {
    id: {
      required: false,
      type: String,
      default: "",
    },
    server: {
      required: false,
      type: String,
      default: METING.server,
    },
    type: {
      required: false,
      type: String,
      default: METING.type,
    },
    auto: {
      required: false,
      type: String,
      default: "",
    },
    fixed: {
      required: false,
      type: Boolean,
      default: METING.fixed,
    },
    mini: {
      required: false,
      type: Boolean,
      default: METING.mini,
    },
    autoplay: {
      required: false,
      type: Boolean,
      default: METING.autoplay,
    },
    theme: {
      required: false,
      type: String,
      default: METING.theme,
    },
    loop: {
      required: false,
      type: String,
      default: METING.loop,
    },
    order: {
      required: false,
      type: String,
      default: METING.order,
    },
    preload: {
      required: false,
      type: String,
      default: METING.preload,
    },
    volume: {
      required: false,
      type: Number,
      default: METING.volume,
    },
    mutex: {
      required: false,
      type: Boolean,
      default: METING.mutex,
    },
    lrcType: {
      required: false,
      type: Number,
      default: METING.lrcType,
    },
    listFolded: {
      required: false,
      type: Boolean,
      default: METING.listFolded,
    },
    listMaxHeight: {
      required: false,
      type: String,
      default: METING.listMaxHeight,
    },
    storageName: {
      required: false,
      type: String,
      default: METING.storageName,
    },
    api: {
      required: false,
      type: String,
      default: METING.api,
    },
  },

  methods: {
    parse() {
      if (this.auto) {
        this.parse_link();
      }

      let url = this.api
        .replace(":server", this.server)
        .replace(":type", this.type)
        .replace(":id", this.id)
        .replace(":auth", this.auth)
        .replace(":r", Math.random());

      fetch(url)
        .then((res) => res.json())
        .then((result) => {
          const res = result.map((obj) => ({
            name: obj.name || obj.title || "Audio name",
            artist: obj.artist || obj.author || "Audio artist",
            url: obj.url,
            cover: obj.cover || obj.pic,
            lrc: obj.lrc || obj.lyric || "",
            type: obj.type || "auto",
          }));

          this.src = {
            audio: res,
            fixed: this.fixed,
            mini: this.mini,
            autoplay: this.autoplay,
            loop: this.loop,
            order: this.order,
            preload: this.preload,
            volume: this.volume,
            mutex: this.mutex,
            lrcType: this.lrcType,
            listFolded: this.listFolded,
            listMaxHeight: this.listMaxHeight,
            storageName: this.storageName,
          };
          this.ready = true;
        });
    },

    parse_link() {
      let rules = [
        ["music.163.com.*song.*id=(\\d+)", "netease", "song"],
        ["music.163.com.*album.*id=(\\d+)", "netease", "album"],
        ["music.163.com.*artist.*id=(\\d+)", "netease", "artist"],
        ["music.163.com.*playlist.*id=(\\d+)", "netease", "playlist"],
        ["music.163.com.*discover/toplist.*id=(\\d+)", "netease", "playlist"],
        ["y.qq.com.*song/(\\w+).html", "tencent", "song"],
        ["y.qq.com.*album/(\\w+).html", "tencent", "album"],
        ["y.qq.com.*singer/(\\w+).html", "tencent", "artist"],
        ["y.qq.com.*playsquare/(\\w+).html", "tencent", "playlist"],
        ["y.qq.com.*playlist/(\\w+).html", "tencent", "playlist"],
        ["xiami.com.*song/(\\w+)", "xiami", "song"],
        ["xiami.com.*album/(\\w+)", "xiami", "album"],
        ["xiami.com.*artist/(\\w+)", "xiami", "artist"],
        ["xiami.com.*collect/(\\w+)", "xiami", "playlist"],
      ];

      for (let rule of rules) {
        let patt = new RegExp(rule[0]);
        let res = patt.exec(this.auto);
        if (res !== null) {
          this.server = rule[1];
          this.type = rule[2];
          this.id = res[1];
          return;
        }
      }
      console.error(`无法解析的链接: ${this.auto}，请检查链接是否书写正确`);
    },
  },
  mounted() {
    this.parse();
  },
  data() {
    return {
      ready: false,
    };
  },
};
</script>