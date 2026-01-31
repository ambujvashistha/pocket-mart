# PocketMart

PocketMart is a modern, full-stack e-commerce web application designed to provide a fast, simple, and scalable online shopping experience.  
The platform focuses on clean architecture, automation, and production-ready deployment using modern DevOps practices.

PocketMart allows users to discover products, manage carts, and place orders, while providing administrators with tools to manage inventory and order flow efficiently.

---

## What PocketMart Does

PocketMart supports the complete online shopping flow:

### For Users
- Browse products with clear listings and details
- Add and manage items in a shopping cart
- Place orders using a simulated checkout flow
- View past orders and order status

### For Admins
- Create, update, and remove products
- Manage product availability
- View incoming orders and update their status

---

## Architecture Overview

PocketMart follows a clean three-tier architecture:

- **Frontend:** React.js  
- **Backend:** Node.js with Express  
- **Database:** MongoDB  

Each service is designed to be independent, scalable, and easily deployable across environments.

---

## DevOps & Deployment

DevOps is a core part of PocketMart’s design, not an afterthought.

- The application is fully version-controlled using Git with meaningful commit history
- Frontend and backend services are containerized using Docker
- A CI/CD pipeline is configured using GitHub Actions to automate builds and deployments
- The application is deployed on a cloud platform and accessible via a public URL
- Environment-specific configuration is handled cleanly to support local development and production deployment

---

## Tech Stack

- React.js
- Node.js
- Express.js
- MongoDB
- Docker
- GitHub Actions
- Cloud hosting (AWS / Render / Railway)

---

## Project Status

PocketMart is actively developed with a focus on stability, automation, and clean deployment workflows.  
The project is structured to allow easy feature expansion such as payments, search, and analytics in the future.

