# SNP Express Server

A comprehensive Express.js server with multiple API routes for handling various business operations.

## Features

- **Search**: Search for products/services with filters and pagination
- **Select**: Manage selection options and user preferences
- **Init**: Initialize sessions and services
- **Confirm**: Handle order confirmations and payment processing
- **Tracking**: Track orders and delivery status
- **Cancel**: Manage order cancellations and refunds
- **Update**: Update orders and user information
- **Status**: Check order and system status
- **Rating**: Handle product/service ratings and reviews
- **Support**: Customer support ticket management

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

## API Endpoints

### Base URL: `http://localhost:3000`

### Root Endpoint

- `GET /` - Server information and available endpoints

### Search Routes (`/api/search`)

- `GET /api/search` - Search for items/services
- `POST /api/search` - Advanced search with filters

### Select Routes (`/api/select`)

- `GET /api/select` - Get selection options
- `POST /api/select` - Select an option
- `PUT /api/select/:id` - Update selection

### Init Routes (`/api/init`)

- `GET /api/init` - Initialize session or service
- `POST /api/init` - Initialize with configuration
- `PUT /api/init/:sessionId` - Update initialization

### Confirm Routes (`/api/confirm`)

- `GET /api/confirm` - Get confirmation details
- `POST /api/confirm` - Confirm order/action
- `PUT /api/confirm/:orderId` - Update confirmation
- `DELETE /api/confirm/:orderId` - Cancel confirmation

### Tracking Routes (`/api/tracking`)

- `GET /api/tracking` - Get tracking information
- `GET /api/tracking/:trackingNumber` - Get specific tracking details
- `POST /api/tracking` - Create tracking entry
- `PUT /api/tracking/:trackingNumber` - Update tracking status

### Cancel Routes (`/api/cancel`)

- `GET /api/cancel` - Get cancellation information
- `POST /api/cancel` - Cancel order/action
- `GET /api/cancel/:orderId` - Get specific cancellation details
- `PUT /api/cancel/:orderId` - Update cancellation
- `DELETE /api/cancel/:orderId` - Delete cancellation record

### Update Routes (`/api/update`)

- `GET /api/update` - Get update information
- `POST /api/update` - Update order/action
- `PUT /api/update/:updateId` - Update specific update
- `GET /api/update/:updateId` - Get specific update details
- `DELETE /api/update/:updateId` - Delete update

### Status Routes (`/api/status`)

- `GET /api/status` - Get status information
- `GET /api/status/:orderId` - Get specific order status
- `POST /api/status` - Create status update
- `PUT /api/status/:orderId` - Update order status

### Rating Routes (`/api/rating`)

- `GET /api/rating` - Get ratings and reviews
- `POST /api/rating` - Submit a rating/review
- `GET /api/rating/:ratingId` - Get specific rating details
- `PUT /api/rating/:ratingId` - Update rating/review
- `DELETE /api/rating/:ratingId` - Delete rating
- `POST /api/rating/:ratingId/helpful` - Mark rating as helpful

### Support Routes (`/api/support`)

- `GET /api/support` - Get support information
- `POST /api/support` - Create support ticket
- `GET /api/support/:ticketId` - Get specific ticket details
- `PUT /api/support/:ticketId` - Update ticket
- `POST /api/support/:ticketId/message` - Add message to ticket
- `DELETE /api/support/:ticketId` - Close ticket

## Example Usage

### Search for products

```bash
curl "http://localhost:3000/api/search?query=laptop&category=electronics"
```

### Create a support ticket

```bash
curl -X POST "http://localhost:3000/api/support" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_123",
    "subject": "Order Issue",
    "description": "My order hasn't arrived yet",
    "priority": "high"
  }'
```

### Submit a rating

```bash
curl -X POST "http://localhost:3000/api/rating" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "product_123",
    "userId": "user_456",
    "rating": 5,
    "review": "Excellent product!"
  }'
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

## Dependencies

- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **helmet**: Security middleware
- **morgan**: HTTP request logger
- **dotenv**: Environment variable loader

## Development Dependencies

- **nodemon**: Auto-restart server during development

## License

MIT
