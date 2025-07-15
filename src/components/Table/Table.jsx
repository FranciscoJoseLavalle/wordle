import './Table.css';
import { TableRow } from '../TableRow/TableRow'

export const Table = ({ attemps, word, actualRow }) => {
    return (
        <div className='table'>
            <TableRow wordAttempt={attemps[0]} word={word} isOldRow={actualRow > 0} />
            <TableRow wordAttempt={attemps[1]} word={word} isOldRow={actualRow > 1} />
            <TableRow wordAttempt={attemps[2]} word={word} isOldRow={actualRow > 2} />
            <TableRow wordAttempt={attemps[3]} word={word} isOldRow={actualRow > 3} />
            <TableRow wordAttempt={attemps[4]} word={word} isOldRow={actualRow > 4} />
            <TableRow wordAttempt={attemps[5]} word={word} isOldRow={actualRow > 5} />
        </div>
    )
}
