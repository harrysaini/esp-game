import Image from '../models/image.model';
import fs from 'fs';
import * as path from 'path';
import User from '../models/user.model';

const imagesListPath = path.join(__dirname, '../../config/images.json');
const usersListpath = path.join(__dirname, '../../config/users.json');

export const addImagesToDb = async () => {
  const images = await Image.findAll();
  if(images.length > 0) {
    return;
  }
  const imagesFile = fs.readFileSync(imagesListPath, 'utf-8');
  const imagesToAdd  = JSON.parse(imagesFile);

  const promisesArr = imagesToAdd.images.map(async (img: any) => {
    const imageObject = await Image.create({
      name: img.name,
      url: img.url,
      isPrimaryImage: true
    });

    const secondaryImagesPromises: Promise<Image>[]  = img.secondaryImages.map( async (url: string): Promise<Image> => {
      const sec_imageObject = await Image.create({
        name: 'sec_' + img.name,
        url: url
      });
      await sec_imageObject.setPrimaryImage(imageObject);
      return sec_imageObject;
    });

    const secondaryImages = await Promise.all(secondaryImagesPromises);
  });

  await Promise.all(promisesArr);

}


export const adduserToDb = async () => {
  const users = await User.findAll();
  if(users.length > 0) {
    return;
  }

  const usersFile = fs.readFileSync(usersListpath, 'utf-8');
  const userToAdd  = JSON.parse(usersFile);


  const promisesArr = userToAdd.users.map(async (user: any) => {
    const userObj = await User.create({
      username: user.username,
      password: user.password,
    });

    return userObj;
  });

  await Promise.all(promisesArr);
}
