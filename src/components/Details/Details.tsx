import React from 'react';
import styles from './details.module.scss';
interface Props {
    children: React.ReactNode;
}

export default ({children}: Props) => (
    <article className={styles.details}>
        {children}
    </article>
);