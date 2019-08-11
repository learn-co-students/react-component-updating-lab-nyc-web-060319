import React, { PureComponent } from 'react';

//props
//  a fxn that updates uI    
//  gives Controls uI prop    
// adds new Timer to state.timerIDs */}

class Controls extends PureComponent {

  render() {
    return (
      <div>
        <div>
          {/*                                 run uIS to change App state uI by -1 */}
          <button type="text" onClick={() => this.props.updateIntervalSetting(-1)}>-</button>
          {this.props.updateInterval}
          <button type="text" onClick={() => this.props.updateIntervalSetting(1)}>+</button>
        </div>
        <button onClick={this.props.handleAddTimer}>Add New Timer</button>
      </div>
    );
  }


}

export default Controls
