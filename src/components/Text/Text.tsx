import React from 'react';
import styles from './text.module.scss';
interface Props {
    title: string;
    value: string | number;
}
export default ({title, value}: Props) => (
    <p className={styles.text}>
        <strong>{title}:</strong> 
        <span>{value}</span>
    </p>
)