import React, { PureComponent } from "react";
import Header from "./Header";
import SearchInput from "./SearchInput";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tones: null
    };
  }

  getMood = (text) => {
    const data = {
      text: text,
      tones: null
    };

    fetch('/mood', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => {
      if (data.document_tone && data.document_tone.tones) {
        const tones = Object.values(data.document_tone.tones).map(tone => {
          return {
            score: (tone.score * 100).toFixed(2),
            tone: tone.tone_name
          }
        });
        this.setState({
          tones
        })
      }
    })
    .catch(err => {
      this.setState({
        tones: null
      })
    });
  }

  renderTones() {
    return this.state.tones && this.state.tones.map((tone, idx) => {
      return <div key={idx}>Tone: {tone.tone} - {tone.score}%</div>
    });
  }

  render() {
    return (
      <div>
        <Header />
        <SearchInput getMood={this.getMood} />
        <div>{this.renderTones()}</div>
      </div>
    );
  }
}
