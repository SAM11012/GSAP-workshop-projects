import React from 'react'
import gsap from "gsap";
import {ScrollTrigger,SplitText} from "gsap/all";
gsap.registerPlugin(ScrollTrigger,SplitText);
const App = () => {
    return (
        <div className='text-3xl text-red-300 flex-center h-[100vh] '>App</div>
    )
}
export default App
