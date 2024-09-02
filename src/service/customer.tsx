const selectCustomer = async (inputValue, selectVal, setData) => {
  const url = new URL("/remote/api/data", window.location.origin);
  url.searchParams.set("start", `${inputValue}`);
  url.searchParams.set("size", `10`);
  url.searchParams.set("filters", JSON.stringify([]));
  url.searchParams.set("sorting", JSON.stringify([]));

  const raw = JSON.stringify({
    input: inputValue,
    select: selectVal,
  });

  try {
    // const response = await fetch("/api/submit", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: raw,
    // });
    const response = await fetch(url);
    const json = await response.json();
    setData(json.data);
  } catch (error) {
    console.error(error);
    return;
  }
};

export { selectCustomer };
