import React from 'react';
import Link from 'next/link';
import styles from './header.module.scss';
interface Props {
    logo?: string;
    logoAlt?: string; 
    title: string;
}
export default ({logo, logoAlt, title}: Props) => (
    <div className={styles.header}>
        <h1 className={styles.title}>
            { logo && <img src={logo} alt={logoAlt} />}
            {title}
        </h1>
        <div className={styles.homeIcon}>
            <Link href='/'>
                <a><img src="/home.png" alt='home'/></a>
            </Link>
        </div>
    </div>
);