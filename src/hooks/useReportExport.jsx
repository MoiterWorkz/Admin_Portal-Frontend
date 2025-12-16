import * as XLSX from "xlsx";

export function useReportExport({
  rows,
  fileName,
  csvHeaders,
  csvMapper,
  xlsMapper,
}) {
  /* ---------- CSV ---------- */
  const downloadCSV = () => {
    if (!rows || rows.length === 0) return;

    const csvContent = [
      csvHeaders.join(","),
      ...rows.map((row) =>
        csvMapper(row)
          .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${fileName}_${new Date().toISOString().slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  /* ---------- XLS ---------- */
  const downloadXLS = () => {
    if (!rows || rows.length === 0) return;

    const exportData = rows.map(xlsMapper);
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    worksheet["!cols"] = Object.keys(exportData[0]).map(() => ({
      wch: 22,
    }));

    XLSX.writeFile(
      workbook,
      `${fileName}_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  };

  return { downloadCSV, downloadXLS };
}
