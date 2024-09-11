import {createContext, ReactNode, useContext, useEffect, useReducer} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {animalData} from "../data/animals.ts";

type CellValue = string | number;

type ITable<T> = {
    children: ReactNode;
    data: T[]
};

type ExternalColumnProps<T, V> = {
    title: string;
    value: (data: T) => V
}

type InternalColumnProps<T> =  ExternalColumnProps<T, CellValue> & {
    type: "number" | "string";
}

type TableContext = {
    updateColumn: (column: InternalColumnProps<unknown>) => void
    removeColumn: (column: InternalColumnProps<unknown>) => void
}

const TableContext = createContext({} as TableContext);
const useTableContext = () => useContext(TableContext);

const Column = <T,>(column: InternalColumnProps<T>) => {
    const tableContext = useTableContext();
    useEffect(() => {
        tableContext.updateColumn(column as InternalColumnProps<unknown>)
        return () => tableContext.removeColumn(column as InternalColumnProps<unknown>)
    }, [column])
    return null;
}

const NumberCell = ({value}: {value: CellValue}) => <TableCell align={"right"}>{value}</TableCell>
const StringCell = ({value}: {value: CellValue}) => <TableCell align={"left"}>{value}</TableCell>
const renderCell = (columnType: string, value: CellValue) => {
    if (columnType === "number") return <NumberCell value={value}/>
    return <StringCell value={value}/>
}

function columnsReducer<T,>(columns: InternalColumnProps<T>[], action: {type: 'changed' | 'deleted', column: InternalColumnProps<T>}) {
    switch (action.type) {
        case 'changed': {
            if (columns.findIndex((c) => c.title === action.column.title) < 0) {
                return [...columns, action.column];
            }
            return columns.map(c => {
                if (c.title === action.column.title) {
                    return action.column;
                } else {
                    return c;
                }
            });
        }
        case 'deleted': {
            return columns.filter(t => t.title !== action.column.title);
        }
    }
}

const ReusableTable = <T,>({children, data}: ITable<T>) => {

    const [columns, dispatch] = useReducer(
        columnsReducer<T>,
        []
    );

    function updateColumn(column: InternalColumnProps<T>) {
        dispatch({
            type: 'changed',
            column,
        });
    }

    function removeColumn(column: InternalColumnProps<T>) {
        dispatch({
            type: 'deleted',
            column,
        });
    }

    return (
        <TableContext.Provider value={{updateColumn, removeColumn}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map(c => renderCell(c.type, c.title))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((value) => (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {columns.map((c) => renderCell(c.type, c.value(value)))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {children}
        </TableContext.Provider>
    )
}

export const TableBuilder = <T,>(data: T[]) => ({
    Table: ({children}: {children: ReactNode}) => <ReusableTable<T> data={data}>{children}</ReusableTable>,
    NumberColumn: (props: ExternalColumnProps<T, number>) => <Column<T> {...props} type={"number"}/>,
    StringColumn: (props: ExternalColumnProps<T, string>) => <Column<T> {...props} type={"string"} />,
});




// Example usage


export const ExampleTable = () => {
    const Builder= TableBuilder(animalData);
    return (
        <>
            <Builder.Table>
                <Builder.StringColumn title={'Name'} value={row => row.name}></Builder.StringColumn>
                <Builder.StringColumn title={'Description'} value={row => row.description}></Builder.StringColumn>
                <Builder.NumberColumn title={'Number of legs'} value={row => row.numberOfLegs}></Builder.NumberColumn>
                <Builder.StringColumn title={'Has tail'} value={row => row.hasTail ? "Yes" : "No"}></Builder.StringColumn>
            </Builder.Table>
        </>
    );
}