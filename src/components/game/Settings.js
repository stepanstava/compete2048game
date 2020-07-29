import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../../actions";
import {
  getFormData,
  getSelectedOptions,
} from "../../selectors";

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  handleSelectChange(e, selectName) {
    const value = parseInt(e.target.value);
    this.props.saveSelectedOption(selectName, value);
  }

  

  renderSelectOptions(selectName) {
    const { formData, selectedOptions } = this.props;

    const options = formData.values[selectName].map((item, i) => {
      return (
        <option value={`${item}`} key={`${selectName}:${i}`}>
          {item}
        </option>
      );
    });

    return (
      <div className="item">
        <div className="meta">
          <i className={formData.icons[selectName]}></i>
          <label>{formData.displayNames[selectName]}</label>
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
        <button
          className="btn"
          onClick={() => this.props.saveSettings()}
        >
          Save
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    formData: getFormData(state),
    selectedOptions: getSelectedOptions(state),
  };
};

export default connect(mapStateToProps, {
  closeSettings: actions.closeSettings,
  saveSettings: actions.saveSettings,
  saveSelectedOption: actions.saveSelectedOption,
})(Settings);
