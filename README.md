# 🌍 OrbitLab Frontend – TakeMe2Space

## 📌 Task Overview

**What was asked?**  
To develop a feature for the OrbitLab product for the company **TakeMe2Space**, where I have to:

- Track the satellite over Earth using **TLE (Two-Line Element)** data.
- Visualize its **orbit path**, showing:
  - A short **trail** of where it came from.
  - A **longer lead** of where it is going.
- The frontend visualization is recommended to use **CesiumJS**.

---

## 🚀 My Approach

1. 🧠 **Researched** TLE data and satellite orbit modeling.
2. ✅ Chose:
   - **Python + FastAPI** for backend.
   - **React + CesiumJS** for frontend.
   - These frameworks offer strong support for the task, excellent documentation, and community support.
3. 📐 Designed the architecture in a scalable and modular way as described in [this document](https://docs.google.com/document/d/1IU-s6D4fX8JoIWhrB3zhZDwFhBwz2Lt2qthRdsl9h9w/edit?usp=sharing).

While my original goal was to deliver a full-fledged, production-ready application with authentication and deployment-ready modules, due to the time demands of my full-time role at a startup, I’ve developed and delivered a solid **Proof of Concept (POC)**.

---

## ✅ What’s Delivered (POC)

- 🛰️ Live position tracking of a satellite using **hardcoded TLE** data of the **International Space Station (ISS)**.
- 🌀 **Orbit path visualization** based on SGP4 predictions.
- 🎥 **Auto-follow camera** feature for CesiumJS that follows the ISS with:
  - Some trail (past path).
  - More lead (upcoming orbit).
- 🔄 **Toggle button** to enable/disable auto-follow, allowing full user interaction with the globe.
- 🌍 **Ground projection** of the ISS directly beneath its current location on Earth.

![ISS Tracking Diagram](https://drive.google.com/uc?export=view&id=1B-r9NQRMzNQMVhEDaWy5N7KPzjXChVHW)

This diagram shows the present view of ISS

---

## ⚙️ Frontend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/orbitlab-frontend.git
cd orbitlab-frontend
```
---
## 📦 2. Install Dependencies

Install all required Node.js packages using:
```bash
npm install
```
---
## ▶️ 3. Start the Frontend

To start the frontend development server, run:
```bash
npm start
```

> ⚠️ **Make sure the backend is running before launching the frontend.**  
> The frontend relies on the backend API to fetch ISS position and orbit data.

---

## 🔗 Backend API Consumption

The frontend consumes the following endpoints from the backend:

| Method | Endpoint                      | Description                               |
|--------|-------------------------------|-------------------------------------------|
| GET    | `/api/v1/iss/position`        | Current ISS position                      |
| GET    | `/api/v1/iss/orbit-path`      | Predicted orbit path for ISS              |

- **Position**: Provides the current location of the ISS.
- **Orbit Path**: Provides the predicted trajectory of the ISS.

The data from these endpoints is parsed and used by **CesiumJS** to:

- Position the satellite.
- Draw its orbit path.
- Animate its movement over time.

---

## ✨ Extras

- Added a **projection marker** on Earth under the satellite to show the location directly overhead.
- Implemented a **toggle for auto-follow** to switch between camera tracking and free navigation.

---

## ⚠️ Known Bug

- Due to **CesiumJS** limitations, you need to manually select **ArcGIS World Imagery** every time the page is refreshed for Earth textures to appear correctly.

---

## 🔒 Personal Note

> I personally feel this is not the quality of code I would ship to production.  
> But keeping my constraints in mind, I’ve focused only on the satellite tracking feature.  
> Please review the design document to see how I plan to build a production-grade system.

---
