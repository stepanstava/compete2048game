import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../../actions";
import { getSelectedOptions } from "../../selectors";

const FORM_DATA = {
  values: {
    rows: [3, 4, 5, 6],
    columns: [3, 4, 5, 6],
    winningSquare: [128, 256, 512, 1024, 2048, 4096, 8192, 16384],
    gameMode: [1, 2],
  },
  icons: {
    rows: "fas fa-grip-horizontal",
    columns: "fas fa-grip-vertical",
    winningSquare: "far fa-square",
    gameMode: "fas fa-dice-two",
  },
  displayNames: {
    rows: "Rows",
    columns: "Columns",
    winningSquare: "Winning Square",
    gameMode: "Game Mode",
  },
};

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  handleSelectChange(e, selectName) {
    const value = parseInt(e.target.value);
    this.props.saveSelectedOption(selectName, value);
  }

  renderSelectOptions(selectName) {
    const { selectedOptions } = this.props;

    const options = FORM_DATA.values[selectName].map((item, i) => {
      return (
        <option value={`${item}`} key={`${selectName}:${i}`}>
          {item}
        </option>
      );
    });

    return (
      <div className="item">
        <div className="meta">
          <i className={FORM_DATA.icons[selectName]}></i>
          <label>{FORM_DATA.displayNames[selectName]}</label>
        </div>
        <div className="value">
          <select
            value={selectedOptions[selectName]}
            onChange={e => this.handleSelectChange(e, selectName)}
          >
            {options}
          </select>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="settings-screen">
        <div className="close">
          <i className="fas fa-times" onClick={this.props.closeSettings}></i>
        </div>
        <form className="form">
          <div className="field">
            {this.renderSelectOptions("rows")}
            {this.renderSelectOptions("columns")}
          </div>
          <div className="field">
            {this.renderSelectOptions("winningSquare")}
          </div>
          <div className="field">{this.renderSelectOptions("gameMode")}</div>
        </form>
        <button className="btn" onClick={() => this.props.saveSettings()}>
          Save
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedOptions: getSelectedOptions(state),
});

export default connect(mapStateToProps, {
  closeSettings: actions.closeSettings,
  saveSettings: actions.saveSettings,
  saveSelectedOption: actions.saveSelectedOption,
})(Settings);
