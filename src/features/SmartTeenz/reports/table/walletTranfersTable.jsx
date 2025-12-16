import { ArrowRight } from "lucide-react";
import { currency } from "../../../../helper";
import { WALLET_TABLE_HEADERS } from "../../../../constants/reports";

const WalletTransfersTable = ({ rows = [] }) => {
  return (
    <table className="w-full text-sm">
      {/* TABLE HEAD (looped) */}
      <thead className="bg-muted/30 sticky top-0">
        <tr className="border-b border-border/30">
          {WALLET_TABLE_HEADERS.map((head) => (
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
              status === "success"
                ? "bg-green-500/10 text-green-400 border-green-500/30"
                : status === "pending"
                ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                : "bg-red-500/10 text-red-400 border-red-500/30";

            const [from, to] = row.type?.split("→") ?? [];

            return (
              <tr
                key={row.id + idx}
                className={`border-b border-border/10 transition-colors ${
                  idx % 2 === 0 ? "bg-transparent" : "bg-muted/10"
                }`}
              >
                {/* Transaction ID */}
                <td className="p-3 font-mono text-xs text-primary whitespace-nowrap">
                  {row.id}
                </td>

                {/* Sender */}
                <td className="p-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{row.senderName}</span>
                    <span className="text-xs text-gray-500">
                      {row.senderRole}
                    </span>
                  </div>
                </td>

                {/* Receiver */}
                <td className="p-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{row.receiverName}</span>
                    <span className="text-xs text-gray-500">
                      {row.receiverRole}
                    </span>
                  </div>
                </td>

                {/* Type */}
                <td className="p-3">
                  <div className="flex items-center gap-1.5 text-primary text-xs">
                    <span>{from}</span>
                    <ArrowRight className="w-3 h-3" />
                    <span>{to}</span>
                  </div>
                </td>

                <td className="p-3 font-mono text-xs">{row.senderPhone}</td>

                <td className="p-3 font-mono text-xs">{row.receiverPhone}</td>

                <td className="p-3 text-right font-medium text-chart-5">
                  {currency(row.amount)}
                </td>

                <td className="p-3">{row.mode}</td>

                <td className="p-3 text-xs text-muted-foreground">
                  {row.datetime}
                </td>

                {/* Status */}
                <td className="p-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs border font-medium ${statusClass}`}
                  >
                    {row.status}
                  </span>
                </td>

                <td className="p-3">
                  <span className="truncate max-w-[180px] inline-block text-xs">
                    {row.notes}
                  </span>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td
              colSpan={WALLET_TABLE_HEADERS.length}
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

export default WalletTransfersTable;
