import React, { useState } from "react";
import AdvertisementHeader from "./AdvertisementHeader";
import CreateAdvertisement from "./CreateAdvertisement";

const AdsMain = () => {
  const [view, setView] = useState("list"); // list | create

  return (
    <div className="flex-1">
      {view === "list" && (
        <AdvertisementHeader onCreate={() => setView("create")} />
      )}

      {view === "create" && (
        <CreateAdvertisement onCancel={() => setView("list")} />
      )}
    </div>
  );
};

export default AdsMain;
