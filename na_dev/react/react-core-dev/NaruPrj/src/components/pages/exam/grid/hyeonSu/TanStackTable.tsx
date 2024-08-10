import React, { useEffect } from 'react'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

interface tableData {
    column:ColumnDef<any>[] ;
    data: any[];
}

function TanStackTable(props :tableData) {

    const [data, setData] = React.useState(props.data)
    useEffect(() => {
        setData(()=>{
            return props.data
        })
    }, [props.data]);

    const columns = React.useMemo<ColumnDef<any>[]>(
        () => props.column,[props.column])
    const table = useReactTable<any>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })



    return (
        <div id='table' >
            <table className="table" >
                <colgroup>
                    <col width="10%" />
                    <col width="10%" />
                    <col width="7%" />
                    <col width="7%" />
                    <col width="7%" />
                    <col width="auto" />
                    <col width="15%" />
                </colgroup>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    <div className='cursor-pointer select-none'>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default TanStackTable;