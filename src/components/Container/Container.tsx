import React from 'react';
import Head from '../Head/Head';
import styles from './container.module.scss';
export default ({children}: {children : React.ReactNode}) => (
    <>
        <Head/>
        <div className={styles.container}>
            {children}
        </div>
    </>
)