import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Post } from './domain';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

import path from 'path';
import { DB_NAME, PASS, URL, USER } from './constants';

const config: Options = {
    migrations: {
        path: path.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}',
    },
    entities: [Post],
    allowGlobalContext: true,
    dbName: DB_NAME,
    type: 'mysql',
    metadataProvider: TsMorphMetadataProvider,
    highlighter: new SqlHighlighter(),
    debug: true,
    host: URL, 
    port: 3306,
    user: USER,
    password: PASS,
};

export default config;