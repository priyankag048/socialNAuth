import React from 'react';
import classNames from 'classnames';
import styles from './main.module.scss';
interface Props {
    type?: string;
    children : React.ReactNode
}
export default ({type, children}: Props) => (
    <div className={type === 'column' ? classNames(styles.main, styles.direction) : styles.main}>
        {children}
    </div>
)