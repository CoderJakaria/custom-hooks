import { startTransition, useDebugValue, useState } from "react";

function useSearchFilter(list, property) {
  // init the states
  const listArray = list;
  const [input, setInput] = useState("");
  const [datas, setDatas] = useState(listArray);

  // debug state if any bug
  useDebugValue(input);

  // handler/ if user type
  function handleChange(e) {
    const inputValue = e.target.value;
    setInput(inputValue);

    // filter array by using user instruction
    const filteredData = listArray.filter(item => {
      if (property) {
        let lowerCaseItem = item[property].toLocaleLowerCase();
        let lowerCaseInput = inputValue.toLocaleLowerCase();
        return lowerCaseItem.includes(lowerCaseInput);
      } else {
        let lowerCaseItem = item.toLocaleLowerCase();
        let lowerCaseInput = inputValue.toLocaleLowerCase();
        return lowerCaseItem.includes(lowerCaseInput);
      }
    });

    // make transition setData is not need quick update
    startTransition(() => {
      setDatas(filteredData.length > 0 ? filteredData : listArray);
    });
  }

  // equalize datas in state
  let state = datas;

  // return the object
  return { state, input, handleChange };
}

export default useSearchFilter;
