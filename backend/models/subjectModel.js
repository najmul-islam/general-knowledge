const { Schema, model } = require("mongoose");

const subjectSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Subject", subjectSchema);
