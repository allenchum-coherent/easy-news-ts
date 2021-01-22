import { LanguageOptions } from '../../types/language.types';

export type LanguageStateType = {
    currentLanguage: LanguageOptions,
    direction: 'ltr' | 'rtl'
}