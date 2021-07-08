import { Component } from 'react';

// editor/display used for building the tab
export default class TestMain extends Component {
  render() {
    return (
      <>
        {/* <img alt="banner image" src="https://picsum.photos/1400/200"/> */}
        <img
          className="h-80 object-cover"
          src={this.props.blogData.banner}
          alt="banner"
        />
        <div className="text-3xl px-3 mt-8 mb-5">
          {this.props.blogData.title}
        </div>
        <p className="px-3">{this.props.blogData.body} </p>
      </>
    );
  }
}
