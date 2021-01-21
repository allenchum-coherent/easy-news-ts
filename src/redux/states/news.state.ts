export type NewsStateType  = {
    articles?: any[],
    isFetching?: boolean,
    fetchFailed?: boolean,
    totalResults?: number,
    showLoading?: boolean,
    searchInputText?: string,
    currPage?: number,
}