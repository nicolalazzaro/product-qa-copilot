var got = require("got");
var jsdom = require("jsdom");
var { JSDOM } = jsdom;

module.exports = {
  friendlyName: "Scrape product",

  description: "",

  inputs: {
    shop: {
      type: "number",
      required: true,
    },

    url: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
    },

    notFound: {
      statusCode: 404,
    },

    failed: {
      statusCode: 500,
    },
  },

  fn: async function (inputs, exits) {
    var shop = await Shop.findOne({
      id: this.req.param("shop"),
    });

    if (shop === undefined) {
      return exits.notFound();
    }

    await got(inputs.url)
      .then((response) => {
        const dom = new JSDOM(response.body);

        return exits.success({
          name: dom.window.document
            .querySelector(shop.productNameDomSelector)
            .textContent.replace(/\s+/g, " ")
            .trim(),
          description: dom.window.document
            .querySelector(shop.productDescriptionDomSelector)
            .textContent.replace(/\s+/g, " ")
            .trim(),
        });
      })
      .catch((err) => {
        console.log(err);
        return exits.failed();
      });
  },
};
