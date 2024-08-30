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
          disableCloseOnSelect
          getOptionLabel={(option) => option}
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
                {option}
              </li>
            );
          }}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select attributes"
              placeholder="Favorites"
            />
          )}
        />
      </div>
    </>
  );
}
const fields = ["field1", "field2", "field3"];
export default MultipleSelect;
