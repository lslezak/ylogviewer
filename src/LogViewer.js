
import React, { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Text, TextContent, TextVariants } from "@patternfly/react-core";
import y2logparser from "./y2logparser";

import "./LogViewer.scss";

const defaultVisibility = {
  date: false,
  time: true,
  level: false,
  host: false,
  pid: false,
  component: true,
  location: true,
  message: true
}

const defaultLogLevels = [true, true, true, true, true];

export default function LogViewer({name, data}) {
  const [items, setItems] = useState(() => {return y2logparser(data)});
  const [visibility, setVisibility] = useState(defaultVisibility);
  const [logLevels, setLogLevels] = useState(defaultLogLevels);

  const lines = [];

  items.forEach((item, index) => {
    if (logLevels[item.level]) {
      lines.push (
        <div className={`logline loglevel-${item.level}`} key={`log-line-${index}`}>
          { visibility.date && <span>{item.date}{" "}</span> }
          { visibility.time && <span>{item.time}{" "}</span> }
          { visibility.level && <span>{"<"}{item.level}{"> "}</span> }
          { visibility.host && <span>{item.host}{" "}</span> }
          { visibility.pid && <span>{"("}{item.pid}{") "}</span> }
          { visibility.component && <span>{"["}{item.component}{"] "}</span> }
          { visibility.location && <span>{item.location}{" "}</span> }
          { visibility.message && <span className="important">{item.message}{" "}</span> }
        </div>
    )}
  });

  return (
    <Card isPlain>
      <CardHeader>
        <CardTitle component="h2">
          {name}
        </CardTitle>
      </CardHeader>
      <CardBody>
        <TextContent>
          {lines}
        </TextContent>
      </CardBody>
    </Card>
  );
}
