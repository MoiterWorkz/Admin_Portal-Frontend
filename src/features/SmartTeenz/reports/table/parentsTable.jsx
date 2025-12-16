import { PARENT_TABLE_HEADERS } from "../../../../constants/reports";
import { currency } from "../../../../helper";

const ParentsTable = ({ rows = [] }) => {
  return (
    <table className="w-full text-sm">
      {/* TABLE HEAD (looped) */}
      <thead className="bg-muted/30 sticky top-0">
        <tr className="border-b border-border/30">
          {PARENT_TABLE_HEADERS.map((head) => (
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
            const status = (row.kycStatus ?? "").toLowerCase();
            const statusClass =
              status === "completed"
                ? "bg-green-500/10 text-green-400 border-green-500/30"
                : status === "pending"
                ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                : status === "rejected"
                ? "bg-red-500/10 text-red-400 border-red-500/30"
                : "bg-gray-100 text-gray-600";

            return (
              <tr
                key={row.id}
                className={`border-b border-border/10 transition-colors ${
                  idx % 2 === 0 ? "bg-transparent" : "bg-muted/10"
                }`}
              >
                {/* Parent */}
                <td className="p-3 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={row.avatar}
                      alt={row.name}
                      className="w-6 h-6 rounded-full object-cover border border-border/30"
                    />
                    <span className="font-medium truncate max-w-[140px]">
                      {row.name}
                    </span>
                  </div>
                </td>

                <td className="p-3">{row.gender}</td>
                <td className="p-3">{row.dob}</td>
                <td className="p-3">{row.age}</td>
                <td className="p-3 font-mono text-xs">{row.phone}</td>

                <td className="p-3">
                  <span className="truncate max-w-[160px] inline-block">
                    {row.email}
                  </span>
                </td>

                <td className="p-3">{row.pan}</td>
                <td className="p-3">{row.aadhar}</td>

                <td className="p-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs border font-medium ${statusClass}`}
                  >
                    {row.kycStatus}
                  </span>
                </td>

                <td className="p-3 text-xs">{row.kycType}</td>

                <td className="p-3">
                  <span className="truncate max-w-[180px] inline-block">
                    {row.address}
                  </span>
                </td>

                <td className="p-3">{row.city}</td>

                <td className="p-3 text-center font-medium text-chart-5">
                  {row.teens}
                </td>

                <td className="p-3 text-xs text-muted-foreground">
                  {row.created}
                </td>

                <td className="p-3 text-right font-medium text-chart-5">
                  {currency(row.balance)}
                </td>

                <td className="p-3 text-right font-medium text-red-400">
                  {currency(row.sent)}
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td
              colSpan={PARENT_TABLE_HEADERS.length}
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

export default ParentsTable;
