// import React, { useEffect, useState, useRef } from 'react';
// import { Viewer, Entity, PolylineGraphics } from 'resium';
// import { Cartesian3, Ion, Color, ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium';
// import axios from 'axios';
// import 'cesium/Build/Cesium/Widgets/widgets.css';
// window.CESIUM_BASE_URL = "/Cesium";


// Ion.defaultAccessToken = "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MGRhMGFiOS0yNzkwLTQxZWItYjU0Zi04Y2JmMzc0NDVkY2QiLCJpZCI6MzE2NjE5LCJpYXQiOjE3NTExMzU2MTd9.c - M_AOqM0qQOuv9OE1e4m7a_CP1 - eog7uvJYwhXFuis"; // Replace with actual token

// function ISSGlobe() {
//     const [stations, setStations] = useState([]);
//     const [issPosition, setIssPosition] = useState(null);
//     const [issCoords, setIssCoords] = useState(null);
//     const [selectedSatellite, setSelectedSatellite] = useState(null);
//     const [orbitPath, setOrbitPath] = useState([]);

//     const fetchIss = async () => {
//         try {
//             const res = await axios.get("/api/v1/iss/position");
//             const coords = res.data;
//             setIssCoords({
//                 lat: coords.latitude.toFixed(2),
//                 lon: coords.longitude.toFixed(2),
//                 alt: coords.altitude_km.toFixed(2)
//             });
//             setIssPosition(
//                 Cartesian3.fromDegrees(coords.longitude, coords.latitude, coords.altitude_km * 1000)
//             );
//         } catch (err) {
//             console.error("Failed to fetch ISS position:", err);
//         }
//     };

//     useEffect(() => {
//         fetchIss();
//         const interval = setInterval(fetchIss);
//         return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         const fetchStations = async () => {
//             try {
//                 const res = await axios.get("/api/v1/iss/stations");
//                 setStations(res.data);
//             } catch (err) {
//                 console.error("Error loading stations:", err);
//             }
//         };
//         fetchStations();
//     }, []);

//     useEffect(() => {
//         const fetchOrbit = async () => {
//             try {
//                 const res = await axios.get("/api/v1/iss/iss/orbit-path");
//                 const coordsArray = res.data.map(coord =>
//                     Cartesian3.fromDegrees(coord.longitude, coord.latitude, coord.altitude_km * 1000)
//                 );
//                 setOrbitPath(coordsArray);
//             } catch (err) {
//                 console.error("Failed to fetch orbit path:", err);
//             }
//         };
//         fetchOrbit();
//     }, []);    

//     return (
//       <div style={{ height: "100vh", width: "100%" }}>
//         <Viewer full>
//           {/* ISS Yellow Dot */}
//           {issPosition && (
//             <Entity
//               name="ISS (ZARYA)"
//               position={issPosition}
//               point={{ pixelSize: 10, color: Color.YELLOW }}
//               description="Real-time ISS Location"
//             />
//           )}

//           {/* Station Blue Dots
//           {stations.map((station, idx) => (
//             <Entity
//               key={idx}
//               name={station.name}
//               position={Cartesian3.fromDegrees(
//                 station.longitude,
//                 station.latitude,
//                 station.altitude_km * 1000
//               )}
//               point={{ pixelSize: 6, color: Color.SKYBLUE }}
//               onClick={() => setSelectedSatellite(station)}
//             />
//           ))} */}

//           {orbitPath.length > 0 && (
//             <Entity name="ISS Orbit Path">
//               <PolylineGraphics
//                 positions={orbitPath}
//                 width={2}
//                 material={Color.YELLOW.withAlpha(0.6)}
//                 arcType={1} // ArcType.GEODESIC
//               />
//             </Entity>
//           )}
//         </Viewer>

//         {/* Floating ISS Coordinates */}
//         {issCoords && (
//           <div
//             style={{
//               position: "absolute",
//               top: 10,
//               left: 10,
//               background: "rgba(0, 0, 0, 0.7)",
//               color: "white",
//               padding: "10px",
//               borderRadius: "8px",
//               fontSize: "14px",
//             }}
//           >
//             <strong>ISS Position:</strong>
//             <br />
//             Lat: {issCoords.lat}°<br />
//             Lon: {issCoords.lon}°<br />
//             Alt: {issCoords.alt} km
//           </div>
//         )}

