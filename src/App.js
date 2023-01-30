
import React, { useState, useEffect } from "react";
import { Card, CardBody, Text, TextContent, TextVariants } from "@patternfly/react-core";

import Notes from "./Notes";

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
        <Card isPlain>
          <CardBody>
            <TextContent>
              <Text component={TextVariants.h1}>YaST Log Viewer</Text>
            </TextContent>
          </CardBody>
        </Card>
      </header>
      <main>
        <Notes />
      </main>
    </>
  );
}
