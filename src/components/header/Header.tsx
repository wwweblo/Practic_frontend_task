import React from 'react';
import styles from './Header.module.css';
const accountIcon = 'src/assets/ic_account.svg'

function Header() {
    return (
        <>
            <header className={styles.header}>
                <p className={styles.MainLabel}>Каталог</p>
                <div className={styles['right-nav']}>
                    <p className={styles.leftSidedText}>Сравнение</p>
                    <p className={styles.leftSidedText}>Личный кабинет</p>
                    <img className={styles.leftSidedImage} src={accountIcon} alt="Профиль" />
                </div>
            </header>
            <hr />
        </>
    );
}

export default Header;
