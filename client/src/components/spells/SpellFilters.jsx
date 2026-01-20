import { useState, useEffect } from "react";

import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";

export default function SpellFilters({
  allSpells,
  spells,
  setSpells,
  filters,
  setFilters,
  displayedFilters,
  setDisplayedFilters,
}) {
  useEffect(() => {
    let newSpells = allSpells;
    Object.entries(filters).forEach(([key, val]) => {
      if (val) {
        switch (key) {
          case "name":
            newSpells = newSpells.filter((spell) =>
              spell.name.toLowerCase().includes(val.toLowerCase()),
            );
        }
      }
    });

    if (Object.keys(filters).length) return setSpells(newSpells);
    setSpells(allSpells)
  }, [filters]);

  return (
    <div>
      <InputText
        onChange={(e) => {
          setFilters((prev) => ({ ...prev, ["name"]: e.target.value }));
        }}
        value={filters['name'] || ''}
      />

      {displayedFilters.map((filter) => (
        // filter.name
        // filter.values
        // filter.multi
        <div></div>
      ))}
    </div>
  );
}
