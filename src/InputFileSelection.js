
import React, { useState } from "react";
import {FileUpload} from '@patternfly/react-core';

export default function InputFileSelection() {
  const [value, setValue] = useState('');
  const [filename, setFilename] = useState('');

  const handleChange = (value, filename, _event) => {
    console.log(value);
    console.log(filename);
    setValue(value);
    setFilename(filename);
  };

  return (
    <FileUpload
      value={value}
      filename={filename}
      filenamePlaceholder="Drag and drop a log file or select one"
      hideDefaultPreview="true"
      onChange={handleChange}
      browseButtonText="Select File" />
    );
};
