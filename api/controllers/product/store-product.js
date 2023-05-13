module.exports = {
  friendlyName: "Store product",

  description: "",

  inputs: {
    url: {
      type: "string",
      required: true,
    },

    name: {
      type: "string",
      required: true,
    },

    description: {
      type: "string",
      required: true,
    },

    shop: {
      type: "number",
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs) {
    await Product.create({
      url: inputs.url,
      name: inputs.name,
      description: inputs.description,
      shop: inputs.shop,
    });

    // All done.
    return;
  },
};
