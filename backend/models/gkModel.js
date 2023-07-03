const { Schema, model } = require("mongoose");

const gkSchema = Schema(
  {
    subject: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Subject",
    },
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
    qna: {
      type: String,
    },
    table: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("GK", gkSchema);
