
import 'reflect-metadata';
import http from 'http';
import express from "express";

import mikroConfig from './mikro-orm.config';

import { Post } from './domain'

import {PostController} from './controller'

import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import { PORT } from './constants';

export const DI = {} as {
    server: http.Server;
    orm: MikroORM,
    em: EntityManager,
    postRepository: EntityRepository<Post>,
};


export const app = express();

export const init = (async () => {
    DI.orm = await MikroORM.init(mikroConfig);
    // await DI.orm.getMigrator().up();

    DI.em = DI.orm.em;
    DI.postRepository = DI.orm.em.getRepository(Post);

    const generator = DI.orm.getSchemaGenerator();
    await generator.updateSchema();

    app.use(express.json());
    app.use((_req, _res, next) => RequestContext.create(DI.orm.em, next));
    app.get('/', (_req, res) => res.json({ message: 'Welcome to MikroORM express TS example, try CRUD on /author and /book endpoints!' }));
    app.use('/post/', PostController);
    app.use((_res, res) => res.status(404).json({ message: 'No route found' }));

    DI.server = app.listen(PORT, () => {
        console.log(`MikroORM express TS example started at http://localhost:${PORT}`);
    });
});


init();