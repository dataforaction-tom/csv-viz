import React, { useMemo, useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  flexRender,
  createColumnHelper,
  aggregationFns,
} from '@tanstack/react-table';
import { Input } from './Input';
import { CSVLink } from 'react-csv';

const DataTable = ({ data, globalFilter, setGlobalFilter, setFilteredData }) => {
  const [sorting, setSorting] = useState([]);
  const [grouping, setGrouping] = useState([]);
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const columnHelper = createColumnHelper();

  const columns = useMemo(() => [
    columnHelper.accessor('activity', {
      header: 'Activity',
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('local_authority', {
      header: 'Location',
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('number_of_people', {
      header: 'Number of People',
      cell: info => info.getValue(),
      aggregationFn: aggregationFns.sum,
      aggregatedCell: ({ getValue }) => getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('date', {
      header: 'Date',
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('type_of_insight', {
      header: 'Type of Insight',
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('age_range', {
      header: 'Age Range',
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
  ], [columnHelper]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      globalFilter,
      grouping,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onGroupingChange: setGrouping,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
  });

  useEffect(() => {
    if (!grouping.length) {
      setFilteredData(table.getRowModel().rows.map(row => row.original));
    }
  }, [table.getRowModel().rows, setFilteredData, grouping.length]);

  const totalNumberOfPeople = useMemo(
    () => table.getRowModel().rows.reduce((sum, row) => sum + (row.original?.number_of_people || 0), 0),
    [table.getRowModel().rows]
  );

  const csvData = useMemo(() => {
    return table.getRowModel().rows.map(row => row.original);
  }, [table.getRowModel().rows]);

  return (
    <div className="p-4">
      <Input
        value={globalFilter ?? ''}
        onChange={e => setGlobalFilter(String(e.target.value))}
        placeholder="Search all columns..."
        className="mb-4 p-2 border rounded w-full"
      />
      <div className="flex space-x-2 mb-4">
        {table.getAllLeafColumns().map(column => (
          <button
            key={column.id}
            type="button"
            onClick={() => setGrouping(old => old.includes(column.id) ? old.filter(d => d !== column.id) : [...old, column.id])}
            className={`px-4 py-2 rounded border ${
              grouping.includes(column.id) ? 'bg-[#9dc131] text-white' : 'bg-white text-black'
            }`}
          >
            {grouping.includes(column.id) ? `Ungroup ${column.id}` : `Group by ${column.id}`}
          </button>
        ))}
      </div>
      <div className="overflow-auto" style={{ maxHeight: '400px' }}>
        <table className="min-w-full bg-white border border-slate-200">
          <thead className="bg-[#1f1d1e] text-white">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-4 py-2 border border-slate-200 cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted()] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <React.Fragment key={row.id}>
                {row.getIsGrouped() ? (
                  <>
                    <tr className="bg-[#f860b1]">
                      <td colSpan={row.getVisibleCells().length} className="px-4 py-2 border border-slate-200">
                        <div
                          {...{
                            onClick: row.getToggleExpandedHandler(),
                            style: {
                              cursor: 'pointer',
                            },
                          }}
                        >
                          {`${row.getValue(row.groupingColumnId)} (${row.subRows.length})`}
                        </div>
                      </td>
                    </tr>
                    {row.getIsExpanded() && row.subRows.map(subRow => (
                      <tr key={subRow.id} className={subRow.depth % 2 === 0 ? 'bg-white' : 'bg-slate-100'}>
                        {subRow.getVisibleCells().map(cell => (
                          <td key={cell.id} className="px-4 py-2 border border-slate-200">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {row.getIsExpanded() && (
                      <tr className="bg-[#9dc131]">
                        <td colSpan={row.getVisibleCells().length} className="px-4 py-2 border border-slate-200 font-bold">
                          Total Number of People: {row.subRows.reduce((sum, subRow) => sum + subRow.original.number_of_people, 0)}
                        </td>
                      </tr>
                    )}
                  </>
                ) : (
                  <tr className={row.depth % 2 === 0 ? 'bg-white' : 'bg-slate-100'}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-4 py-2 border border-slate-200">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
          {!grouping.length && (
            <tfoot>
              <tr className="bg-[#1f1d1e] text-white font-bold">
                <td colSpan={columns.length} className="px-4 py-2 border border-slate-200">
                  Total Number of People: {totalNumberOfPeople}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      <CSVLink
        data={csvData}
        filename="table_data.csv"
        className="mt-4 inline-block px-6 py-2 bg-[#f860b1] text-white font-bold rounded hover:bg-[#9dc131]"
      >
        Download CSV
      </CSVLink>
    </div>
  );
};

export default DataTable;
