import React, { Component } from 'react';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let ellipse = '';
    switch(this.state.seconds % 4) {
      case 0:
        ellipse = '';
        break;
      case 1:
        ellipse = '.';
        break;
      case 2:
        ellipse = '. .';
        break;
      default:
        ellipse = '. . .';
    }

    return (
      <div className='loading'>
        <div className='alignRignt'>Loading</div>
        <div>{ellipse}</div>
      </div>
    );
  }
}

export default Loading;
