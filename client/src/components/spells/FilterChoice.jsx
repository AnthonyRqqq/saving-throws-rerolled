import { useState } from "react";

import { Sidebar } from "primereact/sidebar";
import { SelectButton } from "primereact/selectbutton";
import { Button } from "primereact/button";

import "./FilterChoice.css";

export default function FilterChoice({
  displayedFilters,
  setDisplayedFilters,
  showFilterChoice,
  setShowFilterChoice,
}) {
  const [reload, setReload] = useState(0);
  const choices = ["School", "Level", "Class", "Concentration", "Ritual"];

  const FilterOptions = () => {
    return (
      <>
        {choices.map((choice, idx) => {
          return (
            <SelectButton
              className="py-2 filterButton"
              key={idx}
              options={[choice]}
              value={displayedFilters.includes(choice) && choice}
              onClick={(e) => {
                let newFilters = displayedFilters;
                if (newFilters.includes(choice))
                  newFilters = newFilters.filter((ch) => ch !== choice);
                else newFilters.push(choice);

                setDisplayedFilters(newFilters);
                setReload((prev) => prev + 1);
              }}
            />
          );
        })}

        <SelectButton
          className="filterButton border-red py-2"
          options={["Reset Options"]}
          onClick={() => setDisplayedFilters([])}
          tooltip="Clear all currently selected filter options."
          tooltipOptions={{ position: 'left'}}
        />
      </>
    );
  };

  const Header = () => {
    return (
      <div className="d-flex align-items-center">
        <h3 className="underline px-2">Filter Options</h3>
      </div>
    );
  };

  return (
    <Sidebar
      position="right"
      visible={showFilterChoice}
      onHide={() => setShowFilterChoice(false)}
      header={<Header />}
    >
      <FilterOptions />
    </Sidebar>
  );
}
