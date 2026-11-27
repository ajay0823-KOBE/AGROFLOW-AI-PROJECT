# AgriFlow AI — SIH prototype

Smart procurement for farmers (DoCA / MSP): slot booking, AI quality check (simulated),
Collab circles, buyer marketplace and an admin command centre.

Built with HTML, CSS, JavaScript and **Bootstrap 5.3** (bundled in `vendor/bootstrap`, so it also works offline).

## How to run

**Option A** — open `index.html` in a browser.

**Option B** — run the small server:

```bash
cd agriflow_ai
node backend/server.js
```

Then open http://127.0.0.1:8787/

All data (bookings, orders, listings …) is saved in the browser with **localStorage**.

## Demo accounts

| Role   | Email              | Password   |
|--------|--------------------|------------|
| Farmer | farmer@agriflow.in | Farmer@123 |
| Buyer  | buyer@agriflow.in  | Buyer@123  |
| Admin  | admin@agriflow.in  | Admin@2026 |

On the login page, clicking a role fills these in.

## Folder structure

```
agriflow_ai/
  index.html          Home page
  css/style.css       Our colours and small parts on top of Bootstrap
  vendor/bootstrap/   Bootstrap 5.3.3 CSS and JS (MIT licence)
  js/app.js           Shared code (data, login, languages, AI models, chat)
  backend/server.js   Small file server (optional)
  pages/
    login, register, profile          Accounts
    farmer, book, sell, collab, bank  Farmer portal
    ai, logistics                     AI tools
    buyer, checkout                   Buyer portal
    admin                             Admin portal
    track, centres, crops, schemes, news   Public pages
```

## How app.js is organised

1. Demo accounts and fixed data (schemes, centres, crops, slots)
2. Saving and loading data — `getData(name)` / `setData(name, value)`
3. Sample data for the demo — `seedDemoData()`
4. Languages — `TEXT` and `setLang()` (English, Hindi, Tamil)
5. Login, register, logout — `login()`, `register()`, `requireAuth(role)`
6. Small helpers — `toast()`, `esc()`, `newId()`, `rupees()`
7. The four AI models — `runCropAI()`, `runQualityAI()`, `runLogisticsAI()`
8. Chat assistant — `aiReply()` and the chat button
9. Page start-up

## Main flow

1. Farmer books an MSP slot → AI quality check → gets a token (`book.html`)
2. Admin clicks the booking in the queue to move it:
   Registered → Weighing → Quality approved → MSP paid to farmer → Completed
3. When MSP is paid, the farmer's credit score goes up
4. Buyer picks a product → checkout → order → track

## What is real and what is simulated

| Feature | Status |
|---------|--------|
| Screens, tokens, tracking, queue | Working in the browser |
| AI crop / quality / logistics / chat | Simple rules and random results (simulated) |
| UPI / Card / Razorpay / Paytm / COD | Demo only, no real payment |
| SMS | Logged in the admin portal only |
| Aadhaar OTP | Demo only |
