# AdmissionApp 📚

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Instructions](#instructions)
  - [Prerequisites](#prerequisites)
  - [Setup Timetable](#setup-timetable)
- [Login Credentials](#login-credentials)

---

## Overview

A Full-stack web application built using React and Spring Boot for managing user records efficiently. This system allows users to add, update, and delete student information, along with their respective departments. It ensures seamless communication between the frontend and backend, providing a user-friendly interface.

---

## Tech Stack 🖥

**Client:** React, Bootstrap, React Router, HTML, CSS, JS.
**Server:** Spring Boot, Spring JPA, Spring Web, MySQL.

---

## Key Features 🎇

- Login and sign in due to user roles.
- Add, update, and delete records.
- View a list of users information.
- Manage user by adding and updating their names and descriptions.
- Sorting, filtering and search user information.
- Download and upload documents.
- Reset password.
- Multi-language.
- Integration of React for the frontend, ensuring dynamic user interfaces.  
- Backend powered by Spring Boot, providing RESTful APIs for data manipulation.  
- Utilizes Axios for making asynchronous HTTP requests between the frontend and backend.  
- Implements React Router for client-side routing, ensuring a smooth user experience.  
- Toast notifications for informing users about successful and failed actions.  

---

## Instructions 🕶

### Prerequisites:
Before running this application, ensure that you have the following installed:  
- **Java Development Kit (JDK)**: Version 8 or above.  
- **Node.js**: Along with npm (Node Package Manager).  
- **MySQL Database**: With a schema named `student_management_system`.  

### Setup Timetable 🗓

| **Step**                     | **Command / Action**                                                                                 | **Description**                                                   |
|------------------------------|------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| Clone the repository         | `$ git clone https://github.com/MakuzaPrince/AdmissionApp/`                                         | Download the project files locally.                              |
| Setup the MySQL database      | Update `spring.datasource` properties in `application.properties`.                                | Configure database connection details.                           |
| Backend: Navigate to folder  | `$ cd springboot-backend`                                                                           | Move to backend folder.                                          |
| Backend: Build               | `$ ./mvnw clean package`                                                                            | Compile the Spring Boot application using Maven.                 |
| Backend: Run                 | `$ ./mvnw spring-boot:run`                                                                          | Start the backend server.                                        |
| Frontend: Navigate to folder | `$ cd react-frontend`                                                                               | Move to frontend folder.                                         |
| Frontend: Install dependencies | `$ npm install`                                                                                  | Install required Node.js packages.                              |
| Frontend: Run                | `$ npm run dev`                                                                                      | Start the React development server.                             |
| Access application           | Open [http://localhost:5173](http://localhost:5173)                                                | Interact with the app in your browser.                           |

---

## Login Credentials 🔐

| **Role**       | **Username** | **Password** |
|----------------|--------------|--------------|
| **Admin User** | `prince`     | `2002`       |
| **Employer User** | `makuza`     | `2002`       |
