import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from 'antd'
import { searchNews } from '../redux/actions';
import '../styles/search-bar.scss';
import { useIntl } from 'react-intl';

const SearchBar: FC = () => {
    const dispatch = useDispatch();
    const intl = useIntl();
    const onSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        var text = event.target.value;
        dispatch(searchNews(text));
    }
    return (
        <div className="search-bar-container">
            <Icon type="search" />
            <input className="search-bar-input" placeholder={intl.formatMessage({ id: 'Application.header.search' })} onChange={onSearchTextChange}></input>
        </div>
    )
}

export default SearchBar;
