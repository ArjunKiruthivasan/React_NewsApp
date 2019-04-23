import React, { Component } from "react";
import { Consumer } from "../../Context";
import Spinner from "../Spinner/Spinner";
import Article from "./Article/Article";
import "./Article/Article";

class Articles extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { articles, heading } = value;

          if (articles === undefined || articles.length === 0) {
            return <Spinner />;
          } else {
            return (
              <React.Fragment>
                <h3 className="text-center mb-4">{heading}</h3>

                <div className="card-columns">
                  {articles.map((article, i) => (
                    <Article key={i} article={article} />
                  ))}
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Articles;
