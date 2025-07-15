import './KeysContainer.css';
import { Key } from '../Key/Key'

const keys = [
    { letter: "q" },
    { letter: "w" },
    { letter: "e" },
    { letter: "r" },
    { letter: "t" },
    { letter: "y" },
    { letter: "u" },
    { letter: "i" },
    { letter: "o" },
    { letter: "p" },
    { letter: "a" },
    { letter: "s" },
    { letter: "d" },
    { letter: "f" },
    { letter: "g" },
    { letter: "h" },
    { letter: "j" },
    { letter: "k" },
    { letter: "l" },
    { letter: "ñ" },
    { letter: "z" },
    { letter: "x" },
    { letter: "c" },
    { letter: "v" },
    { letter: "b" },
    { letter: "n" },
    { letter: "m" },
    { letter: "Borrar", action: 'delete' },
]

export const KeysContainer = ({ selectKey, deleteLetter }) => {

    return (
        <div className='keys_container'>
            {keys.map(key => <Key key={key.letter} keyObj={key} selectKey={selectKey} deleteLetter={deleteLetter} />)}
        </div>
    )
}