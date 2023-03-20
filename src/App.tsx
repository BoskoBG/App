import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Stack } from "@fluentui/react/lib/Stack";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import { UsersPage } from "./pages/UsersPage";
import { User, Filter } from "./types";
import {
  deleteUserRequest,
  editUserRequest,
  fetchAllUsersRequest,
  getFilteredUsersRequest,
  postNewUserRequest,
} from "./api/api";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [noFilteredUsers, setNoFilteredUsers] = useState(false);
  const [newUserAdded, setNewUserAdded] = useState(false);

  const addNewUser = (user: User) => {
    postNewUserRequest(user).then(() => {
      getFilteredUsersRequest({ userType: "all-types", name: "" }).then(
        (res) => {
          setNewUserAdded((prev) => !prev);
          setNoFilteredUsers(false);
          setUsers(() => res);
        }
      );
    });
  };

  const deleteUser = (id: number) => {
    deleteUserRequest(id).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  const editUser = (id: number, newUser: User) => {
    editUserRequest(id, newUser).then(() => {
      setUsers(users.map((user) => (user.id === id ? newUser : user)));
    });
  };

  const filterUsers = (filter: Filter) => {
    getFilteredUsersRequest(filter).then((res) => {
      res.length === 0 ? setNoFilteredUsers(true) : setNoFilteredUsers(false);
      setUsers(res);
    });
  };

  useEffect(() => {
    fetchAllUsersRequest().then((res) => setUsers(res));
  }, []);

  return (
    <div>
      <Header></Header>
      <Stack
        style={{
          flexDirection: "row",
        }}
      >
        <Navigation></Navigation>
        <Stack
          style={{
            alignItems: "center",
            width: "100%",
            paddingTop: "50px",
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <UsersPage
                  users={users}
                  onDeleteUser={deleteUser}
                  onEditUser={editUser}
                  onAddNewUser={addNewUser}
                  onFliterUsers={filterUsers}
                  noFilteredUsers={noFilteredUsers}
                  newUserAdded={newUserAdded}
                ></UsersPage>
              }
            ></Route>
          </Routes>
        </Stack>
      </Stack>
    </div>
  );
};

export default App;
