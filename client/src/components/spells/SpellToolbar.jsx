import { useState } from "react";

import { Button } from "primereact/button";
import FilterChoice from "./FilterChoice";

export default function SpellToolbar({
  setFilters,
  displayedFilters,
  setDisplayedFilters,
}) {
  const [showFilterChoice, setShowFilterChoice] = useState(false);

  return (
    <>
      <FilterChoice
        displayedFilters={displayedFilters}
        setDisplayedFilters={setDisplayedFilters}
        showFilterChoice={showFilterChoice}
        setShowFilterChoice={setShowFilterChoice}
      />
      <div className="d-flex flex-end">
        <div className="px-1">
          <Button
            icon="pi pi-filter"
            rounded
            outlined
            onClick={() => setShowFilterChoice(true)}
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
          />
        </div>
      </div>
    </>
  );
}
