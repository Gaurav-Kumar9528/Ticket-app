import React, { useMemo, useState } from 'react'
import stadiumMapReference from '../assets/stadium-map-reference.png'

const seatZones = [
  // Invisible rotated hit-zones aligned to the 4 priced stands.
  { id: 'south-top-left', label: 'South Stand C', x: 40, y: 15, w: 165, h: 86, rotate: -22 },
  { id: 'south-top-right', label: 'South Stand D', x: 67, y: 15, w: 176, h: 90, rotate: 18 },
  { id: 'east-left', label: 'East Stand', x: 22, y: 58, w: 96, h: 205, rotate: -11 },
  { id: 'north-bottom-right', label: 'North Stand G', x: 67, y: 82, w: 170, h: 90, rotate: 24 },
]

const StadiumCanvas = ({ selectedSeatId, onSeatSelect }) => {
  const [zoom, setZoom] = useState(1)
  const canZoomIn = zoom < 2.4
  const canZoomOut = zoom > 1

  const selectedZone = useMemo(
    () => seatZones.find((zone) => zone.id === selectedSeatId) || null,
    [selectedSeatId]
  )

  // Small constrained zoom to keep overlays and map aligned.
  const zoomIn = () => setZoom((prev) => Math.min(2.4, Number((prev + 0.2).toFixed(2))))
  const zoomOut = () => setZoom((prev) => Math.max(1, Number((prev - 0.2).toFixed(2))))

  return (
    <div className="relative">
      <div className="relative h-[560px] w-full overflow-hidden rounded-xl bg-[#efeff1]">
        <div
          className="relative h-full w-full origin-center transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        >
          <img
            src={stadiumMapReference}
            alt="Stadium map"
            className="mapboxgl-canvas h-full w-full object-contain"
            tabIndex="0"
            aria-label="Map"
            role="region"
          />

          {seatZones.map((zone) => (
            <button
              key={zone.id}
              type="button"
              onClick={() => onSeatSelect(zone)}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent"
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: `${zone.w}px`,
                height: `${zone.h}px`,
                transform: `translate(-50%, -50%) rotate(${zone.rotate}deg)`,
              }}
              aria-label={`Select ${zone.label}`}
              title={zone.label}
            />
          ))}
        </div>
      </div>

      {selectedZone && (
        <div className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-3 py-2 text-sm font-semibold text-slate-800 shadow">
          Selected: {selectedZone.label}
        </div>
      )}

      <div className="absolute right-3 top-3 overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm">
        <button
          type="button"
          className="grid h-8 w-8 place-items-center border-b border-slate-200 text-lg text-slate-700 disabled:cursor-not-allowed disabled:text-slate-300"
          onClick={zoomIn}
          disabled={!canZoomIn}
        >
          +
        </button>
        <button
          type="button"
          className="grid h-8 w-8 place-items-center text-lg text-slate-700 disabled:cursor-not-allowed disabled:text-slate-300"
          onClick={zoomOut}
          disabled={!canZoomOut}
        >
          -
        </button>
      </div>
    </div>
  )
}

export default StadiumCanvas
