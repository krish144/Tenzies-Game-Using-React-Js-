import React from "react";

import Dot1 from "../img/1.png"

import Dot2 from "../img/2.png"

import Dot3 from "../img/3.png"

import Dot4 from "../img/4.png"

import Dot5 from "../img/5.png"

import Dot6 from "../img/6.png"



export default function Die(props){
    const img={1:Dot1,2:Dot2,3:Dot3,4:Dot4,5:Dot5,6:Dot6}
    const style={backgroundColor: props.isHeld===true ? "#00FFF6":"#FFFFFF"}
    return (<div className="die-face" style={style} onClick={props.holdDice}>
           <h1 className="die"><img src={img[props.value]} alt="1 dots"  className="dice-dots" /></h1>
    </div>)
}