# 🍽️ Foodies Delight - Online Food Ordering System

A full-stack responsive web application for online food ordering, table receipts, user registration, feedback management, and an interactive admin dashboard.

---

## 🌟 Features

- **Interactive Homepage:** Modern Bootstrap carousel showcasing popular delicacies with auto-slide and responsive captions.
- **Online Food Ordering:** 8 food items with intuitive quantity controls, live price calculations, and sticky order bill summary.
- **Cart Status Bar:** Real-time item count and grand total synchronization in the header navigation.
- **User Authentication:** Client-side form validation for user sign-in and registration with regex patterns.
- **Customer Feedback & Location:** Contact information, restaurant location map, motivational quote, and feedback submission form.
- **Admin Dashboard (`/admin.html`):** Real-time monitoring of total orders, revenue generated, registered customers, and customer feedback.
- **Node.js Express Backend:** RESTful API endpoints with local JSON file persistence for orders, users, and feedback.
- **Offline Resilient:** Operates seamlessly with backend API or falls back gracefully to standalone offline mode.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+), Bootstrap 3.4.1, jQuery
- **Backend:** Node.js, Express.js, CORS
- **Storage:** JSON File Persistence (`/data`)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Setup

1. **Clone or Download the repository:**
   ```bash
   git clone <YOUR-REPO-URL>
   cd project
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   node server.js
   # or
   npm start
   ```

4. **Access the application:**
   - **Storefront:** [http://localhost:3000](http://localhost:3000)
   - **Admin Dashboard:** [http://localhost:3000/admin.html](http://localhost:3000/admin.html)

---

## 📁 Project Structure

```
├── data/
│   ├── orders.json        # Saved customer orders
│   ├── users.json         # Registered user accounts
│   └── feedback.json      # Customer feedback submissions
├── index.html             # Homepage & food carousel
├── orders.html            # Online food ordering & live bill
├── ava.html               # Sign up & login page
├── finish.html            # Contact details, location map & feedback
├── contacts.html          # Feedback form
├── admin.html             # Real-time admin dashboard
├── server.js              # Express API server
├── cart.js                # Shopping cart logic
├── com.js                 # Counter helper functions
├── bootstrap.css          # Local Bootstrap stylesheet
├── package.json           # Dependencies and scripts
└── .gitignore             # Git ignored files (node_modules)
```

---

## 📄 License
ISC License.
