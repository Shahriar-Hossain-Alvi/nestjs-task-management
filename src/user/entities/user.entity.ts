import { Exclude, Expose } from 'class-transformer';

// tell which data fields will be returned in the data
export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  // only this fields will be returned in the json data
  @Expose()
  id: number;

  @Expose()
  fullName: string;

  @Expose()
  phone: string;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Expose()
  createdAt: Date;

  // below fields will be excluded from the returned json data
  @Exclude()
  password: string;
}
