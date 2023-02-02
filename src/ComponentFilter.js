
import React, { useState } from "react";
import { OptionsMenu, OptionsMenuItem, OptionsMenuToggleWithText, OptionsMenuSeparator } from '@patternfly/react-core';
import CaretDownIcon from '@patternfly/react-icons/dist/esm/icons/caret-down-icon';

export default function ComponentFilter({input, onChangeCallback}) {
  const [components, setComponents] = useState(input);
  const [isOpen, setIsOpen] = useState(false);

  const onSelect = (component) => {
    let comps = {...components};
    comps[component] = !comps[component];
    setComponents(comps);
    if (onChangeCallback) onChangeCallback(comps);
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onSelectAll = (value) => {
    let comps = {};
    Object.keys(components).forEach((key) => {comps[key] = value});
    setComponents(comps);
    if (onChangeCallback) onChangeCallback(comps);
  };

  // sort the component names alphabetically (depending on the current locale)
  const names = Object.keys(components)
    .sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));

  const menuItems = names.map((label) => {
    return (
      <OptionsMenuItem
        onSelect={() => {onSelect(label)} }
        isSelected={components[label]}
        key={`log-cpt-${label}`}
      >
        {label}
      </OptionsMenuItem>
    );
  });

  // add All/None items
  menuItems.push(<OptionsMenuSeparator key="separator"/>);
  menuItems.push(<OptionsMenuItem onSelect={() => {onSelectAll(true)} } key="all">All</OptionsMenuItem>);
  menuItems.push(<OptionsMenuItem onSelect={() => {onSelectAll(false)} } key="none">None</OptionsMenuItem>);

  const toggle = <OptionsMenuToggleWithText
    toggleText="Components"
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
