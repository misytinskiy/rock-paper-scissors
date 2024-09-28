import crypto from "crypto";

class HMACGenerator {
  // Генерация криптографически стойкого ключа длиной 256 бит (32 байта)
  static generateKey() {
    return crypto.randomBytes(32).toString("hex");
  }

  // Создание HMAC на базе SHA-256
  static createHMAC(key, move) {
    return crypto.createHmac("sha256", key).update(move).digest("hex");
  }
}

export default HMACGenerator;
