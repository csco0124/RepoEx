import React from 'react';
import { useTable, Column, HeaderGroup, Row, Cell, useFilters, FilterProps } from 'react-table';

interface TableProps {
    columns: Column<modalData>[];
    data: modalData[];
    props?: any;
}

interface modalData {
    uid: number;
    dataPath: string;
    dataInfo: string;
    methodType: string;
    statusCode: number;
    delayTime: number;
    jsonData: string;
}

// filter
export function DefaultColumnFilter() {
    return (
    <div style={{height:24}}></div>
    );
}

export function InputColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}: FilterProps<modalData>) {
    const count = preFilteredRows.length;
    return (
    <input
        value={filterValue || ''}
        onChange={(e) => {
        setFilter(e.target.value || undefined);
        }}
        placeholder={`Search ${count} records...`}
    />
    );
}

export function SelectmMethodTypesColumnFilter({
    column: { filterValue, setFilter},
}: FilterProps<modalData>) {
    const methodTypes = [ "GET","POST","PUT","DELETE","PATCH","HEAD","OPTIONS","TRACE","CONNECT" ];

    return (
    <select
        value={filterValue}
        onChange={(e) => {
        setFilter(e.target.value || undefined);
        }}
    >
        <option value="">All</option>
        {methodTypes.map((option: any, i) => (
        <option key={i} value={option}>
            {option}
        </option>
        ))}
    </select>
    );
}
export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}: FilterProps<modalData>) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
        options.add(row.values[id])
    })
    return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
    <select
        value={filterValue}
        onChange={e => {
        setFilter(e.target.value || undefined)
        }}
    >
        <option value="">All</option>
        {options.map((option: any, i) => (
        <option key={i} value={option}>
            {option}
        </option>
        ))}
    </select>
    )
}


const handleClickDeleteData = (e :any) => {
    console.log(e)
};


function ReactTable({ columns, data , props} : TableProps) {


    const filterTypes = React.useMemo(() => {
        return {
        text: (rows: any, id: any, filterValue: any) => {
            return rows.filter((row: any) => {
            const rowValue = row.values[id];
            return rowValue !== undefined
                ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
                : true;
            });
        },
        };
    }, []);
    
    const defaultColumn = React.useMemo(
        () => ({
        Filter: DefaultColumnFilter,
        }),
        []
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<modalData>({
        columns,
        data,
        defaultColumn,
        filterTypes,
    },useFilters,
    (hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
            id: 'buttons',
            Cell: ({ row }:any) => (
                <div style={{ display: 'flex' }}>
                    {props.handleClickDeleteData!==undefined && (
                        <button onClick={() => handleClickDeleteData(row.original)}>edit</button>
                    )}
                    {props.handleClickDeleteData!==undefined && (
                        <button onClick={() => props.handleClickDeleteData(row.original,props.page.pageNum,props.page.rowCnt)}>del</button>
                    )}
                </div>
            ),
            },
        ]);
        }
    );
    return (
        <React.Fragment>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup: HeaderGroup<modalData>) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                            <div>{column.canFilter ? column.render('Filter') : null}</div>
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row: Row<modalData>) => {
                    prepareRow(row);
                    return (
                        <tr style={{height:4}} {...row.getRowProps()}>
                        {row.cells.map((cell: Cell<modalData, any>) => {
                            return <td  {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                        })}
                        </tr>
                    );
                    })}
                </tbody>
            </table>
            {props.modal.modalOpen && (
                <h2>에디팅 모달 써야함</h2>
            )}
        </React.Fragment>
    );
}
    
export default ReactTable;