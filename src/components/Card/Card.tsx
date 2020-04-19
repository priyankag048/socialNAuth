import React from 'react';
import styles from './card.module.scss';
interface Props {
    name: string;
    url?: string;
    children: React.ReactNode;
}
export default ({name, url, children}: Props) => (
    <div className={styles.card}>
        <a href={url} target="_blank" rel="noreferrer">
            <p>{name}</p>
            <section>
                {children}
            </section>
        </a>
    </div>
);

