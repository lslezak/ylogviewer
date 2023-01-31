
import React from "react";
import { Card, CardBody, Text, TextContent, TextVariants } from "@patternfly/react-core";

export default function PageHeader() {
  return (
    <Card isPlain>
      <CardBody>
        <TextContent>
          <Text component={TextVariants.h1}>YaST Log Viewer</Text>
        </TextContent>
      </CardBody>
    </Card>
  );
}
