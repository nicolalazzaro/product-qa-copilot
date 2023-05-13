module.exports = {
  friendlyName: "Store shop",

  description: "",

  inputs: {
    name: {
      type: "string",
      required: true,
    },

    productNameDomSelector: {
      type: "string",
      required: false,
    },

    productDescriptionDomSelector: {
      type: "string",
      required: false,
    },
  },

  exits: {},

  fn: async function (inputs) {
    await Shop.create({
      name: inputs.name,
      productNameDomSelector: inputs.productNameDomSelector,
      productDescriptionDomSelector: inputs.productDescriptionDomSelector,
    });

    // All done.
    return;
  },
};
