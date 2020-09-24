import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2>Yikes something went wrong here!!</h2>
          <p>well this is awkward...</p>
        </>
      );
    }
    return this.props.children;
  }
}
