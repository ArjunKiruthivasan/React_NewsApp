import React from "react";
import "./Article.css";

class Article extends React.Component {
  formatDate(date) {
    var time = new Date(date);
    var year = time.getFullYear();
    var day = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var month = time.getMonth() + 1;
    var composedTime =
      day +
      "/" +
      month +
      "/" +
      year +
      " | " +
      hour +
      ":" +
      (minute < 10 ? "0" + minute : minute);
    return composedTime;
  }

  render() {
    return (
      <div className="card Article text-dark bg-light">
        {this.props.article.urlToImage ? (
          <img
            className="card-img-top"
            src={this.props.article.urlToImage}
            alt={this.props.article.title}
            title={this.props.article.title}
          />
        ) : null}

        <div className="card-body">
          {this.props.article.title ? (
            <h5 className="card-title">{this.props.article.title}</h5>
          ) : null}
          {this.props.article.author ? (
            <p className="card-text author">
              <span class="badge badge-pill badge-dark">
                {this.props.article.author}
              </span>
            </p>
          ) : null}
          {this.props.article.description ? (
            <p className="card-text">
              {this.props.article.description}{" "}
              <a
                className="card-link"
                target="_blank"
                href={this.props.article.url}
              >
                <span class="badge badge-dark">Read More..</span>
              </a>
            </p>
          ) : null}{" "}
          {this.props.article.publishedAt ? (
            <a
              href={this.props.article.url}
              class="card-link card-text text-right"
            >
              <span class="badge badge-success">
                {this.formatDate(this.props.article.publishedAt)}
              </span>
            </a>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Article;
