import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true, trim: true },
    countryCode: { type: String, required: true, trim: true },
    company: { type: String, trim: true, default: "" },
    projectType: { type: String, required: true, trim: true, index: true },
    subject: { type: String, trim: true, default: "Website Inquiry" },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new", index: true },
    source: { type: String, trim: true, default: "Contact Page" },
    createdAt: { type: Date, default: Date.now, index: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

leadSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret._id;
    return ret;
  },
});

export const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema, "leads");
