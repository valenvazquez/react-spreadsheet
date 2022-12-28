import React from "react";
import { ActiveCell } from "./components/ActiveCell";
import { Table } from "./components/Table";
import { useAppContext } from "./contexts/app-context/app-context";

const App = () => {
  const {
    state: { activeCell },
  } = useAppContext();

  return (
    <>
      <Table size={{ columns: 60, rows: 100 }} />
      {activeCell && (
        <ActiveCell
          col={activeCell.col}
          row={activeCell.row}
          key={`${activeCell.col}${activeCell.row}`}
        />
      )}
    </>
  );
};

export default App;
