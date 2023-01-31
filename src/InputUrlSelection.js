
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

  const onChange = (value) => {
    setIsValid(isValid(value));
    setValue(value);
  };

  const onClearButtonClick = () => {
    // change to empty value
    onChange("");
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
              type="url"
              placeholder="HTTP URL"
              validated={validated}
          />
          <Button
            variant={ButtonVariant.control}
            isDisabled={value === ""}
            onClick={onClearButtonClick}
          >
            Clear
          </Button>
        </InputGroup>
        { displayError ?
          <HelperText>
            <HelperTextItem variant="error" hasIcon>
              Invalid URL
            </HelperTextItem>
          </HelperText>
          : <br/>
        }
        <Button isDisabled={!valid || value === ""} variant="primary">Load URL</Button>
      </FormGroup>
    </>
  );
};
