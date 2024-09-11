import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {foodData, IFoodData} from "../data/food.ts";


type ColumnProps<T,> = {
    title: string;
    type: 'number' | 'string'
    value: (data: T) => number | string;
}

type TableProps<T, > = {
    columns: ColumnProps<T>[]
    data: T[]
}

export const BasicTable = <T,>(props: TableProps<T>) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {props.columns.map(column => <TableCell align={column.type === 'number' ? 'right' : 'left'}>{column.title}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row) => (
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {props.columns.map(column => <TableCell align={column.type === 'number' ? 'right' : 'left'}>{column.value(row)}</TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// Example usage

const props: TableProps<IFoodData> = {
    data: foodData,
    columns: [
        {title: 'Name', type: 'string', value: data => data.name},
        {title: 'Calories', type: 'number', value: data => data.calories},
        {title: 'Fat (g)', type: 'number', value: data => data.fat},
        {title: 'Carbs (g)', type: 'number', value: data => data.carbs},
        {title: 'Protein (g)', type: 'number', value: data => data.protein},
    ]
}

export const FoodTable = () => <BasicTable data={props.data} columns={props.columns}></BasicTable>