import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Stack } from "@fluentui/react/lib/Stack";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import PersonTablePage from "./pages/PersonTablePage";
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
  const navigate = useNavigate();

  const addNewUser = (user: User) => {
    postNewUserRequest(user).then(() => {
      setUsers([...users, user]);
      navigate("/");
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
    getFilteredUsersRequest(filter).then((res) => setUsers(res));
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
                <PersonTablePage
                  users={users}
                  onDeleteUser={deleteUser}
                  onEditUser={editUser}
                  onAddNewUser={addNewUser}
                  onFliterUsers={filterUsers}
                ></PersonTablePage>
              }
            ></Route>
          </Routes>
        </Stack>
      </Stack>
    </div>
  );
};

export default App;
