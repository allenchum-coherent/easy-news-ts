import { FETCH_NEWS, UPDATE_NEWS, SEARCH_NEWS, SHOW_LOADING, CHANGE_PAGE } from '../actionTypes';
import { NewsStateType } from '../states/news.state';

const initialState: NewsStateType = {
    articles: [],
    isFetching: false,
    fetchFailed: false,
    totalResults: 0,
    showLoading: true,
    searchInputText: '',
    currPage: 1,
}

export interface INewsActions extends NewsStateType {
    type: string
}

const newsReducer = (state = initialState, action: INewsActions) => {
    switch (action.type) {
        case FETCH_NEWS: {
            return {
                ...state,
                isFetching: action.isFetching,
                fetchFailed: action.fetchFailed,
            }
        }
        case UPDATE_NEWS: {
            return {
                ...state,
                isFetching: false,
                articles: action.articles,
                totalResults: action.totalResults,
                fetchFailed: false
            }
        }
        case SEARCH_NEWS: {
            return {
                ...state,
                searchInputText: action.searchInputText
            }
        }
        case SHOW_LOADING:
            return {
                ...state,
                showLoading: action.showLoading
            }

        case CHANGE_PAGE:
            return {
                ...state,
                currPage: action.currPage
            }
        default:
            return state
    }
}

export default newsReducer;