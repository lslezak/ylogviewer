
import React, { useState } from "react";
import {TextInput, ValidatedOptions} from '@patternfly/react-core';

export default function InputUrlSelection() {
  const [value, setValue] = useState('');

  const onChange = (value) => {
    setValue(value);
  };

  return <TextInput value={value} onChange={onChange} isRequired type="url" placeholder="HTTP URL"/>;
};
