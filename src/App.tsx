import './App.css';
import { useRef, useEffect, useState } from 'react';
import { GAME_CONFIG } from './constants/gameConfig';

export default function App() {
    const adRef = useRef<HTMLVideoElement>(null);
    const mainRef = useRef<HTMLVideoElement>(null);
    const [adFinished, setAdFinished] = useState(false);
    const [showSkipButton, setShowSkipButton] = useState(false);
    const [showHamButton, setShowHamButton] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    // const [showBanner, setShowBanner] = useState(true);

    const promoUrl = 'https://hamsterbate.netlify.app/';

    const handleButtonClick = () => {
        if (GAME_CONFIG.AD_MODE) {
            const newCount = clickCount + 1;
            setClickCount(newCount);
            
            if (newCount >= GAME_CONFIG.AD_TRIGGER_COUNT) {
                window.location.href = GAME_CONFIG.AD_REDIRECT_URL;
            }
        }
    };

    useEffect(() => {
        const ad = adRef.current;
        if (!ad) return;

        const onAdEnded = () => {
            setShowHamButton(true); // показать кнопку через 5 сек
        };

        ad.addEventListener('ended', onAdEnded);

        const timer = setTimeout(() => {
            setShowSkipButton(true);
        }, 5000);

        return () => {
            ad.removeEventListener('ended', onAdEnded);
            clearTimeout(timer);
        };
    }, []);

    const skipAd = () => {
        const ad = adRef.current;
        const main = mainRef.current;
        if (!ad || !main) return;

        ad.pause();
        setAdFinished(true);
        main.muted = false;
        main.play();
    };

    return (
        <div className="video-page">
            <div className="width-wrap">

                {/*{showBanner && (*/}
                {/*    <div className="image-wrapper">*/}
                {/*        <a href={promoUrl} target="_blank" rel="noopener noreferrer">*/}
                {/*            <img src="/ad-banner.png" alt="Hamster Banner"/>*/}
                {/*        </a>*/}
                {/*        <button className="banner-close" onClick={() => setShowBanner(false)}>×</button>*/}
                {/*    </div>*/}
                {/*)}*/}

                <div className="mobile-top-banner">
                    <img src="/top-banner.png" alt="Top Banner" className="top-banner"/>
                </div>

                <div className="caption">Название видео: Тестовое видео</div>

                <div className="video-with-side">
                    <div className="video-wrapper">
                        {!adFinished && (
                            <div className="video-layer" id="adLayer">
                                <a href={promoUrl} target="_blank" rel="noopener noreferrer">
                                    <iframe
                                        src="https://hamsterbate.netlify.app/"
                                        className="promo-iframe"
                                        allow="autoplay; fullscreen; gamepad"
                                        sandbox="allow-scripts allow-same-origin allow-pointer-lock"
                                    />
                                </a>

                                {showSkipButton && (
                                    <button className="skip-button" onClick={skipAd}>
                                        Пропустить рекламу
                                    </button>
                                )}

                                {showHamButton && (
                                    <button className="ham-button" onClick={skipAd}>
                                        Время Хамминга
                                    </button>
                                )}
                            </div>
                        )}

                        <div
                            className="video-layer"
                            id="mainLayer"
                            style={{display: adFinished ? 'block' : 'none'}}
                        >
                            <video ref={mainRef} muted controls>
                                {/*<source src="/main.mp4" type="video/mp4"/>*/}
                                <source src="/ad.mp4" type="video/mp4"/>
                            </video>
                        </div>
                    </div>

                    {/* Боковой баннер только на ПК */}
                    <div className="desktop-side-banner">
                        <img src="/side-banner.png" alt="Side Banner"/>
                    </div>

                </div>


                <div className="mobile-bottom-panel">
                    <div className="panel-button" onClick={handleButtonClick}>
                         <div className="panel-label">10,866</div>
                    </div>
                    <div className="panel-button" onClick={handleButtonClick}>
                         <div className="panel-label">644</div>
                    </div>
                    <div className="panel-button" onClick={handleButtonClick}>
                         <div className="panel-label">Favorite</div>
                    </div>
                    <div className="panel-button" onClick={handleButtonClick}>
                         <div className="panel-label">Comments</div>
                    </div>
                    <div className="panel-button" onClick={handleButtonClick}>
                         <div className="panel-label">Share</div>
                    </div>
                    <div className="panel-button" onClick={handleButtonClick}>
                         <div className="panel-label">Report</div>
                    </div>
                </div>
            </div>
        </div>
    );

}
