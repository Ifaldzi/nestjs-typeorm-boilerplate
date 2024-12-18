import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User } from '../../modules/user/user.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import * as bcrypt from 'bcrypt';

const records: QueryDeepPartialEntity<User>[] = [
  {
    id: '81b1c4ef-a7e7-4e75-a6e6-fa4803a2ae20',
    name: 'Seed User',
    email: 'seed@email.com',
    password: bcrypt.hashSync('seeduser1234', 10),
  },
];

export class UserSeeder1734505501206 implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<any> {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(records)
      .orIgnore()
      .execute();
  }
}
