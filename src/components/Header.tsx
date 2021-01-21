import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import SearchBar from './SearchBar';
import LocaleSwitcher from './LocaleSwitcher';

import '../styles/header.scss';

const Header: FC = () => {
    const intl = useIntl();
    return (
        <div className="header-wrapper">
            <div className="header-title">
                {intl.formatMessage({ id: 'Application.header.search' })}
            </div>
            <div className="header-end-wrapper">
                <SearchBar></SearchBar>
                <LocaleSwitcher></LocaleSwitcher>
            </div>
        </div>
    )
}

export default Header
