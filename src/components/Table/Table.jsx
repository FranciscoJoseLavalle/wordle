import './Table.css';
import { TableRow } from '../TableRow/TableRow'

export const Table = ({ attemps, word, actualRow, error, rowColors }) => {
    return (
        <div className='table'>
            {[0, 1, 2, 3, 4, 5].map(row => <TableRow key={row} wordAttempt={attemps[row]} word={word} isOldRow={actualRow > row} error={error && actualRow === row} colors={rowColors[row]} />)}
        </div>
    )
}
