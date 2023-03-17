import React, { useState, useEffect } from "react";
import {
  IStackTokens,
  Stack,
  TextField,
  ITextFieldStyles,
  Dropdown,
  IDropdownStyles,
  IDropdownOption,
  PrimaryButton,
  DefaultButton,
} from "@fluentui/react";
import { fetchAllUsersRequest } from "../../api/api";
import { Filter, User } from "../../types";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300, marginRight: 10 },
};
const textFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: { width: 300 },
};
const stackTokens: IStackTokens = { childrenGap: 20 };

type FilterUsersComponentsProps = {
  users: User[];
  filterUsers: (filter: Filter) => void;
};

type userTypeTypes = "all-types" | string;
type selectedOptionType = { id: userTypeTypes; text: userTypeTypes };

const FilterUsersComponents = ({
  filterUsers,
  users,
}: FilterUsersComponentsProps) => {
  const [dropdownOptions, setDropdownOptions] = useState<
    IDropdownOption<selectedOptionType>[]
  >([]);
  const [selectedOption, setselectedOption] = React.useState<
    IDropdownOption<selectedOptionType>
  >({ key: "all-types", text: "all-types" });
  const [insertedName, setInsertedName] = useState("");
  const updateDropdownOptions = () => {
    fetchAllUsersRequest()
      .then((res) => {
        const userTypeArr: userTypeTypes[] = res
          .map((user: User) => user.userType)
          .filter(
            (type: string, i: number, arr: string[]) => arr.indexOf(type) === i
          );

        return userTypeArr;
      })
      .then((res) => {
        const types = res.map((type) => {
          return {
            key: type,
            text: type,
          };
        });

        setDropdownOptions(types);
      })
      .catch((err) => console.log(err));
  };

  const onNameChangeHandler = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setInsertedName(newValue || "");
    },
    []
  );

  const onselectedOptionChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption<selectedOptionType>
  ): void => {
    if (option) setselectedOption(option);
  };

  const onSearchButtonClick = () => {
    filterUsers({ userType: selectedOption!.text, name: insertedName });
  };
  const onResetButtonClick = () => {
    setInsertedName("");
    filterUsers({ userType: "all-types", name: undefined });
    setselectedOption({ key: "all-types", text: "all-types" });
  };

  useEffect(() => {
    updateDropdownOptions();
  }, [users]);

  return (
    <div>
      <Stack>
        <h3 style={{ textAlign: "center", marginTop: 0 }}>
          Search User by type and name
        </h3>
        <Stack
          style={{
            flexDirection: "row",
          }}
        >
          <Dropdown
            selectedKey={selectedOption ? selectedOption.key : undefined}
            label="User Type"
            options={[
              { key: "all-types", text: "all-types" },
              ...dropdownOptions,
            ]}
            styles={dropdownStyles}
            onChange={onselectedOptionChange}
          />
          <Stack tokens={stackTokens}>
            <TextField
              label="Name"
              value={insertedName}
              onChange={onNameChangeHandler}
              styles={textFieldStyles}
            ></TextField>
          </Stack>
          <PrimaryButton
            onClick={onSearchButtonClick}
            style={{ marginLeft: 10, marginTop: 29 }}
            // disabled={!insertedName && !userType}
          >
            Search
          </PrimaryButton>
          <DefaultButton
            onClick={onResetButtonClick}
            style={{ marginLeft: 10, marginTop: 29 }}
            disabled={!insertedName && selectedOption.text === "all-types"}
          >
            Reset
          </DefaultButton>
        </Stack>
        <h4 style={{ textAlign: "center" }}>
          {!selectedOption && !insertedName
            ? "Please select search criteria."
            : "Press search button to filter users table."}
        </h4>
      </Stack>
    </div>
  );
};

export default FilterUsersComponents;