//         {/* Satellite Info on Click */}
//         {selectedSatellite && (
//           <div
//             style={{
//               position: "absolute",
//               bottom: 10,
//               left: 10,
//               background: "rgba(255, 255, 255, 0.9)",
//               color: "#333",
//               padding: "10px",
//               borderRadius: "8px",
//               fontSize: "14px",
//             }}
//           >
//             <strong>{selectedSatellite.name}</strong>
//             <br />
//             Lat: {selectedSatellite.latitude.toFixed(2)}°<br />
//             Lon: {selectedSatellite.longitude.toFixed(2)}°<br />
//             Alt: {selectedSatellite.altitude_km.toFixed(2)} km
//           </div>
//         )}
//       </div>
//     );
// }

// export default ISSGlobe;








// NICELY WORKING CODE WITHOUT AUTO FOLLOW FEATURE

import React, { useEffect, useState } from 'react';
import { Viewer, Entity, PolylineGraphics } from 'resium';
import { Cartesian3, Ion, Color} from 'cesium';
import axios from 'axios';
import 'cesium/Build/Cesium/Widgets/widgets.css';
window.CESIUM_BASE_URL = "/Cesium";


Ion.defaultAccessToken = "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MGRhMGFiOS0yNzkwLTQxZWItYjU0Zi04Y2JmMzc0NDVkY2QiLCJpZCI6MzE2NjE5LCJpYXQiOjE3NTExMzU2MTd9.c - M_AOqM0qQOuv9OE1e4m7a_CP1 - eog7uvJYwhXFuis"; // Replace with actual token

function ISSGlobe() {
    const [stations, setStations] = useState([]);
    const [issPosition, setIssPosition] = useState(null);
    const [issCoords, setIssCoords] = useState(null);
    const [selectedSatellite, setSelectedSatellite] = useState(null);
    const [orbitPath, setOrbitPath] = useState([]);

    const fetchIss = async () => {
        try {
            const res = await axios.get("/api/v1/iss/position");
            const coords = res.data;
            setIssCoords({
                lat: coords.latitude.toFixed(2),
                lon: coords.longitude.toFixed(2),
                alt: coords.altitude_km.toFixed(2)
            });
            setIssPosition(
                Cartesian3.fromDegrees(coords.longitude, coords.latitude, coords.altitude_km * 1000)
            );
        } catch (err) {
            console.error("Failed to fetch ISS position:", err);
        }
    };

    useEffect(() => {
        fetchIss();
        const interval = setInterval(fetchIss, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const res = await axios.get("/api/v1/iss/stations");
                setStations(res.data);
            } catch (err) {
                console.error("Error loading stations:", err);
            }
        };
        fetchStations();
    }, []);

    const fetchOrbit = async () => {
        try {
            const res = await axios.get("/api/v1/iss/iss/orbit-path");
            const coordsArray = res.data.map(coord =>
                Cartesian3.fromDegrees(coord.longitude, coord.latitude, coord.altitude_km * 1000)
            );
            setOrbitPath(coordsArray);
        } catch (err) {
            console.error("Failed to fetch orbit path:", err);
        }
    };

    useEffect(() => {
        fetchOrbit();
    }, []);    

    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <Viewer full>
          {/* ISS Yellow Dot */}
          {issPosition && (
            <Entity
              name="ISS (ZARYA)"
              position={issPosition}
                // point={{ pixelSize: 10, color: Color.YELLOW }}
                billboard={{
                    image: '/Cesium/Assets/Images/iss.png', // ✅ correct path based on your test
                    scale: 0.3,
                  }}
              description="Real-time ISS Location"
            />
          )}

          {/* Station Blue Dots
          {stations.map((station, idx) => (
            <Entity
              key={idx}
              name={station.name}
              position={Cartesian3.fromDegrees(
                station.longitude,
                station.latitude,
                station.altitude_km * 1000
              )}
              point={{ pixelSize: 6, color: Color.SKYBLUE }}
              onClick={() => setSelectedSatellite(station)}
            />
          ))} */}

          {orbitPath.length > 0 && (
            <Entity name="ISS Orbit Path">
              <PolylineGraphics
                positions={orbitPath}
                width={2}
                material={Color.YELLOW.withAlpha(0.6)}
                arcType={1} // ArcType.GEODESIC
              />
            </Entity>
          )}

                {issPosition && issCoords?.lat && issCoords?.lon && (
                    <Entity name="ISS Ground Line">
                        <PolylineGraphics
                            positions={[
                                issPosition,
                                Cartesian3.fromDegrees(
                                    parseFloat(issCoords.lon),
                                    parseFloat(issCoords.lat),
                                    0
                                ),
                            ]}
                            width={2}
                            material={Color.CYAN.withAlpha(0.6)}
                        />
                    </Entity>
                )}


        </Viewer>

        {/* Floating ISS Coordinates */}
        {issCoords && (
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            <strong>ISS Position:</strong>
            <br />
            Lat: {issCoords.lat}°<br />
            Lon: {issCoords.lon}°<br />
            Alt: {issCoords.alt} km
          </div>
        )}

        {/* Satellite Info on Click */}
        {selectedSatellite && (
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: 10,
              background: "rgba(255, 255, 255, 0.9)",
              color: "#333",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            <strong>{selectedSatellite.name}</strong>
            <br />
            Lat: {selectedSatellite.latitude.toFixed(2)}°<br />
            Lon: {selectedSatellite.longitude.toFixed(2)}°<br />
            Alt: {selectedSatellite.altitude_km.toFixed(2)} km
          </div>
        )}
      </div>
    );
}

