import { CheckCircle, XCircle } from "lucide-react";

const TeenTable = ({ headers, rows, currency }) => {
  return (
    <table className="w-full text-sm">
      {/* TABLE HEAD */}
      <thead className="bg-muted/30 sticky top-0">
        <tr className="border-b border-border/30">
          {headers.map((head) => (
            <th
              key={head.key}
              className={`p-3 text-xs text-muted-foreground uppercase tracking-wider whitespace-nowrap text-${head.align}`}
            >
              {head.label}
            </th>
          ))}
        </tr>
      </thead>

      {/* TABLE BODY */}
      <tbody>
        {rows.length ? (
          rows.map((row, idx) => (
            <tr
              key={row.id}
              className={`border-b border-border/10 transition-colors ${
                idx % 2 === 0 ? "bg-transparent" : "bg-muted/10"
              }`}
            >
              <td className="p-3 whitespace-nowrap">
                <div className="flex items-center gap-2.5">
                  <img
                    src={row.avatar}
                    alt={row.name}
                    className="w-6 h-6 rounded-full object-cover border border-border/30"
                  />
                  <span className="text-foreground font-medium truncate max-w-[140px]">
                    {row.name}
                  </span>
                </div>
              </td>

              <td className="p-3">{row.gender}</td>
              <td className="p-3">{row.dob}</td>
              <td className="p-3">{row.age}</td>
              <td className="p-3 font-mono">{row.phone}</td>

              <td className="p-3">
                <span className="truncate max-w-[160px] inline-block">
                  {row.email}
                </span>
              </td>

              <td className="p-3">{row.city}</td>

              {/* Linked status inline */}
              <td className="p-3 whitespace-nowrap">
                <div
                  className={`flex items-center gap-1.5 ${
                    row.linked ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {row.linked ? (
                    <CheckCircle className="w-3.5 h-3.5" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5" />
                  )}
                  <span className="text-xs">{row.linked ? "Yes" : "No"}</span>
                </div>
              </td>

              <td className="p-3">{row.relationship}</td>
              <td className="p-3 text-xs text-muted-foreground">
                {row.created}
              </td>
              <td className="p-3 text-xs text-muted-foreground">
                {row.lastLogin}
              </td>
              <td className="p-3 text-right">{currency(row.balance)}</td>
              <td className="p-3 text-center text-green-400 font-medium">
                {row.done}
              </td>
              <td className="p-3 text-center text-yellow-400 font-medium">
                {row.pending}
              </td>
              <td className="p-3 text-right">{currency(row.rewards)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={headers.length}
              className="text-center py-4 text-gray-500"
            >
              No records found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TeenTable;
