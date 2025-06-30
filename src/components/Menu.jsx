import React, {useState} from 'react'
import {sliderLists} from "../../constants/index.js";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const cocktailsLength = sliderLists.length;
    const contentRef = React.useRef(null)
    const gotoIndex = (index) => {
        const newIndex = (index + sliderLists.length) % sliderLists.length
        setCurrentIndex(newIndex)
    }

    const getCocktailAt = (indexOffset) => {
        return sliderLists[(currentIndex + indexOffset + cocktailsLength) % cocktailsLength]
    }

    const currentCocktail = getCocktailAt(0)
    const prevCocktail = getCocktailAt(-1)
    const nextCocktail = getCocktailAt(1)

    useGSAP(() => {
        gsap.fromTo('#title', {
            opacity: 0,
        }, {opacity: 1, duration: 1})
        gsap.fromTo('.cocktail img', {opacity: 0, xPercent: -100}, {
                opacity: 1,
                duration: 1,
                xPercent: 0,
                ease: "power1.inOut"
            }
        )
        gsap.fromTo('.details h2', {opacity: 0, yPercent: 100}, {
                opacity: 1,
                duration: 1,
                yPercent: 0,
                ease: "power1.inOut"
            }
        )

        gsap.fromTo('.details p', {opacity: 0, yPercent: 100}, {
                opacity: 1,
                duration: 1,
                yPercent: 0,
                ease: "power1.inOut"
            }
        )
    }, [currentIndex])
    return (
        <section id="menu" aria-labelledby={'menu-heading'}>
            <img src={'/images/slider-left-leaf.png'} alt={'menu-left-leaf'} id={'m-left-leaf'}/>
            <img src={'/images/slider-right-leaf.png'} alt={'menu-right-leaf'} id={'m-right-leaf'}/>
            <h2 id={'menu-heading'} className={'sr-only'}>
                Cocktail Menu
            </h2> ̰
            <nav className={'cocktail-tabs'} aria-label={'Cocktail Navigation'}>
                {sliderLists.map((cocktail, index) => {
                    const isActive = index === currentIndex
                    return (
                        <button key={cocktail.id}
                                className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}`}
                                onClick={() => gotoIndex(index)}
                        >
                            {cocktail.name}
                        </button>
                    )
                })}
            </nav>

            <div className={'content'}>
                <div className={'arrows'}>
                    <button className='text-left' onClick={() => gotoIndex(currentIndex - 1)}>
                        <span>{prevCocktail.name}</span>
                        <img src={'/images/right-arrow.png'} alt={'arrow-right'} aria-hidden={'true'}/>
                    </button>

                    <button className='text-left' onClick={() => gotoIndex(currentIndex + 1)}>
                        <span>{nextCocktail.name}</span>
                        <img src={'/images/left-arrow.png'} alt={'arrow-left'} aria-hidden={'true'}/>
                    </button>
                </div>
                <div className={'cocktail'}>
                    <img src={currentCocktail.image} className={'object-contain'}/>
                </div>
                <div className={'recipe'}>
                    <div ref={contentRef} className={'info'}>
                        <p>Recipe for</p>
                        <p id={'title'}>{currentCocktail.name}</p>
                    </div>
                    <div className={'details'}>
                        <h2>{currentCocktail.title}</h2>
                        <p>{currentCocktail.description}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Menu
