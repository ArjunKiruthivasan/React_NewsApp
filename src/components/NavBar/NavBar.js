import React, { Component } from "react";
import Search from "../Search/Search";
const hStyle = {
  color: "white"
};

const listStyle = {
  color: "#226df7"
};

class NavBar extends Component {
  componentDidMount() {
    console.log("%cNews Finder!", "color: red; font-size:25px");
    console.log(
      "%cContact info: arjun.kiruthivasan@gmail.com",
      "color: grey; font-size:15px"
    );
  }
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg
        navbar-dark bg-dark fixed-top"
      >
        <span className="navbar-brand">
          <i className="far fa-newspaper" /> News Viewer
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <Search />
        </div>
      </nav>
    );
  }
}

export default NavBar;
