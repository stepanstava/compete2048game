import React, { Component } from "react";
// import { connect } from 'react-redux'

// TODO get from store
const SQUARE_SIZE = 110;

class Square extends Component {
  // constructor(props) {
  //   super(props);

  // }

  getClassName() {
    const { merge, value } = this.props;
    const valueClass = `sq-${value}`;

    return merge ? `square ${valueClass} merge` : `square ${valueClass}`;
  }

  render() {
    const { value, posX, posY, merge } = this.props;

    const styles = {
      top: `${posX * SQUARE_SIZE}px`,
      left: `${posY * SQUARE_SIZE}px`,
    };

    return (
      <div className={this.getClassName()} style={styles}>
        {value}
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

export default Square;
