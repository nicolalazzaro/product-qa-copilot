module.exports = {
  friendlyName: "View generate qa",

  description: 'Display "Generate qa" page.',

  exits: {
    success: {
      viewTemplatePath: "pages/generate-qa",
    },
  },

  fn: async function () {
    // Respond with view.
    return {
      product: await Product.findOne(this.req.param("product")),
    };
  },
};
