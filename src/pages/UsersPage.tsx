import FilterUsersComponents from "../components/FilterUsersComponents/FilterUsersComponent";
import { Stack } from "@fluentui/react/lib/Stack";
import { Filter, User } from "../types";
import Table from "../components/Table/Table";

type UsersPagePros = {
  users: User[];
  onDeleteUser: (id: number) => void;
  onEditUser: (id: number, newUser: User) => void;
  onFliterUsers: (filter: Filter) => void;
  onAddNewUser: (user: User) => void;
  noFilteredUsers: boolean;
  newUserAdded: boolean;
};

export const UsersPage = (props: UsersPagePros) => {
  return (
    <Stack
      style={{
        alignItems: "center",
      }}
    >
      <FilterUsersComponents
        users={props.users}
        filterUsers={props.onFliterUsers}
        newUserAdded={props.newUserAdded}
      ></FilterUsersComponents>
      <Table
        items={props.users}
        deleteUser={props.onDeleteUser}
        editUser={props.onEditUser}
        addUser={props.onAddNewUser}
        noFilteredUsers={props.noFilteredUsers}
      ></Table>
    </Stack>
  );
};
