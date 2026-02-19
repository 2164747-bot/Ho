{
  "name": "Quick Token Scan",
  "description": "토큰 주소 입력 → 유동성, 가격, 위험도 빠르게 분석 (CryptoIntel 스타일)",
  "fee": { "amount": "0.05", "token": "USDC" },
  "requirements": {
    "type": "object",
    "properties": {
      "token_address": { "type": "string", "description": "토큰 컨트랙트 주소" }
    },
    "required": ["token_address"]
  }
}