export default ISSGlobe;






// okayish working code with auto follow

// import React, { useEffect, useState, useRef } from 'react';
// import { Viewer, Entity, PolylineGraphics } from 'resium';
// import { Cartesian3, Ion, Color, Math as CesiumMath } from 'cesium';
// import axios from 'axios';
// import 'cesium/Build/Cesium/Widgets/widgets.css';
// window.CESIUM_BASE_URL = "/Cesium";

// Ion.defaultAccessToken = "YOUR_TOKEN_HERE";

// function ISSGlobe() {
//   const [stations, setStations] = useState([]);
//   const [issPosition, setIssPosition] = useState(null);
//   const [issCoords, setIssCoords] = useState(null);
//   const [selectedSatellite, setSelectedSatellite] = useState(null);
//   const [orbitPath, setOrbitPath] = useState([]);
//   const viewerRef = useRef(); // ✅ 1. viewer ref

//   const fetchIss = async () => {
//     try {
//       const res = await axios.get("/api/v1/iss/position");
//       const coords = res.data;
//       const position = Cartesian3.fromDegrees(
//         coords.longitude,
//         coords.latitude,
//         coords.altitude_km * 1000
//       );

//       setIssCoords({
//         lat: coords.latitude.toFixed(2),
//         lon: coords.longitude.toFixed(2),
//         alt: coords.altitude_km.toFixed(2),
//       });

//       setIssPosition(position);

//       // ✅ 2. update camera to follow ISS
//       const viewer = viewerRef.current?.cesiumElement;
//       if (viewer && position) {
//         viewer.scene.camera.setView({
//           destination: Cartesian3.fromDegrees(
//             coords.longitude,
//             coords.latitude - 5, // a bit behind
//             coords.altitude_km * 1000 + 500000 // higher up
//           ),
//           orientation: {
//             heading: CesiumMath.toRadians(0),
//             pitch: CesiumMath.toRadians(-30), // look down
//             roll: 0,
//           },
//         });
//       }
//     } catch (err) {
//       console.error("Failed to fetch ISS position:", err);
//     }
//   };

//   useEffect(() => {
//     fetchIss();
//     const interval = setInterval(fetchIss, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const fetchStations = async () => {
//       try {
//         const res = await axios.get("/api/v1/iss/stations");
//         setStations(res.data);
//       } catch (err) {
//         console.error("Error loading stations:", err);
//       }
//     };
//     fetchStations();
//   }, []);

//   const fetchOrbit = async () => {
//     try {
//       const res = await axios.get("/api/v1/iss/iss/orbit-path");
//       const coordsArray = res.data.map(coord =>
//         Cartesian3.fromDegrees(coord.longitude, coord.latitude, coord.altitude_km * 1000)
//       );
//       setOrbitPath(coordsArray);
//     } catch (err) {
//       console.error("Failed to fetch orbit path:", err);
//     }
//   };

