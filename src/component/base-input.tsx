function BaseInput({ value, onChange }) {
  return (
    <>
      <div>{`value: ${value}`}</div>
      <input type="text" value={value} onChange={onChange} />
    </>
  );
}

export default BaseInput;
