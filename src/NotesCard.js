
import React, { useState } from "react";
import { Button, Card, CardTitle, CardBody, CardActions, CardHeader, Grid, GridItem, TextContent, Text, TextList, TextListItem, TextVariants} from "@patternfly/react-core";
import TimesIcon from '@patternfly/react-icons/dist/esm/icons/times-icon';
import InfoAltIcon from '@patternfly/react-icons/dist/esm/icons/info-alt-icon';
import WarningTriangleIcon from '@patternfly/react-icons/dist/esm/icons/warning-triangle-icon';
import BugIcon from '@patternfly/react-icons/dist/esm/icons/bug-icon';

export default function NotesCard() {
  // the notes are visible
  const [isOpen, setIsOpen] = useState(true);

  const close = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <Card isFlat isRounded>
      <CardHeader>
        <CardTitle component="h2">
          <InfoAltIcon/>
          {" "} Notes
        </CardTitle>
        <CardActions>
          <Button
            variant="plain"
            onClick={close}
            aria-label="Close notes box"
          >
            <TimesIcon/>
          </Button>
        </CardActions>
      </CardHeader>
      <CardBody>
        {/* Responsive design, avoid too long lines on large devices */}
        <Grid span={12} xl={8} xl2={6}>
          <GridItem>
            <TextContent>
              <Text component={TextVariants.h3}>Experimental Project</Text>

              <Text>
                <WarningTriangleIcon/> {" "}
                This is still a proof of concept project for experiments. That just means
                there might be bugs. <BugIcon/>
              </Text>

              <Text component={TextVariants.h3}>Supported Files</Text>

              <Text>You can load the log file in several formats:</Text>

              <TextList>
                <TextListItem>
                  Plain text format (from /var/log/YaST2/y2log)
                </TextListItem>
                <TextListItem>Gzip compressed file (*.gz, like y2log-1.gz)</TextListItem>
                <TextListItem>XZ compressed file (*.xz, currently not
                  created by YaST, you have to compress the file manually)</TextListItem>
                <TextListItem>Bzip2 compressed file (*.bz2, currently not
                  created by YaST, you have to compress the file manually)</TextListItem>
                <TextListItem>Tarball (*.tar.gz, *.tar.bz2 or *.tar.xz, created by the{" "}
                  <Text component={TextVariants.a}
                    href="https://github.com/yast/yast-yast2/blob/master/scripts/save_y2logs">
                    save_y2logs
                  </Text>
                  {" "}script, currently only the YaST2/y2log file is displayed)
                </TextListItem>
              </TextList>

              <Text component={TextVariants.h3}>Remote Files</Text>

              <Text>
                Downloading remote files works only from the servers which allow {" "}
                <Text component={TextVariants.a}
                  href="https://en.wikipedia.org/wiki/Cross-origin_resource_sharing">
                  cross-origin resource sharing (CORS)
                </Text>
                , this is a limitation of the {" "}
                <Text component={TextVariants.a}
                  href="https://en.wikipedia.org/wiki/Same-origin_policy">
                  same-origin security policy
                </Text>.
                Not all servers support cross-origin requests, you might get errors
                for URLs which normally work in the browser. In that case download
                the file and then use the downloaded file.
              </Text>

              <Text>
                Only the HTTP and HTTPS protocols are supported for downloading.
              </Text>

              <Text component={TextVariants.h3}>Local Processing</Text>

              <Text>
                The selected file is NOT uploaded anywhere, the ylogviewer uses
                the HTML5 features and several JavaScript libraries for handling the
                GZ, XZ and TAR files, it processes the selected file completely locally!
                That has several advantages:
              </Text>

              <TextList>
                <TextListItem>Speed - nothing is uploaded or downloaded, no bandwidth limitations</TextListItem>
                <TextListItem>Security - the logs might potentially contain sensitive data, all data stay in your machine!</TextListItem>
                <TextListItem>Offline mode - the viewer can be used without internet connection</TextListItem>
              </TextList>
            </TextContent>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};
