declare global {
  export interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}
