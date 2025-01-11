import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const OrderTracking = () => {
  const [orderPosition, setOrderPosition] = useState({ lat: 10.762622, lng: 106.660172 }); 
  const [destination, setDestination] = useState({ lat: 10.772622, lng: 106.680172 }); 

  const [route, setRoute] = useState([
    { lat: 10.762622, lng: 106.660172 }, 
    { lat: 10.765000, lng: 106.670000 },
    { lat: 10.770000, lng: 106.675000 },
    { lat: 10.772622, lng: 106.680172 },
  ]);

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < route.length - 1) {
        setCurrentStep((prevStep) => prevStep + 1);
        setOrderPosition(route[currentStep + 1]);
      } else {
        clearInterval(interval);
      }
    }, 2000); 

    return () => clearInterval(interval);
  }, [currentStep, route]);

  return (
    <div>
      <h2>Theo dõi đơn hàng</h2>
      <MapContainer
        center={orderPosition}
        zoom={14}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Polyline positions={route} color="blue" />

        <Marker position={orderPosition}>
          <Popup>
            Order is here: <br />
            {orderPosition.lat.toFixed(5)}, {orderPosition.lng.toFixed(5)}
          </Popup>
        </Marker>
        <Marker position={destination}>
          <Popup>Delivery Spot</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default OrderTracking;
