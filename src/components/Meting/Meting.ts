import Aplayer from "../Aplayer/Aplayer";
import { AplayerOptions } from "../../type/Aplayer";

export default class Meting extends Aplayer {
  constructor(meting: Record<string, any> = {}, container: HTMLElement) {
    super();
    this.InitMeting(meting, container);
  }

  async InitMeting(meting: Record<string, any> = {}, container: HTMLElement) {
    let urlList: Array<string> = [];
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
      ].concat(
        list.map((obj: Record<string, any>) => ({
          id: obj.id,
          server: obj.server,
          type: obj.type,
          auth: obj.auth,
          auto: obj.auto,
        }))
      );
    }

    if (list && list.length > 0) {
      list.map((e: Record<string, any>) => {
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

    //循环获取urlList中的音频
    let pList = urlList.map(async (url) => (await fetch(url)).json());

    //等待所有音频获取完毕,初始化播放器
    return await Promise.all(pList).then(async (a) => {
      a.map((e) => {
        audio = audio.concat(
          e.map((obj: Record<string, any> | undefined) => ({
            name: obj?.name || obj?.title || "Audio name",
            artist: obj?.artist || obj?.author || "Audio artist",
            url: obj?.url,
            cover: obj?.cover || obj?.pic,
            lrc: obj?.lrc || obj?.lyric || "",
            type: obj?.type || "auto",
          }))
        );
      });
      let src: AplayerOptions = {
        container: container,
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
      return this.InitPlayer();
    });
  }

  ParseMeting(m: Record<string, any>, api: string): string | undefined {
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
  }

  ParseLink(auto: string): Record<string, any> {
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
  }
}
