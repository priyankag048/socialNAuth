import React from 'react';
import Link from 'next/link';
import styles from './button.module.scss';

interface Props{
    url: string;
    logo: string;
    logoAlt: string;
    text: string;
}

export default ({url, logo, logoAlt, text}: Props) => (
    <button className={styles.btn}>
        <Link href={url}>
            <a>
                <img src={logo} alt={logoAlt}/>
                <span>{text}</span>
            </a>
        </Link>
    </button>
)