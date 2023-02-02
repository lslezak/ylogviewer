
import React, { useState } from "react";
import { OptionsMenu, OptionsMenuItem, OptionsMenuToggleWithText } from '@patternfly/react-core';
import CaretDownIcon from '@patternfly/react-icons/dist/esm/icons/caret-down-icon';

export default function LogLevelFilter({input, onChangeCallback}) {
  const [logLevels, setLogLevels] = useState(input);
  const [isOpen, setIsOpen] = useState(false);

  const onSelect = (level) => {
    let levels = [...logLevels];
    levels[level] = !levels[level];
    setLogLevels(levels);
    if (onChangeCallback) onChangeCallback(levels);
  };

  const labels = [
    "Debug",
    "Info",
    "Warning",
    "Error",
    "Security",
    "Internal"
  ];

  const menuItems = labels.map((label, index) => {
    return (
      <OptionsMenuItem
        onSelect={() => {onSelect(index)} }
        isSelected={logLevels[index]}
        key={`log-level-${index}`}
      >
        {`${index} - ${label}`}
      </OptionsMenuItem>
    );
  });

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const toggle = <OptionsMenuToggleWithText toggleText="Log level" toggleButtonContents={<CaretDownIcon/>} onToggle={onToggle} />;

  return (
    <OptionsMenu
      menuItems={menuItems}
      isOpen={isOpen}
      isText
      toggle={toggle} />
  );
};
