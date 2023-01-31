
import React, { useState } from "react";
import { Button, FormGroup, Text, TextInput, HelperText, HelperTextItem, ValidatedOptions } from '@patternfly/react-core';

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

  const displayError = (!valid && value !== "");
  const validated = value === "" ? null : (valid ? ValidatedOptions.success :  ValidatedOptions.error)

  return (
    <>
      <FormGroup role="group" label="Remote file">
        <TextInput
            value={value}
            onChange={onChange}
            type="url"
            placeholder="HTTP URL"
            validated={validated}
        />
        { displayError ?
          <HelperText>
            <HelperTextItem variant="error" hasIcon>
              Invalid URL
            </HelperTextItem>
          </HelperText>
          : <br/>
        }

        <br/>
        <Button isDisabled={!valid || value === ""} variant="primary">Load URL</Button>
      </FormGroup>
    </>
  );
};
