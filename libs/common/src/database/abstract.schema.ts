import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class AbstractDocument {
  @Prop()
  id: string;
}
