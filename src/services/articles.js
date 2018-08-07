import Axios from 'axios';
import config from './../config';

export default class ArticlesService {
  async getArticleCategories() {
    const responce = await Axios.get(`${config.apiUrl}/categories`);

    return responce.data.categories;
  }
}
