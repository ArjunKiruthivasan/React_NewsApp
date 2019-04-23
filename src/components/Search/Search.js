import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../Context";

//import "./Search.css";

class Search extends Component {
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
    heading: "My News API"
  };

  findArticle = (dispatch, e) => {
    e.preventDefault();

    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${
          this.state.forCountry
        }&q=${this.state.toquery}&category=${
          this.state.forCategory
        }&pageSize=20&apiKey=${this.state.api_key}`
      )
      .then(res => {
        dispatch({
          type: "SEARCH_NEWS",
          payload: res.data.articles
        });
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
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCategoryDropdownChange = event => {
    if (this.state.error) {
      alert("Connect to the Network");
    } else {
      this.setState({ loadingcheck: false });
      console.log(event.target.value);
      this.setState({ CategoryValue: event.target.value }, () => {
        console.log(this.state.CategoryValue);
        this.setState({ forCategory: `${this.state.CategoryValue}` });
      });
    }
  };

  handleCountryDropdownChange = event => {
    if (this.state.error) {
      alert("Connect to the Network");
    } else {
      this.setState({ loadingcheck: false });
      console.log(event.target.value);
      this.setState({ CountryValue: event.target.value }, () => {
        console.log(this.state.CountryValue);
        this.setState({ forCountry: `${this.state.CountryValue}` });
      });
    }
  };

  render() {
    const Category = [
      {
        value: "business",
        name: "Business"
      },
      {
        value: "entertainment",
        name: "Entertainment"
      },
      {
        value: "general",
        name: "General"
      },
      {
        value: "health",
        name: "Health"
      },
      {
        value: "science",
        name: "Science"
      },
      {
        value: "sports",
        name: "Sports"
      },
      {
        value: "technology",
        name: "Technology"
      }
    ];
    const Country = [
      {
        value: "in",
        name: "India"
      },
      {
        value: "us",
        name: "Usa"
      },
      {
        value: "au",
        name: "Australia"
      },
      {
        value: "ca",
        name: "Canada"
      },
      {
        value: "ch",
        name: "China"
      }
    ];
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <>
              <div className="navbar-nav">
                <form
                  className="form-inline"
                  onSubmit={this.findArticle.bind(this, dispatch)}
                >
                  <div className="form-row">
                    <div className="col">
                      <select
                        className="form-control"
                        name="CountryValue"
                        value={this.state.CountryValue}
                        onChange={this.handleCountryDropdownChange}
                      >
                        {Country.map(o => (
                          <option key={o.value} value={o.value}>
                            {o.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col">
                      <select
                        className="form-control"
                        name="CategoryValue"
                        value={this.setState.CategoryValue}
                        onChange={this.handleCategoryDropdownChange}
                      >
                        {Category.map(o => (
                          <option key={o.value} value={o.value}>
                            {o.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        name="toquery"
                        value={this.state.toquery}
                        onChange={this.onChange}
                      />
                      <button className="btn btn-success" type="submit">
                        Get Articles
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
