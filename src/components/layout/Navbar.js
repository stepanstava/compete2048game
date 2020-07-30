import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import actions from "../../actions";

const LINKS = ["practice", "compete", "leaderboard"];

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedLink: "practice" };
  }

  handleLinkClick(link) {
    this.setState({ selectedLink: link });

    if (link === "compete") {
      this.props.removeCompeteMode();
    }
  }

  renderLogo() {
    return (
      <Link to="/" onClick={() => this.handleLinkClick("practice")}>
        <div className="logo">
          <div className="square sq1">Com</div>
          <div className="square sq2">pete</div>
          <div className="square">2048</div>
        </div>
      </Link>
    );
  }

  getClassName(link) {
    const { selectedLink } = this.state;
    let className = "item";
    if (selectedLink === link) {
      className += " active";
    }

    return className;
  }

  renderLinks() {
    return LINKS.map(link => {
      return (
        <Link
          to={`/${link === "practice" ? "" : link}`}
          className={this.getClassName(link)}
          onClick={() => this.handleLinkClick(link)}
        >
          {link}
        </Link>
      );
    });
  }

  render() {
    return (
      <div className="header-wrapper">
        <nav>
          {this.renderLogo()}

          <div className="menu">
            {this.renderLinks()}
            {/* <NavLink to="/" className="item">
              practice
            </NavLink>

            <NavLink
              to="/compete"
              className="item"
              activeClassName="active"
              onClick={() => this.props.removeCompeteMode()}
            >
              Compete
            </NavLink>

            <NavLink
              to="/leaderboard"
              className="item"
              activeClassName="active"
            >
              Highscore
            </NavLink> */}
          </div>
        </nav>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   console.log("state", state);
//   return {
//     number: state.add.count,
//   };
// };

export default connect(null, { removeCompeteMode: actions.removeCompeteMode })(
  Navbar
);

// export default Navbar;
