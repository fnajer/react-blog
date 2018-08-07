import Axios from 'axios';
import config from './../config';

export default class ArticlesService {
  async getArticleCategories() {
    const responce = await Axios.get(`${config.apiUrl}/categories`);

    return responce.data.categories;
  }

  createArticle = async (data) => {
    await this.uploadToCloudinary(data.image);
  }

  async uploadToCloudinary(image) {
    const form = new FormData();

    form.append('file', image);
    form.append('upload_preset', 'jechscpf');

    const responce = await Axios.post('https://api.cloudinary.com/v1_1/dlrbjhllv/image/upload', form);

    return responce.data;
  }
}
