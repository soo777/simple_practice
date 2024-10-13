import { atom } from 'recoil';

interface CommonType {
  language: string;
}

export const commonState = atom<CommonType>({
  key: 'common',
  default: {
    language: 'ko',
  },
});
