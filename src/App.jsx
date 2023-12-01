import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { db, storage } from "./firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function App() {
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "users");

  /*const handleUplodaFile = async(file) => {
    const newFileName = "" + v4();

    try {
      const storageRef = ref(storage);
      const pathRef = ref(storageRef, 'images');
      const fileRef = ref(pathRef, newFileName);

      uploadBytes(fileRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    } catch (error) {}
  }*/

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);
    setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    console.log(users);
  };

  const onSubmit = async (data) => {
    try {

      if (!data.name || !data.lastName) {
        console.log("Please fill in all users fields!");
        return;
      }

      const fileInput = document.getElementById("fileInput");
      const file = fileInput.files[0];

      if(!file) {
        console.log("Please select a file to upload");
        return;
      }

      if(file.type !== "type/png" || file.type !== "type/jpg" || file.type !== "type/jpeg") {
        console.log("Please select a valid file");
        return;
      }

      const newFileName = "" + v4();
      const storageRef = ref(storage);
      const pathRef = ref(storageRef, 'images');
      const fileRef = ref(pathRef, newFileName);

      await uploadBytes(fileRef, file);
      console.log('Uploaded a blob or file!');
      /*const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          handleUplodaFile(file);
          console.log(file.type);
        }
      };*/
      const docRef = await addDoc(userCollectionRef, data);
      console.log("User added with ID: ", docRef.id);

      reset();
      getUsers();
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            {...register("lastName", { required: "Last Name is required" })}
          />
        </label>
        <br />
        <label>
          Image:
          <input type="file" id="fileInput" />
        </label>
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default App;
