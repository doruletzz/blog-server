import { Migration } from '@mikro-orm/migrations';

export class Migration20220405112229 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `post` (`id` int unsigned not null auto_increment primary key, `created_at` datetime null, `updated_at` datetime null, `slug` varchar(255) not null, `title` varchar(255) not null, `summary` varchar(255) null, `user` varchar(255) null, `content` text null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `post` add unique `post_slug_unique`(`slug`);');
  }

}
