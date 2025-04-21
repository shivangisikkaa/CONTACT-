const mongoose = require("mongoose");
const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.Objectld,
      required: true,
      ref: "User",
    },

    name: {
      type: String,
      required: [true, "please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "please add the contact email"],
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model("Contact", contactSchema);
