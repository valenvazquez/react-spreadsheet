import React from "react";
import { ActiveCell } from "./components/ActiveCell";
import { Table } from "./components/Table";
import { useAppContext } from "./contexts/app-context/app-context";

const App = () => {
  return <Table size={{ columns: 60, rows: 100 }} />;
};

export default App;
