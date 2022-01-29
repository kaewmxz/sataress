import { db } from "../services/firebase";
import { collection, doc, getDoc, setDoc, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";

// add user 
export const addUser = async ({user}) => {
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
  //console.log(data);
}

// get user firstname
export const getUsers = async ({user}) => {
  const userRef = doc(db, 'users',user.uid);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data().firstname;
  const userPhoto = userSnap.data().photo;
  return [userData, userPhoto];
}