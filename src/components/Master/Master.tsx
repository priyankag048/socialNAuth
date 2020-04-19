import React from 'react';
import styles from './master.module.scss';
interface Props {
    children: React.ReactNode;
}

export default ({children}: Props) => (
    <aside className={styles.master}>
        {children}
    </aside>
);