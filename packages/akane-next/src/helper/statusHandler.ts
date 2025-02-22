// StatusHandler.ts
import { CardBorderColor, StatusMessage } from "@/constants/status";

class StatusHandler {
  static getCardBorderColor(status: string): string {
    return CardBorderColor[status] || "#000";
  }

  static getStatusMessage(status: string): string {
    return StatusMessage[status] || "エラー";
  }
}

export default StatusHandler;
