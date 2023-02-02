
import React, { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, FormGroup, TextContent } from "@patternfly/react-core";
import y2logparser from "./y2logparser";
import LogLevelFilter from "./LogLevelFilter";
import PropertyFilter from "./PropertyFilter";

import "./LogViewer.scss";

// default displayed log properties
const defaultProperties = {
  date: false,
  time: true,
  level: false,
  host: false,
  pid: false,
  component: true,
  location: true,
  message: true
}

// which log levels should be  displaed by default, list of levels 0...5
const defaultLogLevels = [true, true, true, true, true, true];

export default function LogViewer({name, data}) {
  const [items, setItems] = useState(() => {return y2logparser(data)});
  const [properties, setProperties] = useState(defaultProperties);
  const [logLevels, setLogLevels] = useState(defaultLogLevels);

  const lines = [];

  const onLevelChangeCallback = (filter) => {
    setLogLevels(filter);
  };

  const onAttributeChangeCallback = (props) => {
    setProperties(props);
  };

  items.forEach((item, index) => {
    if (logLevels[item.level]) {
      lines.push (
        <div className={`logline loglevel-${item.level}`} key={`log-line-${index}`}>
          { properties.date && <span>{item.date}{" "}</span> }
          { properties.time && <span>{item.time}{" "}</span> }
          { properties.level && <span>{"<"}{item.level}{"> "}</span> }
          { properties.host && <span>{item.host}{" "}</span> }
          { properties.pid && <span>{"("}{item.pid}{") "}</span> }
          { properties.component && <span>{"["}{item.component}{"] "}</span> }
          { properties.location && <span>{item.location}{" "}</span> }
          { properties.message && <span className="important">{item.message}{" "}</span> }
        </div>
    )}
  });

  return (
    <Card isFlat isRounded>
      <CardHeader>
        <CardTitle component="h2">
          {name}
        </CardTitle>
      </CardHeader>
      <CardBody>
        <FormGroup role="group" label="Filters">
          <LogLevelFilter input={logLevels} onChangeCallback={onLevelChangeCallback}/>
          { " " }
          <PropertyFilter input={properties} onChangeCallback={onAttributeChangeCallback}/>
        </FormGroup>
        <br/>
        <TextContent>
          {lines}
        </TextContent>
      </CardBody>
    </Card>
  );
}
