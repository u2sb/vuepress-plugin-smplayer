export default abstract class SbBasePlayer<T, U> {
  src: U | undefined;
  player: T | undefined;
  constructor(src?: U) {
    if (src) {
      this.src = src;
    }
  }
  
  abstract InitPlayer(): Promise<T | undefined>;

  DestroyPlayer(): void {
    // @ts-ignore
    this.player?.destroy();
  }

  AddOnEvent(on?: Record<string, (player: T, src: U) => void>): void {
    if (on && this.player) {
      Object.keys(on).forEach((key) => {
        // @ts-ignore
        this.player!.on(key, () => on[key](this.player, this.src));
      });
    }
  }

  AddCustomFun(customFun?: Array<(player: T, src: U) => void>): void {
    if (customFun && this.player) {
      customFun.forEach((fun) => {
        fun(this.player!, this.src!);
      });
    }
  }
}
