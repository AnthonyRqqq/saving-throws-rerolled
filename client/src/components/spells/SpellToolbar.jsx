import { Button } from "primereact/button";

export default function SpellToolbar({
  filters,
  setFilters,
  displayedFilters,
  setDisplayedFilters,
}) {
  return (
    <div className="d-flex flex-end">
      <div className="px-1">
        <Button icon="pi pi-filter" rounded outlined />
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
  );
}
