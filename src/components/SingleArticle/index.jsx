import React from 'react';

import SingleArticle from './Article';

class SingleArticleContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      article: null,
      loading: true,
    };
  }

  async componentWillMount() {
    const article = await this.props.getArticle(this.props.match.params.slug);

    this.setState({
      article,
      loading: false,
    });
  }

  render() {
    return (
      <div>
        {
          !this.state.loading &&
          <SingleArticle
            article={this.state.article}
          />
        }
        {
          this.state.loading &&
          <p className="text-center">LOADING ...</p>
        }
      </div>
    );
  }
}

export default SingleArticleContainer;
