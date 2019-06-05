import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./SearchInput.css";

export default class SearchInput extends PureComponent {
  static propTypes = {
    getMood: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      text: 'Crying allows your eyes to speak when your mouth can no longer explain how broken your heart is.'
    }
  }

  handleChange = event => {
    this.setState({
      text: event.currentTarget.value
    });
  };

  handleClick = () => {
    this.props.getMood(this.state.text);
  };

  render() {
    return (
      <div className="component-search-input">
        <div>
          <textarea onChange={this.handleChange} value={this.state.text} rows="4" cols="50"/>
          <br/>
          <button onClick={this.handleClick}>Get Mood</button>
        </div>
      </div>
    );
  }
}
