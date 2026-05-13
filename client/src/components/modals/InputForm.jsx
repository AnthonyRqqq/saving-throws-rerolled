import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { useEffect } from "react";

export default function InputForm({
  onYes,
  onNo,
  confirmText = "Are you sure you want to cast this spell?",
  yesButton = "Confirm",
  noButton = "Reject",
  show,
  onHide,
  defaultVal = "",
  header,
  setVal,
  val,
}) {
  useEffect(() => {
    if (val) return;

    setVal(defaultVal);
  }, [defaultVal]);

  return (
    <Dialog header={header} visible={show} onHide={onHide}>
      <div>{confirmText}</div>
      <div>
        <InputText value={val} onChange={(e) => setVal(e.target.value)} />
      </div>
      <div>
        <Button
          onClick={async () => {
            await onYes();
            await onHide();
          }}
          label={yesButton}
        />
        <Button onClick={onNo} label={noButton} />
      </div>
    </Dialog>
  );
}
