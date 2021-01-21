import { FETCH_NEWS, UPDATE_NEWS, SHOW_LOADING, SEARCH_NEWS, CHANGE_PAGE, SWITCH_LANGUAGE } from './actionTypes';
import axios from 'axios';
import rtlDetect from 'rtl-detect';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from './reducers';
import { INewsActions } from './reducers/news';

export const fetchNews = (pageSize: number, currPage: number, language: 'en'|'ar' = 'en') => {
    return (dispatch:ThunkDispatch<AppState, null, INewsActions >) => {
        dispatch(showLoading(true));
        const languageToCountryMap = {
            'en': 'us',
            'ar': 'eg',
        }
        return axios.get('https://newsapi.org/v2/top-headlines', { 'params': { 'country': languageToCountryMap[language], 'apiKey': '758729489d09410b97af1e815878c9ec', 'pageSize': pageSize, 'page': currPage, language: language } }).then((res) => {
            var data = res.data;
            if (data && data.status === 'ok') {
                dispatch(updateNews(data));
                dispatch(showLoading(false))
                dispatch({
                    type: FETCH_NEWS,
                    fetchFailed: false,
                    isFetching: true
                })
            }
        }).catch((err) => {
            console.log('%c' + err, 'color: red');
            dispatch(showLoading(false))
            dispatch({
                type: FETCH_NEWS,
                fetchFailed: true,
                isFetching: false
            })
        })
    }
}

export const switchLanguage = (language: string) => ({
    type: SWITCH_LANGUAGE,
    currentLanguage: language,
    direction: rtlDetect.isRtlLang(language) ? 'rtl' : 'ltr'
});

export const updateNews = (data: any) => ({
    type: UPDATE_NEWS,
    articles: data.articles,
    totalResults: data.totalResults,
});

export const showLoading = (show: boolean) => ({
    type: SHOW_LOADING,
    showLoading: show
});

export const searchNews = (text: string) => ({
    type: SEARCH_NEWS,
    searchInputText: text
});

export const changePage = (index: number) => ({
    type: CHANGE_PAGE,
    currPage: index
});