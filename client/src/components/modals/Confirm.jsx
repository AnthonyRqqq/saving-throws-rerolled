import { ConfirmDialog } from "primereact/confirmdialog";

export default function Confirm({
  onYes,
  onNo,
  confirmText = 'Are you sure you want to cast this spell? What is done cannot be undone.',
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
