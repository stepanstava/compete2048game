// class

import React, { Component } from "react";

import Score from "./Score";

export default class App extends Component {

  render() {
    return (
      <div className="container">
        <Score />
      </div>
    )
  }
}

// function
import actions from "../../actions";


//mapStateToProps

const mapStateToProps = state => ({
  cx: getContext(state),
  activeSearch: getActiveSearch(state),
  results: getTextSearchResults(state),
  query: getTextSearchQuery(state),
  status: getTextSearchStatus(state),
});

export default connect<Props, OwnProps, _, _, _, _>(mapStateToProps, {
  closeProjectSearch: actions.closeProjectSearch,
  searchSources: actions.searchSources,
  clearSearch: actions.clearSearch,
  selectSpecificLocation: actions.selectSpecificLocation,
  setActiveSearch: actions.setActiveSearch,
  doSearchForHighlight: actions.doSearchForHighlight,
})(ProjectSearch);


// mapDispatchToProps

const {
  setBreakpointOptions,
  openConditionalPanel,
  closeConditionalPanel,
} = actions;

const mapDispatchToProps = {
  setBreakpointOptions,
  openConditionalPanel,
  closeConditionalPanel,
};

export default connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(ConditionalPanel);


// 
export default connect<Props, OwnProps, _, _, _, _>(
  state => ({
    // Retrieves only the first breakpoint per line so that the
    // breakpoint marker represents only the first breakpoint
    breakpoints: getFirstVisibleBreakpoints(state),
    selectedSource: getSelectedSource(state),
  }),
  dispatch => ({
    breakpointActions: breakpointItemActions(dispatch),
    editorActions: editorItemActions(dispatch),
  })
)(Breakpoints);
