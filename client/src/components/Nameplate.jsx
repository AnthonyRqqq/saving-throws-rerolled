import { Card } from "primereact/card";
import { Button } from "primereact/button";
import Confirm from "./modals/Confirm";

import { useState } from "react";

import "./Nameplate.css";

export default function NamePlate({ display, onClick, onDelete, onUpdate }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <Confirm
        onYes={onDelete}
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
      />

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
                <Button
                  icon="pi pi-trash"
                  color="red"
                  rounded
                  outlined
                  onClick={() => setShowConfirm(true)}
                />
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
