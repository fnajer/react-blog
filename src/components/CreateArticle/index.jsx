import React from 'react';
import PropTypes from 'prop-types';
import CreateArticleForm from './CreateArticleForm';

class CreateArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      image: null,
      content: '',
      category: null,
      errors: [],
      categories: [],
    };
  }

  async componentWillMount() {
    
    const categories = await this.props.getArticleCategories();

    this.setState({
      categories,
    });
    
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.type === 'file' ? event.target.files[0] : event.target.value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const article = await this.props.createArticle(this.state, this.props.token);
      //this.props.history.push('/');
    } catch (errors) {
      this.setState({ errors });
    }
  }

  render() {
    return (
      <CreateArticleForm
        handleInputChange={this.handleInputChange}
        categories={this.state.categories}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
      />
    );
  }
}

CreateArticle.propTypes = {
  getArticleCategories: PropTypes.func.isRequired,
  createArticle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default CreateArticle;
