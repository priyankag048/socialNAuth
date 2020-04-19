import React from 'react';
import styles from './image.module.scss';
interface Props {
    url?: string;
    picture: string;
    alt: string;
    text?: string;
}
export default ({url, picture, alt, text}: Props) => (
    <div className={styles.picture}>
        <img src={picture} alt={alt}/>
        {url && <a href={url} target="_blank" rel="noreferrer">
            {text}
        </a>}
    </div>
);