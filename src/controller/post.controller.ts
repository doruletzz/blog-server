import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { QueryOrder} from '@mikro-orm/core';
import { DI } from '../index';
// import { Post } from '../domain';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    const books = await DI.postRepository.findAll({
      orderBy: { title: QueryOrder.DESC },
      limit: 20,
    });
    res.json(books);
});

router.post('/', async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.email) {
      res.status(400);
      return res.json({ message: 'One of `name, email` is missing' });
    }
  
    try {
      const author = DI.postRepository.create(req.body);
      await DI.postRepository.persist(author).flush();
  
      res.json(author);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
});

  
export const PostController = router;