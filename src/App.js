import React, { Component } from 'react';

import Timer from './Timer'
import Controls from './Controls'

//no need to modify anything in this component
class App extends Component {

  state = {
    updateInterval: 1,
    timerIDs: []
  }
  //cpM happens right after render
//adds one timer one initalization of page
//this happens so fast you may not even notice it when page loads
  componentDidMount() {
    this.handleAddTimer()
  }

  render() {
    console.log(this.state.timerIDs);
    return (
      <div className="App">
        <header>
          <h1>MultiTimer</h1>
          {/*                               \/ a fxn that updates uI                       gives Controls uI prop                    adds new Timer to state.timerIDs */}
          <Controls updateIntervalSetting={this.updateIntervalSetting} updateInterval={this.state.updateInterval} handleAddTimer={this.handleAddTimer}/>
        </header>
        <div className="TimerGrid">
          {/* //goes through timerIDs and makes timer component out of each */}
          {this.renderTimers()}
        </div>

      </div>
    );
  }

  // returns array of components written in JSX, mapped from this.state.timerIDs
  // Goes through state.timerIDs array, sees id + uI for each, makes new Timer component with attributes taken from args and a cb that removes itself
  renderTimers = () => this.state.timerIDs.map(({id, updateInterval}) => <Timer key={id} id={id} removeTimer={this.removeTimer} updateInterval={updateInterval}/>)


  // adds a random number based on Datetime for timer ID
  handleAddTimer = () => {
    this.setState(prevState => ({
      //
      timerIDs: [
        //use spread operator to update timerIDs, 
        //meaning "keep everything in this array the same, but also add this new object"
        ...prevState.timerIDs,
        //A new timer obj created with the following k-v pairs
        {
          //first timer will always have uI = 1 since that's what state is initially
          //After that, uI can be altered by uIS fxn which does setState to change uI
          //meaning that newTimer will have that new UI whenever handleAddTimer is called
          updateInterval: prevState.updateInterval,
          id: Date.now()
        }
      ]
    }))
  }

  // removeTimer updates state, removing any timer that matches the provided author
  removeTimer = id => {
    this.setState(prevState => ({
      //go through state.timerIDs, set new state by return arr where id of each timer is NOT equal to a given id(arg)
      timerIDs: prevState.timerIDs.filter(timer => timer.id !== id)
    }))
  }


  //this is defined in App but actually executed by Controller component
  //every time your press + or -, App.setState is run to update uI accordingly
  //App then passes this uI onto a new timer to be created 

  //The reason this function is in App is because App is the parent of both Controls and Timer
  //App allows Controller to edit App.state (via App.setState) with this function
  //App has its state.uI updated accordingly
  //When newTimer fxn called, new Timer obj added, using state.uI for Timer obj's uI
  //When Timers are rendered on page vi renderTimers, they use the uI assigned to them when timer obj was created
  //This uI is passed to the Timers controller so it can use it for the Timer clockTick fxn,
  //which will set that Timer's state (setState) so Timer's state.time is reset to prevTime + uI
  //Then immediately after it renders (cDM),interval created, where every uI in seconds clockTick runs
  //Since clockTick runs setState the time inside that Timer Component's div changes every so often

  updateIntervalSetting = increment => {
    this.setState(prevState => { //same as App.setState
      //if uI + increment(arg) are <= 1, make uI 1 (Lowest uI can never be less than 1 like this, but int can be neg)
      if (prevState.updateInterval + increment <= 1) return { updateInterval: 1 } 
      //If above if statement is true this part below never happens
      return {
       //make uI = previous uI + increment
        updateInterval: prevState.updateInterval + increment
      }
    })
  }

}

export default App;
