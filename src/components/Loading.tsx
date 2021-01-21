import React, { FC } from 'react';
import '../styles/loading.scss';

const Loading: FC = () => {
    return (
        <div className="loading-icon-wrapper">
            <div className="loading-icon"></div>
            <div className="loading-text">Loading ...</div>
        </div>
    )
}

export default Loading;