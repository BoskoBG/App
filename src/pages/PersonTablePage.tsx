import FilterUsersComponents from "../components/FilterUsersComponents/FilterUsersComponent";
import { Stack } from "@fluentui/react/lib/Stack";
import { Filter, User } from "../types";
import Table from "../components/Table/Table";

type PersonTablePagePros = {
  users: User[];
  onDeleteUser: (id: number) => void;
  onEditUser: (id: number, newUser: User) => void;
  onFliterUsers: (filter: Filter) => void;
  onAddNewUser: (user: User) => void;
};

const PersonTablePage = (props: PersonTablePagePros) => {
  return (
    <Stack
      style={{
        alignItems: "center",
      }}
    >
      <FilterUsersComponents
        users={props.users}
        filterUsers={props.onFliterUsers}
      ></FilterUsersComponents>
      <Table
        items={props.users}
        deleteUser={props.onDeleteUser}
        editUser={props.onEditUser}
        addUser={props.onAddNewUser}
      ></Table>
    </Stack>
  );
};

export default PersonTablePage;
