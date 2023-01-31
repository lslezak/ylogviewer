
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

export default function InputUrlSelection() {
  const [value, setValue] = useState('');
  const [valid, setIsValid] = useState(true);
  const [loading, setIsLoading] = useState(false);

  const onChange = (value) => {
    setIsValid(isValid(value));
    setValue(value);
  };

  const onClearButtonClick = () => {
    // change to empty value
    onChange("");
  };

  const load = () => {
    setIsLoading(true);
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
          {/* append non breaking space to keep constant height of the error placeholder */}
          <Text component="span">{"\u00A0"}</Text>
        </InputGroup>
        <Button onClick={load} isLoading={loading} isDisabled={!valid || value === "" || loading} variant="primary" icon="" >Load URL</Button>
      </FormGroup>
    </>
  );
};
