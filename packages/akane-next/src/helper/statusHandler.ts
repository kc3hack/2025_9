import { CardBorderColor, StatusMessage } from "@/constants/status";

export function getCardBorderColor(status: string): string {
  return CardBorderColor[status] || "#000";
}

export function getStatusMessage(status: string): string {
  return StatusMessage[status] || "エラー";
}
