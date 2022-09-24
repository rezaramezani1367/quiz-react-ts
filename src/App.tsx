import axios from "axios";
import React, { useState } from "react";
import "./App.css";
import QuestionItem from "./components/QuestionItem";
import { shuffleArray } from "./utilities/shuffleArray";

export type questionType = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  userAnswer: string;
  id: number;
  shuffleArray: string[];
};

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataQuestion, setDataQuestion] = useState<questionType[]>(
    {} as questionType[]
  );
  const [indexQuestion, setIndexQuestion] = useState<number>(0);
  const [startGame, setStartGame] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [errorApi, setErrorApi] = useState<string>("");
  
  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axios(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );
      // add user choice in object api
      const newResult = data.results.map(
        (item: questionType, index: number) => {
          return {
            ...item,
            userAnswer: "",
            id: index + 1,
            shuffleArray: shuffleArray([
              ...item.incorrect_answers,
              item.correct_answer,
            ]),
          };
        }
      );
      setDataQuestion(newResult);
      setLoading(false);
      // console.log(newResult);
    } catch (error:any) {
      setErrorApi(error.message);
    }
  };

  const setUserAnswer = (userAns: string, index: number) => {
    // console.log(index);
    setDataQuestion((last) => {
      let help = [...last];
      help[index] = { ...help[index], userAnswer: userAns };
      return [...help];
    });
  };
  return (
    <div className="">
      <div
        className="font-extrabold text-center text-transparent text-5xl bg-clip-text 
      bg-gradient-to-r from-red-500 to-blue-800 border-b py-4 shadow-lg "
      >
        React Quiz
      </div>
      <div className="flex justify-center my-3  ">
        <div className="width-main bg-slate-50 rounded max-h-full justify-items-center text-center font-bold text-3xl shadow-inner  p-3  border border-slate-300  mx-3">
          {startGame ? (
            <button
              type="button"
              className="btn-start"
              onClick={() => {
                setStartGame(false);
                getData();
              }}
            >
              start Quiz
            </button>
          ) : (
            <div>
              <span className="mr-3">Score:</span>
              <span className="text-red-600">{score}</span>
            </div>
          )}
        </div>
      </div>

      {startGame ? (
        ""
      ) : (
        <QuestionItem
          setStartGame={setStartGame}
          setIndexQuestion={setIndexQuestion}
          loading={loading}
          dataQuestion={dataQuestion[indexQuestion]}
          setUserAnswer={setUserAnswer}
          setScore={setScore}
          score={score}
          errorApi={errorApi}
        />
      )}
    </div>
  );
}

export default App;
