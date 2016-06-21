import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import '../static/css/graphiql.css';

function graphQLFetcher(graphQLParams) {
  return fetch('http://localhost:5200/graph', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Graphyte-Platform': 'flexsites',
    },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}

export default class Preview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<GraphiQL fetcher={graphQLFetcher} onToggleDocs={() => console.log('toggled!')} />);
  }
}
