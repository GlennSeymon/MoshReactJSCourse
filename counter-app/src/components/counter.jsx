import React, { Component } from "react";

class Counter extends Component {
  state = {
    value: this.props.counter.value,
    id: this.props.counter.id,
  };

  handleIncrement = () => {
    this.setState({ value: this.state.value + 1 });
  };

  render() {
    return (
      <div>
        <span className={this.getClasses()}>{this.formatCount()}</span>
        <button
          onClick={this.handleIncrement}
          className={"btn btn-secondary btn-sm"}
        >
          Increment
        </button>
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => this.props.onDelete(this.props.counter.id)}
        >
          Delete
        </button>
      </div>
    );
  }

  getClasses() {
    let classes = "badge m-2 bg-";
    classes += this.state.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value: count } = this.state;

    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
