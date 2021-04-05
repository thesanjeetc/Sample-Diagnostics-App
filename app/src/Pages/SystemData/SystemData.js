import React from "react";
import { Container, Tile } from "../Components/Base";
import MenuBar from "../Components/Menu";
import { withRouter } from "react-router-dom";
import { DoughnutMemory, LineCPU, BarCPU } from "./Components/Visualisation";

class SystemData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="w-screen h-screen overflow">
        <MenuBar />
        <Container className="h-full flex-1 p-3">
          <Container className="flex h-full w-1/2">
            <Container className="flex w-full h-1/2 block p-4">
              <LineCPU />
            </Container>
            <Container className="w-full h-1/2 block p-4 ">
              <BarCPU />
            </Container>
          </Container>
          <Container className=" h-full w-1/2">
            <Container className="w-full h-1/2 block p-4">
              <DoughnutMemory />
            </Container>
            <Container className="w-full h-1/2 block p-4">
              <Tile className="p-4"></Tile>
            </Container>
          </Container>
        </Container>
      </Container>
    );
  }
}

export default withRouter(SystemData);
