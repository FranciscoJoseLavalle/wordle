import { useEffect, useState } from 'react';
import './TableSquare.css';

export const TableSquare = ({ letter, word, isOldRow, index, rowColor }) => {
    const [color, setColor] = useState('');

    useEffect(() => {
        setColor('');
        if (isOldRow) {
            const timeout = setTimeout(() => {
                setColor(rowColor)
            }, index * 300);

            return () => clearTimeout(timeout);
        }
    }, [isOldRow, word, index]);

    return (
        <div className={`table_square ${color} ${letter ? 'is_active' : ''}`}>{letter}</div>
    )
}