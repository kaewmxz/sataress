import { db } from "../services/firebase";
import { collection, doc, getDocs, setDoc, query, where } from "firebase/firestore";

// get user
// export const getUser = async () => {
//   const querySnapshot = await getDocs(collection(db, "users"));
//   querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });
// }

// export const getUser = async ({user}) => {
//   const docRef = doc(db, "users", user.uid);
//   const docSnap = await getDoc(docRef);
//   const name = docSnap.data().firstname;
//   if (docSnap.exists()) {
//     const name = docSnap.data().firstname;
//     console.log("Document data:", name);
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }
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
  // split name into firstname and lastname
  const str = user.displayName;
  const res = str.split(' ', 2);

  const data = {
    id: user.uid,
    email: user.email,
    firstname: res[0],
    lastname: res[1],
    photo: user.photoURL
  }
  await setDoc(doc(db,'users',user.uid), data, {merge : true});
  console.log(data);
  return <div>{data.firstname}</div>;
}

