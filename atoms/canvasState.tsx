import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const canvasState = atom({
  key: 'canvasState',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const qualityState = atom({
  key: 'qualityState',
  default: 64,
  effects_UNSTABLE: [persistAtom],
});

export const canvasShape = atom({
  key: 'canvasShape',
  default: 'rect',
  effects_UNSTABLE: [persistAtom],
});
