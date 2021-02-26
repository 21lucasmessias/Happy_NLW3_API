import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Oprhanage';
import * as Yup from 'yup';

import ViewOrphanage from '../views/viewOrphanage';

export default {
  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      number,
      about,
      instructions,
      schedule,
      weekend
    } = req.body;

    const orphanagesRepository = getRepository(Orphanage);

    const requestImages = req.files as Array<Express.Multer.File>;
    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const data = {
      name,
      latitude,
      longitude,
      number,
      about,
      instructions,
      schedule,
      weekend: weekend == 'true' ? true : false,
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.string().required(),
      longitude: Yup.string().required(),
      number: Yup.string().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      schedule: Yup.string().required(),
      weekend: Yup.boolean().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required()
      }))
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return res.status(201).json(orphanage);
  },

  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    res.status(200).json(ViewOrphanage.renderMany(orphanages));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    res.status(200).json(ViewOrphanage.render(orphanage));
  }
}