import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { QueryOrder} from '@mikro-orm/core';
import { DI } from '../index';
// import { Post } from '../domain';

const router = Router();

router.get('/:slug', async (req: Request, res: Response) => {
  const posts = await DI.postRepository.findOne({
    slug: req.params.slug
  });
  res.json(posts);
});

router.get('/', async (_req: Request, res: Response) => {
    const posts = await DI.postRepository.findAll({
      orderBy: { title: QueryOrder.DESC },
      limit: 20,
    });
    res.json(posts);
});

router.post('/', async (req: Request, res: Response) => {
    if (!req.body.id || !req.body.slug || !req.body.title) {
      res.status(400);
      return res.json({ message: 'One of `id, slug or title` is missing' });
    }
  
    try {
      const post = DI.postRepository.create(req.body);
      await DI.postRepository.persist(post).flush();
  
      res.json(post);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
});

  
export const PostController = router;