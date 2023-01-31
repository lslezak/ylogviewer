
import React, { useState, useEffect } from "react";

import NotesCard from "./NotesCard";
import InputSelectionCard from "./InputSelectionCard";
import PageHeader from "./PageHeader";

import "./App.css";

export default function App() {
  // the notes are visible
  const [isOpen, setIsOpen] = useState(true);

  const close = () => {
    setIsOpen(false);
    if (onCloseCallback) onCloseCallback();
  };

  return (
    <>
      <header>
        <PageHeader/>
      </header>
      <main>
        <InputSelectionCard/>
        <br />
        <NotesCard />
      </main>
    </>
  );
};
