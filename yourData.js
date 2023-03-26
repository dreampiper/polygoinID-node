// const issuerInfo = {
//   displayName: "Crystalrohr-Org",
//   legalName: "Crystalrohr-org",
//   region: "USA",
// };

const schemaStructure = {
  schema: "ProofOfHelp",
  mandatoryExpiration: false,
  technicalName: "ProofOfHelp",
  attributes: [
    {
      name: "ProofOfHelp",
      technicalName: "ProofOfHelp",
      type: "boolean",
      description: "Have you helped someone on the forum?",
    },
  ],
};

const claimOffer = {
  schemaId: "64075946-731a-477f-820a-657f7ddba4af",
  claimPayload: {
    attributes: [
      {
        attributeKey: "ProofOfHelp",
        // 🕳️ true!
        attributeValue: 1,
      },
    ],
  },
};

module.exports = {
  schemaStructure,
  claimOffer,
};

// valid claim
// 79249f7d-b1a6-43fe-a602-7507ff9d36a9
