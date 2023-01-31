
import React, { useState } from "react";
import { Button, FileUpload, FormGroup } from '@patternfly/react-core';

export default function InputFileSelection() {
  const [value, setValue] = useState('');
  const [filename, setFilename] = useState('');
  const [loading, setIsLoading] = useState(false);

  const handleChange = (value, filename, _event) => {
    console.log(value);
    console.log(filename);
    setValue(value);
    setFilename(filename);
  };

  const load = () => {
    setIsLoading(true);

    // HTML5 FileReader
    const reader = new FileReader();

    reader.onload = (ev) => {
      const content = ev.target.result;
      console.log("Loaded: ", content.length);
      setIsLoading(false);
    };

    if (filename.match(/\.(t?gz|xz|bz2|tar)$/i)) {
      reader.readAsArrayBuffer(value);
    }
    else {
      reader.readAsText(value);
    }
  };

  return (
    <>
      <FormGroup role="group" label="Local file">
        <FileUpload
          isDisabled={loading}
          value={value}
          filename={filename}
          filenamePlaceholder="Drag and drop a log file or select one"
          hideDefaultPreview="true"
          onChange={handleChange}
          browseButtonText="Select File"
        />
        <br/>
        <Button variant="primary" onClick={load} isLoading={loading} isDisabled={filename === "" || loading}>Load File</Button>
      </FormGroup>
    </>
    );
};
