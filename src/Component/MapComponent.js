import React, { useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";

const mapContainerStyle = {
    width: "100%",
    height: "500px",
};



const center = {
    lat: 6.896178297393063,
    lng: 79.92304369633176
};

const MapComponent = () => {
    const mapInstance = useRef(null);
    const markersAdded = useRef(false);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBnoSZiGiahM3iiUAGCFyDyWj73vl_INjk",
    });

    const fetchLocations = async () => {
        if (markersAdded.current) return; // Avoid re-adding markers
        markersAdded.current = true;

        try {
            const response = await axios.get("http://localhost:8080/api/hospitals");
            const hospitals = response.data;

            hospitals.forEach((hospital) => {
                // Create a standard marker
                new window.google.maps.Marker({
                    position: { 
                        lat: 6.896178297393063, //hospital.lat
                        lng: 79.92304369633176 //hospital.lng
                    },

                    map: mapInstance.current,
                    title: hospital.name, // Add tooltip with hospital name
                });
            });
        } catch (error) {
            console.error("Error fetching hospital data:", error);
        }
        new window.google.maps.Marker({
            position: { 
                lat: 6.896178297393063, 
                lng: 79.92304369633176 
            },
            map: mapInstance.current,
            title: "National Blood Transfusion Service",
            
        });
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={18}
            onLoad={(map) => {
                mapInstance.current = map; // Store the Google Maps instance
                fetchLocations(); // Fetch and add markers
            }}
        />
    ) : (
        <div>Loading...</div>
    );
};

export default MapComponent;
