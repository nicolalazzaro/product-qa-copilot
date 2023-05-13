module.exports = {
  friendlyName: "View index shop",

  description: 'Display "Index shop" page.',

  exits: {
    success: {
      viewTemplatePath: "pages/shop/index-shop",
    },
  },

  fn: async function () {
    // Respond with view.
    return {
      shops: await Shop.find(),
    };
  },
};
