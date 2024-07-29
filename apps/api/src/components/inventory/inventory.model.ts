import { model } from 'mongoose';
import { ProductDocument, productSchema, ProductSchemaType } from '@avila-tek/models';
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

// export const Product = model<ProductDocument, Pagination<ProductDocument>>('Product', productSchema);
export const Product = model<ProductSchemaType, Pagination<ProductSchemaType>>('Product', productSchema);