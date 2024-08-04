import React from 'react';

function QuestionNav({ onNext }) {
    return (
        <div >
            <button onClick={onNext}>Next Question</button>
        </div>
    );
}

export default QuestionNav;
