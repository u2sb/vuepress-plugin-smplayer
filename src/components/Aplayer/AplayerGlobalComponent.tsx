import AplayerComponent from "./AplayerComponent";
import { Component } from "../BasePlayer/SbBasePlayerComponent";
@Component
export default class AplayerGlobalComponent extends AplayerComponent {
  data() {
    this.src.fixed = true;
  }
}
