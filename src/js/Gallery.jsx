import React, { Component } from 'react';

function Gallery(props) {
  return(
    <div className='gallery'>
      {props.columnsContent.map(column => <Column columnContent={column}/>)}
    </div>
  );
}

function Column(props) {
  return(
    <div className='column'>
      {props.columnContent.map(content => content.title
        ? <Image galleryContent={content} />
        : <Quote quote={content} />
      )}
    </div>
  )
}

class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      captionIsVisible: false
    }
  }

  toggleCaption() {
    this.setState({ captionIsVisible: !this.state.captionIsVisible });
  }

  render() {
    return(
      <figure
        className='column-content'
        onClick={() => this.toggleCaption()}
        onMouseLeave={() => this.setState({ captionIsVisible: false })}
      >
        <img 
          src={this.props.galleryContent.imgUrl} 
          alt={this.props.galleryContent.title}/>
        <figcaption style={{ display: this.state.captionIsVisible
          ? 'block'
          : 'none' }}>
          <cite>{this.props.galleryContent.title}</cite>
          <p>{this.props.galleryContent.artist}</p>
        </figcaption>
      </figure>
    );
  }
}

function Quote(props) {
  return(
    <div className='column-content quote'>
      <q>{props.quote.quote}</q>
      <p>{props.quote.speaker}</p>
    </div>
  );
}

export default Gallery;
