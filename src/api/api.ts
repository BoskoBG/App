import { Filter, User } from "../types";

const url = "http://localhost:8000/person";

export const fetchAllUsersRequest = () => fetch(url).then((res) => res.json());

export const postNewUserRequest = (user: User) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const deleteUserRequest = (id: number) =>
  fetch(`${url}/${id}`, {
    method: "DELETE",
  });

export const editUserRequest = (id: number, newUser: User) =>
  fetch(`${url}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getFilteredUsersRequest = (filter: Filter) => {
  if (filter.userType === "all-types" && !filter.name)
    return fetchAllUsersRequest();

  if (filter.userType === "all-types" && filter.name)
    return fetch(`${url}?name_like=${filter.name}`)
      .then((res) => res.json())
      .then((res) =>
        res.filter(
          (item: User) =>
            item.name.slice(0, filter.name?.length).toLowerCase() ===
            filter.name?.toLowerCase()
        )
      );

  if (filter.userType !== "all-types" && !filter.name)
    return fetch(`${url}?userType=${filter.userType}`).then((res) =>
      res.json()
    );

  return fetch(`${url}?userType=${filter.userType}&name_like=${filter.name}`)
    .then((res) => res.json())
    .then((res) =>
      res.filter(
        (item: User) =>
          item.name.slice(0, filter.name?.length).toLowerCase() ===
          filter.name?.toLowerCase()
      )
    );
};
