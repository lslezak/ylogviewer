
import React, { useState, useEffect } from "react";

import NotesCard from "./NotesCard";
import InputSelectionCard from "./InputSelectionCard";
import PageHeader from "./PageHeader";
import ArchiveViewer from "./ArchiveViewer";

import "./App.css";

const initialState = {
  name: null,
  data: null,
};

export default function App() {
  const [state, setState] = useState(initialState);

  const dataCallback = (data, name) => {
    console.log("Loaded data from", name);
    setState({...state, data, name })
  };

  console.log("rendering ", state);

  return (
    <>
      <header>
        <PageHeader/>
      </header>
      <main>
        <InputSelectionCard dataCallback={dataCallback}/>
        <br />
        { state.name ?
          <ArchiveViewer data={state.data} name={state.name}/>
          :
          <NotesCard />
        }
      </main>
    </>
  );
};
