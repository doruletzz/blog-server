import { Request, Response } from "express";
import Router from "express-promise-router";
import { QueryOrder } from "@mikro-orm/core";
import { DI } from "../index";
import { Tag } from "../domain";
// import { Post } from '../domain';

const router = Router();

router.get("/:slug", async (req: Request, res: Response) => {
  const posts = await DI.postRepository.findOne({
    slug: req.params.slug,
  });
  res.json(posts);
});

router.get(
  "/",
  async (
    req: Request<
      { tag: Array<Tag> },
      {},
      {},
      { page: number; pageSize: number }
    >,
    res: Response
  ) => {
    console.log(req.query.tag);
    const page = req.query.page ? req.query.page : 1;
    const pageSize = req.query.pageSize ? req.query.pageSize : 10;

    console.log(req.query, page, pageSize);

    const posts = await DI.postRepository.find(
      { tags: req.params.tag },
      {
        orderBy: { createdAt: QueryOrder.DESC },
        limit: pageSize,
        offset: (page - 1) * pageSize,
      }
    );

    res.json(posts);
  }
);

router.get(
  "/",
  async (
    req: Request<{}, {}, {}, { page: number; pageSize: number }>,
    res: Response
  ) => {
    const page = req.query.page ? req.query.page : 1;
    const pageSize = req.query.pageSize ? req.query.pageSize : 10;

    console.log(req.query, page, pageSize);

    const posts = await DI.postRepository.findAll({
      orderBy: { createdAt: QueryOrder.DESC },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    res.json(posts);
  }
);

router.post("/", async (req: Request, res: Response) => {
  console.log(req.body.slug, req.body.title);
  if (!req.body.slug || !req.body.title) {
    res.status(400);
    return res.json({ message: "One of `slug or title` is missing" });
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
