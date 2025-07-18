import axios from 'axios';
import { act, useEffect, useState } from 'react';
import './App.css'
import { KeysContainer } from './components/KeysContainer/KeysContainer';
import { Table } from './components/Table/Table';
import dictionary from './assets/dictionary.json';

function App() {
  const [attemps, setAttemps] = useState([
    [], [], [], [], [], [],
  ]);

  const [actualRow, setActualRow] = useState(0)
  const [canProceed, setCanProceed] = useState(true);
  const [error, setError] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [win, setWin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [keyboardColors, setKeyboardColors] = useState({});
  const [rowColors, setRowColors] = useState([
    [], [], [], [], [], []
  ]);

  const words = dictionary.filter(w => w.length === 5);
  const [word, setWord] = useState(words[(Math.random() * words.length).toFixed(0)].toUpperCase());

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === 'Enter') {
        sendWord();
      } else if (e.key === 'Backspace') {
        deleteLetter();
      } else if (e.code.includes('Key') || e.key === 'ñ') {
        addLetter(e.key);
      }
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [attemps, actualRow, canProceed, word]);

  const resetGame = () => {
    setAttemps([
      [], [], [], [], [], [],
    ]);
    setActualRow(0);
    setCanProceed(true);
    setError(null);
    setWord(words[(Math.random() * words.length).toFixed(0)].toUpperCase());
    setGameEnded(false);
    setShowModal(false);
    setRowColors([
      [], [], [], [], [], []
    ]);
    setKeyboardColors({});
    setWin(false);
  }

  const evaluateAttempt = (attempt) => {
    const colors = Array(5).fill('grey');
    const wordLetters = getRepeatedLetters(word);
    const keyboardMap = {};

    attempt.forEach((letter, i) => {
      const upperLetter = letter.toUpperCase();
      const correctLetter = word[i];

      if (upperLetter === correctLetter) {
        colors[i] = 'green';
        wordLetters[upperLetter]--;
        keyboardMap[upperLetter] = 'green';
      }
    });

    attempt.forEach((letter, i) => {
      const upperLetter = letter.toUpperCase();

      if (colors[i] === 'grey') {
        if (word.includes(upperLetter) && wordLetters[upperLetter] > 0) {
          colors[i] = 'yellow';
          wordLetters[upperLetter]--;
          if (keyboardMap[upperLetter] !== 'green') {
            keyboardMap[upperLetter] = 'yellow';
          }
        } else {
          if (!keyboardMap[upperLetter]) {
            keyboardMap[upperLetter] = 'grey';
          }
        }
      }
    });

    return { colors, keyboardMap };
  }

  const getRepeatedLetters = (word) => {
    let letters = {};

    for (const letter of word) {
      letters[letter] = (letters[letter] || 0) + 1;
    }

    return letters;
  }

  const selectKey = (key) => {
    addLetter(key.letter)
  }

  const addLetter = (letter) => {
    if (gameEnded) return;
    setAttemps((prevAttemps) => {
      const newAttemps = prevAttemps.map((attempt) => [...attempt]);

      const currentAttemptIndex = newAttemps.findIndex(attempt => attempt.length < 5);

      if (currentAttemptIndex !== -1 && newAttemps[actualRow].length < 5 && canProceed) {
        newAttemps[actualRow].push(letter.toUpperCase());
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
    if (gameEnded) return;
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
    if (checkWord() && !canProceed) {
      let actualWord = attemps[actualRow].join('');
      window.gtag('event', 'send_word', {
        actualWord,
        correctWord: word
      });

      const { colors, keyboardMap } = evaluateAttempt(attemps[actualRow]);
      setKeyboardColors(prev => {
        const updated = { ...prev };
        Object.entries(keyboardMap).forEach(([letter, color]) => {
          const currentColor = updated[letter];
          if (!currentColor || isBetterColor(color, currentColor)) {
            updated[letter] = color;
          }
        });
        return updated;
      });
      setRowColors(prev => {
        const updated = [...prev];
        updated[actualRow] = colors;
        return updated;
      });

      if (actualWord === word) {
        window.gtag('event', 'win', {
          actualWord,
          correctWord: word
        });
        setGameEnded(true);
        setShowModal(true);
        setWin(true);
      } else if (actualRow === 5) {
        window.gtag('event', 'lose', {
          actualWord,
          correctWord: word
        });
        setGameEnded(true);
        setShowModal(true);
        setWin(false);
      }

      setCanProceed(true);
      setActualRow(prev => prev + 1);
    }
  }

  const checkWord = () => {
    let actualWord = attemps[actualRow].join('');
    if (words.find(w => w === actualWord.toLowerCase())) {
      return true;
    }

    if (actualWord.length < 5) {
      showError('Palabra muy corta');
    } else {
      showError('Palabra no encontrada');
    }

    return false;
  }

  const isBetterColor = (newColor, currentColor) => {
    const priority = { green: 3, yellow: 2, grey: 1 };
    return priority[newColor] > priority[currentColor];
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 1500)
  }

  return (
    <>
      <h1>Wordle</h1>
      {gameEnded &&
        <div className='game_ended_container'>
          {!showModal && <button className='btn btn-showResult' onClick={() => setShowModal(true)}>Ver resultado</button>}
          <div className='game_ended' style={{
            display: showModal ? 'flex' : 'none'
          }}>
            <div>
              <span onClick={() => setShowModal(false)} className="close_modal">x</span>
              <h4>¡{win ? 'Ganaste' : 'Perdiste'}!</h4>
              <p>La palabra era <b>{word}</b></p>
              <button onClick={resetGame} className={`btn ${win ? 'green' : 'grey'}`} >Reiniciar</button>
            </div>
          </div>
        </div>
      }
      {error && <div className='error_container'><p>{error}</p></div>}
      <Table attemps={attemps} word={word} actualRow={actualRow} error={error} rowColors={rowColors} />
      <KeysContainer selectKey={selectKey} deleteLetter={deleteLetter} sendWord={sendWord} keyboardColors={keyboardColors} />
    </>
  )
}

export default App