//   useEffect(() => {
//     fetchOrbit();
//   }, []);

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <Viewer ref={viewerRef} full> {/* ✅ pass ref here */}
//         {/* ISS with billboard */}
//         {issPosition && (
//           <Entity
//             name="ISS (ZARYA)"
//             position={issPosition}
//             billboard={{
//               image: '/Cesium/Assets/Images/iss.png',
//               scale: 0.3,
//             }}
//             description="Real-time ISS Location"
//           />
//         )}

//         {/* Orbit Path */}
//         {orbitPath.length > 0 && (
//           <Entity name="ISS Orbit Path">
//             <PolylineGraphics
//               positions={orbitPath}
//               width={2}
//               material={Color.YELLOW.withAlpha(0.6)}
//               arcType={1}
//             />
//           </Entity>
//         )}

//         {/* Line to ground */}
//         {issPosition && issCoords?.lat && issCoords?.lon && (
//           <Entity name="ISS Ground Line">
//             <PolylineGraphics
//               positions={[
//                 issPosition,
//                 Cartesian3.fromDegrees(
//                   parseFloat(issCoords.lon),
//                   parseFloat(issCoords.lat),
//                   0
//                 ),
//               ]}
//               width={2}
//               material={Color.CYAN.withAlpha(0.6)}
//             />
//           </Entity>
//         )}
//       </Viewer>

//       {/* Floating ISS Coordinates */}
//       {issCoords && (
//         <div
//           style={{
//             position: "absolute",
//             top: 10,
//             left: 10,
//             background: "rgba(0, 0, 0, 0.7)",
//             color: "white",
//             padding: "10px",
//             borderRadius: "8px",
//             fontSize: "14px",
//           }}
//         >
//           <strong>ISS Position:</strong>
//           <br />
//           Lat: {issCoords.lat}°<br />
//           Lon: {issCoords.lon}°<br />
//           Alt: {issCoords.alt} km
//         </div>
//       )}
//     </div>
//   );
// }

// export default ISSGlobe;







///// my new code
// import React, { useEffect, useState, useRef } from 'react';
// import { Viewer, Entity, PolylineGraphics } from 'resium';
// import {
//   Cartesian3,
//   Ion,
//   Color,
//   Math as CesiumMath,
//   Matrix4
// } from 'cesium';
// import axios from 'axios';
// import 'cesium/Build/Cesium/Widgets/widgets.css';

// window.CESIUM_BASE_URL = "/Cesium";
// Ion.defaultAccessToken = "YOUR_TOKEN_HERE";

// function ISSGlobe() {
//   const [issPosition, setIssPosition] = useState(null);
//   const [issCoords, setIssCoords] = useState(null);
//   const [orbitPath, setOrbitPath] = useState([]);
//   const [autoFollow, setAutoFollow] = useState(true); // Toggle state
//   const viewerRef = useRef();

//   const fetchIss = async () => {
//     try {
//       const res = await axios.get("/api/v1/iss/position");
//       const coords = res.data;

//       const position = Cartesian3.fromDegrees(
//         coords.longitude,
//         coords.latitude,
//         coords.altitude_km * 1000
//       );

//       setIssCoords({
//         lat: coords.latitude.toFixed(2),
//         lon: coords.longitude.toFixed(2),
//         alt: coords.altitude_km.toFixed(2),
//       });

//       setIssPosition(position);

//       const viewer = viewerRef.current?.cesiumElement;

//       if (viewer && autoFollow && position) {
//         // Camera controls when auto-follow is ON
//         // destination: where the camera moves to (behind and above ISS)
//         // heading: rotation left-right
//         // pitch: tilt up-down
//         // roll: tilt sideways
//         viewer.scene.camera.flyTo({
//             // destination: Cartesian3.fromDegrees(
//             //     coords.longitude,               // behind the ISS
//             //     coords.latitude - 5,                 // below the ISS
//             //     coords.altitude_km * 1000 + 370000   // zoomed out more
//             //   ),
//             //   orientation: {
//             //     heading: CesiumMath.toRadians(10),  // facing ISS motion
//             //     pitch: CesiumMath.toRadians(-30),    // angled down
//             //     roll: 0,
//             //   },
//             destination: Cartesian3.fromDegrees(
//                 coords.longitude,
//                 coords.latitude - 5,
//                 coords.altitude_km * 1000 + 1400000 // 🚀 more zoomed out
//               ),
//               orientation: {
//                 heading: CesiumMath.toRadians(0),
//                 pitch: CesiumMath.toRadians(-60), // 👀 deeper downward view
//                 roll: 0,
//               },
//           duration: 1.5,
//         });
//       }
//     } catch (err) {
//       console.error("Failed to fetch ISS position:", err);
//     }
//   };

