export let UpdatedItemsData=[
    {
      "id": "item_001",
      "type": "item",
      "language": "en",
      "item_details": {
        "item_id": "I1",
        "descriptor": {
          "name": "Denim Jacket XYZ",
          "short_desc": "Stylish denim jacket for casual wear",
          "long_desc": "This denim jacket is made from high-quality fabric and is perfect for a casual look. It comes with a button closure and two front pockets.",
          "labels": ["fashion", "outerwear", "casual"]
        },
        "category_id": "C1",
        "location_id": "L1",
        "provider_id": "P1",
        "rating": 4.3,
        "time": {
          "label": "enable",
          "timestamp": "2025-01-21T10:30:00.000Z"
        },
        "price": {
          "value": 59.99,
          "currency": "USD"
        },
        "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
        "customizations": [
          {
            "id": "custom_001",
            "name": "Size",
            "options": [
              { "id": "opt_007", "label": "S", "price": { "value": 5.99, "currency": "USD" } },
              { "id": "opt_008", "label": "M", "price": { "value": 6.99, "currency": "USD" } },
              { "id": "opt_009", "label": "L", "price": { "value": 7.99, "currency": "USD" } }
            ]
          },
          {
            "id": "custom_005",
            "name": "Color",
            "options": [
              { "id": "opt_010", "label": "Blue", "price": { "value": 0.0, "currency": "USD" } },
              { "id": "opt_011", "label": "Black", "price": { "value": 0.0, "currency": "USD" } }
            ]
          }
        ],
        "attribute_key_values": [
          { "key": "brand", "value": "Fashionista" },
          { "key": "color", "value": "Blue" }
        ],
        "tags": [
          {
            "code": "feature",
            "list": [
              { "code": "fabric", "value": "Cotton" },
              { "code": "style", "value": "Casual" }
            ]
          }
        ],
        "@ondc/org/time_to_ship": "2 days"
      },
      "category_details": {
        "id": "C1",
        "name": "Fashion",
        "description": "Clothing, accessories, and fashion essentials"
      },
      "provider_details": {
        "id": "P1",
        "descriptor": {
          "name": "Fashionista",
          "short_desc": "Premium fashion brand for modern trends"
        },
        "contact_details": {
          "email": "support@fashionista.com",
          "phone": "+91-9876543210"
        },
        "rating": 4.5,
        "time": {
          "label": "enable",
          "timestamp": "2025-01-21T12:15:00.000Z"
        }
      },
      "location_details": {
        "id": "L1",
        "address": {
          "area_code": "560001",
          "city": "Bengaluru",
          "locality": "Koramangala",
          "state": "Karnataka",
          "street": "80 Feet Road"
        },
        "circle": {
          "coordinates": {
            "geo_point": {
              "lat": 12.9716,
              "lon": 77.5946
            },
            "serving_area_code": "207505"  // Example of custom_code as a string
          },
          "gps": "12.9716,77.5946",
          "radius": {
            "unit": "km",
            "value": 5.0
          },
          "type": "delivery"
        },
        "gps": "12.9716,77.5946",
        "median_time_to_ship": "30 minutes",
        "time": {
          "label": "enable",
          "range": {
            "start": "2023-10-01T12:34:56Z",
            "end": "2023-10-01T13:34:56Z"
          },
          "schedule": {
            "frequency": "daily",
            "holidays": "2023-12-25",
            "times": "12:00-15:00"
          }
        },
        "type": "delivery"
      },
      "fulfillment_details": [
        {
          "id": "F1",
          "type": "Delivery",
          "estimated_time": "2-3 days",
          "shipping_provider": "BlueDart"
        },
        {
          "id": "F1",
          "type": "Self-Pickup",
          "pickup_address": "Fashionista Store, Bengaluru"
        }
      ],
      "context": {
        "domain": "ONDC:RET12",
        "country": "IND",
        "city": "std:022",
        "action": "on_search",
        "core_version": "1.2.0",
        "bap_id": "buyfashionista.com",
        "bap_uri": "https://buyfashionista.com/ondc",
        "bpp_id": "sellerFashionista.com",
        "bpp_uri": "https://sellerFashionista.com/ondc",
        "transaction_id": "T98771",
        "message_id": "M98771",
        "timestamp": "2025-01-21T14:15:00.000Z"
      },
      "created_at": "2024-01-30T14:15:00Z"
    },
    {
      "id": "item_002",
      "type": "item",
      "language": "en",
      "item_details": {
        "item_id": "I2",
        "descriptor": {
          "name": "Smartwatch XYZ",
          "short_desc": "Fitness tracking smartwatch with heart rate monitor",
          "long_desc": "This smartwatch tracks heart rate, steps, and sleep patterns. It also features notifications for calls and messages.",
          "labels": ["electronics", "wearables"]
        },
        "category_id": "C2",
        "location_id": "L2",
        "provider_id": "P2",
        "rating": 4.7,
        "time": {
          "label": "enable",
          "timestamp": "2025-01-22T11:00:00.000Z"
        },
        "price": {
          "value": 79.99,
          "currency": "USD"
        },
        "images": ["https://example.com/shoes1.jpg", "https://example.com/shoes2.jpg"],
        "customizations": [
          {
            "id": "custom_002",
            "name": "Band Color",
            "options": [
              { "id": "opt_003", "label": "Black", "price": { "value": 0.0, "currency": "USD" } },
              { "id": "opt_004", "label": "Red", "price": { "value": 0.0, "currency": "USD" } }
            ]
          }
        ],
        "attribute_key_values": [
          { "key": "brand", "value": "TechLife" },
          { "key": "wireless", "value": "Yes" }
        ],
        "tags": [
          {
            "code": "feature",
            "list": [
              { "code": "battery", "value": "5 Days" },
              { "code": "connectivity", "value": "Bluetooth" }
            ]
          }
        ],
        "@ondc/org/time_to_ship": "1 day"
      },
      "category_details": {
        "id": "C2",
        "name": "Wearables",
        "description": "Wearables for all occasions"
      },
      "provider_details": {
        "id": "P2",
        "descriptor": {
          "name": "TechLife",
          "short_desc": "High-performance Tech gear"
        },
        "contact_details": {
          "email": "support@techlife.com",
          "phone": "+91-8765432109"
        },
        "rating": 4.6,
        "time": {
          "label": "enable",
          "timestamp": "2025-01-22T13:00:00.000Z"
        }
      },
      "location_details": {
        "id": "L2",
        "address": {
          "city": "New York",
          "state": "New York",
          "area_code": "10002",
          "street": "789 Elm Street",
          "locality": "Brooklyn"
        },
        "circle": {
          "coordinates": {
            "geo_point": {
              "lat": 29.6328,
              "lon": 78.2197
            },
            "serving_area_code": "204509"
          },
          "gps": "29.6328,78.2197",
          "radius": {
            "unit": "km",
            "value": 8.0
          },
          "type": "delivery"
        },
        "gps": "29.6328,78.2197",
        "median_time_to_ship": "45 minutes",
        "time": {
          "label": "enable",
          "range": {
            "start": "2023-10-01T12:34:56Z",
            "end": "2023-10-01T13:34:56Z"
          },
          "schedule": {
            "frequency": "daily",
            "holidays": "2023-12-25",
            "times": "10:00-18:00"
          }
        },
        "type": "delivery"
      },
      "fulfillment_details": [
        {
          "id": "F2",
          "type": "Delivery",
          "estimated_time": "3-4 days",
          "shipping_provider": "DHL"
        },
        {
          "id": "F1",
          "type": "Self-Pickup",
          "pickup_address": "Smartwatch Store, Bengaluru"
        }
      ],
      "context": {
        "domain": "ONDC:RET14",
        "country": "IND",
        "city": "std:011",
        "action": "on_search",
        "core_version": "1.2.0",
        "bap_id": "buyerele.com",
        "bap_uri": "https://buyerele.com/ondc",
        "bpp_id": "sellerTechLife.com",
        "bpp_uri": "https://sellerele.com/ondc",
        "transaction_id": "T98769",
        "message_id": "M98769",
        "timestamp": "2025-01-21T12:30:00.000Z"
      },
      "created_at": "2024-01-31T14:15:00Z"
    },
    {
      "id": "item_003",
      "type": "item",
      "language": "en",
      "item_details": {
        "item_id": "I3",
        "descriptor": {
          "name": "Bluetooth Speaker XYZ",
          "short_desc": "Portable Bluetooth speaker with 360° sound",
          "long_desc": "This portable Bluetooth speaker delivers high-quality 360° sound, making it perfect for outdoor parties and gatherings.",
          "labels": ["electronics", "audio"]
        },
        "category_id": "C3",
        "location_id": "L3",
        "provider_id": "P3",
        "rating": 4.7,
        "time": {
          "label": "enable",
          "timestamp": "2025-01-22T11:00:00.000Z"
        },
        "price": {
          "value": 79.99,
          "currency": "USD"
        },
        "images": ["https://example.com/shoes1.jpg", "https://example.com/shoes2.jpg"],
        "customizations": [
          {
            "id": "custom_003",
            "name": "Color Options",
            "options": [
              { "id": "opt_007", "label": "Red", "price": { "value": 0.0, "currency": "USD" } },
              { "id": "opt_008", "label": "White", "price": { "value": 0.0, "currency": "USD" } }
            ]
          }
        ],
        "attribute_key_values": [
          { "key": "brand", "value": "AudioMasters" },
          { "key": "wireless", "value": "Yes" }
        ],
        "tags": [
          {
            "code": "feature",
            "list": [
              { "code": "battery", "value": "10 Hours" },
              { "code": "sound", "value": "360° Sound" }
            ]
          }
        ],
        "@ondc/org/time_to_ship": "1 day"
      },
      "category_details": {
        "id": "C3",
        "name": "Speakers",
        "description": "Speakers for all occasions"
      },
      "provider_details": {
        "id": "P3",
        "descriptor": {
          "name": "AudioMasters",
          "short_desc": "High-performance AudioMasters"
        },
        "contact_details": {
          "email": "support@audiomasters.com",
          "phone": "+91-8765432109"
        },
        "rating": 4.6,
        "time": {
          "label": "enable",
          "timestamp": "2025-01-22T13:00:00.000Z"
        }
      },
      "location_details": {
        "id": "L3",
        "address": {
          "area_code": "110001",
          "city": "Delhi",
          "locality": "Connaught Place",
          "state": "Delhi",
          "street": "Janpath Road"
        },
        "circle": {
          "coordinates": {
            "geo_shape": {
              "type": "Polygon",
              "coordinates": [
                [
                  [77.595, 12.96],
                  [77.62, 12.96],
                  [77.62, 12.98],
                  [77.595, 12.98],
                  [77.595, 12.96]
                ]
              ]
            },
            "serving_area_code": "207506"  // Example of custom_code as a string
          },
          "gps": "12.96,77.595",
          "radius": {
            "unit": "km",
            "value": 8.0
          },
          "type": "delivery"
        },
        "gps": "12.96,77.595",
        "median_time_to_ship": "45 minutes",
        "time": {
          "label": "enable",
          "range": {
            "start": "2023-10-01T12:34:56Z",
            "end": "2023-10-01T13:34:56Z"
          },
          "schedule": {
            "frequency": "daily",
            "holidays": "2023-12-25",
            "times": "10:00-18:00"
          }
        },
        "type": "delivery"
      },
      "fulfillment_details": [
        {
          "id": "F1",
          "type": "Delivery",
          "estimated_time": "3-4 days",
          "shipping_provider": "DHL"
        },
        {
          "id": "F2",
          "type": "Self-Pickup",
          "pickup_address": "Bluetooth Store, Bengaluru"
        }
      ],
      "context": {
        "domain": "ONDC:RET14",
        "country": "IND",
        "city": "std:011",
        "action": "on_search",
        "core_version": "1.2.0",
        "bap_id": "buyerele.com",
        "bap_uri": "https://buyerele.com/ondc",
        "bpp_id": "sellerAudioMasters.com",
        "bpp_uri": "https://sellerele.com/ondc",
        "transaction_id": "T98771",
        "message_id": "M98771",
        "timestamp": "2025-01-21T14:00:00.000Z"
      },
      "created_at": "2024-01-31T14:15:00Z"
    },
    {
      "id": "item_004",
      "type": "item",
      "language": "en",
      "item_details": {
        "item_id": "I4",
        "descriptor": {
          "name": "Organic Almonds",
          "short_desc": "Premium quality raw organic almonds",
          "long_desc": "These almonds are sourced from certified organic farms, rich in nutrients, and ideal for snacking or adding to your dishes.",
          "labels": ["grocery", "organic"]
        },
        "category_id": "C4",
        "location_id": "L4",
        "provider_id": "P4",
        "rating": 4.7,
        "time": {
          "label": "enable",
          "timestamp": "2025-01-22T11:00:00.000Z"
        },
        "price": {
          "value": 79.99,
          "currency": "USD"
        },
        "images": ["https://example.com/almonds1.jpg", "https://example.com/almonds2.jpg"],
        "customizations": [
          {
            "id": "custom_004",
            "name": "Packaging",
            "options": [
              { "id": "opt_001", "label": "Plastic Pack", "price": { "value": 1.0, "currency": "USD" } },
              { "id": "opt_002", "label": "Glass Jar", "price": { "value": 1.5, "currency": "USD" } }
            ]
          }
        ],
        "attribute_key_values": [
          { "key": "brand", "value": "Almonds World" },
          { "key": "organic", "value": "Yes" }
        ],
        "tags": [
          {
            "code": "feature",
            "list": [
              { "code": "certification", "value": "USDA Organic" },
              { "code": "storage", "value": "Store in a cool, dry place" }
            ]
          }
        ],
        "@ondc/org/time_to_ship": "1 day"
      },
      "category_details": {
        "id": "C4",
        "name": "Organic Grocery",
        "description": "Organic Grocery for all occasions"
      },
      "provider_details": {
        "id": "P4",
        "descriptor": {
          "name": "Organic Grocery",
          "short_desc": "Organic Grocery gear"
        },
        "contact_details": {
          "email": "support@almondsworld.com",
          "phone": "+91-8765432109"
        },
        "rating": 4.6,
        "time": {
          "label": "enable",
          "timestamp": "2025-01-22T13:00:00.000Z"
        }
      },
      "location_details": {
        "id": "L4",
        "address": {
          "area_code": "110001",
          "city": "Delhi",
          "locality": "Connaught Place",
          "state": "Delhi",
          "street": "Janpath Road"
        },
        "circle": {
          "coordinates": {
            "geo_point": {
              "lat": 30.6328,
              "lon": 78.2197
            },
            "serving_area_code": "207089"
          },
          "gps": "30.6328,78.2197",
          "radius": {
            "unit": "km",
            "value": 8.0
          },
          "type": "delivery"
        },
        "gps": "30.6328,78.2197",
        "median_time_to_ship": "45 minutes",
        "time": {
          "label": "enable",
          "range": {
            "start": "2025-02-01T12:00:00Z",
            "end": "2025-02-01T13:00:00Z"
          },
          "schedule": {
            "frequency": "daily",
            "holidays": "2025-12-25",
            "times": "10:00-18:00"
          }
        },
        "type": "delivery"
      },
      "fulfillment_details": [
        {
          "id": "F1",
          "type": "Delivery",
          "estimated_time": "3-4 days",
          "shipping_provider": "DHL"
        },
        {
          "id": "F2",
          "type": "Self-Pickup",
          "pickup_address": "Organic Store, Bengaluru"
        }
      ],
      "context": {
        "domain": "ONDC:RET10",
        "country": "IND",
        "city": "std:011",
        "action": "on_search",
        "core_version": "1.2.0",
        "bap_id": "buyeralmonds.com",
        "bap_uri": "https://buyeralmonds.com/ondc",
        "bpp_id": "selleralmondsworld.com",
        "bpp_uri": "https://selleralmondsworld.com/ondc",
        "transaction_id": "T98770",
        "message_id": "M98770",
        "timestamp": "2025-01-21T12:30:00.000Z"
      },
      "created_at": "2024-01-31T14:15:00Z"
    },
    {
      "id": "item_005",
      "type": "item",
      "language": "en",
      "item_details": {
        "item_id": "I5",
        "descriptor": {
          "name": "Vegetable Pasta",
          "short_desc": "Gluten-free vegetable pasta made with organic ingredients",
          "long_desc": "This gluten-free pasta is packed with the goodness of vegetables, making it perfect for those with dietary restrictions.",
          "labels": ["food", "gluten-free"]
        },
        "category_id": "C5",
        "location_id": "L5",
        "provider_id": "P5",
        "rating": 4.7,
        "time": {
          "label": "enable",
          "timestamp": "2025-01-22T11:00:00.000Z"
        },
        "price": {
          "value": 79.99,
          "currency": "USD"
        },
        "images": ["https://example.com/shoes1.jpg", "https://example.com/shoes2.jpg"],
        "customizations": [
          {
            "id": "custom_005",
            "name": "Sauce Type",
            "options": [
              { "id": "opt_005", "label": "Tomato Basil", "price": { "value": 0.0, "currency": "USD" } },
              { "id": "opt_006", "label": "Pesto", "price": { "value": 0.0, "currency": "USD" } }
            ]
          }
        ],
        "attribute_key_values": [
          { "key": "brand", "value": "Foodies Delight" },
          { "key": "gluten_free", "value": "Yes" }
        ],
        "tags": [
          {
            "code": "feature",
            "list": [
              { "code": "serving_size", "value": "2 servings" },
              { "code": "organic", "value": "Yes" }
            ]
          }
        ],
        "@ondc/org/time_to_ship": "1 day"
      },
      "category_details": {
        "id": "C5",
        "name": "Gluten-Free Foods",
        "description": "Gluten-Free Foods for all occasions"
      },
      "provider_details": {
        "id": "P5",
        "descriptor": {
          "name": "Foodies Delight",
          "short_desc": "High-performance Foodies Delight gear"
        },
        "contact_details": {
          "email": "info@foodiesdelight.com",
          "phone": "+91-8765432109"
        },
        "rating": 4.6,
        "time": {
          "label": "enable",
          "timestamp": "2025-01-22T13:00:00.000Z"
        }
      },
      "location_details": {
        "id": "L5",
        "address": {
          "area_code": "110001",
          "city": "Delhi",
          "locality": "Connaught Place",
          "state": "Delhi",
          "street": "Janpath Road"
        },
        "circle": {
          "coordinates": {
            "geo_point": {
                "lat": 28.6328,
                "lon": 77.2197
              },
            "serving_area_code": "205689"
          },
          "gps": "28.6328,77.2197",
          "radius": {
            "unit": "km",
            "value": 8.0
          },
          "type": "delivery"
        },
        "gps": "28.6328,77.2197",
        "median_time_to_ship": "45 minutes",
        "time": {
          "label": "enable",
          "range": {
            "start": "2023-10-01T12:34:56Z",
            "end": "2023-10-01T13:34:56Z"
          },
          "schedule": {
            "frequency": "daily",
            "holidays": "2023-12-25",
            "times": "10:00-18:00"
          }
        },
        "type": "delivery"
      },
      "fulfillment_details": [
        {
          "id": "F1",
          "type": "Delivery",
          "estimated_time": "3-4 days",
          "shipping_provider": "DHL"
        },
        {
          "id": "F2",
          "type": "Self-Pickup",
          "pickup_address": "Vegetable Pasta Store, Bengaluru"
        }
      ],
      "context": {
        "domain": "ONDC:RET11",
        "country": "IND",
        "city": "std:011",
        "action": "on_search",
        "core_version": "1.2.0",
        "bap_id": "buyersfood.com",
        "bap_uri": "https://buyersfood.com/ondc",
        "bpp_id": "sellersfoodiesdelight.com",
        "bpp_uri": "https://sellersfoodiesdelight.com/ondc",
        "transaction_id": "T98771",
        "message_id": "M98771",
        "timestamp": "2025-01-21T12:30:00.000Z"
      },
      "created_at": "2024-01-31T14:15:00Z"
    }
  ]