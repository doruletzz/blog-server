import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Post } from './domain';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

import path from 'path';
import { PASS, USER } from './constants';

const config: Options = {
    migrations: {
        path: path.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}',
    },
    entities: [Post],
    allowGlobalContext: true,
    dbName: 'dorletz',
    type: 'mariadb',
    metadataProvider: TsMorphMetadataProvider,
    highlighter: new SqlHighlighter(),
    debug: true,
    port: 3306,
    user: USER,
    password: PASS,
};

export default config;