//   useEffect(() => {
//     fetchIss();
//     const interval = setInterval(fetchIss, 2000);
//     return () => clearInterval(interval);
//   }, [autoFollow]);

//   useEffect(() => {
//     const fetchOrbit = async () => {
//       try {
//         const res = await axios.get("/api/v1/iss/iss/orbit-path");
//         const coordsArray = res.data.map(coord =>
//           Cartesian3.fromDegrees(coord.longitude, coord.latitude, coord.altitude_km * 1000)
//         );
//         setOrbitPath(coordsArray);
//       } catch (err) {
//         console.error("Failed to fetch orbit path:", err);
//       }
//     };
//     fetchOrbit();
//   }, []);

//   useEffect(() => {
//     const viewer = viewerRef.current?.cesiumElement;
//     if (viewer && !autoFollow) {
//       // When switching to manual mode, reset camera freedom
//       viewer.scene.camera.lookAtTransform(Matrix4.IDENTITY);
//       const controller = viewer.scene.screenSpaceCameraController;
//       controller.enableTilt = true;
//       controller.enableRotate = true;
//       controller.enableTranslate = true;
//       controller.enableZoom = true;
//     }
//   }, [autoFollow]);

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <Viewer ref={viewerRef} full>
//         {/* ISS Billboard */}
//         {issPosition && (
//           <Entity
//             name="ISS (ZARYA)"
//             position={issPosition}
//             billboard={{
//               image: '/Cesium/Assets/Images/iss.png',
//               scale: 0.3,
//             }}
//             description="Real-time ISS Location"
//           />
//         )}

//         {/* Orbit Path */}
//         {orbitPath.length > 0 && (
//           <Entity name="ISS Orbit Path">
//             <PolylineGraphics
//               positions={orbitPath}
//               width={2}
//               material={Color.YELLOW.withAlpha(0.6)}
//               arcType={1}
//             />
//           </Entity>
//         )}

//         {/* Ground Line */}
//         {issPosition && issCoords?.lat && issCoords?.lon && (
//           <Entity name="ISS Ground Line">
//             <PolylineGraphics
//               positions={[
//                 issPosition,
//                 Cartesian3.fromDegrees(
//                   parseFloat(issCoords.lon),
//                   parseFloat(issCoords.lat),
//                   0
//                 ),
//               ]}
//               width={2}
//               material={Color.CYAN.withAlpha(0.6)}
//             />
//           </Entity>
//         )}
//       </Viewer>

//       {/* ISS Coordinates UI */}
//       {issCoords && (
//         <div
//           style={{
//             position: "absolute",
//             top: 10,
//             left: 10,
//             background: "rgba(0, 0, 0, 0.7)",
//             color: "white",
//             padding: "10px",
//             borderRadius: "8px",
//             fontSize: "14px",
//           }}
//         >
//           <strong>ISS Position:</strong>
//           <br />
//           Lat: {issCoords.lat}°<br />
//           Lon: {issCoords.lon}°<br />
//           Alt: {issCoords.alt} km
//         </div>
//       )}

//       {/* Toggle Auto-Follow */}
//       <button
//         onClick={() => setAutoFollow(prev => !prev)}
//         style={{
//           position: 'absolute',
//           top: 10,
//           right: 10,
//           padding: '10px 16px',
//           backgroundColor: autoFollow ? '#d9534f' : '#5cb85c',
//           color: 'white',
//           border: 'none',
//           borderRadius: '6px',
//           fontWeight: 'bold',
//           cursor: 'pointer',
//           zIndex: 999,
//         }}
//       >
//         {autoFollow ? "Disable Auto-Follow" : "Enable Auto-Follow"}
//       </button>
//     </div>
//   );
// }

// export default ISSGlobe;