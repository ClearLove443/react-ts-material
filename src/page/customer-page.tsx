import { Button } from "@mui/material";
import { useState } from "react";
import DynamicReactTable from "../component/dynamic-react-table";
import Header from "../component/header";
import MultipleSelect from "../component/multiple-select";
import { selectCustomer } from "../service/customer";

function CustomerPage() {
  const [inputValue, setInputValue] = useState("");
  const [val, setVal] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [fetchData, setFetchData] = useState(false);
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = (event, newValue: string[]) => {
    setVal(newValue);
    setFetchData(false);
  };

  const searchclick = () => {
    // alert(inputValue);
    selectCustomer(inputValue, val, setData);
  };
  return (
    <>
      <Header title="Customer Page" />
      {/* <BaseInput value={inputValue} onChange={handleChange} /> */}
      {/* <Container maxWidth="lg">
        <Grid2 container spacing={2}> */}
      <div>
        <MultipleSelect value={val} handleFieldsChange={handleSelectChange} />
        {/* <div className="container">
          <Button variant="contained" onClick={searchclick}>
            Search
          </Button>
        </div> */}
        <div className="container">
          <Button variant="contained" onClick={() => setFetchData(true)}>
            Search
          </Button>
        </div>
        {/* <DynamicTable rows={data} /> */}
        <DynamicReactTable fields={val} fetchData={fetchData} />
      </div>
      {/* </Grid2>
      </Container> */}
    </>
  );
}

export default CustomerPage;
