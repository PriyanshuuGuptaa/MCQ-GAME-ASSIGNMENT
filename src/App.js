import React, { useState } from 'react';
import Question from './component/Question';
import QuestionNav from './component/QuestionNav';
import Score from './component/Score';
import { questionsData } from './data/questions';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [start, setStart] = useState(false);

  const handleAnswer = (answerIndex) => {
    if (answerIndex === questionsData[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionsData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div>
      {showScore ? (
        <Score score={score} total={questionsData.length} />
      ) : (
        <>
          <Question
            question={questionsData[currentQuestion].question}
            options={questionsData[currentQuestion].options}
            onAnswer={handleAnswer}
          />
          <QuestionNav onNext={handleNextQuestion} />
        </>
      )}
    </div>
  );
}

export default App;
