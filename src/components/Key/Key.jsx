import './Key.css';

import DeleteIcon from '../../assets/img/backspace.png';

export const Key = ({ keyObj, selectKey, deleteLetter, sendWord, keyboardColors }) => {
    return (
        <div className={`key ${keyboardColors[keyObj.letter.toUpperCase()] || ''} ${keyObj.action === 'send' ? 'key_send' : ''}`} onClick={() => {
            if (keyObj.action === 'delete') {
                deleteLetter();
            } else if (keyObj.action === 'send') {
                sendWord();
            } else {
                selectKey(keyObj)
            }
        }}>
            {keyObj.action === 'delete' ? <img src={DeleteIcon} width={26} /> : keyObj.letter}
        </div>
    )
}