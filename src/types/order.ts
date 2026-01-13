export interface Order {
  id: string;
  merchant_reference: string;
  carrier: string;
  barcode: string;
  carrier_shipment_id: string | null;
  tracking_code: string | null;
  recipient_name: string;
  recipient_address1: string;
  recipient_address2: string | null;
  recipient_postal_code: string;
  recipient_city: string;
  recipient_country: string;
  parcel_weight_grams: number;
  parcel_length_cm: string;
  parcel_width_cm: string;
  parcel_height_cm: string;
  shipment_status: string;
  shipment_status_reason: string | null;
  label_pdf_base64: string | null;
  label_fetched_at: string | null;
  has_updates: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderRequest {
  merchant_reference: string;
  recipient: {
    name: string;
    address1: string;
    address2?: string;
    postal_code: string;
    city: string;
    country: string;
  };
  parcel: {
    weight_grams: number;
    length_cm: number;
    width_cm: number;
    height_cm: number;
  };
}
