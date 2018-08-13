import Axios from 'axios';
import { validateAll } from 'indicative';
import config from './../config';

export default class ArticlesService {
  async getArticles(url = `${config.apiUrl}/articles`) {
    const responce = await Axios.get(url);

    return responce.data.data;
  }

  async getUserArticles(token, url = `${config.apiUrl}/user/articles`) {
    const responce = await Axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return responce.data.data;
  }

  async getArticleCategories() {
    const categories = JSON.parse(localStorage.getItem('categories'));

    if (categories) {
      return categories;
    }
    
    const responce = await Axios.get(`${config.apiUrl}/categories`);
    localStorage.setItem('categories', JSON.stringify(responce.data.categories));
   
    return responce.data.categories;
  }

  async getArticle(slug) {
    const responce = await Axios.get(`${config.apiUrl}/article/${slug}`);

    return responce.data.data;
  }

  createArticle = async (data, token) => {
    try {
      if (!data.image) {
        throw [{ message: 'The image is required' }];
      }

      const rules = {
        title: 'required',
        content: 'required',
        category: 'required',
      };

      const messages = {
        required: 'The {{ field }} is required',
      };

      await validateAll(data, rules, messages);

      const image = await this.uploadToCloudinary(data.image);

      const responce = await Axios.post(`${config.apiUrl}/articles`, {
        title: data.title,
        content: data.content,
        category_id: data.category,
        imageUrl: image.secure_url,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });console.log(responce.data);
      return responce.data;
    } catch (errors) {
      console.log(errors);
      if (errors.responce) {
        throw errors.responce.data;
      }

      throw errors;
    }
  }

  async uploadToCloudinary(image) {
    const form = new FormData();

    form.append('file', image);
    form.append('upload_preset', 'jechscpf');

    const responce = await Axios.post('https://api.cloudinary.com/v1_1/dlrbjhllv/image/upload', form);

    return responce.data;
  }
}
