import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Trivia from "./components/Trivia";
import Timer from "./components/timer";

function App() { 

  const [questionNo, setQuestionNo] = useState(1);

  const [stop, setStop] = useState(false); //setTimeOut is custom, inbuilt is setTimeout

  const [earned, setEarned] = useState("Rs 0");

  const data = [
    {
      id: 1,
      question: "What is your college's name ?",
      answers: [
        {
          text: "IIT Delhi",
          correct: false,
        },
        {
          text: "IIT Bombay",
          correct: false,
        },
        {
          text: "IIT Madras",
          correct: false,
        },
        {
          text: "IIT Patna",
          correct: true,
        },
      ],
    },
    {
      id: 2,
      question: "What is your university's name ?",
      answers: [
        {
          text: "IIT Delhi",
          correct: false,
        },
        {
          text: "IIT Bombay",
          correct: false,
        },
        {
          text: "IIT Madras",
          correct: false,
        },
        {
          text: "IIT Patna",
          correct: true,
        },
      ],
    },
    {
      id: 3,
      question: "What is your college's name ?",
      answers: [
        {
          text: "IIT Delhi",
          correct: false,
        },
        {
          text: "IIT Bombay",
          correct: false,
        },
        {
          text: "IIT Madras",
          correct: false,
        },
        {
          text: "IIT Patna",
          correct: true,
        },
      ],
    },
  ];

  const moneyPyramid = useMemo(()=>
    [
      { id: 1, amount: "Rs 100" },
      { id: 2, amount: "Rs 200" },
      { id: 3, amount: "Rs 300" },
      { id: 4, amount: "Rs 500" },
      { id: 5, amount: "Rs 1000" },
      { id: 6, amount: "Rs 2000" },
      { id: 7, amount: "Rs 4000" },
      { id: 8, amount: "Rs 8000" },
      { id: 9, amount: "Rs 16000" },
      { id: 10, amount: "Rs 32000" },
      { id: 11, amount: "Rs 64000" },
      { id: 12, amount: "Rs 125000" },
      { id: 13, amount: "Rs 250000" },
      { id: 14, amount: "Rs 500000" },
      { id: 15, amount: "Rs 1000000" },
    ].reverse(),
    []);
  

  useEffect(()=>{
    questionNo>1 && setEarned(moneyPyramid.find((m) => m.id=== questionNo-1).amount);
  },[moneyPyramid,questionNo]);

  return (
    <div className="app">
      <div className="main">
        {stop ? (
          <h1 className="endText">You earned: {earned}</h1>
        ) : (
          <>
            <div className="top">
              <div className="timer"><Timer setStop={setStop} questionNo={questionNo} /></div>
            </div>
            <div className="bottom">
              <Trivia
                questionNo={questionNo}
                setQuestionNo={setQuestionNo}
                data={data}
                setStop={setStop}
              />
            </div>
          </>
        )}
      </div>
      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map((m) => (
            <li
              className={
                questionNo === m.id ? "moneyListItem active" : "moneyListItem"
              }
            >
              <span className="moneyListItemNo">{m.id}</span>
              <span className="moneyListItemAmount">{m.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
