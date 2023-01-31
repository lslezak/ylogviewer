
import React, { useState, useEffect } from "react";
import { Bullseye, Spinner, Text } from "@patternfly/react-core";

import { XzReadableStream } from 'xzwasm';

export default function ArchiveViewer({data, name}) {
  const [logData, setLogData] = useState(data);
  const [originalFileName, setOriginalFileName] = useState(name);
  const [fileName, setFileName] = useState(name);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    console.log("useEffect processing:", processing, fileName, logData);

    if (processing) return;

    // xz archive
    if (fileName.match(/\.xz$/i)) {
      console.time("Uncompressing " + fileName);
      setProcessing(true);
      const stream = new ReadableStream({
        start: (controller) => {
          controller.enqueue(new Uint8Array(logData));
          controller.close();
        }
      });

      const decompressedResponse = new Response(
        new XzReadableStream(stream)
      );

      decompressedResponse.arrayBuffer().then(done => {
        console.timeEnd("Uncompressing " + fileName);
        const newData = new Uint8Array(done).buffer;
        console.log("Uncompressed size", newData.byteLength);
        setLogData(newData);
        setFileName(fileName.replace(/\.xz$/i, ""));
        setProcessing(false);
      });
    }
    // just a plain file, convert to string
    else {
      console.log("logData", typeof logData);

      if (typeof logData !== "string")
      {
        const decoder = new TextDecoder("utf-8");
        setLogData(decoder.decode(logData));
      }
    }

  }, [fileName, logData, processing]);

  return (
    <>
      { processing &&
        <Bullseye>
          <Spinner size="xl"/>
        </Bullseye>
      }
      { !processing && (typeof logData === "string") && (
        <>
          <Text>
            {originalFileName}
          </Text>
          <Text>
            {logData}
          </Text>
        </>
      )}
    </>
  );
};
