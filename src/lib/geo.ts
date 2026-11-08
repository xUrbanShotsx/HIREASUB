/** Demo suburbs with rough coordinates, so service radius checks work without a maps API. */
export const places: Record<string, { label: string; lat: number; lng: number }> = {
  kiama: { label: "Kiama NSW", lat: -34.6711, lng: 150.854 },
  gerringong: { label: "Gerringong NSW", lat: -34.7436, lng: 150.8266 },
  shellharbour: { label: "Shellharbour NSW", lat: -34.58, lng: 150.87 },
  albionpark: { label: "Albion Park NSW", lat: -34.5667, lng: 150.7833 },
  wollongong: { label: "Wollongong NSW", lat: -34.4278, lng: 150.8931 },
  berry: { label: "Berry NSW", lat: -34.7761, lng: 150.7 },
  nowra: { label: "Nowra NSW", lat: -34.883, lng: 150.6 },
  bowral: { label: "Bowral NSW", lat: -34.4781, lng: 150.4183 },
  campbelltown: { label: "Campbelltown NSW", lat: -34.065, lng: 150.8142 },
  sydney: { label: "Sydney NSW", lat: -33.8688, lng: 151.2093 },
  parramatta: { label: "Parramatta NSW", lat: -33.815, lng: 151.0011 },
  penrith: { label: "Penrith NSW", lat: -33.7506, lng: 150.6942 },
  newcastle: { label: "Newcastle NSW", lat: -32.9283, lng: 151.7817 },
};

export const placeKeys = Object.keys(places);

export function km(a: string, b: string): number {
  const p = places[a];
  const q = places[b];
  if (!p || !q) return Infinity;
  const r = (d: number) => (d * Math.PI) / 180;
  const dLat = r(q.lat - p.lat);
  const dLng = r(q.lng - p.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(r(p.lat)) * Math.cos(r(q.lat)) * Math.sin(dLng / 2) ** 2;
  return Math.round(12742 * Math.asin(Math.sqrt(h)));
}
