parasails.registerPage("generate-qa", {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    // Main syncing/loading state for this page.
    syncing: false,

    // Form data
    formData: {
      /* … */
    },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: {
      /* … */
    },

    // Form rules
    formRules: {
      /* … */
    },

    // Server error state for the form
    cloudError: "",

    generating: false,
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    //…
  },
  mounted: async function () {
    this.$set(this.formData, "productName", this.$refs.productName.value);
    this.$set(
      this.formData,
      "productDescription",
      this.$refs.productDescription.value,
    );
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    generate: async function () {
      this.generating = true;

      await fetch(
        "/api/v1/generate-qa?" +
          new URLSearchParams({
            productName: this.formData.productName,
            productDescription: this.formData.productDescription,
          }),
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        },
      )
        .then((response) => response.json())
        .then((data) => {
          var qa = document.createElement("p");

          qa.classList.add("bg-light");
          qa.classList.add("p-4");
          qa.classList.add("rounded");

          var id = "qa-" + Date.now();
          qa.setAttribute("id", id);

          document.getElementById("generated-qa").prepend(qa);

          new TypeIt("#" + id, {
            strings: data.qa,
            speed: 50,
            waitUntilVisible: true,
            afterComplete: async (instance) => {
              instance.destroy();
              this.$set(this, "generating", false);
            },
          }).go();
        });
    },
  },
});
