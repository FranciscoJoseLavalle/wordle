import './TableRow.css';
import { TableSquare } from '../TableSquare/TableSquare'

export const TableRow = ({ wordAttempt, word, isOldRow, error, colors }) => {
    return (
        <div className={`table_row ${error ? 'error' : ''}`}>
            {[0, 1, 2, 3, 4].map((i) => (
                <TableSquare
                    key={i}
                    index={i}
                    letter={wordAttempt[i]}
                    word={word}
                    isOldRow={isOldRow}
                    rowColor={colors[i]}
                />
            ))}
        </div>
    )
}