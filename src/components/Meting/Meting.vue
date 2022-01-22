<template>
  <div>
    <APlayer :src="src" v-if="showAplayer" />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
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
    audio: {
      required: false,
      type: Array,
    },
    list: {
      required: false,
      type: Array,
    },
  },

  data() {
    return {
      showAplayer: false,
      src: {},
    };
  },

  mounted() {
    this.InitMeting(this.$props);
  },

  methods: {
    async InitMeting(meting) {
      let urlList = [];
      let audio = meting.audio || [];
      let list = meting.list || [];

      //判断id或auto是否存在，如果存在就将其添加到list中
      if (meting.id || meting.auto) {
        list = [
          {
            id: meting.id,
            server: meting.server,
            type: meting.type,
            auth: meting.auth,
            auto: meting.auto,
          },
          ...list,
        ];
      }

      if (list && list.length > 0) {
        list.map((e) => {
          //判断id或auto是否存在，如果存在就将其添加到urlList中
          if (e.id || e.auto) {
            let a = this.ParseMeting(
              {
                id: e.id,
                server: e.server,
                type: e.type,
                auth: e.auth,
                auto: e.auto,
              },
              meting.api
            );
            if (a) {
              urlList.push(a);
            }
          }
        });
      }

      Promise.allSettled(
        urlList.map((url) => fetch(url).then((res) => res.json()))
      )
        .then((res) =>
          res.filter((r) => r.status === "fulfilled").map((r) => r.value)
        )
        .then((a) => {
          a.map((e) => {
            audio = [
              ...audio,
              ...e.map((obj) => ({
                name: obj?.name || obj?.title || "Audio name",
                artist: obj?.artist || obj?.author || "Audio artist",
                url: obj?.url,
                cover: obj?.cover || obj?.pic,
                lrc: obj?.lrc || obj?.lyric || "",
                type: obj?.type || "auto",
              })),
            ];
          });
          let src = {
            audio: audio,
            fixed: meting.fixed,
            mini: meting.mini,
            autoplay: meting.autoplay,
            loop: meting.loop,
            order: meting.order,
            preload: meting.preload,
            volume: meting.volume,
            mutex: meting.mutex,
            lrcType: meting.lrcType,
            listFolded: meting.listFolded,
            listMaxHeight: meting.listMaxHeight,
            storageName: meting.storageName,
          };
          this.src = src;
          this.showAplayer = true;
        });
    },

    //解析API
    ParseMeting(m, api) {
      if (m && m.auto) {
        m = this.ParseLink(m.auto);
      }
      if (m && m.server && m.type && m.id) {
        let url = api
          .replace(":server", m.server)
          .replace(":type", m.type)
          .replace(":id", m.id)
          .replace(":auth", m.auth)
          .replace(":r", Math.random().toString());

        return url;
      }
      return "";
    },
    //解析链接，auto方式
    ParseLink(auto) {
      let rules = [
        ["music.163.com.*song.*id=(\\d+)", "netease", "song"],
        ["music.163.com.*album.*id=(\\d+)", "netease", "album"],
        ["music.163.com.*artist.*id=(\\d+)", "netease", "artist"],
        ["music.163.com.*playlist.*id=(\\d+)", "netease", "playlist"],
        ["music.163.com.*discover/toplist.*id=(\\d+)", "netease", "playlist"],
        ["y.qq.com.*song/(\\w+).html", "tencent", "song"],
        ["y.qq.com.*songDetail/(\\w+)", "tencent", "song"],
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
        let reg = new RegExp(rule[0]);
        let result = reg.exec(auto);
        if (result) {
          return {
            server: rule[1],
            type: rule[2],
            id: result[1],
          };
        }
      }
      console.error(`无法解析的链接: ${auto}，请检查链接是否书写正确`);
      return {};
    },
  },
});
</script>
