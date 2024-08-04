import React from 'react';

function Question({ question, options, onAnswer, selectedOption }) {
    return (
        <div className='mcq-container'>
            <h2>{question}</h2>
            <div className='options'>
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswer(index)}
                        className={`option-button ${selectedOption === index ? 'selected' : ''}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Question;
