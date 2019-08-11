import React, { Component } from "react";

// props
  //key = id given
  //id = key given
  //removeTimer = function from App
  //uI = uI given


class Timer extends Component {
  constructor() {
    super();//bases construction method off of component consturctor
    this.timer = React.createRef();
    this.state = {
      time: 0,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16) //literally some random ass hexadecimal
    };
  }

  //Your code here
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.time === nextState.time) {
      return false
    }
    return true
  }
  //every Time a re-render is called, set the text color to be a different color
  //a re-render is called every time clockTick goes off, because clockTick runs setState to update TIME 
  componentDidUpdate(){
    this.timer.current.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16) //literally some random ass hexadecimal
  }

  componentDidMount() {
    this.interval = setInterval(
      this.clockTick,
      this.props.updateInterval * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { time, color, logText } = this.state;
    return (
      <section className="Timer" style={{ background: color }} ref={this.timer}>
        <h1>{time}</h1>
        <button onClick={this.stopClock}>Stop</button>
        <aside className="logText">{logText}</aside>
        <small onClick={this.handleClose}>X</small>
      </section>
    );
  }

  clockTick = () => {
    this.setState(prevState => ({
      time: prevState.time + this.props.updateInterval
    }));
  };

  stopClock = () => {
    clearInterval(this.interval);
    this.setState({ className: "hidden" });
  };

  // for the 'x' button,
  handleClose = () => {
    this.props.removeTimer(this.props.id);
  };
}

export default Timer;
