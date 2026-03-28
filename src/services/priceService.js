// Duay Global Trade | priceService.js | K10 | v1.0 | 2026-03-28
const CACHE = {};
const TTL = 1000 * 60 * 15;

async function fetchCached(key, url) {
  const now = Date.now();
  if (CACHE[key] && now - CACHE[key].ts < TTL) return CACHE[key].val;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API hatasi: ${key}`);
  const data = await res.json();
  CACHE[key] = { val: data, ts: now };
  return data;
}

export async function getUsdTry() {
  try {
    const d = await fetchCached('usd', 'https://api.exchangerate-api.com/v4/latest/USD');
    return d.rates.TRY;
  } catch { return null; }
}

export async function getBtcTry() {
  try {
    const d = await fetchCached('btc', 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=try');
    return d.bitcoin.try;
  } catch { return null; }
}

export async function getGoldTry() {
  try {
    const usd = await getUsdTry();
    const d = await fetchCached('gold', 'https://api.metals.live/v1/spot/gold');
    if (!usd || !d?.[0]?.price) return null;
    return Math.round(d[0].price * usd);
  } catch { return null; }
}

// K10 — Alternatif yatirim karsilastirmasi
export function hesaplaAlternatif(alisFiyati, bugunDeger, alisAnindaFiyat, bugunFiyat) {
  if (!alisAnindaFiyat || alisAnindaFiyat === 0) return null;
  const miktar = alisFiyati / alisAnindaFiyat;
  const alternatifBugun = Math.round(miktar * bugunFiyat);
  const fark = Math.round(((bugunDeger - alternatifBugun) / alternatifBugun) * 10000) / 100;
  return { alternatifBugun, fark };
}
