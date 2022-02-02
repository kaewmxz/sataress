import { db } from "../services/firebase";
import { collection, doc, getDoc, setDoc, query, where, getDocs } from "firebase/firestore";

// add user 
export const addUser = async ({currentUser}) => {
  // split name into firstname and lastname
  const str = currentUser.displayName;
  const res = str.split(" ", 2);

  const data = {
    id: currentUser.uid,
    email: currentUser.email,
    firstname: res[0],
    lastname: res[1],
    photo: currentUser.photoURL
  }
  await setDoc(doc(db,'users',currentUser.uid), data, {merge : true});
  //console.log(data);
}

// get user firstname
export const getUsers = async ({currentUser}) => {
  const userRef = doc(db, 'users',currentUser.uid);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data().firstname;
  const userPhoto = userSnap.data().photo;
  return [userData, userPhoto];
}
