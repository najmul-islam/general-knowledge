const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
