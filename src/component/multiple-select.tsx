import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function MultipleSelect({ value, handleFieldsChange }) {
  // const [value, setValue] = useState<string[]>([]);
  // const handleSelectChange = (event, newValue: string[]) => {
  //   setValue(newValue);
  // };

  return (
    <>
      {/* <div>{`value: ${value !== null ? `'${value}'` : "null"}`}</div> */}

      <div className="container">
        <Autocomplete
          multiple
          onChange={handleFieldsChange}
          value={value}
          id="checkboxes-tags-demo"
          options={fields}
          getOptionDisabled={(option) => option.isDisabled}
          disableCloseOnSelect
          getOptionLabel={(option) => option.header}
          renderOption={(props, option, { selected }) => {
            const { key, ...optionProps } = props;
            return (
              <li key={key} {...optionProps}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                <div style={{ display: "flex" }}>
                  <div style={{ width: "200px" }}>
                    {option.accessorKey}
                    {option.isDisabled && (
                      <span className="disabled-text">(Disabled)</span>
                    )}
                  </div>
                  <div>{option.description}</div>
                </div>
              </li>
            );
          }}
          style={{ width: 800 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Attributes" placeholder="" />
          )}
        />
      </div>
    </>
  );
}
const fields = [
  {
    accessorKey: "firstName",
    header: "First Name",
    description: "Personal given name, typically used in formal settings.",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    description:
      "Family name, often inherited, used to distinguish individuals.",
  },
  {
    accessorKey: "address",
    header: "Address",
    description: "Physical location where mail and packages are delivered.",
  },
  {
    accessorKey: "test",
    header: "Test",
    description: "Assessment to evaluate knowledge, skills, or abilities.",
  },
  {
    accessorKey: "state",
    header: "State",
    isDisabled: true,
    description: "test",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    isDisabled: true,
    description: "test",
  },
];
export default MultipleSelect;
