import React, { FC } from 'react';
import moment from 'moment';
import { Card, Avatar, Typography } from 'antd';
import LazyLoad from 'react-lazyload';

import './../styles/card.scss';

const { Meta } = Card;
const { Title, Paragraph } = Typography;

export interface NewsData {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
        id: string;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
}

interface NewsCardProps {
    data: NewsData;
}

const NewsCard: FC<NewsCardProps> = (props) => {
    const { source, title, description, url, urlToImage, publishedAt } = props.data;
    const sourceName = source.name;

    const redirectTo = (url: string) => {
        window.location.href = url;
        return;
    }

    return (
        <Card
            className='NewsCard-item'
            onClick={() => redirectTo(url)}
            style={{width: 300}}
            cover={
                <LazyLoad height={190} once>
                    <img
                        className='NewsCard-image'
                        alt={urlToImage || 'no_image'}
                        src={urlToImage || '/images/no_image.jpg'}
                    />
                </LazyLoad>
            }
        >
            <Meta
                avatar={<Avatar>{sourceName.slice(0, 1)}</Avatar>}
                title={sourceName ?? ''}
                description={publishedAt ? moment(publishedAt).format('YYYY-MM-DD h:mm') : null}
            />
            <Title level={4} ellipsis={{rows:1, expandable:false}}>{title}</Title>
            <Paragraph ellipsis={{rows:6, expandable:false}}>{description}</Paragraph>
        </Card>
    )
}

export default NewsCard
