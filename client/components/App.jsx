import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    campusList: [],
  };
  componentDidMount() {
    axios
      .get('/api/campuses')
      .then(({ data }) => {
        this.setState({ campusList: data });
      })
      .catch(console.error);
  }
  render() {
    const { campusList } = this.state;
    return (
      <div>
        <h1>Campus Directory</h1>
        {campusList.map((campus, idx) => (
          <p key={idx}>{campus.name}</p>
        ))}
      </div>
    );
  }
}

export default App;
