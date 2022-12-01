import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const canvasStateAtom = atom({
  key: 'canvasState',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const qualityStateAtom = atom({
  key: 'qualityState',
  default: 128,
  effects_UNSTABLE: [persistAtom],
});

export const canvasShapeAtom = atom({
  key: 'canvasShape',
  default: 'rect',
  effects_UNSTABLE: [persistAtom],
});
