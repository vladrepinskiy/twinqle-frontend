import type { OrderStatus } from "../constants/order.constants";

export interface Order {
  id: string;
  merchant_reference: string;
  carrier: string;
  barcode: string;
  status: OrderStatus;
  carrier_shipment_id?: string;
  label_pdf_base64?: string;
  has_updates: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderRequest {
  merchant_reference: string;
  carrier: string;
  barcode: string;
  status: OrderStatus;
  carrier_shipment_id?: string;
  label_pdf_base64?: string;
}
