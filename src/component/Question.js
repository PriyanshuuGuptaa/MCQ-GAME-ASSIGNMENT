import React from 'react';

function Question({ question, options, onAnswer }) {
    return (
        <div>
            <h2>{question}</h2>
            <div>
                {options.map((option, index) => (
                    <button key={index} onClick={() => onAnswer(index)}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Question;
