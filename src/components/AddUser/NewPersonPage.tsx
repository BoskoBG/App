import React, { useState } from "react";
import { User } from "../../types";
import { TextField } from "@fluentui/react/lib/TextField";
import { Stack, IStackTokens } from "@fluentui/react/lib/Stack";

import { PrimaryButton } from "@fluentui/react/lib/Button";

const stackTokens: IStackTokens = {
  childrenGap: 20,
  maxWidth: 350,
};

const getErrorMessage = (value: string): string => {
  return value.length !== 0 ? "" : `Field can't be empty.`;
};

type NewPersonPageProps = {
  addNewUser: (user: User) => void;
  closeModal: () => void;
};

const NewPersonPage = (props: NewPersonPageProps) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredSurname, setEnteredSurname] = useState("");
  const [enteredUserType, setEnteredUserType] = useState("");
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredAdress, setEnteredAdress] = useState("");

  const formHasAnEmptyInput = () =>
    !enteredName ||
    !enteredSurname ||
    !enteredUserType ||
    !enteredCity ||
    !enteredAdress;

  const onNameChangeHandler = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setEnteredName(newValue || "");
    },
    []
  );

  const onSurnameChangeHandler = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setEnteredSurname(newValue || "");
    },
    []
  );

  const onUserTypeChangeHandler = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setEnteredUserType(newValue || "");
    },
    []
  );

  const onCityChangeHandler = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setEnteredCity(newValue || "");
    },
    []
  );

  const onAdressChangeHandler = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setEnteredAdress(newValue || "");
    },
    []
  );

  const submitNewUser = () => {
    if (formHasAnEmptyInput()) return;

    const enteredUser: User = {
      name: enteredName,
      surname: enteredSurname,
      id: (() => Math.floor(100000 + Math.random() * 900000))(),
      createdDate: (() => {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return `${day}-${month}-${year}`;
      })(),
      userType: enteredUserType,
      city: enteredCity,
      adress: enteredAdress,
    };

    props.addNewUser(enteredUser);
    props.closeModal();
  };

  return (
    <Stack tokens={stackTokens}>
      <h3 style={{ marginTop: 0, textAlign: "center" }}>Register</h3>
      <strong>Hint: All inputs are obligatory.</strong>
      <TextField
        label="Name"
        value={enteredName}
        onChange={onNameChangeHandler}
        onGetErrorMessage={getErrorMessage}
        validateOnFocusOut
      />
      <TextField
        label="Surname"
        value={enteredSurname}
        onChange={onSurnameChangeHandler}
        onGetErrorMessage={getErrorMessage}
        validateOnFocusOut
      />
      <TextField
        label="User Type"
        value={enteredUserType}
        onChange={onUserTypeChangeHandler}
        onGetErrorMessage={getErrorMessage}
        validateOnFocusOut
      />
      <TextField
        label="City"
        value={enteredCity}
        onChange={onCityChangeHandler}
        onGetErrorMessage={getErrorMessage}
        validateOnFocusOut
      />
      <TextField
        label="Adress"
        value={enteredAdress}
        onChange={onAdressChangeHandler}
        onGetErrorMessage={getErrorMessage}
        validateOnFocusOut
      />
      <PrimaryButton onClick={submitNewUser} disabled={formHasAnEmptyInput()}>
        Submit
      </PrimaryButton>
    </Stack>
  );
};

export default NewPersonPage;
