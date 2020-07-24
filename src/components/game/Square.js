import React, { Component } from "react";
// import { connect } from 'react-redux'



class Square extends Component {
  // constructor(props) {
  //   super(props);

  // }

  getClassName() {
    const { gameMode } = this.props;

    const { merge, value } = this.props.square;

    let className = 'square'

    if (gameMode === 2) {
      className += ` sq-${value}`
    } else {
      className += ` sq-1-${value}`
    } 

    if (merge) {
      className += ' merge'
    }

    return className;
    // const valueClass = `sq-${value}`;

    // return merge ? `square ${valueClass} merge` : `square ${valueClass}`;
  }

  render() {
    const { square, squareSize, style, gapWidth } = this.props;
    const { value, posX, posY, merge } = square;

    const styles = {
      top: `${posX * (squareSize + gapWidth)}px`,
      left: `${posY * (squareSize + gapWidth)}px`,
      ...style,
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
