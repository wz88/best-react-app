export type TableProps = {
  headers: string[];
  rows: string[][];
  className?: string;
};

export function Table({ headers, rows, className }: TableProps) {
  return (
    <div className={`overflow-x-auto ${className || ''}`}>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {headers.map((header, index) => (
              <th
                className="border-b px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                key={index}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {rows.map((row, rowIndex) => (
            <tr className="hover:bg-gray-50" key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  className="border-b px-6 py-4 text-sm whitespace-nowrap text-gray-900"
                  dangerouslySetInnerHTML={{ __html: cell }}
                  key={cellIndex}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
