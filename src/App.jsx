import axios from 'axios';
import { act, useEffect, useState } from 'react';
import './App.css'
import { KeysContainer } from './components/KeysContainer/KeysContainer';
import { Table } from './components/Table/Table';
import dictionary from './assets/dictionary.json';

function App() {
  const [attemps, setAttemps] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  const [actualRow, setActualRow] = useState(0)
  const [canProceed, setCanProceed] = useState(true);
  const words = dictionary.filter(w => w.length === 5);
  const [word, setWord] = useState(words[(Math.random() * words.length).toFixed(0)].toUpperCase());

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === 'Enter') {
        sendWord();
      } else if (e.key === 'Backspace') {
        deleteLetter();
      } else {
        addLetter(e.key);
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [attemps, actualRow, canProceed, word]);

  const selectKey = (key) => {
    addLetter(key.letter)
  }

  const addLetter = (letter) => {
    setAttemps((prevAttemps) => {
      const newAttemps = prevAttemps.map((attempt) => [...attempt]);

      const currentAttemptIndex = newAttemps.findIndex(attempt => attempt.length < 5);

      if (currentAttemptIndex !== -1 && newAttemps[actualRow].length < 5 && canProceed) {
        newAttemps[actualRow].push(letter);
      } else {
        setCanProceed(false);
      }

      if (newAttemps[actualRow].length === 5) {
        setCanProceed(false);
      }

      return newAttemps;
    });
  }

  const deleteLetter = () => {
    setAttemps((prevAttemps) => {
      const newAttemps = prevAttemps.map((attempt) => [...attempt]);

      if (newAttemps[actualRow].length <= 5) {
        newAttemps[actualRow].pop();
        setCanProceed(true);
      }

      return newAttemps;
    });
  }

  const sendWord = () => {
    if (!canProceed && checkWord()) {
      setCanProceed(true);
      setActualRow(prev => prev + 1);
    }
  }

  const checkWord = () => {
    let actualWord = attemps[actualRow].join('');
    if (words.find(w => w === actualWord)) {
      return true;
    }

    return false;
  }

  return (
    <>
      <h1>Wordle</h1>
      <Table attemps={attemps} word={word} actualRow={actualRow} />
      <KeysContainer selectKey={selectKey} deleteLetter={deleteLetter} />
      <button onClick={sendWord} className="key">Enviar</button>
    </>
  )
}

export default App