import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en/translation.json';
import ko from './ko/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ko: {
      translation: ko,
    },
  },
  lng: 'ko-KR',
  fallbackLng: {
    'ko-KR': ['ko-KR'],
    default: ['en-US'],
  },
  debug: true,
  defaultNS: 'translation',
  ns: 'translation',
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
