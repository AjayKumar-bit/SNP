# Test Init Endpoint

## How to test the updated init endpoint:

### 1. Install dependencies

```bash
npm install
```

### 2. Start the server

```bash
npm run dev
```

### 3. Test the init endpoint with init request data

```bash
curl -X POST "http://localhost:3000/init" \
  -H "Content-Type: application/json" \
  -d '{
    "context": {
      "domain": "ONDC:RET10",
      "action": "init",
      "core_version": "1.2.5",
      "bap_id": "bnp.com",
      "bap_uri": "https://bnp.com/ondc",
      "bpp_id": "snp.com",
      "bpp_uri": "http://localhost:9001",
      "transaction_id": "T2",
      "message_id": "M3",
      "city": "std:080",
      "country": "IND",
      "timestamp": "2025-01-08T09:00:30.000Z"
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
            "fulfillment_id": "F1",
            "quantity": {
              "count": 2
            }
          }
        ],
        "billing": {
          "name": "ONDC buyer",
          "address": {
            "name": "my house or door or floor #",
            "building": "my building name or house #",
            "locality": "my street name",
            "city": "Bengaluru",
            "state": "Karnataka",
            "country": "IND",
            "area_code": "560037"
          },
          "email": "nobody@nomail.com",
          "phone": "9886098860"
        },
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

2. **After 5 seconds**: The server will automatically make a POST request to `http://localhost:9001/on_init` with the on_init.json data.

3. **Console Logs**: You'll see logs in the server console:
   - `Received init request for BPP: http://localhost:9001`
   - `Calling BPP on_init endpoint: http://localhost:9001/on_init`
   - `BPP on_init response: [response data]` (if successful)

## Notes:

- The server extracts the `bpp_uri` from the request context
- No validation is performed on the request body (as requested)
- The on_init call is made asynchronously after 5 seconds
- Error handling is included for both the initial request and the BPP call
- The server uses `node-fetch` for making HTTP requests to the BPP
- The on_init data is loaded from `../data/init/on_init.json`
