import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../../actions";

class Settings extends Component {
  constructor(props) {
    super(props);
    // ! save to store
    this.state = {
      rows: 4,
      columns: 4,
      goal: 2048,
      mode: 2,
    };
  }

  // handleFormSubmit(e) {
  //   console.log("herrrrrrrree");
  //   console.log(e.target);
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   console.log("Settings -> handleFormSubmit -> formData", formData);
  // }

  handleSelectChange(e, selectName) {
    this.setState({ [selectName]: parseInt(e.target.value) });
  }

  render() {
    return (
      <div class="settings-screen">
        <div class="close">
          <i class="fas fa-times" onClick={this.props.closeSettings}></i>
        </div>
        <form class="form">
          <div class="field">
            <div class="item">
              <div class="meta">
                <i class="fas fa-grip-horizontal"></i>
                <label>Rows</label>
              </div>
              <div class="value">
                <select
                  value={this.state.rows}
                  onChange={e => this.handleSelectChange(e, "rows")}
                >
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>
            <div class="item">
              <div class="meta">
                <i class="fas fa-grip-vertical"></i>
                <label>Columns</label>
              </div>
              <div class="value">
                <select
                  value={this.state.columns}
                  onChange={e => this.handleSelectChange(e, "columns")}
                >
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="item">
              <div class="meta">
                <i class="far fa-square"></i>
                <label>Winning square</label>
              </div>
              <div class="value">
                <select
                  value={this.state.goal}
                  onChange={e => this.handleSelectChange(e, "goal")}
                >
                  <option value="128">128</option>
                  <option value="256">256</option>
                  <option value="512">512</option>
                  <option value="1024">1024</option>
                  <option value="2048">2048</option>
                  <option value="4096">16</option>
                  <option value="8192">8192</option>
                  <option value="16384">16384</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="item">
              <div class="meta">
                <i class="fas fa-dice-two"></i>
                <label>Game mode</label>
              </div>
              <div class="value">
                <select
                  value={this.state.mode}
                  onChange={e => this.handleSelectChange(e, "mode")}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
            </div>
          </div>
        </form>
        <button class="btn" onClick={() => this.props.saveSettings(this.state)}>
          Save
        </button>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   console.log("state", state)
//   return {
//     number: state.add.count,
//   }
// };

export default connect(null, {
  closeSettings: actions.closeSettings,
  saveSettings: actions.saveSettings,
})(Settings);
