import { useState } from "react";

import { Button } from "primereact/button";
import FilterChoice from "./FilterChoice";

export default function SpellToolbar({
  setFilters,
  displayedFilters,
  setDisplayedFilters,
  filters,
}) {
  const [showFilterChoice, setShowFilterChoice] = useState(false);

  return (
    <>
      <FilterChoice
        displayedFilters={displayedFilters}
        setDisplayedFilters={setDisplayedFilters}
        showFilterChoice={showFilterChoice}
        setShowFilterChoice={setShowFilterChoice}
        filters={filters}
        setFilters={setFilters}
      />
      <div className="d-flex flex-end">
        <div className="px-1">
          <Button
            icon="pi pi-filter"
            rounded
            outlined
            onClick={() => setShowFilterChoice(true)}
            tooltip="Show Filter Options"
            tooltipOptions={{ position: "left" }}
          />
        </div>
        <div className="px-1">
          <Button
            icon="pi pi-filter-slash"
            rounded
            outlined
            onClick={(e) => {
              e.target.blur();
              setFilters({});
            }}
            tooltip="Clear Filters"
            tooltipOptions={{ position: "left" }}
          />
        </div>
      </div>
    </>
  );
}
