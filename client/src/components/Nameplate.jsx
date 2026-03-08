import { Card } from "primereact/card";
import { Button } from "primereact/button";

import "./Nameplate.css";

export default function NamePlate({ display, onClick, onDelete, onUpdate }) {
  return (
    <Card className="my-4 mx-1 nameplate">
      <div className="nameplate-row">
        {/* Empty div here to make sure title stays centered and action buttons stay on end */}
        <div></div>

        <div
          className={onClick ? "hover-click" : ""}
          onClick={() => {
            if (!onClick) return;

            onClick();
          }}
        >
          {display}
        </div>

        <div className="d-flex flex-end">
          {onUpdate && (
            <div className="px-1">
              <Button icon="pi pi-pencil" rounded outlined />
            </div>
          )}
          {onDelete && (
            <div className="px-1">
              <Button icon="pi pi-trash" color="red" rounded outlined />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
