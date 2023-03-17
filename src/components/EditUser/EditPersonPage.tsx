import React, { useState, useEffect } from "react";
import { User } from "../../types";
import { PrimaryButton } from "@fluentui/react";
import { TextField } from "@fluentui/react/lib/TextField";
import { Stack, IStackTokens } from "@fluentui/react/lib/Stack";

const stackTokens: IStackTokens = {
  childrenGap: 20,
  maxWidth: 350,
};

const getErrorMessage = (value: string): string => {
  return value.length !== 0 ? "" : `Field can't be empty.`;
};

type EditPersonPageProps = {
  clickedUser: User | undefined;
  onEditUser: (id: number, newUser: User) => void;
  closeModal: () => void;
};

const EditPersonPage = (props: EditPersonPageProps) => {
  const id = props.clickedUser!.id;
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [userType, setUserType] = useState("");
  const [city, setCity] = useState("");
  const [adress, setAdress] = useState("");
  const [createdDate, setCreatedDate] = useState("");

  const formHasAnEmptyInput = () =>
    !name || !surname || !userType || !city || !adress;

  console.log(props.clickedUser);

  useEffect(() => {
    setName(props.clickedUser!.name);
    setSurname(props.clickedUser!.surname);
    setUserType(props.clickedUser!.userType);
    setCity(props.clickedUser!.city);
    setAdress(props.clickedUser!.adress);
    setCreatedDate(props.clickedUser!.createdDate);
  }, []);

  const onNameChangeHandler = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setName(newValue || "");
    },
    []
  );

  const onSurnameChangeHandler = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setSurname(newValue || "");
    },
    []
  );

  const onUserTypeChangeHandler = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setUserType(newValue || "");
    },
    []
  );
  const onCityChangeHandler = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setCity(newValue || "");
    },
    []
  );
  const onAdressChangeHandler = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setAdress(newValue || "");
    },
    []
  );

  const submitEditedUser = () => {
    const newUser = {
      id: id,
      name,
      surname,
      userType,
      createdDate,
      city,
      adress,
    };
    props.onEditUser(id, newUser);
    props.closeModal();
  };

  return (
    <Stack tokens={stackTokens}>
      <h3
        style={{
          textAlign: "center",
        }}
      >
        Edit User
      </h3>
      <strong>Hint: All inputs are obligatory.</strong>
      <TextField
        label="Name"
        value={name}
        onChange={onNameChangeHandler}
        onGetErrorMessage={getErrorMessage}
        validateOnFocusOut
      />
      <TextField
        label="Surname"
        value={surname}
        onChange={onSurnameChangeHandler}
        onGetErrorMessage={getErrorMessage}
        validateOnFocusOut
      />
      <TextField
        label="User Type"
        value={userType}
        onChange={onUserTypeChangeHandler}
        onGetErrorMessage={getErrorMessage}
        validateOnFocusOut
      />
      <TextField
        label="City"
        value={city}
        onChange={onCityChangeHandler}
        onGetErrorMessage={getErrorMessage}
        validateOnFocusOut
      />
      <TextField
        label="Adress"
        value={adress}
        onChange={onAdressChangeHandler}
        onGetErrorMessage={getErrorMessage}
        validateOnFocusOut
      />
      <PrimaryButton
        onClick={submitEditedUser}
        disabled={formHasAnEmptyInput()}
      >
        Submit
      </PrimaryButton>
    </Stack>
  );
};

export default EditPersonPage;
