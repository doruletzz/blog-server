import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {

    @PrimaryKey({type: 'number'})
    id!: number;

    @Property({type: 'date'})
    createdAt? = new Date();

    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt? = new Date();

    @Property({type: 'string', unique: true})
    slug!: string;

    @Property({type: 'string'})
    title!: string;
    
    @Property({type: 'string'})
    summary?: string;

    @Property({type: 'string'})
    user?: string;

    @Property({type: 'text'})
    content!: string;

    @Property({type: 'string'})
    imageUrl?: string;
}