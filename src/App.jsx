import { useEffect, useState } from "react";
import Card from "./Card"
import './App.css'
import Confetti from "react-confetti";
import useSound from "use-sound";

import tadaSfx from "./assets/tada.mp3"

function App() {
  const [grid,setGrid] = useState([]);
  const [cardData,setCardData] = useState([]);
  const [flipCard,setFlipCard] = useState(false);
  const [foundArray,setFoundArray] = useState([]);
  const [isClickable,setIsClickable] = useState(true);
  const [matches,setMatches] = useState(0);
  const [moveCount,setMoveCount] = useState(0);
  const [time,setTime] = useState(0);
  const [gridSize,setGridSize] = useState(4);
  const [gameOver,setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [resetGame,setResetGame] = useState(false);
  const [theme,setTheme] = useState('food');
  const [playing,setPlaying] = useState(false);

  const [playTada] = useSound(tadaSfx);

  const foodImg= ["🍏","🍉","🍓","🥥","🫑","🥓","🫐","🍡","🍏","🍉","🍓","🥥","🫑","🥓","🫐","🍡",
                  "🥐","🥨","🥞","🥯","🍞","🍖","🍔","🍟","🍕","🧆","🥐","🥨","🥞","🥯","🍞","🍖","🍔","🍟","🍕","🧆",
                  "🥙","🥘","🥗","🍿","🍠","🍱","🍳","🧈","🍥","🍝","🍙","🧀","🥙","🥘","🥗","🍿","🍠","🍱","🍳","🧈","🍥","🍝","🍙","🧀","🥚","🧆","🥚","🧆"];

  const animalImg = ["🐶","🐺","🐱","🐯","🐴","🐮","🐷","🐵","🐶","🐺","🐱","🐯","🐴","🐮","🐷","🐵",
                     "🐭","🐹","🐰","🐻","🐨","🐼","🐔","🐥","🐧","🐸","🐭","🐹","🐰","🐻","🐨","🐼","🐔","🐥","🐧","🐸",
                     "🐢","🐍","🐲","🐳","🐜","🐙","🐚","🐛","🐡","🐠","🐝","🐞","🐦","🐩","🐢","🐍","🐲","🐳","🐜","🐙","🐚","🐛","🐡","🐠","🐝","🐞","🐦","🐩"];
  
  const flagImg = ["🇦🇨","🇦🇩","🇦🇪","🇦🇫","🇦🇬","🇦🇱","🇦🇲","🇦🇴","🇦🇨","🇦🇩","🇦🇪","🇦🇫","🇦🇬","🇦🇱","🇦🇲","🇦🇴",
                     "🇦🇶","🇦🇷","🇦🇸","🇦🇹","🇦🇼","🇦🇽","🇦🇿","🇧🇦","🇧🇧","🇧🇩","🇦🇶","🇦🇷","🇦🇸","🇦🇹","🇦🇼","🇦🇽","🇦🇿","🇧🇦","🇧🇧","🇧🇩",
                     "🇧🇪","🇧🇫","🇧🇬","🇧🇭","🇧🇮","🇧🇯","🇧🇱","🇧🇳","🇧🇴","🇧🇶","🇧🇷","🇧🇸","🇧🇹","🇮🇳","🇧🇪","🇧🇫","🇧🇬","🇧🇭","🇧🇮","🇧🇯","🇧🇱","🇧🇳","🇧🇴","🇧🇶","🇧🇷","🇧🇸","🇧🇹","🇮🇳"];

  const flagEx = "🇧🇯";

  
  useEffect(() => {
    // Load best score from localStorage on mount
    const storedBestScore = localStorage.getItem(`bestscore_${gridSize}`);
    if (storedBestScore) {
      setBestScore(Number(storedBestScore));
    }
    else{
      setBestScore(0);
    }
  }, [gridSize])
  

  useEffect(() => {
    const initialGrid = [];
    setFoundArray([]);
    setMatches(0);
    setMoveCount(0);
    setPlaying(false);
    setTime(0);
    console.log(flagImg);

    let cardImgCopy;
    if(theme == 'animal'){
      cardImgCopy = [...animalImg];
    }
    else if(theme == 'food'){
      cardImgCopy = [...foodImg];
    }
    else if(theme == 'flag'){
      cardImgCopy = [...flagImg];
    }

    console.log(cardImgCopy)

    var j = 0;
    // initialize the grid
    for(let i = (gridSize*gridSize) -1 ;i >= 0 ; i--)  {
        j = Math.floor(Math.random() * (i+1));
        initialGrid.push({
          img: cardImgCopy[j],
          state: 'closed'
        });
        cardImgCopy.splice(j,1);
    }
    setGrid(initialGrid);
  }, [gridSize,theme,resetGame])

  useEffect(() => {
    const int = setInterval(() => {
      if(!gameOver && playing){
        setTime(time+1);
      };
      
    }, 1000);
    return () => clearInterval(int);
  }, [time,gameOver,playing])

  useEffect(() =>{
    if(foundArray.length == gridSize*gridSize){
      setGameOver(true);
      setPlaying(false);
      playTada();
      let score = Math.floor(100000 * (1/time) * (1/moveCount))
      console.log(score);
      const currentBestScore = localStorage.getItem(`bestscore_${gridSize}`);
      if (!currentBestScore || score > Number(currentBestScore)) {
        localStorage.setItem(`bestscore_${gridSize}`, score);
        setBestScore(score); // Update UI
      }
    }
  },[foundArray])

 
  useEffect(() => {
    if(resetGame){
      setTime(0);
      setMatches(0);
      setFoundArray([]);
      setMoveCount(0);
      setPlaying(false);
      setResetGame(false);
      setGameOver(false);
    }
  },[resetGame])

  function updateCardDataFromChild(dataChild){
    setPlaying(true);
    setMoveCount(moveCount+1);
     console.log(cardData)
     if(cardData.length == 0){
       setCardData([...cardData,dataChild]);
     }
     else if(cardData.length == 1){
        setIsClickable(false);
       if(cardData[0].img == dataChild.img){
          setMatches(matches+1);
          setFoundArray([...foundArray, dataChild.index,cardData[0].index]);
       }
       else{
          setFlipCard(true);
          setTimeout(() => {setFlipCard(false)},1000);
       }
       setTimeout(() => {setIsClickable(true)},1000)
       setCardData([]);
     }
   }

  
  const gridEls = grid.map((el, i) => <Card key={i} index = {i} foundArray = {foundArray} flipCard = {flipCard} setFlipCard = {setFlipCard} isClickable = {isClickable} sendDataToParent = {updateCardDataFromChild} gridSize = {gridSize} resetGame= {resetGame}>{el.img}</Card>)

  

   function resetGameOnClick(){
      console.log("clicked")
      setResetGame(true);
   }

   console.log(resetGame)
   
  function handleOption(themeValue){
    if(themeValue == 'animal' && theme != 'animal'){
      setTheme('animal');
      setResetGame(true);
    }
    else if(themeValue == 'food' && theme != 'food'){
      setTheme('food');
      setResetGame(true);
    }
    else if(themeValue == 'flag' && theme != 'flag'){
      setTheme('flag');
      setResetGame(true);
    }
  }

  function gridClassProvider(gridSize){
    switch (gridSize) {
      case 4:
        return "grid grid-cols-4 grid-rows-4 gap-3 rounded text-white noto-color-emoji-regular select-none"
      case 6:
        return "grid grid-cols-6 grid-rows-6 gap-3 rounded text-white noto-color-emoji-regular select-none"
      case 8:
        return "grid grid-cols-8 grid-rows-8 gap-3 rounded text-white noto-color-emoji-regular select-none"
    
      default:
        break;
    }
  }

  function changeGridSize(gridSize){
    setGridSize((gridSize+2) % 9 < 4 ? 4 : (gridSize+2) % 9);
  }
  return <div className="flex items-center justify-center p-2">
  {gameOver ? <div className="fixed flex flex-col w-screen h-screen bg-slate-100 bg-opacity-65 z-10 items-center justify-center backdrop-blur-sm">
                <Confetti width={window.innerWidth} recycle = {false} height={window.innerHeight}></Confetti>
        
                <h1 className="p-4" >Congratulations!!</h1>
          
                
            
                <button className="py-2 px-4 rounded bg-slate-200 font-semibold text-slate-700" onClick={() => resetGameOnClick()}>Reset Game</button>
              </div> : ''}
  <div className="grid justify-between items-center flex-col gap-1">
    <div className="flex items-center flex-col justify-around md:flex-row">
      <div className="flex justify-center items-center  flex-col">
        <div className="flex items-center space-x-4">
          <button className="py-2 px-4 rounded bg-slate-200 font-semibold text-slate-700" onClick={() => changeGridSize(gridSize)}>{gridSize}x{gridSize}</button>
          <button className="py-2 px-4 rounded bg-slate-200 font-semibold text-slate-700" onClick={() => resetGameOnClick()}>Reset Game</button>
          <select name="theme" className="py-2 px-4 rounded bg-slate-200 font-semibold text-slate-700" onChange={(e) => handleOption(e.target.value)}>
            <option value="food">Food</option>
            <option value="animal">Animals</option>
            <option value="flag">Flags</option>
          </select>
        </div>
        <span className="font-semibold text-slate-700 rounded py-2 px-4">Time: {Math.floor(time/60)}:{(time % 60).toString().padStart(2, '0')}</span>
      </div>
      <div className="flex flex-col font-semibold text-slate-700">
        <span >Matches: {matches}</span>
        <span>Moves: {Math.floor(moveCount/2)}</span>
        <span>Best Score: {bestScore}</span>
      </div>
    </div>
    <div className = {gridClassProvider(gridSize)}
    
                      style={{width: "min(85vw,85vh)",
                              height: "min(85vw,85vh)",}}>
      {gridEls}
    </div>
  </div>
  
  </div>
}

export default App;