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
      <div>
        <nav
          className="navbar navbar-expand-lg
        navbar-dark bg-dark fixed-top"
        >
          <span className="btn btn-dark">
            <i className="far fa-newspaper" /> News Viewer
          </span>
        </nav>
      </div>
    );
  }
}

export default NavBar;
