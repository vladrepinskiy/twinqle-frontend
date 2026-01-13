# Twinqle Frontend

A modern shipping order management dashboard for viewing and managing shipments.

## Dependencies

- **Goober** - CSS-in-JS styling
- **TanStack Query** - Server state management
- **Wouter** - Lightweight routing
- **Sonner** - Toast notifications

## Features

- View and search orders
- Real-time order tracking
- Shipment status timeline
- Retry failed shipments
- View shipping labels and delivery signatures (PDF/PNG)
- Automatic polling for order updates

## Getting Started

### Running it

```bash
npm install

npm run dev
```

The app will be available at `http://localhost:3000`

## Environment

In development, Vite proxies `/api` requests to `http://localhost:5001` (configured in `vite.config.ts`). Make sure your backend is running on port 5001 or update the proxy target
