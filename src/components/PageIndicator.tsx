import React, { FC, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePage, fetchNews } from '../redux/actions';
import { AppState } from '../redux/reducers';

import '../styles/page-indicator.scss';

interface IPageIndicator {
    pageSize: number
}

const PageIndicator: FC<IPageIndicator> = ({ pageSize = 10 }) => {
    const { totalResults, currPage, direction } = useSelector(({news, language}:AppState) => ({
        totalResults: news.totalResults ?? 0,
        currPage: news.currPage ?? 1,
        direction: language.direction
    }));
    const dispatch = useDispatch();

    const pagesLength = useMemo(() =>
        Math.min(Math.ceil(totalResults / pageSize), 10)
        , [totalResults, pageSize]);

    const dispatchChangePage = useCallback((target) => {
        dispatch(changePage(target));
        dispatch(fetchNews(pageSize, target))
    }, [dispatch, pageSize]);

    const handleChangePage = useCallback((target: string | number) => {
        if (target === 'next') {
            if (currPage < pagesLength) {
                dispatchChangePage(currPage + 1);
            }
        } else if (target === 'prev') {
            if (currPage !== 1) {
                dispatchChangePage(currPage - 1);
            }
        } else if (typeof target === 'number') {
            dispatchChangePage(target);
        }
    }, [currPage, pagesLength, dispatchChangePage]);

    const start = useMemo(() => (
        currPage === 1 ?
            currPage  //First page
            : ((currPage + 2 > pagesLength) && (pagesLength > 2)) ?
                pagesLength - 2 //Last pages
                : currPage - 1 //Middle pages
    ), [currPage, pagesLength]);

    const pagesArr = useMemo(() => 
        (pagesLength > 3) ? [start, start + 1, start + 2] : Array.from(Array(pagesLength), (x, index) => start + index)
        , [pagesLength, start]);

    const mid = useMemo(()=>pagesArr.map((num) =>
        <div className={num === currPage ? "page-indic active" : "page-indic"} key={num} onClick={() => handleChangePage(num)}>{num}</div>
    ),[pagesArr, currPage, handleChangePage]);

    return (
        <div className="page-indicator-container">
            <div className={`page-indic ${(direction === 'ltr')?'arrow-left':'arrow-right'}`} onClick={() => handleChangePage('prev')}></div>
            {mid}
            <div className={`page-indic ${(direction === 'ltr')?'arrow-right':'arrow-left'}`} onClick={() => handleChangePage('next')}></div>
        </div>
    )
}



export default PageIndicator;
