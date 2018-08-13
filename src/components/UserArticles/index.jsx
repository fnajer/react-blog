import React from 'react';
import Articles from './Articles';

class UserArticles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: {},
    };
  }

  async componentWillMount() {
    const articles = await this.props.getUserArticles(this.props.token);

    this.setState({
      articles,
    });
    this.props.setArticles(articles.data);
  }

  handlePagination = async (url) => {
    const articles = await this.props.getUserArticles(this.props.token, url);

    this.setState({
      articles,
    });
    this.props.setArticles(articles.data);
  };

  render() {
    return (
      <Articles
        articles={this.state.articles.data}
        nextUrl={this.state.articles.next_page_url}
        prevUrl={this.state.articles.prev_page_url}
        handlePagination={this.handlePagination}
      />
    );
  }
}

export default UserArticles;
