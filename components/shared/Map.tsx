"use client";
import LeafLet from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapProps } from "@/lib/appTypes";

// @ts-ignore
delete LeafLet.Icon.Default.prototype._getIconUrl;
LeafLet.Icon.Default.mergeOptions({
  iconUrl: markerIcon2x.src,
  iconRetinaUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

const Map = ({ center }: MapProps) => {
  return (
    <MapContainer
      center={(center as LeafLet.LatLngExpression) || [51, -0.09]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && (
        <Marker position={center as LeafLet.LatLngExpression}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};
export default Map;
