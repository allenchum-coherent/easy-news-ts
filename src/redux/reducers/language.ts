import { SWITCH_LANGUAGE } from '../actionTypes';
import { LanguageStateType } from '../states/language.state';

const initialState: LanguageStateType = {
    currentLanguage: 'en_us',
    direction: 'ltr'
}

interface ILanguageActions extends LanguageStateType {
    type: string;
}

const languageReducer = (state = initialState, action: ILanguageActions) => {
    switch (action.type) {
        case SWITCH_LANGUAGE:
            return {
                ...state,
                currentLanguage: action.currentLanguage,
                direction: action?.direction ?? 'ltr'
            }
        default:
            return state;
    }
}

export default languageReducer;