
import React, { useState, useEffect } from "react";
import { Bullseye, Spinner } from "@patternfly/react-core";

export default function ArchiveViewer({data, name}) {
  const [logData, setLogData] = useState(data);
  const [fileName, setFileName] = useState(name);
  const [processing, setProcessing] = useState(false);

  return (
    <>
      { processing &&
        <Bullseye>
          <Spinner size="xl"/>
        </Bullseye>
      }
    </>
  );
};
