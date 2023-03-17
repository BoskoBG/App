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
  if (!filter.userType && !filter.name) return fetchAllUsersRequest();

  if (filter.userType === "all-types" && !filter.name)
    return fetchAllUsersRequest();

  if ((filter.userType === "all-types" || !filter.userType) && filter.name)
    return fetch(`${url}?name=${filter.name}`).then((res) => res.json());

  return fetch(
    !filter.name
      ? `${url}?userType=${filter.userType}`
      : `${url}?userType=${filter.userType}&name=${filter.name}`
  ).then((res) => res.json());
};
