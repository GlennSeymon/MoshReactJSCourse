import "../App.css";
import React, { Component } from "react";
import NavBar from "./navbar";
import Counters from "./counters";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
      { id: 5, value: 0 },
    ],
  };

  constructor() {
    super();
    console.log("App - Constructor");
  }

  componentDidMount() {
    console.log("App = componentDidMount");
  }

  handleDelete = (counterId) => {
    let counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
  };

  handleIncrement = (counter) => {
    console.log("handleIncrement - counter", counter);
    let counters = [...this.state.counters];
    console.log("handleIncrement - counters", counters);
    let index = counters.indexOf(counter);
    console.log("handleDecrement - index", index);
    counters[index] = { ...counter };
    console.log("handleIncrement - value before " + counters[index].value);
    counters[index].value++;
    console.log("handleIncrement - value after " + counters[index].value);
    this.setState({ counters });
  };

  handleDecrement = (counter) => {
    console.log("handleDecrement - counter", counter);
    let counters = [...this.state.counters];
    console.log("handleDecrement - counters", counters);
    let index = counters.indexOf(counter);
    console.log("handleDecrement - index", index);
    counters[index] = { ...counter };
    console.log("handleDecrement - value before " + counters[index].value);
    counters[index].value--;
    console.log("handleDecrement - value after " + counters[index].value);
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = [...this.state.counters];
    for (let i = 0; i < counters.length; i++) counters[i].value = 0;
    this.setState({ counters });
  };

  render() {
    console.log("App - render");
    return (
      <div>
        <NavBar counters={this.state.counters} />
        <main role="main" className="container-sm">
          <Counters
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onReset={this.handleReset}
            counters={this.state.counters}
          />
        </main>
      </div>
    );
  }
}

export default App;
