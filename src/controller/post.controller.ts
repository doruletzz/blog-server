import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { QueryOrder } from '@mikro-orm/core';
import { DI } from '../index';
import { Tag } from '../domain';
// import { Post } from '../domain';

const router = Router();

router.delete('/:slugOrId', async (req: Request, res: Response) => {
	try {
		const post = await DI.postRepository.findOneOrFail({
			$or: [
				{ slug: req.params.slugOrId },
				{ id: parseInt(req.params.slugOrId) },
			],
		});

		await DI.postRepository.removeAndFlush(post);

		res.json('deleted successfully');
	} catch (e: any) {
		return res.status(400).json({ message: e.message });
	}
});

router.get('/:slugOrId', async (req: Request, res: Response) => {
	const post = await DI.postRepository.findOne({
		$or: [
			{ slug: req.params.slugOrId },
			{ id: parseInt(req.params.slugOrId) },
		],
	});
	res.json(post);
});

router.get(
	'/',
	async (
		req: Request<
			{},
			{},
			{},
			{ tags: Array<Tag>; page: number; pageSize: number }
		>,
		res: Response
	) => {
		console.log(req.query.tags);
		const page = req.query.page ? req.query.page : 1;
		const pageSize = req.query.pageSize ? req.query.pageSize : 10;

		console.log(req.query, page, pageSize);

		const posts = await DI.postRepository.find(
			req.query.tags
				? {
						tags: {
							$like: req.query.tags
								.map((tag) => `%${tag}%`)
								.toString(),
						},
				  }
				: {},
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
	'/',
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

router.put('/:id', async (req: Request, res: Response) => {
	if (!req.body.slug || !req.body.title) {
		res.status(400);
		return res.json({ message: 'One of `slug or title` is missing' });
	}

	try {
		let post = await DI.postRepository.findOneOrFail({
			id: parseInt(req.params.id),
		});

		post.id = parseInt(req.params.id);
		post.slug = req.body.slug;
		post.title = req.body.title;
		post.user = req.body.user;
		post.content = req.body.content;
		post.summary = req.body.summary;
		post.createdAt = new Date(req.body.createdAt);
		post.updatedAt = new Date();

		console.log(post, req.body);
		await DI.postRepository.persist(post).flush();

		res.json(post);
	} catch (e: any) {
		return res.status(400).json({ message: e.message });
	}
});

router.post('/', async (req: Request, res: Response) => {
	console.log(req.body.slug, req.body.title);
	if (!req.body.slug || !req.body.title) {
		res.status(400);
		return res.json({ message: 'One of `slug or title` is missing' });
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
