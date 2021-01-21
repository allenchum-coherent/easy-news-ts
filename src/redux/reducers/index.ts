import { combineReducers } from "redux";
import * as news from "./news";
import * as language from './language';

const rootReducer = combineReducers({
    news: news.default,
    language: language.default
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;