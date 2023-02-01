
import React, { useState } from "react";
import { Button, ButtonVariant, FormGroup, InputGroup, Text, TextInput, HelperText, HelperTextItem, ValidatedOptions } from '@patternfly/react-core';

const isValid = (url) => {
  try {
    return Boolean(new URL(url));
  }
  catch(e) {
    return false;
  }
}

export default function InputUrlSelection({dataCallback}) {
  // const [value, setValue] = useState("https://gist.githubusercontent.com/lslezak/d36a2a15b9ccd49f035c7e51b4818ee5/raw/a8f2822f608f7ae0bbabb3dbe457b5202e21da25/y2log-tw-installation.tar.xz");
  // const [value, setValue] = useState("https://gist.githubusercontent.com/lslezak/d36a2a15b9ccd49f035c7e51b4818ee5/raw/a8f2822f608f7ae0bbabb3dbe457b5202e21da25/y2log.xz");
  const [value, setValue] = useState("");
  const [valid, setIsValid] = useState(true);
  const [loading, setIsLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const onChange = (value) => {
    setIsValid(isValid(value));
    setValue(value);
    setFailed(false);
  };

  const onClearButtonClick = () => {
    // change to empty value
    onChange("");
  };

  const load = () => {
    setIsLoading(true);
    setFailed(false);

    window.fetch(value)
      .then(response => {
        if (!response.ok) {
          console.error(response);
          throw new Error("Download failed");
        }

        if (value.match(/\.(t?gz|xz|bz2|tar)$/i)) {
          return response.arrayBuffer();
        }
        else {
          return response.text();
        }
      })
      .then(buffer => {
        console.log("Downloaded ", buffer.byteLength);
        dataCallback(buffer, value);
      })
      .catch(error => {
        console.error(error);
        setFailed(true);
      })
      .finally(() => {setIsLoading(false)});
  };

  const displayError = (!valid && value !== "");
  const validated = value === "" ? null : (valid ? ValidatedOptions.success :  ValidatedOptions.error)

  return (
    <>
      <FormGroup role="group" label="Remote file">
        <InputGroup>
          <TextInput
              value={value}
              onChange={onChange}
              isDisabled={loading}
              type="url"
              placeholder="HTTP URL"
              aria-label="URL of a remote log file"
              validated={validated}
          />
          <Button
            variant={ButtonVariant.control}
            isDisabled={value === "" || loading}
            onClick={onClearButtonClick}
          >
            Clear
          </Button>
        </InputGroup>
        <InputGroup>
          { displayError &&
            <HelperText>
              <HelperTextItem variant="error" hasIcon>
                Invalid URL
              </HelperTextItem>
            </HelperText>
          }
          { failed &&
            <HelperText>
              <HelperTextItem variant="error" hasIcon>
                Download failed
              </HelperTextItem>
            </HelperText>
          }
          {/* append non breaking space to keep constant height of the error placeholder */}
          <Text component="span">{"\u00A0"}</Text>
        </InputGroup>
        <Button onClick={load} isLoading={loading} isDisabled={!valid || value === "" || loading} variant="primary" icon="" >Load URL</Button>
      </FormGroup>
    </>
  );
};
