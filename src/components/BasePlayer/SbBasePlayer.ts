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
}
