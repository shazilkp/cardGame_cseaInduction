import { useEffect, useState } from "react";
import { useSpring, a } from '@react-spring/web'
import useSound from "use-sound";

import cardOpenSfx from "./assets/card-open.mp3"
import cardCloseSfx from "./assets/card-close.mp3"

function Card({ flipCard, index, resetGame,foundArray, children, isClickable,gridSize, sendDataToParent }) {
    const [cardState, setCardState] = useState('closed');
    const [playCardOpen] = useSound(cardOpenSfx);
    const [playCardClose] = useSound(cardCloseSfx);

    useEffect(() => {
        setCardState('closed');
    },[gridSize,resetGame])

    const { transform, opacity } = useSpring({
        opacity: cardState === 'closed' ? 1 : 0,
        transform: `perspective(600px) rotateX(${cardState === 'closed' ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    })


    

    function revealCard() {
        
        if (cardState === 'closed' && isClickable) {
            setCardState('open');
            playCardOpen();
            sendDataToParent({
                index: index,
                img: children,
                state: 'open',
            });
        }
    }

    useEffect(() => {
        console.log(foundArray);

        foundArray.forEach((cardToChange) => {
            if (index === cardToChange) {
                setCardState('found');
                console.log('hello', index)
            }
        });

    }, [foundArray]);

    useEffect(() => {
        if (flipCard && cardState === 'open') {
            setTimeout(() => {
                setCardState('closed');
                playCardClose();
            }, 1000);
        }
    }, [flipCard, cardState]);




    return <div className ={'relative'} 
       onClick={revealCard}>
        <a.div
        className={`absolute top-0 p-4 bg-emerald-100 border-2 border-emerald-800 rounded size-full flex justify-center items-center text-4xl`}
        style={{ opacity: opacity.to(o => 1 - o), transform }}
      >{children}</a.div>
      <a.div
        className={`absolute top-0 p-4 bg-emerald-400 border-2 border-slate-500 rounded size-full flex justify-center items-center text-4xl`}
        style={{
          opacity,
          transform,
          rotateY: '180deg',
        }}
      />
    </div>
}

export default Card;