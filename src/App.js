
import React, { useState, useEffect } from "react";

import NotesCard from "./NotesCard";
import InputSelectionCard from "./InputSelectionCard";
import PageHeader from "./PageHeader";
import ArchiveViewer from "./ArchiveViewer";

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
        { fileName ?
          <ArchiveViewer data={logData} name={fileName}/>
          :
          <NotesCard />
        }
      </main>
    </>
  );
};
