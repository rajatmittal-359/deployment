import { useState } from "react";

const UseViewToggle = (defaultView = "card") => {
  const [view, setView] = useState(defaultView);

  const toggleToCard = () => setView("card");
  const toggleToTable = () => setView("table");

  return {
    view,
    isCard: view === "card",
    isTable: view === "table",
    toggleToCard,
    toggleToTable,
  };
};

export default UseViewToggle;