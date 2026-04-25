import { useState } from 'react';
import { WidgetWrapper } from '../WidgetWrapper';
import { Plus, Trash2, Columns, TrendingDown } from 'lucide-react';

export const DatasetTableWidget = () => {
  const [headers, setHeaders] = useState(['Year', 'Revenue']);
  const [rows, setRows] = useState([
    ['2023', '10000'],
    ['2024', '12000'],
  ]);

  const addRow = () => {
    setRows([...rows, new Array(headers.length).fill('')]);
  };

  const removeRow = (index: number) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const addColumn = () => {
    setHeaders([...headers, `Col ${headers.length + 1}`]);
    setRows(rows.map(row => [...row, '']));
  };

  const removeColumn = (index: number) => {
    if (headers.length > 1) {
      setHeaders(headers.filter((_, i) => i !== index));
      setRows(rows.map(row => row.filter((_, i) => i !== index)));
    }
  };

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = value;
    setHeaders(newHeaders);
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...rows];
    newRows[rowIndex][colIndex] = value;
    setRows(newRows);
  };

  return (
    <WidgetWrapper
      label="Data Table"
      hint="Edit headers and cells. Add/remove rows and columns as needed."
      iconColorClass="text-indigo-600"
      badge={
        <div className="flex items-center gap-1.5">
          <button
            onClick={addColumn}
            className="flex items-center gap-1 bg-white border border-indigo-200 rounded-md px-2 py-1 text-[11px] font-bold text-indigo-700 hover:bg-indigo-50 transition-all"
          >
            <Columns className="w-3 h-3" />
            Add Col
          </button>
          <button
            onClick={addRow}
            className="flex items-center gap-1 bg-white border border-indigo-200 rounded-md px-2 py-1 text-[11px] font-bold text-indigo-700 hover:bg-indigo-50 transition-all"
          >
            <Plus className="w-3 h-3" />
            Add Row
          </button>
        </div>
      }
    >
      <div className="w-full max-h-40 overflow-auto rounded-[6px] border-x border-b border-t-2 border-neutral-200 bg-white relative shadow-inner">
        <table className="w-full border-collapse table-auto">
          <thead className="sticky top-0 z-10">
            <tr className="bg-neutral-100/50 border-b border-neutral-100">
              {headers.map((header, i) => (
                <th key={i} className="p-1 text-left min-w-[90px]">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={header}
                      onChange={(e) => updateHeader(i, e.target.value)}
                      className="w-full bg-transparent text-[11.5px] font-bold text-neutral-700 focus:outline-none px-1"
                    />
                    {headers.length > 1 && (
                      <button
                        onClick={() => removeColumn(i)}
                        className="text-neutral-300 hover:text-red-400 p-0.5"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
              <th className="p-1 w-7 bg-neutral-100/50"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="group hover:bg-neutral-50 transition-all border-b border-neutral-100 last:border-0">
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="p-1 min-w-[90px]">
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                      className="w-full bg-transparent text-[13px] font-medium text-neutral-900 focus:outline-none px-1"
                      style={{ color: 'rgba(51, 51, 51, 0.99)' }}
                    />
                  </td>
                ))}
                <td className="p-1 text-right w-7">
                  {rows.length > 1 && (
                    <button
                      onClick={() => removeRow(rowIndex)}
                      className="text-neutral-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </WidgetWrapper>
  );
};

export const ResultDisplayWidget = () => {
  return (
    <WidgetWrapper
      label="Calculated Result"
      hint="Displays the final output based on inputs."
      iconColorClass="text-green-600"
      badge={
        <div className="flex items-center gap-1 neumorphic-elevated rounded-md px-2 py-1 text-[11px] font-bold text-green-700 select-none">
          <TrendingDown className="w-3.5 h-3.5" />
          <span>Optimal</span>
        </div>
      }
    >
      <div style={{
          boxShadow: 'inset 0px 1px 6px 0px rgb(0 0 0)',
          background: 'linear-gradient(to right, #fafafa, #f5f5f5, #e5e5e5)'
        }} className="flex w-full flex-col items-start gap-2 rounded-xl px-4 py-4 aspect-[2.4/1]">
          <div className="flex w-full items-center justify-between">
            <span className="text-[12px] font-bold text-neutral-500 uppercase tracking-wider">
              Monthly Payment
            </span>
            <div className="flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5 bg-opacity-60 border border-neutral-200">
              <TrendingDown className="h-3.5 w-3.5 text-neutral-600" />
              <span className="text-[12px] font-bold text-neutral-600">
                Low Rate
              </span>
            </div>
          </div>
          
          <div className="flex w-full gap-1.5 items-baseline">
            <span className="text-[26px] font-bold text-green-500 leading-none">
              $1,484
            </span>
            <span className="text-[13px] font-semibold text-neutral-500">
              / month
            </span>
          </div>
          
          <div className="flex w-full items-center gap-3 border-t border-dashed border-neutral-300 pt-2.5 mt-auto">
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-0">
              <span className="text-[12px] text-neutral-500 font-medium">
                Total Interest
              </span>
              <span className="text-[15px] font-bold text-neutral-800">
                $117,148
              </span>
            </div>
            <div className="flex h-6 w-px flex-none bg-neutral-300" />
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-0">
              <span className="text-[12px] text-neutral-500 font-medium">
                Total Amount
              </span>
              <span className="text-[15px] font-bold text-neutral-800">
                $367,148
              </span>
            </div>
          </div>
        </div>
    </WidgetWrapper>
  );
};
