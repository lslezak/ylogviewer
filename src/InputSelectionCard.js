
import React, { useState } from "react";
import { Button, Card, CardTitle, CardBody, CardActions, CardHeader, TextContent, Text, TextList, TextListItem, TextVariants} from "@patternfly/react-core";

import InputFileSelection from "./InputFileSelection";
import InputUrlSelection from "./InputUrlSelection";

export default function InputSelectionCard() {
  return (
    <Card isFlat isRounded>
      <CardHeader>
        <CardTitle component="h2">
          Select the y2log file to display
        </CardTitle>
      </CardHeader>
      <CardBody>
        <InputFileSelection/>
        <br/>
        <br/>
        <InputUrlSelection/>
      </CardBody>
    </Card>
  );
};
