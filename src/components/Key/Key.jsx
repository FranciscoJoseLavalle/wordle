import './Key.css';

export const Key = ({ keyObj, selectKey, deleteLetter }) => {
    return (
        <div className='key' onClick={() => {
            if (keyObj.action === 'delete') {
                deleteLetter();
            } else {
                selectKey(keyObj)
            }
        }}>{keyObj.letter}</div>
    )
}