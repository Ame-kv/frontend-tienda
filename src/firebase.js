// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB01yg9jMImLC-x4MxawK90GXcWrzTmwE0",
  authDomain: "tienda-faf4b.firebaseapp.com",
  projectId: "tienda-faf4b",
  storageBucket: "tienda-faf4b.appspot.com", // 🔧 corregido
  messagingSenderId: "391386869823",
  appId: "1:391386869823:web:c895c4be9b8e62d916088a",
  measurementId: "G-JCVTN9D0G3" // Puedes omitirlo si no usas analytics
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);

// Configuración de Auth para Google
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
