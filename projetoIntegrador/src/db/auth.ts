import { initializeApp } from "firebase/app";
<<<<<<< Updated upstream
import { getAuth } from "firebase/auth";
=======
import { getAuth, type Auth } from "firebase/auth";
>>>>>>> Stashed changes

const configBase = {
  apiKey: "AIzaSyAbIQpmJc1Q1HXL3bvtGmIU51gkxm6t5pk",
  authDomain: "invistax-e2a1c.firebaseapp.com",
  projectId: "invistax-e2a1c",
  storageBucket: "invistax-e2a1c.firebasestorage.app",
  messagingSenderId: "1067804070636",
  appId: "1:1067804070636:web:9a4f12a47361f195044bc9",
};

const firebaseApp = initializeApp(configBase);
<<<<<<< Updated upstream
const auth = getAuth(firebaseApp);

export { auth };
=======
export const auth: Auth = getAuth(firebaseApp);
>>>>>>> Stashed changes
