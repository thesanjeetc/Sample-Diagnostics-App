import React from "react";
import { BaseComponent, Container, Tile } from "../Components/Base";
import MenuBar from "../Components/Menu";
import { withRouter } from "react-router-dom";

class SystemDiagnosticsManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="w-screen h-screen overflow">
        <MenuBar />
        <Container className="h-full flex-1 p-8">
          <Tile className="p-4">
            <p className="flex font-mono m-4">System Diagnostics Manager</p>
          </Tile>
        </Container>
      </Container>
    );
  }
}

export default withRouter(SystemDiagnosticsManager);
