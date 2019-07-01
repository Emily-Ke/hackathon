import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';
import Gallery from './Gallery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paintings: [],
      quote: {
        quote: 'A well-defined problem is half solved',
        speaker: 'Michael Osborne'
      }
    }
  }

  componentDidMount() {
    axios
      .get('/quote')
      .then(response => {
        this.setState({ quote: { quote: response.data.quote, speaker: response.data.speaker } });
      })
      .catch(err => console.log(err));

    axios
      .get('/paintings')
      .then(response => this.setState({ paintings: response.data }))
      .catch(err => console.log(err));
  }

  render() {
    let content;
    if(this.state.paintings.length > 0) {
      const galleryContent = this.state.paintings.slice();
      const quoteIndex = getRndInteger(0, galleryContent.length - 1);
      galleryContent.splice(quoteIndex, 0, this.state.quote);

      const itemsPerColumn = Math.round( galleryContent.length / 4 );

      let column1Content = galleryContent.splice(0, itemsPerColumn);
      let column2Content = galleryContent.splice(0, itemsPerColumn);
      let column3Content = galleryContent.splice(0, itemsPerColumn);
      let column4Content = galleryContent.splice(0, galleryContent.length);

      const columnsContent =
          [column1Content, column2Content, column3Content, column4Content];

      content = <Gallery columnsContent={columnsContent}/>

    } else {
      content = <Loading />;
    }
    return(
      <div>
        <header>
          <h1>A Piece of the Met</h1>
        </header>
        {content}
      </div>
    );
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export default App;
