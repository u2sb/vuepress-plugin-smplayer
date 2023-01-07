declare module "aplayer/dist/APlayer.min.css";
declare module "aplayer/dist/APlayer.min.js";

declare module "dplayer/dist/DPlayer.min.js";

declare module "artplayer/dist/artplayer.js" {
  import Artplayer from "artplayer";
  export default Artplayer;
}

declare module "hls.js/dist/hls.min.js" {
  import Hls from "hls.js";
  export default Hls;
}

declare module "mpegts.js/dist/mpegts.js" {
  import Mpegts from "mpegts.js";
  export default Mpegts;
}

declare module "dashjs/dist/dash.all.min.js" {
  import dashjs from "dashjs";
  export default dashjs;
}
