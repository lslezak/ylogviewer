
import React, { useState } from "react";
import { OptionsMenu, OptionsMenuItem, OptionsMenuToggleWithText } from '@patternfly/react-core';
import CaretDownIcon from '@patternfly/react-icons/dist/esm/icons/caret-down-icon';

export default function AttributeFilter({input, onChangeCallback}) {
  const [logAttributes, setAttributes] = useState(input);
  const [isOpen, setIsOpen] = useState(false);

  const onSelect = (key) => {
    let attrs = {...logAttributes};
    attrs[key] = !attrs[key];
    setAttributes(attrs);
    if (onChangeCallback) onChangeCallback(attrs);
  };

  const labels = {
    date: "Date",
    time: "Time",
    level: "Log level",
    host: "Host name",
    pid: "Process ID",
    component: "Component",
    location: "Location",
    message: "Message"
  };

  let menuItems = [];

  for (const [key, label] of Object.entries(labels)) {
    menuItems.push(
      <OptionsMenuItem
        onSelect={() => {onSelect(key)} }
        isSelected={logAttributes[key]}
        key={`log-attr-${key}`}
      >
        {label}
      </OptionsMenuItem>
    );
  }

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const toggle = <OptionsMenuToggleWithText
    toggleText="Log properties"
    toggleButtonContents={<CaretDownIcon/>}
    onToggle={onToggle}
  />;

  return (
    <OptionsMenu
      menuItems={menuItems}
      isOpen={isOpen}
      isText
      toggle={toggle} />
  );
};
