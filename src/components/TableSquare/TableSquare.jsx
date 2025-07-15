import { useEffect, useState } from 'react';
import './TableSquare.css';

export const TableSquare = ({ letter, correctLetter, word, isOldRow, index }) => {
    const [color, setColor] = useState('');

    useEffect(() => {
        if (isOldRow && letter) {
            const timeout = setTimeout(() => {
                if (letter.toUpperCase() === correctLetter) {
                    setColor('green');
                } else if ([...word].includes(letter.toUpperCase())) {
                    setColor('yellow');
                } else {
                    setColor('grey');
                }
            }, index * 300);

            return () => clearTimeout(timeout);
        }
    }, [isOldRow, letter, correctLetter, word, index]);

    return (
        <div className={`table_square ${color} ${letter ? 'is_active' : ''}`}>{letter}</div>
    )
}