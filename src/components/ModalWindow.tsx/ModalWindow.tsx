import { Modal, Stack } from "@fluentui/react";
import NewPersonPage from "../AddUser/NewPersonPage";
import EditPersonPage from "../EditUser/EditPersonPage";
import { User } from "../../types";

type ModalWindowProps = {
  clickedUser: User | undefined;
  addUser: (user: User) => void;
  modalType: "ADD" | "EDIT";
  editUser: (id: number, newUser: User) => void;
  closeModal: () => void;
};

const ModalWindow = ({
  clickedUser,
  addUser,
  editUser,
  closeModal,
  modalType,
}: ModalWindowProps) => {
  return (
    <Modal isOpen={true} onDismiss={closeModal} isBlocking={false}>
      <Stack
        style={{
          width: 400,
          paddingTop: 20,
          paddingBottom: 40,
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        {modalType === "ADD" && (
          <NewPersonPage
            addNewUser={addUser}
            closeModal={closeModal}
          ></NewPersonPage>
        )}
        {modalType === "EDIT" && (
          <EditPersonPage
            clickedUser={clickedUser}
            onEditUser={editUser}
            closeModal={closeModal}
          ></EditPersonPage>
        )}
      </Stack>
    </Modal>
  );
};

export default ModalWindow;
