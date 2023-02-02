
import React, { useState, useEffect } from "react";
import { Bullseye, Spinner, Text } from "@patternfly/react-core";

import LogViewer from "./LogViewer";

import { XzReadableStream } from 'xzwasm';
import tarball from "tarballjs";
import { decompress } from "bz2";
import { ungzip } from "pako";

const bz2Decompress = (data) => {
  // hmmmmm, the bz2 library has strange exports depending on the environment...  :-/
  if (typeof window !== 'undefined') {
    return window.bz2.decompress(new Uint8Array(data));
  } else {
    return decompress(new Uint8Array(data)) ;
  }
}

const initialState = {
  name: null,
  originalName: null,
  data: null,
  y2log: null,
  processing: false
};

export default function ArchiveViewer({data, name}) {
  const [state, setState] = useState({...initialState, originalName: name, name, data});

  // console.log("render ", state);

  if (state.y2log) {
    return (
      <LogViewer data={state.y2log} name={state.originalName}/>
  )}

  if (state.processing) {
    return (
      <Bullseye>
        <Spinner size="xl"/>
      </Bullseye>
    )
  }

  // xz archive
  if (state.name.match(/\.xz$/i)) {
    console.time("Uncompressing " + state.name);
    setState({...state, processing: true});
    const stream = new ReadableStream({
      start: (controller) => {
        controller.enqueue(new Uint8Array(state.data));
        controller.close();
      }
    });

    const decompressedResponse = new Response(
      new XzReadableStream(stream)
    );

    decompressedResponse.arrayBuffer().then(done => {
      console.timeEnd("Uncompressing " + state.name);
      const newData = new Uint8Array(done);
      console.log("Uncompressed size", newData.byteLength);
      setState({...state, processing: false, data: newData, name: state.name.replace(/\.xz$/i, "")});
    });
  }
  else if (state.name.match(/\.bz2$/i)) {
    console.time("Uncompressing " + state.name);
    let decompressed = bz2Decompress(state.data);
    console.timeEnd("Uncompressing " + state.name);
    setState({...state, data: decompressed, name: state.name.replace(/\.bz2$/i, "") });
  }
  else if (state.name.match(/\.gz$/i)) {
    console.time("Uncompressing " + state.name);
    let decompressed = ungzip(new Uint8Array(state.data));
    console.timeEnd("Uncompressing " + state.name);
    setState({...state, data: decompressed, name: state.name.replace(/\.gz$/i, "") });
  }
  else if (state.name.match(/\.tar$/i)) {
    const tarReader = new tarball.TarReader();
    tarReader.readArrayBuffer(state.data.buffer);

    const y2log = tarReader.getTextFile("YaST2/y2log");
    setState({...state, data: null, name: state.name.replace(/\.tar$/i, ""), y2log });
  }
  // just a plain file, convert to string
  else {
    if (typeof state.data === "string") {
      setState({...state, data: null, y2log: state.data});
    }
    else {
      const decoder = new TextDecoder("utf-8");
      const y2log = decoder.decode(state.data);
      setState({...state, data: null, y2log });
    }
  }

  return <></>;
};
