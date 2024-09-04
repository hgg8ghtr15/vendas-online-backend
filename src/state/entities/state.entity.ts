import { CityEntity } from 'src/city/entities/city.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'state' })
export class StateEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'uf', nullable: true })
  uf: string;

  @CreateDateColumn({ name: 'created_at' })
  createdat: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedat: Date;

  @OneToMany(() => CityEntity, (city) => city.state)
  cities?: CityEntity;
}
