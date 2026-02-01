import { useState, useEffect } from "react";

import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";

import { spellClass, spellLevel, spellSchool } from "./filters";

export default function SpellFilters({
  allSpells,
  spells,
  setSpells,
  filters,
  setFilters,
  displayedFilters,
}) {
  useEffect(() => {
    let newSpells = [...allSpells];
    Object.entries(filters).forEach(([key, val]) => {
      if (val) {
        switch (key) {
          case "name":
            newSpells = newSpells.filter((spell) =>
              spell.name.toLowerCase().includes(val.toLowerCase()),
            );
            break;
          case "school":
            newSpells = newSpells.filter((spell) => val.includes(spell.school));
            break;
          case "class":
            newSpells = newSpells.filter((spell) =>
              spell.classList.some((opt) => val.includes(opt)),
            );
            break;
          case "level":
            newSpells = newSpells.filter((spell) => val.includes(spell.level));
            break;
          case "ritual":
            const ritual = val[0] === "Ritual Only";
            newSpells = newSpells.filter((spell) => spell.isRitual === ritual);
            break;
          case "concentration":
            const concentration = val[0] === "Concentration Only";
            newSpells = newSpells.filter(
              (spell) => spell.isConcentration === concentration,
            );
            break;
        }
      }
    });

    if (Object.keys(filters).length) return setSpells(newSpells);
    setSpells(allSpells);
  }, [filters]);

  const handleChange = ({ name, val, multi = true }) => {
    if (!filters[name]) {
      return setFilters((prev) => ({ ...prev, [name]: [val] }));
    }

    let newFilters = { ...filters };
    if (newFilters[name].includes(val)) {
      newFilters[name] = newFilters[name].filter((f) => f !== val);
    } else {
      if (multi) newFilters[name].push(val);
      else newFilters[name] = [val];
    }

    if (!newFilters[name].length) delete newFilters[name];

    setFilters(newFilters);
  };

  const filterMap = {
    Concentration: {
      values: ["Concentration Only", "No Concentration"],
      multi: false,
    },
    Ritual: {
      values: ["Ritual Only", "No Ritual"],
      multi: false,
    },
    School: { values: spellSchool },
    Level: { values: spellLevel },
    Class: { values: spellClass },
  };

  return (
    <div key={displayedFilters}>
      <div className="py-1">
        <div className="py-1">Name</div>
        <InputText
          onChange={(e) => {
            setFilters((prev) => ({ ...prev, ["name"]: e.target.value }));
          }}
          value={filters["name"] || ""}
        />
      </div>
      {displayedFilters.map((filter, index) => {
        const filterObj = filterMap[filter];
        return (
          <>
            <div className="pt-2">{filter}</div>

            <div
              key={index}
              className="d-flex justify-content-center flex-wrap"
            >
              {filterObj.values.map((val, idx) => (
                <SelectButton
                  className="px-2 py-1 filterButton"
                  key={val}
                  options={[val]}
                  value={filters[filter.toLowerCase()]?.includes(val) && val}
                  onClick={() => {
                    handleChange({
                      name: filter.toLowerCase(),
                      val,
                      multi: filterObj.multi !== false,
                    });
                  }}
                />
              ))}
            </div>
          </>
        );
      })}
    </div>
  );
}
