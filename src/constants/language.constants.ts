import antdEn from 'antd/lib/locale/en_US';
import antdAr from 'antd/lib/locale/ar_EG';
import {
  en, ar
} from '../locale';

const formatLanguagePackage = (
  current: object, prefix = '', dict = {}
) => {
  let result = {...dict};
  Object.entries(current).forEach(([key, value]) => {
    switch (typeof value) {
      case 'string':
        // eslint-disable-next-line no-param-reassign
        result = { ...result,[`${prefix}${key}`]: value};
        break;
      case 'object':
        formatLanguagePackage(value, `${prefix}${key}.`, dict);
        break;
      default:
        break;
    }
  });

  return result;
};

export const translationDictFromLocale = {
  en: formatLanguagePackage(en),
  ar: formatLanguagePackage(ar),
};

// Ant Design isn't supporting Burmese at the moment
// FIXME: Maintain a custom locale file for Burmese
export const antdLocaleMap = {
  en: antdEn,
  ar: antdAr,
};

export const availableLanguages = (
  process.env.REACT_APP_ENABLED_LOCALE ?? 'en:EN'
).split(',').map(language => language.split(':'));
