const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = {
  friendlyName: "Generate qa",

  description: "",

  inputs: {
    productName: {
      type: "string",
      required: true,
    },

    productDescription: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
    },
  },

  fn: async function (inputs, exits) {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        'Per un prodotto in vendita genera una domanda con risposta utilizzando le seguenti informazioni: [Nome:"' +
        inputs.productName +
        '", Descrizione:"' +
        inputs.productDescription +
        '"]. Per la domanda aggiungi la seguente stringa come prefisso: "<b>Domanda</b>". Per la risposta aggiungi la seguente stringa come prefisso: "<br>" e "<b>Risposta</b>".',
      max_tokens: 256,
    });

    return exits.success({ qa: completion.data.choices[0].text });
  },
};
