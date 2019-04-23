import React, { Component, useReducer } from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_NEWS":
      return {
        ...state,
        articles: action.payload,
        heading: "Search Results"
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    articles: [],
    error: false,
    toquery: "",
    forCategory: "general",
    forCountry: "in",
    query: "",
    CategoryValue: "",
    CountryValue: "",
    loadingcheck: true,
    api_key: "4305057cd3c74ce59b59f706e2a5bc52",
    //api_key: "7de4507ef58c4118be7684e320da6328",
    heading: "My News API",
    dispatch: action => this.setState(state => reducer(state, action))
  };

  componentDidMount() {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${
          this.state.forCountry
        }&q=${this.state.toquery}&category=${
          this.state.forCategory
        }&pageSize=20&apiKey=${this.state.api_key}`
      )
      .then(res => {
        console.log(res.data);
        console.log(
          `https://newsapi.org/v2/top-headlines?country=${
            this.state.forCountry
          }&q=${this.state.toquery}&category=${
            this.state.forCategory
          }&pageSize=20&apiKey=${this.state.api_key}`
        );
        this.setState(
          { articles: res.data.articles, loadingcheck: true },
          () => {
            
            if (localStorage.getItem("backupdata") === true) {
              // init variable/set default variable for item
              console.log(" backupdata");
              console.log(localStorage.getItem("backupdata"));
            }
            localStorage.setItem("backupdata", JSON.stringify(this.state.articles));
            localStorage.setItem("forCountry", this.state.forCountry);
            localStorage.setItem("forCategory", this.state.forCategory);
            localStorage.setItem("toquery", this.state.toquery);
            localStorage.setItem("CountryValue", this.state.CountryValue);
            localStorage.setItem("CategoryValue", this.state.CategoryValue);
            localStorage.setItem("query", this.state.query);
          }
        );
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: err,
          loadingcheck: true,
          articles: JSON.parse(localStorage.getItem("backupdata")),
          forCountry: localStorage.getItem("forCountry"),
          forCategory: localStorage.getItem("forCategory"),
          toquery: localStorage.getItem("toquery"),
          CategoryValue: localStorage.getItem("CategoryValue"),
          CountryValue: localStorage.getItem("CountryValue"),
          query: localStorage.getItem("query")
        });
      });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
