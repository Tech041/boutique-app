import { Schema, Document, model } from "mongoose";

export interface IVisitor extends Document {
  visitorId: string;
  date: Date;
  createdAt: Date;
}

const visitorSchema = new Schema<IVisitor>({
  visitorId: { type: String, required: true, index: true },
  date: { type: Date, required: true, index: true }, // normalized to midnight
  createdAt: { type: Date, default: Date.now },
});

// Compound index ensures uniqueness per visitor per day
visitorSchema.index({ visitorId: 1, date: 1 }, { unique: true });
visitorSchema.index({ createdAt: -1 }); // for pagination

const Visitor = model<IVisitor>("Visitor", visitorSchema);
export default Visitor;
