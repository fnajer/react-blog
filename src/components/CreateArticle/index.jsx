import React from 'react';
import CreateArticleForm from './CreateArticleForm';

class CreateArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      image: null,
      content: '',
      category: null,
      errors: {},
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

    await this.props.createArticle(this.state);
  }

  render() {
    return (
      <CreateArticleForm
        handleInputChange={this.handleInputChange}
        categories={this.state.categories}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default CreateArticle;
