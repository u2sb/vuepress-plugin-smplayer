export default abstract class SbBasePlayer<T, U> {
  src: U | undefined;
  player: T | undefined;
  constructor(src?: U) {
    if (src) {
      this.src = src;
      this.InitPlayer(src);
    }
  }
  abstract InitPlayer(src: U): void;
  abstract DestroyPlayer(): void;

  // @ts-nocheck
  AddCustomFun(src: U): void {
    // @ts-ignore
    if (src.on) {
      // @ts-ignore
      for (let key in src.on) {
        // @ts-ignore
        this.player?.on(key, src.on[key]);
      }
    }

    // @ts-ignore
    if (src.customFun && this.player) {
      // @ts-ignore
      for (let key in src.customFun) {
        // @ts-ignore
        src.customFun[key](this.player, src);
      }
    }
  }
  // @ts-check
}
