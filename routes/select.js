const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const  onSelectData=require("../data/on_select/on_select_AC.json")

// GET /api/select - Get selection options
router.get("/", (req, res) => {
  const { type, category } = req.query;

  // Mock selection options
  const options = [
    {
      id: 1,
      name: "Option A",
      type: type || "service",
      category: category || "general",
      description: "This is option A",
      price: 50,
    },
    {
      id: 2,
      name: "Option B",
      type: type || "service",
      category: category || "general",
      description: "This is option B",
      price: 75,
    },
  ];

  res.json({
    success: true,
    message: "Selection options retrieved",
    type: type,
    category: category,
    options: options,
  });
});

// POST /api/select - Handle select request and call BPP on_select
router.post("/", async (req, res) => {
  try {
    // Extract BPP URI from context
    const { context } = req.body;

    if (!context || !context.bpp_uri) {
      return res.status(400).json({
        success: false,
        message: "BPP URI not found in context",
      });
    }

    const bppUri = context.bpp_uri;
    console.log(`Received select request for BPP: ${bppUri}`);

    // Return ACK response immediately
    const ackResponse = {
      message: {
        ack: {
          status: "NACK",
        },
      },
    };

    res.json(ackResponse);

    // After 5 seconds, call BPP on_select endpoint
    setTimeout(async () => {
      try {
        // const onSelectData = {
        //   context: {
        //     domain: "ONDC:RET10",
        //     action: "on_select",
        //     core_version: "1.2.0",
        //     bap_id: "buyerNP.com",
        //     bap_uri: "https://buyerNP.com/ondc",
        //     bpp_id: "sellerNP.com",
        //     bpp_uri: "https://sellerNP.com/ondc",
        //     transaction_id: "T2",
        //     message_id: "M2",
        //     city: "std:080",
        //     country: "IND",
        //     timestamp: "2023-06-03T08:30:30.000Z",
        //   },
        //   message: {
        //     order: {
        //       provider: {
        //         id: "P1",
        //         locations: [
        //           {
        //             id: "L1",
        //           },
        //         ],
        //       },
        //       items: [
        //         {
        //           fulfillment_id: "F1",
        //           id: "I1",
        //         },
        //       ],
        //       fulfillments: [
        //         {
        //           id: "F1",
        //           type: "Delivery",
        //           "@ondc/org/provider_name": "LSP or Provider Name",
        //           tracking: false,
        //           "@ondc/org/category": "Immediate Delivery",
        //           "@ondc/org/TAT": "PT60M",
        //           state: {
        //             descriptor: {
        //               code: "Serviceable",
        //             },
        //           },
        //         },
        //       ],
        //       quote: {
        //         price: {
        //           currency: "INR",
        //           value: "264",
        //         },
        //         breakup: [
        //           {
        //             "@ondc/org/item_id": "I1",
        //             "@ondc/org/item_quantity": {
        //               count: 1,
        //             },
        //             title: "Atta",
        //             "@ondc/org/title_type": "item",
        //             price: {
        //               currency: "INR",
        //               value: "170.00",
        //             },
        //             item: {
        //               quantity: {
        //                 available: {
        //                   count: "99",
        //                 },
        //                 maximum: {
        //                   count: "99",
        //                 },
        //               },
        //               price: {
        //                 currency: "INR",
        //                 value: "170.00",
        //               },
        //             },
        //           },
        //           {
        //             "@ondc/org/item_id": "F1",
        //             title: "Delivery charges",
        //             "@ondc/org/title_type": "delivery",
        //             price: {
        //               currency: "INR",
        //               value: "50.00",
        //             },
        //           },
        //           {
        //             "@ondc/org/item_id": "F1",
        //             title: "Tax",
        //             "@ondc/org/title_type": "tax",
        //             price: {
        //               currency: "INR",
        //               value: "9.00",
        //             },
        //             item: {
        //               tags: [
        //                 {
        //                   code: "quote",
        //                   list: [
        //                     {
        //                       code: "type",
        //                       value: "fulfillment",
        //                     },
        //                   ],
        //                 },
        //               ],
        //             },
        //           },
        //           {
        //             "@ondc/org/item_id": "F1",
        //             title: "Packing charges",
        //             "@ondc/org/title_type": "packing",
        //             price: {
        //               currency: "INR",
        //               value: "25.00",
        //             },
        //           },
        //           {
        //             "@ondc/org/item_id": "I1",
        //             title: "Tax",
        //             "@ondc/org/title_type": "tax",
        //             price: {
        //               currency: "INR",
        //               value: "0.00",
        //             },
        //           },
        //           {
        //             "@ondc/org/item_id": "F1",
        //             title: "Convenience Fee",
        //             "@ondc/org/title_type": "misc",
        //             price: {
        //               currency: "INR",
        //               value: "10.00",
        //             },
        //           },
        //         ],
        //         ttl: "P1D",
        //       },
        //     },
        //   },
        // };

        const onSelectUrl = `http://localhost:9001/on_select`;
        console.log(`Calling BPP on_select endpoint: ${onSelectUrl}`);

        const response = await fetch(onSelectUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(onSelectData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("BPP on_select response:", responseData);
        } else {
          console.error(
            "BPP on_select failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error calling BPP on_select:", error.message);
      }
    }, 5000); // 5 seconds delay
  } catch (error) {
    console.error("Error in select route:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// PUT /api/select/:id - Update selection
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { preferences } = req.body;

  res.json({
    success: true,
    message: "Selection updated successfully",
    selectionId: id,
    updatedPreferences: preferences,
    updatedAt: new Date().toISOString(),
  });
});

module.exports = router;
