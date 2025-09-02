# Agreement & Payment System - Product Requirements Document (PRD)

This PRD describes the current features of the Agreement system along with the Payment module (latest updates).  
It also maps to the **backend** and **frontend** file structure.

---

## 📝 Features

### 1. User Authentication

- **Registration & Login**
- **Role-based access**: `payer` or `payee`
- Implemented in `authController.js` + `authMiddleware.js`

---

### 2. Agreement Management

#### Create Agreement

- **Route:** `POST /api/agreements`
- **Access:** Only users with role `payer`
- **Validations:**
  - Payer cannot create agreement with themselves as payee
- **Default Status:** `"pending"`
- **Fields:**
  - `payer` (ObjectId → User)
  - `payee` (ObjectId → User)
  - `terms` (String)
  - `startDate` (Date)
  - `endDate` (Date)
  - `status` (`pending` | `active` | `rejected`)

#### Confirm Agreement (Payee only)

- **Route:** `PUT /api/agreements/:id/confirm`
- **Access:** Only `payee`
- **Action:** Status → `"active"`

#### Reject Agreement (Payee only)

- **Route:** `PUT /api/agreements/:id/reject`
- **Access:** Only `payee`
- **Action:** Status → `"rejected"`

#### Get All Agreements

- **Route:** `GET /api/agreements`
- **Access:** Any authenticated user
- **Action:** Returns all agreements with populated payer/payee info

#### Get Agreement by ID

- **Route:** `GET /api/agreements/:id`
- **Access:** Any authenticated user
- **Action:** Returns one agreement with populated payer/payee info

---

### 3. Payment Management

#### Create Payment

- **Route:** `POST /api/payments`
- **Access:** Only the `payer` of an active agreement
- **Validations:**
  - Agreement must exist and be `"active"`
  - Payer must match agreement’s payer
- **Fields:**
  - `agreement` (ObjectId → Agreement)
  - `payer` (ObjectId → User)
  - `payee` (ObjectId → User)
  - `amount` (Number)
  - `note` (String, optional)
  - `image` (String → file path under `/uploads`)
- **Storage:** Image files stored in `/uploads` folder

#### Get Payments by Agreement

- **Route:** `GET /api/payments/agreement/:agreementId`
- **Access:** Payer or Payee of the agreement
- **Action:** Returns all payments tied to the agreement (with image path + note)

---

## 🔄 Status Lifecycle

### Agreement

- `pending` → when created
- `active` → when confirmed
- `rejected` → when rejected

### Payment

- Stored under specific agreements
- Image evidence available to both payer & payee

---

## 🚫 Not Yet Implemented

- Notifications (e.g. new agreement created, payment added)
- Automatic expiration of agreements (`endDate` logic)
- Advanced reporting (Google Sheets integration WIP)

---

## ✅ Next Step

- Frontend UI for **Payments**:
  - Upload image with payment form
  - Display list of payments with amount, note, and image preview
