import React from "react";

import Die from "./Component/Die"

import {nanoid} from "nanoid"

import Confetti from "react-confetti";


 

export default function App(){

  const[dice,setDice]=React.useState(allNewDice)

  const[tenzies,setTenzies]=React.useState(false)

   const[roll,setRoll]=React.useState(0)

   const[start,setStart]=React.useState(false)

   const[count,setCount]=React.useState(0);

   


   React.useEffect(()=>{
    if(tenzies){
    localStorage.setItem("bestCount",  count)
  }
 },[count])



  React.useEffect(()=>{
    const held=dice.every(die=>die.isHeld);
    const firstValue=dice[0].value
    const sameValue=dice.every(die=>die.value===firstValue)
    if(held && sameValue ){
      setCount(prevCount=>{
        if(prevCount!=0 && prevCount<roll){
          return prevCount;
        }
        else{
          return roll;
        }
      })
      setTenzies(true) ;

    }
    // console.log("Dice start Changed")
  },[dice])



 
 

  function allNewDice(){
    const dieArray=[]
    for(let i=0;i<10;i++){
      dieArray.push({
       value:Math.ceil(Math.random()*6),
       isHeld:false,
       id:nanoid()});
    }
    return dieArray;
  }

  function rollDice(){
    setDice(prevDice=>prevDice.map(die=>{
      return die.isHeld==true?die:{ 
        value:Math.ceil(Math.random()*6),
        isHeld:false,
        id:nanoid()
      } 
    })
    );
    setRoll(prevRoll=>prevRoll+1)
  }

  
  



  function holdDice(id){
    setStart(false)
    setDice(prevDie=>prevDie.map(die=>{
      return die.id===id ?{...die, isHeld:!die.isHeld}:die
    })
    )
    
  }


 const dieElements=dice.map(item=>{
  return <Die
           key={item.id}
           value={item.value}  
           isHeld={item.isHeld}
           holdDice={()=>holdDice(item.id)}
   />
 })

 function newGame(){
  setDice(allNewDice);
  setTenzies(false);
  setRoll(0);
   
 }


  

  return (<div>
    <main className="main">
        {tenzies && <Confetti />}
        <h1 className="header">tenzies</h1>
        <p className="paragraph">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </p>

       { 
       tenzies?
       <h1 className="win-msg">You Won the Game 🎉</h1>
       :<div className="score">
       <p className="paragraph">Roll Count: {(roll<10 && roll)?"0"+roll:roll||"00"}</p>
       <p className="paragraph" >Best Roll Count: {(((localStorage.getItem("bestCount")<10 && localStorage.getItem("bestCount")))?("0"+localStorage.getItem("bestCount")):(localStorage.getItem("bestCount")))||"00"} </p>  
       </div>
       }

       <div className="die-container">
       {dieElements}
       </div>
       {
        tenzies
        ? <button className="roll-dice" onClick={newGame}>New Game</button>
       : <button className="roll-dice" onClick={rollDice} >Roll</button>}

    </main>
  </div>)
}