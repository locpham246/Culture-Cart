import mongoose from 'mongoose';

const StoreProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    price: { type: Number, required: true, min: 0 }, // Giá của sản phẩm tại cửa hàng này
    stock: { type: Number, required: true, min: 0, default: 0 }, // Số lượng tồn kho tại cửa hàng này
    isAvailable: { type: Boolean, default: true }, // Sản phẩm có sẵn để bán tại cửa hàng này không

    recommended: { type: Boolean, default: false }, // Có được cửa hàng này đề xuất không
    discount: { type: Boolean, default: false }, // Có đang giảm giá tại cửa hàng này không
    storeSpecificImages: { type: [String], default: [] }, // Hình ảnh riêng của cửa hàng cho sản phẩm này

}, { timestamps: true });

StoreProductSchema.index({ productId: 1, storeId: 1 }, { unique: true });

const StoreProductModel = mongoose.models.StoreProduct || mongoose.model("StoreProduct", StoreProductSchema);

export { StoreProductModel as StoreProduct };
