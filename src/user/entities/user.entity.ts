import { AddressEntity } from 'src/address/entities/address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'phone', nullable: true })
  phone: string;

  @Column({ name: 'cpf', nullable: true })
  cpf: string;

  @Column({ name: 'password', nullable: true })
  password: string;

  @Column({ name: 'type_user', nullable: true })
  typeUser: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses?: AddressEntity[];
}
