declare module "aplayer/dist/APlayer.min.css";
declare module "aplayer";

declare module "dplayer/dist/DPlayer.min.js";

declare module "artplayer/dist/artplayer.js";

declare module "hls.js/dist/hls.js" {
  import Hls from "hls.js";
  export default Hls;
}

declare module "hls.js/dist/hls.min.js" {
  import Hls from "hls.js";
  export default Hls;
}

declare module "mpegts.js/dist/mpegts.js" {
  import mpegts from "mpegts.js";
  export default mpegts;
}

declare module "dashjs/dist/dash.all.min.js" {
  import dashjs from "dashjs";
  export default dashjs;
}

// declare module "shaka-player/dist/shaka-player.compiled.js" {
//   import shaka from "shaka-player";
//   export default shaka;
// }

declare module "webtorrent/webtorrent.min.js" {
  import WebTorrent from "webtorrent";
  export default WebTorrent;
}
