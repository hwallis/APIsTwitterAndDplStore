import React, { Component } from 'react';

class Tweets extends Component {
  state = { tweets: []};

  componentDidMount() {
    $.ajax({
      url: `/tweets/hwallis`,
      type: "GET",
      dataType: "JSON"
    }).done( tweets => {
      this.setState({ tweets });
    }).fail( data => {
      //TODO: handle this better
      console.log(data);
    })
  }

  tweets = () => {
    return this.state.tweets.map(tweet => {
      return(<li>{tweet.text}</li>);
    });
  }

  render() {
    return(
      <div>
        <h3>All Tweets For User</h3>
        <ul>
          { this.tweets() }
        </ul>
      </div>
    );
  }
}

export default Tweets;