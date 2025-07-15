import './TableRow.css';
import { TableSquare } from '../TableSquare/TableSquare'

export const TableRow = ({ wordAttempt, word, isOldRow }) => {
    return (
        <div className='table_row'>
            {[0, 1, 2, 3, 4].map((i) => (
                <TableSquare
                    key={i}
                    index={i}
                    letter={wordAttempt[i]}
                    correctLetter={word[i]}
                    word={word}
                    isOldRow={isOldRow}
                />
            ))}
        </div>
    )
}