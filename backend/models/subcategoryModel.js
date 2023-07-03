const { Schema, model } = require("mongoose");

const subcategorySchmema = Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
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

module.exports = model("Subcategory", subcategorySchmema);
