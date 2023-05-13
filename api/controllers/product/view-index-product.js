module.exports = {
  friendlyName: "View index product",

  description: 'Display "Index product" page.',

  exits: {
    success: {
      viewTemplatePath: "pages/product/index-product",
    },
  },

  fn: async function () {
    var shop = this.req.param("shop");

    // Respond with view.
    return {
      shop: shop,
      products: await Product.find({
        shop: shop,
      }),
    };
  },
};
