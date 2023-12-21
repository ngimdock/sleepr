import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
@ObjectType({ isAbstract: true })
export class AbstractDocument {
  @Prop()
  @Field()
  id: string;
}
