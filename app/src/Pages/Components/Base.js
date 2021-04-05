import React from "react";

const BaseComponent = (props) => {
  let classList = [props.baseClass];
  classList.push(props.dark);
  classList.push(props.className);
  return (
    <div className={classList.join(" ")} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

const Container = (props) => {
  return (
    <BaseComponent
      baseClass="flex flex-wrap"
      dark="bg-dark-main"
      light="bg-light-main"
      {...props}
    />
  );
};

const Tile = (props) => {
  return (
    <BaseComponent
      baseClass="flex flex-wrap w-full h-full rounded-lg shadow-lg"
      dark="bg-dark-tile"
      light="bg-light-tile"
      {...props}
    />
  );
};

export { BaseComponent, Container, Tile };
