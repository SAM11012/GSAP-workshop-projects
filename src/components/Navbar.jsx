import React from 'react'
import {navLinks} from "../../constants/index.js";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

const Navbar = () => {
    useGSAP(() => {
        const navTime = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: 'bottom top',

            }
        })
        navTime.fromTo('nav', {backgroundColor: 'transparent'}, {
            backgroundColor: '#00000050',
            duration: 1,
            backgroundFilter: 'blur(10px)',
            ease: 'power2.inOut'
        })

    }, [])
    return (
        <nav >
            <div>
                <a href="#home" className={'flex items-center gap-2'}>
                    <img src="/images/logo.png" alt="logo"/><p>

                    Spill It
                </p></a>
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id}><a href={`#${link.id}`}>
                            {link.title}
                        </a></li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar
