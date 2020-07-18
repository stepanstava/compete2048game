import React, { Component } from "react";
// import { connect } from 'react-redux'

//!zmenit
const SQUARE_SIZE = 112;

class Square extends Component {
  render() {
    // const { value, indexX, indexY } = this.props;
    const { value, posX, posY } = this.props;
    // console.log("Square -> render -> indexX", indexX)
    // console.log("Square -> render -> indexY", indexY)
    
    const styles = {
      // top: `${posX * SQUARE_SIZE}px`,
      // left: `${posY * SQUARE_SIZE}px`,
      marginTop: `${posX * SQUARE_SIZE}px`,
      marginLeft: `${posY * SQUARE_SIZE}px`,
    };

    //! dynamic class
    return (
      
      <div className="square sq-32" style={styles}>
        { value }
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
