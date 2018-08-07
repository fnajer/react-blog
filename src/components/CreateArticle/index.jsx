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
    console.log(event.target.files);
    this.setState({
      [event.target.name]: event.target.type === 'file' ? event.target.files[0] : event.target.value,
    });
  }

  render() {
    return (
      <CreateArticleForm
        handleInputChange={this.handleInputChange}
        categories={this.state.categories}
      />
    );
  }
}

export default CreateArticle;
