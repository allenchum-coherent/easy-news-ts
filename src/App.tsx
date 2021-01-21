import React, { FC, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { fetchNews } from './redux/actions'
import { AppState } from './redux/reducers';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import Loading from './components/Loading';
import PageIndicator from './components/PageIndicator';
import 'antd/dist/antd.css';
import { antdLocaleMap , translationDictFromLocale} from './constants/language.constants';
import './App.scss';


const App: FC = () => {
  const pageSize = 10;
  const dispatch = useDispatch();
  const { currPage, showLoading, articles, searchInputText, direction, currentLanguage } = useSelector(({ news, language }: AppState) => ({
    currPage: news.currPage,
    showLoading: news.showLoading,
    articles: news.articles,
    searchInputText: news.searchInputText,
    direction: language.direction,
    currentLanguage: language.currentLanguage ?? 'en'
  }));

  const currentAntdLocale = antdLocaleMap[currentLanguage];

  const isIncludeText = (str: string, text?: string) => {
    return !text || str?.toLowerCase().includes(text.toLowerCase());
  }

  useEffect(() => {
    dispatch(fetchNews(pageSize, currPage ?? 1, currentLanguage));
  }, [dispatch, pageSize, currPage, currentLanguage])

  const renderCards = useMemo(() => {
    const filteredArticles = articles?.filter((arc) => {
      return (isIncludeText(arc.title, searchInputText) || isIncludeText(arc.description, searchInputText));
    })
    if (showLoading) {
      return <Loading />
    } else if (filteredArticles && Array.isArray(filteredArticles) && filteredArticles.length > 0) {
      return filteredArticles.map((arc, index) => {
        return <NewsCard data={arc} key={`news-card-${index}`} />
      });
    } else {
      return <div>Sorry, no news found...</div>
    }
  }, [articles, searchInputText, showLoading])

  return (
    <ConfigProvider locale={currentAntdLocale}>
      <IntlProvider locale={currentLanguage} messages={translationDictFromLocale[currentLanguage]} onError={()=>{}}>
        <div className="App" dir={direction}>
          <div className="NewsApp-wrapper">
            <Header />
            <div className="contents-container">
              {renderCards}
            </div>
            <PageIndicator pageSize={pageSize}></PageIndicator>
          </div>
        </div>
      </IntlProvider>
    </ConfigProvider>
  )
}

export default App;