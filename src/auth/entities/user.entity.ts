import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  email: string;

  @Column('text', {
    select: false,
    nullable: true,
  })
  password: string;

  @Column('text', {
    nullable: true,
  })
  fullName: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @Column('text', {
    default:
      'https://cdn.discordapp.com/attachments/701571845526126602/1176641823054241963/DALLE_2023-11-21_16.51.43_-_A_minimalist_default_profile_picture_for_an_ecommerce_website._The_design_should_be_extremely_simple_and_clean_featuring_a_solid_purple_background_w.png?ex=656f9c17&is=655d2717&hm=f2851f205bcec9691ddb493a86e19f9943209a4cebfa613c2c5a1636f8e73bbb&',
  })
  picture: string;

  @BeforeInsert()
  checkFields() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsOnUpdate() {
    this.email = this.email.toLowerCase().trim();
  }
}
