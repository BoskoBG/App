import { useState } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  Stack,
  IconButton,
  initializeIcons,
} from "@fluentui/react";
import DeleteDialog from "../DeleteDialog.tsx/DeleteDialog";
import ModalWindow from "../ModalWindow.tsx/ModalWindow";
import { User } from "../../types";
initializeIcons();

type TableProps = {
  items: User[];
  deleteUser: (id: number) => void;
  editUser: (id: number, newUser: User) => void;
  addUser: (user: User) => void;
};

const Table = (props: TableProps) => {
  const [deleteDialogActive, setDeleteDialogActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalType, setModalType] = useState<"ADD" | "EDIT">("ADD");

  const [selectedItem, setSelectedItem] = useState<User | undefined>(undefined);
  const selection = new Selection({
    onSelectionChanged: () => {
      setSelectedItem(selection.getSelection()[0] as User);
    },
  });

  const columns = [
    {
      key: "column1",
      name: "Name",
      fieldName: "name",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Surname",
      fieldName: "surname",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column3",
      name: "UserType",
      fieldName: "userType",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column4",
      name: "Created Date",
      fieldName: "createdDate",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column5",
      name: "City",
      fieldName: "city",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column6",
      name: "Adress",
      fieldName: "adress",
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
    },
  ];

  const closeDialog = () => {
    setDeleteDialogActive(false);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  return (
    <Stack
      style={{
        marginTop: 10,
        width: "100%",
      }}
    >
      <Stack
        grow={1}
        horizontal={true}
        horizontalAlign="end"
        tokens={{ childrenGap: 10 }}
      >
        <IconButton
          iconProps={{
            iconName: "Add",
          }}
          onClick={() => {
            setModalType("ADD");
            setModalActive(true);
          }}
        />
        {selectedItem && (
          <IconButton
            iconProps={{
              iconName: "Edit",
            }}
            onClick={() => {
              setModalType("EDIT");
              setModalActive(true);
            }}
          />
        )}
        {selectedItem && (
          <IconButton
            iconProps={{
              iconName: "Delete",
            }}
            onClick={() => {
              setDeleteDialogActive(true);
            }}
          />
        )}
      </Stack>
      <DetailsList
        items={props.items}
        columns={columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.justified}
        selection={selection}
        selectionMode={1}
        selectionPreservedOnEmptyClick={false}
      />
      {deleteDialogActive && (
        <DeleteDialog
          deleteUser={props.deleteUser}
          closeDialog={closeDialog}
          clickedUser={selectedItem}
        ></DeleteDialog>
      )}
      {modalActive && (
        <ModalWindow
          clickedUser={selectedItem}
          modalType={modalType}
          addUser={props.addUser}
          editUser={props.editUser}
          closeModal={closeModal}
        ></ModalWindow>
      )}
    </Stack>
  );
};

export default Table;
