import axios from 'axios';
export const offering = {
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
export async function executeJob(job: any) {
  const { token_address } = job.requirements || {};

  if (!token_address) {
    return { result: "토큰 주소가 필요해요!" };
  }

  const dexUrl = `https://api.dexscreener.com/latest/dex/tokens/${token_address}`;
  const dexData = (await axios.get(dexUrl)).data;

  let report = `CryptoIntel Quick Scan 결과:\n${token_address}\n\n`;
  if (dexData.pairs?.length > 0) {
    const pair = dexData.pairs[0];
    report += `유동성: $${pair.liquidity?.usd || '없음'}\n`;
    report += `가격: $${pair.priceUsd || '없음'}\n`;
    report += `24시간 거래량: $${pair.volume?.h24 || '없음'}\n`;
    report += `위험도: ${pair.liquidity?.usd > 10000 ? '낮음' : '높음 - 주의!'}\n`;
  } else {
    report += `데이터 없음 - 러그 가능성 높음.`;
  }

  return { result: report };
}
