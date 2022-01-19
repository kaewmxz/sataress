import { db } from "../services/firebase";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";

// get user
// export const getUser = async () => {
//   const querySnapshot = await getDocs(collection(db, "users"));
//   querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });
// }

// add user 
export const addUser = async ({user}) => {
    if (user === undefined) {
        console.log(user)
    }
    else {
        try {
            const docRef = await addDoc(collection(db, "users"), {
              email: user.email,
              name: user.displayName,
              id: user.uid
            });
            if (docRef)
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.log("Error adding document: ", e);
          }
    }
}

