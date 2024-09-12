import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Animal, animalData} from "../data/animals.ts";

type StringColumnProps<T> = {
    type: 'string';
    title: string;
    value: (data: T) => string;
}

type NumericColumnProps<T> = {
    type: 'number';
    title: string;
    value: (data: T) => number;
}

export type ColumnProps<T> = StringColumnProps<T> | NumericColumnProps<T>;

type CellValue = string | number;

const NumberCell = ({value}: {value: CellValue}) => <TableCell align={"right"}>{value}</TableCell>
const StringCell = ({value}: {value: CellValue}) => <TableCell align={"left"}>{value}</TableCell>

const renderCell = (columnType: string, value: CellValue) => {
    if (columnType === "number") return <NumberCell value={value}/>
    return <StringCell value={value}/>
}

export type RTProps<T> = {
    data: T[];
    columnProps: ColumnProps<T>[]
}

export const ReusableTable = <T,>({ data, columnProps }: RTProps<T>) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columnProps.map(cp => renderCell(cp.type, cp.title))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {columnProps.map((cp) => renderCell(cp.type, cp.value(row)))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


// Example usage


export const ExampleTable = () => {
    const columnProps: ColumnProps<Animal>[] = [
        { title: 'Name', type: 'string', value: (row) => row.name },
        { title: 'Description', type: 'string', value: (row) => row.description },
        { title: 'Number of legs', type: 'number', value: (row) => row.numberOfLegs },
        { title: 'Has tail', type: 'string', value: (row) => row.hasTail ? 'Yes' : 'No' },
    ]
    return <ReusableTable data={animalData} columnProps={columnProps} />
}
