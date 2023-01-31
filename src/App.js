
import React, { useState, useEffect } from "react";

import NotesCard from "./NotesCard";
import InputSelectionCard from "./InputSelectionCard";
import PageHeader from "./PageHeader";

import "./App.css";

export default function App() {
  const [logData, setLogData] = useState(null);
  const [fileName, setFileName] = useState(null);

  const dataCallback = (data, name) => {
    setLogData(data);
    setFileName(name);
    console.log("Loaded data from", name);
  };

  return (
    <>
      <header>
        <PageHeader/>
      </header>
      <main>
        <InputSelectionCard dataCallback={dataCallback}/>
        <br />
        { !fileName &&
          <NotesCard />
        }
      </main>
    </>
  );
};
