import { ConfirmDialog } from "primereact/confirmdialog";

export default function Confirm({
  onYes,
  onNo,
  confirmText,
  yesButton,
  noButton,
  show,
  onHide,
}) {
  return (
    <ConfirmDialog
      visible={show}
      message={confirmText}
      acceptLabel={yesButton}
      rejectLabel={noButton}
      accept={onYes}
      reject={onNo}
      onHide={onHide}
    />
  );
}
