import React, { useState } from 'react';
import styles from './Navbar.module.scss'; // Correct import

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles['navbar-container']}>
                <div className={styles['navbar-brand']}>
                    <a href="/">Exclusive</a>
                </div>
                <div className={styles.hamburger} onClick={toggleMenu}>
                    <span className={`${styles['hamburger-line']} ${menuOpen ? styles.active : ''}`}></span>
                    <span className={`${styles['hamburger-line']} ${menuOpen ? styles.active : ''}`}></span>
                    <span className={`${styles['hamburger-line']} ${menuOpen ? styles.active : ''}`}></span>
                </div>
                
                <ul className={`${styles['navbar-menu']} ${menuOpen ? styles.active : ''}`}>
                    <li className={styles['navbar-item']}>
                        <a href="/" className={styles['navbar-link']}>Home</a>
                    </li>
                    <li className={styles['navbar-item']}>
                        <a href="/add-product" className={styles['navbar-link']}>Post Product</a>
                    </li>
                    <li className={styles['navbar-item']}>
                        <a href="/" className={styles['navbar-link']}>About</a>
                    </li>
                    <li className={styles['navbar-item']}>
                        <a href="/" className={styles['navbar-link']}>Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
