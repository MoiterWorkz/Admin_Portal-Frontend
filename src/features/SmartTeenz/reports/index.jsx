import { useState } from "react";
import { FileText } from "lucide-react";

import Header from "./header";
import TeensReport from "./teensReport";
import ParentsReport from "./parentsReport";
import ChoresReport from "./choresReport";
import WalletTransfersReport from "./walletTransfersReport";

const reports = [
  { key: "teen", Component: TeensReport },
  { key: "parent", Component: ParentsReport },
  { key: "chores", Component: ChoresReport },
  { key: "wallet", Component: WalletTransfersReport },
];

const Reports = () => {
  const [openKey, setOpenKey] = useState(null);

  const toggle = (key) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <div>
      <Header
        Icon={FileText}
        title="Detailed Reports"
        subtitle="Comprehensive data analytics with export capabilities"
      />

      {reports.map(({ key, Component }) => (
        <Component
          key={key}
          isOpen={openKey === key}
          onToggle={() => toggle(key)}
        />
      ))}
    </div>
  );
};

export default Reports;
