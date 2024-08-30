const selectCustomer = async (inputValue, selectVal, setData) => {
  const url = new URL("/api/data", "http://127.0.0.1:5173");
  url.searchParams.set("start", `${inputValue}`);
  url.searchParams.set("size", `10`);
  url.searchParams.set("filters", JSON.stringify([]));
  url.searchParams.set("sorting", JSON.stringify([]));

  const raw = JSON.stringify({
    input: inputValue,
    select: selectVal,
  });

  try {
    const response = await fetch("http://127.0.0.1:13000/submit", {
      method: "POST", // 或者 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: raw, // 将JavaScript对象转换为JSON字符串
    });
    const json = await response.json();
    setData(json);
  } catch (error) {
    console.error(error);
    return;
  }
};

export { selectCustomer };
