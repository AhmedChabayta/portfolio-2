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
export const canvasRotationAtom = atom({
  key: 'canvasRotation',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});
export const barLengthAtom = atom({
  key: 'barLength',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export const trackAtom = atom({
  key: 'trackState',
  default: {} as any,
});
export const trackNameAtom = atom({
  key: 'trackNameState',
  default: '',
});
