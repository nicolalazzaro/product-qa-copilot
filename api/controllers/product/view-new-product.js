module.exports = {
  friendlyName: "View new product",

  description: 'Display "New product" page.',

  exits: {
    success: {
      viewTemplatePath: "pages/product/new-product",
    },
  },

  fn: async function () {
    // Respond with view.
    return {
      shop: this.req.param("shop"),
    };
  },
};
