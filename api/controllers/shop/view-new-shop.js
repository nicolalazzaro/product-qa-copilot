module.exports = {
  friendlyName: "View new shop",

  description: 'Display "New shop" page.',

  exits: {
    success: {
      viewTemplatePath: "pages/shop/new-shop",
    },
  },

  fn: async function () {
    // Respond with view.
    return {};
  },
};
