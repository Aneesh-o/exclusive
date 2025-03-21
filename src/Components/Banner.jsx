import React from 'react';
import styles from './Banner.module.scss'; // ✅ Correct SCSS Module Import
import { Container } from 'react-bootstrap';

const Banner = () => {
    return (
        <Container style={{paddingTop:"340px"}} className={styles.banner - Container}>
            <div className={styles['hero-banner']}>
                <div className={styles['hero-content']}>
                    <div className={styles['hero-brand']}>
                        <div className={styles['apple-logo']}>
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path fill="white" d="M17.05,11.97 C17.02,9.25 19.23,7.9 19.34,7.83 C18.11,5.98 16.15,5.7 15.47,5.67 C13.76,5.49 12.05,6.76 11.19,6.76 C10.32,6.76 8.91,5.68 7.47,5.71 C5.61,5.74 3.92,6.75 2.99,8.36 C1.06,11.67 2.5,16.46 4.36,19.13 C5.31,20.44 6.44,21.88 7.9,21.84 C9.33,21.79 9.89,20.93 11.63,20.93 C13.37,20.93 13.89,21.84 15.37,21.81 C16.89,21.79 17.87,20.5 18.79,19.18 C19.88,17.65 20.34,16.15 20.36,16.07 C20.32,16.05 17.12,14.8 17.05,11.97 Z" />
                                <path fill="white" d="M14.98,4.04 C15.73,3.12 16.25,1.86 16.11,0.59 C15.04,0.63 13.72,1.33 12.95,2.24 C12.25,3.06 11.63,4.35 11.8,5.6 C13.0,5.67 14.2,4.95 14.98,4.04 Z" />
                            </svg>
                        </div>
                        <span className={styles['brand-text']}>iPhone 14 Series</span>
                    </div>

                    <h1 className={styles['hero-title']}>
                        Up to 10%<br />
                        off Voucher
                    </h1>

                    <a href="/" className={styles['shop-now-btn']}>
                        Shop Now
                        <svg className={styles['arrow-icon']} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>

                <div className={styles['hero-image']}>
                    <img src="https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1742480535~exp=1742484135~hmac=a5578b9493a049d220f13d5ce11973da7c9df4cc4691789b7a078b879a808a7e&w=740" alt="iPhone 14 Purple" />
                </div>

            </div>
        </Container>
    );
}

export default Banner;
