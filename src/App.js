import React, { useState } from 'react';
import Quiz from './component/Quiz';
import "./App.css";

function App() {
  const [start, setStart] = useState(false);

  const handleStart = () => setStart(true);
  const handleRestart = () => setStart(false);

  return (
    <div className='start-container'>
      {!start ? (
        <div className='start-quiz'>
          <h1>Are you ready to start THE QUIZ</h1>
          <button onClick={handleStart}>LET'S START</button>
        </div>
      ) : (
        <Quiz onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
