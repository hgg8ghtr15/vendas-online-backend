import {
  Column,
  CreateDateColumn,
  Entity,
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
}
