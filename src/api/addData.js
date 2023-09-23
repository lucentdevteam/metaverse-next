import { db } from "../firebase/firebase";
import { getFirestore, doc, addDoc, collection } from "firebase/firestore";

// const db = getFirestore(firebase_app)

const userdata = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  country: "",
  user_type: "",
  talent_type: "",
  virtual_worlds: "",
  experience: "",
  familiar_with: "",
  is_password: false
};

export default async function addData(colllectionName, data) {
  let result = null;
  let error = null;

  try {
    result = await addDoc(collection(db, colllectionName), data);
  } catch (e) {
    error = e;
  }

  console.log({result, error});

  return { result, error };
}
