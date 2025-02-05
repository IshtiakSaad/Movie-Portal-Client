# MoviePortal 

Welcome to **MoviePortal**, your one-stop destination for exploring, managing, and sharing your favorite movies. From adding new movies to building your personalized list of favorites, MoviePortal offers a seamless movie management experience for movie enthusiasts.

### 🌐 **Live Site URL**
[Visit MoviePortal Here](https://movie-server-0.web.app/)

- **Technologies Used**: **React**, **Vite**, **TailwindCSS**, **Firebase**, **React Router**, **DaisyUI**, **React Hook Form**, and **ESLint**.

---

## 📋 **Features**
1. **Comprehensive Movie Management**:
   - Add new movies with rich details like title, poster, genre, release year, duration, and summary.
   - Rate movies using an intuitive star-rating system.

2. **User Authentication**:
   - Secure login and registration using Firebase Authentication.
   - Includes both email/password-based authentication and Google login integration.

3. **Personalized Favorites**:
   - Users can save their favorite movies and access them anytime in a dedicated "Favorites" section.
   - Easily remove movies from your favorites list.

4. **Movie Details Page**:
   - View detailed information about each movie, including its title, poster, genre, rating, and summary.
   - Options to add the movie to your favorites or delete it if you’re the owner.

5. **Private Routes for Enhanced Security**:
   - Pages like "Add Movie" and "Favorites" are protected, ensuring only authenticated users can access them.

---

##  **Tech Stack**
- **Frontend**: React, React Router, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Authentication
- **Hosting**: Netlify (Frontend), Vercel (Backend)

## Dependencies

- **React**: `^18.3.1`
- **Firebase**: `^11.1.0`
- **TailwindCSS**: `^3.4.17`
- **React Router**: `^7.1.0`
- **React Hook Form**: `^7.54.2`
- **React Toastify**: `^11.0.2`
- **DaisyUI**: `^4.12.23`
- **Vite**: `^6.0.3`
- **localforage**: `^1.10.0`
 
---

## Running the Project Locally

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Steps to Run Locally

1. **Clone the Repository**
   - Open your terminal and run the following command to clone the repository:
     ```bash
     git clone https://github.com/IshtiakSaad/Movie-Portal-Client.git
     ```
   - Navigate to the project directory:
     ```bash
     cd Movie-Portal-Client
     ```

2. **Install Dependencies**
   - Inside the project folder, run the following command to install the required dependencies:
     ```bash
     npm install
     ```

3. **Set Up Firebase Configuration**
   - Create a `.env` file in the root of the project and add your Firebase configuration details. Example:
     ```bash
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     ```

4. **Run the Development Server**
   - Once the dependencies are installed, you can start the development server with the following command:
     ```bash
     npm run dev
     ```

5. **Access the Application**
   - Open your browser and go to `http://localhost:5173` to see the application running locally.

---

## 📝 **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🤝 **Contributing**
We welcome contributions to improve **MoviePortal**! Feel free to fork the repository, create a branch, and submit a pull request.
