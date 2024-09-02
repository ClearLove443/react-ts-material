import { Container } from "@mui/material";

function BaseInput({ value, onChange }) {
  return (
    <>
      <Container maxWidth="sm">
        <div>{`value: ${value}`}</div>
        <div>value: {value}</div>
        <input type="text" value={value} onChange={onChange} />
      </Container>
    </>
  );
}

export default BaseInput;
