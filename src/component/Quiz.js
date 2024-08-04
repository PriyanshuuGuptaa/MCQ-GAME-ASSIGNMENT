import React, { useEffect, useState } from 'react';
import Question from './Question';
import QuestionNav from './QuestionNav';
import Score from './Score';

function Quiz({ onRestart }) {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null); // New state to track selected option

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch(
                'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
            );
            const data = await response.json();

            const formattedQuestions = data.results.map((question) => ({
                question: question.question,
                options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
                correct: [...question.incorrect_answers, question.correct_answer].indexOf(question.correct_answer),
            }));
            setQuestions(formattedQuestions);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleAnswer = (answerIndex) => {
        setSelectedOption(answerIndex); // Set the selected option
        if (answerIndex === questions[currentQuestion].correct) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        setSelectedOption(null); // Reset selected option for the next question
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const resetQuiz = () => {
        setScore(0);
        setCurrentQuestion(0);
        setShowScore(false);
        setLoading(true);
        setSelectedOption(null); // Reset selected option
        fetchQuestions();
        onRestart(); // Reset to initial screen
    };

    if (loading) {
        return <div>Loading questions...</div>;
    }

    return (
        <div>
            {showScore ? (
                <div>
                    <Score score={score} total={questions.length} />
                    <button onClick={resetQuiz}>Restart Quiz</button>
                </div>
            ) : (
                <div className='question-container'>
                    <Question
                        question={questions[currentQuestion].question}
                        options={questions[currentQuestion].options}
                        onAnswer={handleAnswer}
                        selectedOption={selectedOption} // Pass the selected option state
                    />
                    <QuestionNav onNext={handleNextQuestion} />
                </div>
            )}
        </div>
    );
}

export default Quiz;
