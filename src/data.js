// Cameras and detection events (dummy)
export const cameras = [
  { id: "LOCALCAM1", name: "North Gate", lat: 16.5100, lng: 80.6317 },
  { id: "LOCALCAM3", name: "Parking A", lat: 16.5065, lng: 80.6310 },
  { id: "LOCALCAM2", name: "Building 5 Exit", lat: 16.5075, lng: 80.6388 },
];

export const detections = [
  { plate: "AP16CU6672", cameraId: "LOCALCAM1", ts: "2025-08-08T10:05:12Z" },
  { plate: "AP16CU6672", cameraId: "LOCALCAM2", ts: "2025-08-08T10:09:50Z" },
  { plate: "AP16CU6672", cameraId: "LOCALCAM3", ts: "2025-08-08T10:14:33Z" },
  { plate: "AP40CT2310", cameraId: "LOCALCAM2", ts: "2025-08-08T09:41:05Z" },
  { plate: "AP40CT2310", cameraId: "LOCALCAM1", ts: "2025-08-08T09:56:22Z" },
  { plate: "AP39UX9232", cameraId: "LOCALCAM1", ts: "2025-08-08T08:12:10Z" }
];

export function getJourneyForPlate(plate) {
  const plateNorm = plate.trim().toUpperCase();
  const events = detections
    .filter(d => d.plate.toUpperCase().includes(plateNorm))
    .sort((a, b) => new Date(a.ts) - new Date(b.ts))
    .map(d => {
      const cam = cameras.find(c => c.id === d.cameraId);
      return cam ? { ...d, ...cam } : null;
    })
    .filter(Boolean);

  const seen = new Set();
  return events.filter(e => {
    const key = `${e.cameraId}@${e.ts}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
