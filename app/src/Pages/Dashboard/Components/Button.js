import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BaseComponent } from "../../Components/Base";

const Button = (props) => {
  return (
    <BaseComponent {...props}>
      <div className="m-auto">
        <FontAwesomeIcon icon={props.icon} size={props.iconSize || "1x"} />
      </div>
    </BaseComponent>
  );
};

const ClickButton = (props) => {
  const [clicked, setClicked] = useState(false);
  return (
    <Button
      onClick={(event) => {
        setClicked(!clicked);
        if (props.callback) {
          props.callback(!clicked, event);
        }
      }}
      icon={clicked ? props.clickedIcon || props.icon : props.icon}
      iconSize={props.iconSize}
      className={props.className}
      baseClass={
        clicked
          ? [props.baseClass, props.selectedColor].join(" ") || props.baseClass
          : props.baseClass
      }
    />
  );
};

const MenuButton = (props) => {
  return (
    <ClickButton
      baseClass="menubutton bg-transparent w-24 h-24 inline flex"
      {...props}
    />
  );
};

export { Button, MenuButton, ClickButton };
