import { useState } from "react";
import "./App.css";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAdd = (e) => {
    if (e.key === "Enter") {
      if (inputValue) {
        const updatedItems = [...items];
        const itemIndex = updatedItems.findIndex(
          (item) => item.name === inputValue
        );
        if (itemIndex === -1) {
          setItems([
            ...items,
            {
              quantity: 1,
              name: inputValue,
              completed: false,
            },
          ]);
        }
        setInputValue("");
      }
    }
  };
  const handleDelete = (name) => {
    setItems([...items].filter((item) => item.name !== name));
  };
  const handleComplete = (status, index) => {
    const updatedItems = [...items];
    updatedItems[index].completed = status;
    setItems(updatedItems);
  };

  return (
    <main className="App">
      <div>
        <div>
          <div className="header">
            <h1>Todo List</h1>
            <input
              type="text"
              placeholder="Add an Item"
              className="item-input"
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleAdd}
            />
          </div>
        </div>
        <ul>
          {items.map((item, index) => (
            <li key={item.name}>
              <div className="container">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    handleComplete(e.target.checked, index);
                  }}
                  value={item.completed}
                  checked={item.completed}
                />
                <p>{item.name}</p>
              </div>
              <div>
                <button
                  className="remove-button"
                  onClick={() => handleDelete(item.name)}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default App;
