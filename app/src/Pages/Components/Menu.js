import React from "react";
import { BaseComponent } from "./Base";
import {
  faWaveSquare,
  faStream,
  faMicrochip,
} from "@fortawesome/free-solid-svg-icons";
import { MenuButton } from "../Dashboard/Components/Button";
import { withRouter } from "react-router-dom";

const MenuBar = (props) => {
  return (
    <BaseComponent
      baseClass="lg:flex hidden h-screen w-24 inline-flex flex-wrap bg-menu shadow-lg "
      dark="bg-dark-menu"
      light="bg-light-menu"
      {...props}
    >
      <div className="h-1/3 flex-1">
        <MenuButton
          icon={faMicrochip}
          callback={() => {
            props.history.push("/data");
          }}
        />
        <MenuButton
          icon={faWaveSquare}
          callback={() => {
            props.history.push("/diagnostics");
          }}
        />

        <MenuButton
          icon={faStream}
          callback={() => {
            props.history.push("/state");
          }}
        />
      </div>
    </BaseComponent>
  );
};

export default withRouter(MenuBar);
