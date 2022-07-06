import { Entity, EnumArrayType, PrimaryKey, Property } from '@mikro-orm/core';

export enum Tag {
	programming,
	blog,
	design,
	react,
	books,
}

@Entity()
export class Post {
	@PrimaryKey({ type: 'number' })
	id!: number;

	@Property({ type: 'date' })
	createdAt? = new Date();

	@Property({ type: 'date', onUpdate: () => new Date() })
	updatedAt?: Date;

	@Property({ type: 'string', unique: true })
	slug!: string;

	@Property({ type: 'string' })
	title!: string;

	@Property({ type: 'string' })
	summary?: string;

	@Property({ type: EnumArrayType })
	tags?: Array<Tag>;

	@Property({ type: 'string' })
	user?: string;

	@Property({ type: 'text' })
	content!: string;

	@Property({ type: 'string' })
	imageUrl?: string;
}
