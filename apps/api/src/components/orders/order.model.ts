import { model } from 'mongoose';
import { OrderDocument, orderSchema, OrderSchemaType } from '@avila-tek/models';
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

export const Order = model<OrderSchemaType, Pagination<OrderSchemaType>>('Order', orderSchema);
