import { db } from "../services/firebase";
import { addDoc, collection, doc, documentId, DocumentReference, getDocs, setDoc } from "firebase/firestore";

// get user
// export const getUser = async () => {
//   const querySnapshot = await getDocs(collection(db, "users"));
//   querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });
// }

// add user 
export const addUser = async ({user}) => {
    // if (user === undefined) {
    //     console.log(user)
    // }
    // else {
      
        // try {
        //     // const docRef = await addDoc(collection(db, "users"), {
        //     //   email: user.email,
        //     //   name: user.displayName,
        //     // });
              
        //     console.log("Document written with ID: ", docRef);
        //   } catch (e) {
        //     console.log("Error adding document: ", e);
        //   }
    // }
  const docRef = await setDoc(doc(db,'users',user.uid), {
    email: user.email,
    name: user.displayName,
  });
  console.log(docRef);
}

