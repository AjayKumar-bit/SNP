# Test Select Endpoint

## How to test the updated select endpoint:

### 1. Install dependencies

```bash
npm install
```

### 2. Start the server

```bash
npm run dev
```

### 3. Test the select endpoint with select_flow1.json data

```bash
curl -X POST "http://localhost:3000/select" \
  -H "Content-Type: application/json" \
  -d '{
    "context": {
      "domain": "ONDC:RET11",
      "action": "select",
      "core_version": "1.2.0",
      "bap_id": "buyerNP.com",
      "bap_uri": "https://buyerNP.com/ondc",
      "bpp_id": "sellerNP.com",
      "bpp_uri": "https://sellerNP.com/ondc",
      "transaction_id": "T2",
      "message_id": "M2",
      "city": "std:080",
      "country": "IND",
      "timestamp": "2023-06-03T08:30:00.000Z",
      "ttl": "PT30S"
    },
    "message": {
      "order": {
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
            "parent_item_id": "DI1",
            "location_id": "L1",
            "quantity": {
              "count": 1
            }
          }
        ]
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

2. **After 5 seconds**: The server will automatically make a POST request to `https://sellerNP.com/ondc/on_select` with the on_select_AC.json data.

3. **Console Logs**: You'll see logs in the server console:
   - `Received select request for BPP: https://sellerNP.com/ondc`
   - `Calling BPP on_select endpoint: https://sellerNP.com/ondc/on_select`
   - `BPP on_select response: [response data]` (if successful)

## Notes:

- The server extracts the `bpp_uri` from the request context
- No validation is performed on the request body (as requested)
- The on_select call is made asynchronously after 5 seconds
- Error handling is included for both the initial request and the BPP call
- The server uses `node-fetch` for making HTTP requests to the BPP
