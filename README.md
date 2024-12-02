# AdmissionApp 📚

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Screenshots](#screenshots)
- [Instructions](#instructions)
  - [Prerequisites](#prerequisites)
  - [Setup Timetable](#setup-timetable)
- [Login Credentials](#login-credentials)

---

## Overview

A Full-stack web application built using React and Spring Boot for managing student records efficiently. This system allows users to add, update, and delete student information, along with their respective departments. It ensures seamless communication between the frontend and backend, providing a user-friendly interface.

---

## Tech Stack 🖥

**Client:** React, Bootstrap, React Router, Axios, Toast Notifications Library  
**Server:** Spring Boot, Spring JPA, Spring Web, MySQL  

---

## Key Features 🎇

- Add, update, and delete student records with their first name, last name, email, and department.  
- View a list of students with department information.  
- Manage departments by adding and updating their names and descriptions.  
- Integration of React for the frontend, ensuring dynamic user interfaces.  
- Backend powered by Spring Boot, providing RESTful APIs for data manipulation.  
- Utilizes Axios for making asynchronous HTTP requests between the frontend and backend.  
- Implements React Router for client-side routing, ensuring a smooth user experience.  
- Toast notifications for informing users about successful and failed actions.  
- Utilizes custom hooks for encapsulating and reusing logic across components.  

---

## Screenshots 🎞
![Screenshot_1](https://github.com/LuisSalas94/Full-Stack-React-Spring-Boot-Student-Management-System/assets/57297709/49a269d1-1f95-4199-bbf4-f315fec957d5)  
![Screenshot_2](https://github.com/LuisSalas94/Full-Stack-React-Spring-Boot-Student-Management-System/assets/57297709/6eae9e41-a16f-43fe-b748-fdb63d74e850)  
![Screenshot_3](https://github.com/LuisSalas94/Full-Stack-React-Spring-Boot-Student-Management-System/assets/57297709/30c8b70e-f0a0-445f-ae72-788a7a23e8a8)  
![Screenshot_4](https://github.com/LuisSalas94/Full-Stack-React-Spring-Boot-Student-Management-System/assets/57297709/1f4c3ac1-cfab-45c0-9b46-b849de22c249)  
![Screenshot_5](https://github.com/LuisSalas94/Full-Stack-React-Spring-Boot-Student-Management-System/assets/57297709/2cd0d823-f084-4388-865a-4287693b5937)  
![Screenshot_7](https://github.com/LuisSalas94/Full-Stack-React-Spring-Boot-Student-Management-System/assets/57297709/3913298e-b0ce-469a-9683-17872f8e6d22)  

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
| Frontend: Run                | `$ npm start`                                                                                      | Start the React development server.                             |
| Access application           | Open [http://localhost:3000](http://localhost:3000)                                                | Interact with the app in your browser.                           |

---

## Login Credentials 🔐

| **Role**       | **Username** | **Password** |
|----------------|--------------|--------------|
| **Default User** | `prince`     | `2002`       |
