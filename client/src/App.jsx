import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { fetchChecklist, createChecklist } from "./components/ChecklistAPI";

import React, { useState, useEffect } from "react";

function App() {
  const [checklist, setChecklist] = useState([]);
  const [newChecklistName, setNewChecklistName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const fetchedChecklist = await fetchChecklist();
      setChecklist(fetchedChecklist);
    }
    fetchData();
  }, []);

  const handleCreateChecklist = async () => {
    if (newChecklistName.trim() === "") {
      return;
    }

    try {
      const createdChecklist = await createChecklist(newChecklistName);

      if (createdChecklist) {
        setChecklist([...checklist, createdChecklist]);
        setNewChecklistName("");
      }
    } catch (error) {
      console.error("Error creating checklist:", error);
    }
  };

  return (
    <div className="App">
      <h1>Checklist App</h1>
      <div>
        <input
          type="text"
          value={newChecklistName}
          onChange={(e) => setNewChecklistName(e.target.value)}
        />
        <button onClick={handleCreateChecklist}>Add Checklist</button>
      </div>
      <ul>
        {checklist.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="App">
      <Login />
      <Register />
    </div>
  );
}

export default App;
