import React, { Component } from "react";
// import { connect } from 'react-redux'
import { NavLink, Link } from "react-router-dom";

class Navbar extends Component {
  // constructor(props) {
  //   super(props);

  // }

  renderLogo() {
    return (
      <div className="logo">
        <div className="square sq1">Com</div>
        <div className="square sq2">pete</div>
        <div className="square">2048</div>
      </div>
    );
  }

  render() {
    return (
      <div className="header-wrapper">
        <nav>
          {this.renderLogo()}

          <div className="menu">
            <NavLink to="/" className="item">
              Practise
            </NavLink>

            <NavLink to="/compete" className="item" activeClassName="active">
              Compete
            </NavLink>

            <NavLink to="/highscore" className="item" activeClassName="active">
              Highscore
            </NavLink>
          </div>
        </nav>
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

// export default connect(
//   mapStateToProps,
//   { increment: actions.increment }
// )(App)

export default Navbar;
