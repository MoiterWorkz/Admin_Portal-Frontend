import { CHORES_TABLE_HEADERS } from "../../../../constants/reports";
import { currency } from "../../../../helper";

const ChoresTable = ({ rows = [] }) => {
  return (
    <table className="w-full text-sm">
      {/* TABLE HEAD (looped) */}
      <thead className="bg-muted/30 sticky top-0">
        <tr className="border-b border-border/30">
          {CHORES_TABLE_HEADERS.map((head) => (
            <th
              key={head.label}
              className={`p-3 text-xs text-muted-foreground uppercase tracking-wider whitespace-nowrap ${
                head.align === "right"
                  ? "text-right"
                  : head.align === "center"
                  ? "text-center"
                  : "text-left"
              }`}
            >
              {head.label}
            </th>
          ))}
        </tr>
      </thead>

      {/* TABLE BODY (explicit JSX) */}
      <tbody>
        {rows.length > 0 ? (
          rows.map((row, idx) => {
            const status = (row.status ?? "").toLowerCase();
            const statusClass =
              status === "completed"
                ? "bg-green-500/10 text-green-400 border-green-500/30"
                : status === "pending"
                ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                : status === "overdue"
                ? "bg-red-500/10 text-red-400 border-red-500/30"
                : "bg-gray-100 text-gray-600";

            const verified = (row.verified ?? "").toLowerCase();
            const verifiedClass =
              verified === "verified"
                ? "bg-green-500/10 text-green-400 border-green-500/30"
                : "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";

            return (
              <tr
                key={row.id}
                className={`border-b border-border/10 transition-colors ${
                  idx % 2 === 0 ? "bg-transparent" : "bg-muted/10"
                }`}
              >
                <td className="p-3 font-medium whitespace-nowrap">
                  {row.title}
                </td>

                <td className="p-3">
                  <span className="truncate max-w-[240px] inline-block text-xs">
                    {row.description}
                  </span>
                </td>

                <td className="p-3">{row.parent}</td>
                <td className="p-3">{row.teen}</td>

                <td className="p-3 text-xs text-muted-foreground">
                  {row.assigned}
                </td>

                <td className="p-3 text-xs text-muted-foreground">
                  {row.dueDate}
                </td>

                <td className="p-3 text-xs text-muted-foreground">
                  {row.completed}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs border font-medium ${statusClass}`}
                  >
                    {row.status}
                  </span>
                </td>

                <td className="p-3 text-right font-medium text-chart-5">
                  {currency(row.reward)}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs border font-medium ${verifiedClass}`}
                  >
                    {row.verified}
                  </span>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td
              colSpan={CHORES_TABLE_HEADERS.length}
              className="text-center py-6 text-gray-500"
            >
              No records found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ChoresTable;
