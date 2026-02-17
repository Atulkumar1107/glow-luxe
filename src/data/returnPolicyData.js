export const returnPolicyData = {
  hero: {
    title: "Return Policy",
    backgroundImage: "/images/resource_3.jpg",
    breadcrumb: [
      { label: "Home", link: "/" },
      { label: "Return Policy" }
    ],
  },

  content: {
    intro:
      "Please review our return policy carefully before making a purchase.",

    sections: [
      {
        title: "Returns",
        points: [
          "Items can be returned within 30 days of delivery.",
          "Products must be unused and in original packaging.",
          "Proof of purchase is required for all returns."
        ],
      },
      {
        title: "Refunds",
        points: [
          "Refunds will be processed within 7-10 business days.",
          "Shipping charges are non-refundable.",
          "Refunds will be issued to the original payment method."
        ],
      },
      {
        title: "Exchanges",
        points: [
          "Exchanges are subject to product availability.",
          "Defective or damaged products are eligible for replacement.",
          "Contact support before sending any product back."
        ],
      }
    ],

    note:
      "Please note that some calls may be recorded for quality and training purposes."
  }
};
