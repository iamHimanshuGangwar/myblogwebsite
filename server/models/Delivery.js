import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  blogId: { type: mongoose.Schema.Types.ObjectId, required: true },
  subscriberId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Subscriber' },
  email: { type: String, required: true, lowercase: true, trim: true },
  sentAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Delivery', deliverySchema);
