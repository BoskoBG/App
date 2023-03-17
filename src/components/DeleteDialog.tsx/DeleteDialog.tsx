import {
  Dialog,
  DialogType,
  DialogFooter,
  DefaultButton,
  PrimaryButton,
} from "@fluentui/react";
import { User } from "../../types";

type delteDialogProps = {
  deleteUser: (id: number) => void;
  closeDialog: () => void;
  clickedUser: undefined | User;
};

const DeleteDialog = (props: delteDialogProps) => {
  const dialogContentProps = {
    type: DialogType.normal,
    title: "Delete User",
    closeButtonAriaLabel: "Close",
    subText: `Are you sure you want to delete user ${props.clickedUser!.name} ${
      props.clickedUser!.surname
    } `,
  };

  const onDeleteButtonHandler = () => {
    props.closeDialog();
    if (props.clickedUser) props.deleteUser(props.clickedUser.id);
  };

  return (
    <div>
      <Dialog
        hidden={false}
        onDismiss={props.closeDialog}
        dialogContentProps={dialogContentProps}
        modalProps={{
          topOffsetFixed: true,
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={onDeleteButtonHandler} text="Delete" />
          <DefaultButton onClick={props.closeDialog} text="Return" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
