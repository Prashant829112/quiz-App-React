import React, { useEffect } from 'react'
import {useState } from 'react';
import useSound from 'use-sound';
import play from "../assets/play.mp3"
import correct from "../assets/correct.mp3"
import wrong from "../assets/wrong.mp3"

const Trivia = ({data, questionNo, setQuestionNo,setStop}) => {
  
    const [question,setQuestion]=useState(null);

    const [selectedAns,setSelectedAns]=useState(null);

    const [className,setClassName]=useState("answer");

    const [letsPlay]=useSound(play);

    const [correctAns]=useSound(correct);

    const [wrongAns]=useSound(wrong);

    useEffect(()=>{
        letsPlay();
    },[letsPlay]);

    useEffect(()=>{
        setQuestion(data[questionNo-1]);
    },[data,questionNo]);

    const delay=(duration,callback)=>{
        setTimeout(() => {
            callback();
        }, duration);
    }

    const handleClick=(a)=>{
        setSelectedAns(a);
        setClassName("answer active");
        delay(3000,()=>{setClassName(a.correct ? "answer correct" : "answer wrong")});
        delay(5000,()=>{
            if(a.correct){
                correctAns();
                delay(1000,()=>{
                    setQuestionNo((prev)=> prev+1);
                    setSelectedAns(null);
                });
            }
            else{
                wrongAns();
                delay(1000,()=>{
                    setStop(true);
                });
            }
        })  
    };

    return (
    <div className='trivia'>
        <div className="question">
            {question?.question}   
        </div>
        <div className="answers">
           {question?.answers.map((a)=>(
            <div className={selectedAns===a ? className : "answer"} onClick={()=> handleClick(a)}>{a.text}</div>
           ))}
        </div>
        
    </div>
  )
} 

export default Trivia