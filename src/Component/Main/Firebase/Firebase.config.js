import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCcrdtXvPvafMH-S8m_m0pwmKRaEmeS3P8",
    authDomain: "taskmanager-2701d.firebaseapp.com",
    projectId: "taskmanager-2701d",
    storageBucket: "taskmanager-2701d.firebasestorage.app",
    messagingSenderId: "470848593684",
    appId: "1:470848593684:web:a98faa80c6eb4b70f46c01"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default app;  // Default export of app
export { auth, app };  // Named export for auth
