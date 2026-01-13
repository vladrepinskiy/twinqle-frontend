export type ParcelSize = "S" | "M" | "L";

export const PARCEL_SIZES: Record<
  ParcelSize,
  {
    weight_grams: number;
    length_cm: number;
    width_cm: number;
    height_cm: number;
  }
> = {
  S: { weight_grams: 500, length_cm: 20, width_cm: 15, height_cm: 10 },
  M: { weight_grams: 1500, length_cm: 30, width_cm: 25, height_cm: 20 },
  L: { weight_grams: 5000, length_cm: 50, width_cm: 40, height_cm: 30 },
};
