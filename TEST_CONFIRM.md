# Test Confirm Endpoint

## How to test the updated confirm endpoint:

### 1. Install dependencies

```bash
npm install
```

### 2. Start the server

```bash
npm run dev
```

### 3. Test the confirm endpoint with confirm request data

```bash
curl -X POST "http://localhost:3000/confirm" \
  -H "Content-Type: application/json" \
  -d '{
    "context": {
      "domain": "ONDC:RET10",
      "action": "confirm",
      "core_version": "1.2.0",
      "bap_id": "buyerNP.com",
      "bap_uri": "http://localhost:9001",
      "bpp_id": "sellerNP.com",
      "bpp_uri": "https://sellerNP.com/ondc",
      "transaction_id": "T2",
      "message_id": "M4",
      "city": "std:080",
      "country": "IND",
      "timestamp": "2023-06-03T08:35:00.000Z"
    },
    "message": {
      "order": {
        "id": "order_12345",
        "provider": {
          "id": "P1",
          "locations": [
            {
              "id": "L1"
            }
          ]
        },
        "items": [
          {
            "id": "I1",
            "fulfillment_id": "F1",
            "quantity": {
              "count": 1
            }
          }
        ],
        "fulfillments": [
          {
            "id": "F1",
            "type": "Delivery",
            "tracking": false,
            "end": {
              "location": {
                "gps": "12.4535,77.9283",
                "address": {
                  "name": "my house or door or floor #",
                  "building": "my building name or house #",
                  "locality": "my street name",
                  "city": "Bengaluru",
                  "state": "Karnataka",
                  "country": "IND",
                  "area_code": "560037"
                }
              },
              "contact": {
                "phone": "9886098860"
              }
            }
          }
        ],
        "payment": {
          "type": "ON-FULFILLMENT",
          "collected_by": "BPP"
        }
      }
    }
  }'
```

## Expected Behavior:

1. **Immediate Response**: The server will immediately return:

```json
{
  "message": {
    "ack": {
      "status": "ACK"
    }
  }
}
```

2. **After 5 seconds**: The server will automatically make a POST request to `http://localhost:9001/on_confirm` with the on_confirm data.

3. **Console Logs**: You'll see logs in the server console:
   - `Received confirm request for BAP: http://localhost:9001`
   - `Calling BAP on_confirm endpoint: http://localhost:9001/on_confirm`
   - `BAP on_confirm response: [response data]` (if successful)

## Notes:

- The server extracts the `bap_uri` from the request context
- No validation is performed on the request body (as requested)
- The on_confirm call is made asynchronously after 5 seconds
- Error handling is included for both the initial request and the BAP call
- The server uses `node-fetch` for making HTTP requests to the BAP
- The on_confirm data includes order confirmation details with pricing breakdown
