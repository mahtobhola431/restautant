import React from "react";
import scooter from "../assets/scooter.png";
import home from "../assets/home.png";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

// Custom Icons
const deliveryBoyIcon = new L.Icon({
  iconUrl: scooter,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const customerIcon = new L.Icon({
  iconUrl: home,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Map Auto Fit Function
function FitToPath({ path }) {
  const map = useMap();
  React.useEffect(() => {
    if (path && path.length > 0) {
      map.fitBounds(path, { padding: [50, 50] });
    }
  }, [path, map]);
  return null;
}

function DeliveryBoyTracking({ data }) {
  const deliveryBoyLat = data.deliveryBoyLocation.lat;
  const deliveryBoyLon = data.deliveryBoyLocation.lon;
  const customerLat = data.customerLocation.lat;
  const customerLon = data.customerLocation.lon;

  const path = [
    [deliveryBoyLat, deliveryBoyLon],
    [customerLat, customerLon],
  ];

  const center = [deliveryBoyLat, deliveryBoyLon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-[400px] mt-5 rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white/80 backdrop-blur-sm"
    >
      {/* Info Panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 left-4 z-[999] bg-white/80 backdrop-blur-md shadow-lg rounded-xl px-4 py-3 text-gray-800 border border-gray-100"
      >
        <h3 className="font-semibold text-sm text-gray-800 flex items-center gap-2">
          🚴 Delivery Tracking
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Live location updates for your order
        </p>
      </motion.div>

      {/* Map Section */}
      <MapContainer
        className="w-full h-full"
        center={center}
        zoom={15}
        scrollWheelZoom
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Delivery Boy Marker */}
        <Marker position={[deliveryBoyLat, deliveryBoyLon]} icon={deliveryBoyIcon}>
          <Popup>Delivery Boy 🚴</Popup>
        </Marker>

        {/* Customer Marker */}
        <Marker position={[customerLat, customerLon]} icon={customerIcon}>
          <Popup>Customer 🏠</Popup>
        </Marker>

        {/* Route Path */}
        <Polyline
          positions={path}
          pathOptions={{
            color: "rgba(0, 102, 255, 0.9)",
            weight: 5,
            dashArray: "10 6",
            lineCap: "round",
          }}
        />

        <FitToPath path={path} />
      </MapContainer>

      {/* Animated Pulses */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, scale: [1, 1.3, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[45%] left-[50%] w-12 h-12 rounded-full bg-blue-400/40 blur-xl pointer-events-none"
      />
    </motion.div>
  );
}

export default DeliveryBoyTracking;
