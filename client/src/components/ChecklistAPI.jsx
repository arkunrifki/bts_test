const fetchChecklist = async () => {
  try {
    const response = await fetch("http://94.74.86.174:8080/api/checklist");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch checklist");
    }
  } catch (error) {
    console.error("Error fetching checklist:", error);
    return [];
  }
};
const createChecklist = async (name) => {
  try {
    const response = await fetch(
      "http://94.74.86.174:8080/api/checklist/save",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to create checklist");
    }
  } catch (error) {
    console.error("Error creating checklist:", error);
    return null;
  }
};

export { fetchChecklist, createChecklist };
