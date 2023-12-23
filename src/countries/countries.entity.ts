import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Countries {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ nullable: false, default: '' })
  name: string;

  @Column()
  region: string;
}