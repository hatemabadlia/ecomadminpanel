    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
    import { getFirestore } from "firebase/firestore";
    import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
    const firebaseConfig = {
    apiKey: "AIzaSyCwh09oBWcrBYRHtMjhEDbw9esfvJo4iBs",
    authDomain: "ecom-543db.firebaseapp.com",
    projectId: "ecom-543db",
    storageBucket: "ecom-543db.appspot.com",
    messagingSenderId: "510039884853",
    appId: "1:510039884853:web:1fab224391bd8a74135d7c",
    measurementId: "G-7FJXT9HSR7"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const storage = getStorage(app)
    const auth = getAuth(app)
    export {db,auth,storage}