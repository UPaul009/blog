import React from 'react';
import Link from 'next/link';
import { FormattedDate } from 'react-intl';
import webp from '../../utils/webp';
import unsplashParams from '../../utils';
import { Post, ImageWrap, Meta, Title, PostDate } from './components';
import { ImageTypes } from '../Header';

export type PostTypes = {
  image: ImageTypes;
  id: string;
  date: number;
  title: string;
};

const PostCard = ({ id, image, date, title }: PostTypes) => {
  const { type, url: webpImage } = webp(image.imageUrl);

  return (
    <Link prefetch href={id} passHref>
      <Post>
        <ImageWrap>
          <picture>
            <source
              srcSet={`/static/images/posts/${webpImage}`}
              type="image/webp"
            />
            <source
              srcSet={`/static/images/posts/${image.imageUrl}`}
              type={type}
            />
            <img
              src={`/static/images/posts/${image.imageUrl}`}
              alt={image.name != null ? `Taken by ${image.name}` : ''}
              data-source-url={unsplashParams(image.url)}
            />
          </picture>
        </ImageWrap>
        <Meta>
          <Title>{title}</Title>
          <PostDate>
            <FormattedDate
              value={date}
              month="long"
              day="numeric"
              year="numeric"
            />
          </PostDate>
        </Meta>
      </Post>
    </Link>
  );
};

export default PostCard;
