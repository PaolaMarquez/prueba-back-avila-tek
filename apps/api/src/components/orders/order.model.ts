import { model } from 'mongoose';
import { itemSchema, orderSchema } from '@avila-tek/models';


export const Item = model('Item', itemSchema);
export const Order = model('Order', orderSchema);
