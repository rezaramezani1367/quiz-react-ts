import React, { FC } from "react";
import Swal from "sweetalert2";
import { questionType } from "../App";
import ErrorAPI from "./ErrorAPI";
import Loading from "./Loading";

interface QuestionItemProps {
  dataQuestion: questionType;
  loading: boolean;
  setIndexQuestion: React.Dispatch<React.SetStateAction<number>>;
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
  setUserAnswer: (userAns: string, index: number) => void;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  errorApi: string;
}
const QuestionItem = ({
  dataQuestion,
  loading,
  setIndexQuestion,
  setStartGame,
  setUserAnswer,
  setScore,
  score,
  errorApi,
}: QuestionItemProps) => {
  return (
    <div className="flex justify-center my-4">
      <div className="width-main  max-h-full rounded-2xl  border border-slate-300  mx-3 overflow-hidden shadow">
        {errorApi ? (
          <ErrorAPI errorApi={errorApi} />
        ) : loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex justify-between items-center font-bold text-2xl bg-gradient-to-r from-slate-600 to-blue-800 p-4 text-white">
              <p className=" flex gap-3 items-center justify-center ">
                Question:{" "}
                <span className="text-blue-300 text-3xl">
                  {dataQuestion.id}
                </span>
                /10
              </p>
              <div className="text-lg">{dataQuestion.category}</div>
            </div>
            {/* Question */}
            <div
              className="py-3 px-4 bg-slate-100 font-bold border-b shadow mb-2"
              dangerouslySetInnerHTML={{ __html: dataQuestion.question }}
            ></div>
            {/* choices */}
            <div className="px-4 mb-2">
              {dataQuestion.shuffleArray.map((item, index) => (
                <button
                  onClick={() => {
                    setUserAnswer(item, dataQuestion.id - 1);
                    if (item == dataQuestion.correct_answer) {
                      setScore((last) => ++last);
                    }
                  }}
                  className={`btn  ${
                    item === dataQuestion.userAnswer
                      ? dataQuestion.userAnswer == dataQuestion.correct_answer
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                      : item == dataQuestion.correct_answer &&
                        dataQuestion.userAnswer
                      ? "bg-green-600 text-white"
                      : ""
                  }`}
                  disabled={dataQuestion.userAnswer ? true : false}
                  key={index}
                  dangerouslySetInnerHTML={{ __html: item }}
                ></button>
              ))}

              {dataQuestion.userAnswer && (
                <div className="flex justify-center">
                  <button
                    className={`btn-submit`}
                    onClick={() => {
                      if (dataQuestion.id < 10) {
                        setIndexQuestion((last) => ++last);
                      } else {
                        Swal.fire({
                          icon: "success",
                          title: "Quiz is finished",
                          text: `score: ${score}`,
                          footer: '<a href="">Quiz React app</a>',
                        });
                        setScore(0);
                        setIndexQuestion(0);
                        setStartGame(true);
                      }
                    }}
                  >
                    {dataQuestion.id == 10 ? "Finish" : "Next Question"}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionItem;
