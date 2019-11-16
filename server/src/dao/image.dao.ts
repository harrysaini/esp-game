import Image from '../models/image.model';
import _ from 'lodash';

class ImageDAO {
  static async getAllImages() {
    const images = await Image.findAll({
      where: {
        isPrimaryImage: true
      }
    });
    return images;
  }

  static async getImageWithSecondaryImages(imageId: number) {
    let image = await Image.findByPk(imageId);
    if(!image) {
      return null;
    }
    let secondaryImages = await Image.findAll({
      where: {
        primaryImageId: imageId
      }
    });
    image = _.extend( image.toJSON(),{
      secondaryImages: _.shuffle(secondaryImages)
    }) as Image;
    return image;
  }
}

export default ImageDAO;
