import APlayer from "../Aplayer/APlayer.js";
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
    audio: {
      required: false,
      type: Array,
    },
    list: {
      required: false,
      type: Array,
    },
  },

  methods: {
    async InitMeting() {
      let urlList = [];
      let audio = this.audio || [];
      let list = this.list || [];

      //判断id或auto是否存在，如果存在就将其添加到list中
      if (this.id || this.auto) {
        list = [
          {
            id: this.id,
            server: this.server,
            type: this.type,
            auth: this.auth,
            auto: this.auto,
          },
        ].concat(
          list.map((obj) => ({
            id: obj.id,
            server: obj.server,
            type: obj.type,
            auth: obj.auth,
            auto: obj.auto,
          }))
        );
      }

      if (list && list.length > 0) {
        list.map((e) => {
          //判断id或auto是否存在，如果存在就将其添加到urlList中
          if (e.id || e.auto) {
            let a = this.ParseMeting({
              id: e.id,
              server: e.server,
              type: e.type,
              auth: e.auth,
              auto: e.auto,
            });
            if (a) {
              urlList.push(a);
            }
          }
        });
      }

      //循环获取urlList中的音频
      let pList = urlList.map(async (url) => {
        return await (await fetch(url)).json();
      });

      //等待所有音频获取完毕,初始化播放器
      Promise.allSettled(pList).then((a) => {
        a.map((e) => {
          audio = audio.concat(
            e.map((obj) => ({
              name: obj.name || obj.title || "Audio name",
              artist: obj.artist || obj.author || "Audio artist",
              url: obj.url,
              cover: obj.cover || obj.pic,
              lrc: obj.lrc || obj.lyric || "",
              type: obj.type || "auto",
            }))
          );
        });
        this.InitPlayer(audio);
      });
    },

    //初始化播放器
    InitPlayer(audio) {
      let src = {
        audio: audio,
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
      APlayer.InitPlayer(src, this.$refs.mmplayer);
    },

    ParseMeting(m) {
      if (m && m.auto) {
        m = this.ParseLink(m.auto);
      }

      let url = this.api
        .replace(":server", m.server)
        .replace(":type", m.type)
        .replace(":id", m.id)
        .replace(":auth", m.auth)
        .replace(":r", Math.random());

      return url;
    },

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
        let patt = new RegExp(rule[0]);
        let res = patt.exec(auto);
        if (res !== null) {
          return {
            server: rule[1],
            type: rule[2],
            id: res[1],
          };
        }
      }
      console.error(`无法解析的链接: ${this.auto}，请检查链接是否书写正确`);
      return false;
    },
  },
  mounted() {
    this.InitMeting();
  },
};
