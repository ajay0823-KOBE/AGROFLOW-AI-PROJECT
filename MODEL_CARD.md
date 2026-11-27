# AgriFlow AI — Four Models (SIH Launch Cards)

All four models ship in the product UX. Training references below are the research / report basis used to design features and demo inference. Production deployment would load weights from a model registry.

## 1. Crop + Climatic + Revenue AI
- **Task:** Fertilizer, yield band, revenue hint from crop + location.
- **Approach:** Rule + knowledge base (crop calendars, ICAR-style nutrient guidance patterns).
- **Research basis:** Crop response to NPK trials; climatic zoning for Indian states; MSP price tables for revenue estimates.
- **Status in launch build:** On-device deterministic recommender (fast, offline-capable).

## 2. AgriFlow Assistant (chat)
- **Task:** Guide farmers/buyers/admins on slots, MSP, schemes, credit.
- **Approach:** Domain policy + intent routing (EN / HI / TA).
- **Research basis:** Agricultural advisory chatbot literature; Indian language UX for rural apps.
- **Status:** Rule-based assistant (keyword matching in `js/app.js`); production can swap to a live LLM API.

## 3. Quality Checkup AI (CNN-style)
- **Task:** Grade produce Good / Average / Poor before weighing.
- **Approach:** Vision pipeline pattern — resize → colourspace mask → CNN softmax grade.
- **Research basis:**
  - Fruit/vegetable CNN grading literature (e.g. Khalifa-style external quality nets).
  - Project refs: `AI_Image_Processing_Onion_Quality.pdf`, `onion_quality_report.pdf`.
- **Status:** Simulated inference matching report grade bands; ready to bind real ONNX/TFLite weights.

## 4. Logistics AI Tracker
- **Task:** Route, ETA, delay risk farm → mandi.
- **Approach:** Heuristic ETA + traffic/delay prior (smart logistics architecture pattern).
- **Research basis:** Project refs: `logistics_support_onion_ai.pdf`, `smart_logistics_architecture.pdf`.
- **Status:** Demo ETA engine; production would use maps distance matrix + GPS pings.

## Integrity fingerprint
Booking records carry `AF########` hashes for tamper-evident audit in the admin console (not a full blockchain ledger).
