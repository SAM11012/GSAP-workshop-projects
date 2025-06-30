import React, {useRef} from 'react'
import {useGSAP} from "@gsap/react";
import {SplitText} from "gsap/all"
import gsap from "gsap"
import {useMediaQuery} from "react-responsive";

const Hero = () => {
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})
    const videoRef = useRef(null)
    console.log(
        'isMobile',
        isMobile
    )
    useGSAP(() => {
        const heroSplits = new SplitText('.title', {type: 'words,chars'})
        const paragraph = new SplitText('.subtitle', {type: 'lines'})
        heroSplits.chars.forEach((char) => {
            char.classList.add('text-gradient')
        })

        gsap.from(heroSplits.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06
        })
        gsap.from(paragraph.lines, {
            yPercent: 100,
            duration: 1.8,
            opacity: 0,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1
        })

        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        }).to('.left-leaf', {y: -200}, 0).to('.right-leaf', {y: 200}, 0)

        const startValue = isMobile ? 'top 50%' : 'center 60% ̰';
        const endValue = isMobile ? '120% top ' : 'bottom top';
        let videoTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: 'video',
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            }
        })

        videoRef.current.onloadedmetadata = () => {
            videoTimeline.to(videoRef.current, {
                currentTime: videoRef.current.duration,
            })
        }
    }, [])
    return (
        <> ̰
            <section id='hero' className={'noisy'}>
                <h1 className='title'>MOJITO
                </h1>
                <img src='/images/hero-left-leaf.png' alt='left-leaf' className={'left-leaf'}/>
                <img src='/images/hero-right-leaf.png' alt='right-leaf' className={'right-leaf'}/>

                <div className={'body'}>
                    <div className='content'>
                        <div className='space-y-5 hidden md:block'>
                            <p>
                                Cool. Crisp. Classic.
                            </p>
                            <p className='subtitle'>Sip the Spirit <br/> of Summer</p>
                        </div>

                        <div className='view-cocktails'>
                            <p className='subtitle'>
                                Every Cocktail on our menu is a blend of premium ingredients,creative flair,and timeless
                                recipes - designed to delight your senses
                            </p>
                            <a href='#cocktails'>View Cocktails</a>
                        </div>
                    </div>
                </div>
            </section>
            <div className='video absolute  inset-0'>
                <video src='/videos/output.mp4' muted playsInline preload={'auto'} ref={videoRef}/>
            </div>
        </>
    )
}
export default Hero
