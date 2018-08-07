import Axios from 'axios';
import config from './../config';

export default class ArticlesService {
  async getArticleCategories() {
    const responce = await Axios.get(`${config.apiUrl}/categories`);

    return responce.data.categories;
  }

  createArticle = async (data, token) => {
    const image = await this.uploadToCloudinary(data.image);

    try {
      const responce = await Axios(`${config.apiUrl}/articles`, {
        name: data.title,
        content: data.content,
        category_id: data.category,
        imageUrl: image.secure_url,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(responce);
      return responce.data;
    } catch (errors) {
      console.log(errors);

      return errors.responce.data;
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
