import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Navigation, Clock } from 'lucide-react';

const GoogleMap = ({ 
  onAddressSelect, 
  selectedAddress, 
  selectedShop,
  showRoute = false,
  height = '400px' 
}) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [shopMarker, setShopMarker] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your actual API key
          version: 'weekly',
          libraries: ['places', 'geometry']
        });

        const google = await loader.load();
        
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: 40.7589, lng: -73.9851 }, // Default to NYC
          zoom: 13,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        const directionsServiceInstance = new google.maps.DirectionsService();
        const directionsRendererInstance = new google.maps.DirectionsRenderer({
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: '#667eea',
            strokeWeight: 4
          }
        });

        directionsRendererInstance.setMap(mapInstance);

        setMap(mapInstance);
        setDirectionsService(directionsServiceInstance);
        setDirectionsRenderer(directionsRendererInstance);

        // Add click listener for address selection
        mapInstance.addListener('click', (event) => {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          
          // Reverse geocoding to get address
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK' && results[0]) {
              const address = results[0].formatted_address;
              onAddressSelect({ address, lat, lng });
              
              // Update marker
              if (marker) {
                marker.setMap(null);
              }
              
              const newMarker = new google.maps.Marker({
                position: { lat, lng },
                map: mapInstance,
                title: 'Delivery Address',
                icon: {
                  url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#667eea" stroke="#fff" stroke-width="2"/>
                      <circle cx="12" cy="10" r="3" fill="#fff"/>
                    </svg>
                  `),
                  scaledSize: new google.maps.Size(32, 32)
                }
              });
              
              setMarker(newMarker);
            }
          });
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setIsLoading(false);
      }
    };

    initMap();
  }, [onAddressSelect]);

  // Update shop marker when selectedShop changes
  useEffect(() => {
    if (map && selectedShop) {
      if (shopMarker) {
        shopMarker.setMap(null);
      }

      const newShopMarker = new window.google.maps.Marker({
        position: { lat: selectedShop.lat, lng: selectedShop.lng },
        map: map,
        title: selectedShop.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z" fill="#10b981"/>
              <circle cx="12" cy="12" r="2" fill="#fff"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32)
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 4px 0; color: #2d3748;">${selectedShop.name}</h3>
            <p style="margin: 0; color: #718096; font-size: 14px;">${selectedShop.address}</p>
            <p style="margin: 4px 0 0 0; color: #718096; font-size: 12px;">⭐ ${selectedShop.rating} • ${selectedShop.hours}</p>
          </div>
        `
      });

      newShopMarker.addListener('click', () => {
        infoWindow.open(map, newShopMarker);
      });

      setShopMarker(newShopMarker);
    }
  }, [map, selectedShop]);

  // Calculate and display route
  useEffect(() => {
    if (directionsService && directionsRenderer && selectedShop && selectedAddress && showRoute) {
      const request = {
        origin: { lat: selectedShop.lat, lng: selectedShop.lng },
        destination: { lat: selectedAddress.lat, lng: selectedAddress.lng },
        travelMode: window.google.maps.TravelMode.DRIVING
      };

      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
          
          const route = result.routes[0];
          const leg = route.legs[0];
          
          setRouteInfo({
            distance: leg.distance.text,
            duration: leg.duration.text,
            durationValue: leg.duration.value
          });
        }
      });
    }
  }, [directionsService, directionsRenderer, selectedShop, selectedAddress, showRoute]);

  if (isLoading) {
    return (
      <div style={{
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#718096'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid #e2e8f0',
            borderTop: '2px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          Loading map...
        </div>
      </div>
    );
  }

  return (
    <div className="map-container">
      <div ref={mapRef} className="map-element" style={{ height }} />
      
      {routeInfo && (
        <div className="route-info-box">
          <h4 className="route-info-title">
            <Navigation size={16} />
            Delivery Route
          </h4>
          <div className="route-info-detail">
            <MapPin size={14} />
            Distance: {routeInfo.distance}
          </div>
          <div className="route-info-detail">
            <Clock size={14} />
            Est. delivery: {routeInfo.duration}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;