import { Button } from "@mui/material";
import { useState } from "react";
import DynamicTable from "../component/dynamic-table";
import Header from "../component/header";
import MultipleSelect from "../component/multiple-select";
import { selectCustomer } from "../service/customer";

function CustomerPage() {
  const [inputValue, setInputValue] = useState("");
  const [val, setVal] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = (event, newValue: string[]) => {
    setVal(newValue);
  };

  const searchclick = () => {
    // alert(inputValue);
    selectCustomer(inputValue, val, setData);
  };
  return (
    <>
      <Header title="Customer Page" />
      {/* <BaseInput value={inputValue} onChange={handleChange} /> */}
      <div>
        <MultipleSelect value={val} handleFieldsChange={handleSelectChange} />
        <div className="container">
          <Button variant="contained" onClick={searchclick}>
            Search
          </Button>
        </div>
        <DynamicTable rows={data} />
      </div>
    </>
  );
}

export default CustomerPage;
