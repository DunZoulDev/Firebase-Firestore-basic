import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6QO1mzBsaGe8t-x3c8S-PuyTOoGtE2yQ",
  authDomain: "basic-firebase-web-2f988.firebaseapp.com",
  projectId: "basic-firebase-web-2f988",
  storageBucket: "basic-firebase-web-2f988.appspot.com",
  messagingSenderId: "1015029817204",
  appId: "1:1015029817204:web:c32fb76519769ffa5e9621",
  measurementId: "G-4G4T4736L1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const table = document.getElementById("table");
const form = document.getElementById("addForm");

//async waiting all data
async function getEmployees(db) {
  const empCol = collection(db, "employees");
  const empSnapshot = await getDocs(empCol);
  return empSnapshot;
}

function showData(employee) {
  //   console.log(employee.data().name);
  const row = table.insertRow(-1);
  const nameCol = row.insertCell(0);
  const ageCol = row.insertCell(1);
  const emailCol = row.insertCell(2);
  const deleteCol = row.insertCell(3);
  nameCol.innerHTML = employee.data().name;
  ageCol.innerHTML = employee.data().age;
  emailCol.innerHTML = employee.data().email;

  //delete button
  let btn = document.createElement("button");
  btn.textContent = "ลบข้อมูล";
  btn.setAttribute("class", "btn btn-danger");
  btn.setAttribute("data-id", employee.id);
  btn.setAttribute("data-name", employee.data().name);

  deleteCol.appendChild(btn);
  btn.addEventListener("click", (e) => {
    let id = e.target.getAttribute("data-id");
    let name = e.target.getAttribute("data-name");
    console.log(id, name);

    var result = confirm("ต้องการลบข้อมูลของ " + name);
    if (result) {
      deleteDoc(doc(db, "employees", id));
    }
  });
}

//ดึงกลุ่ม document
const data = await getEmployees(db);
data.forEach((employee) => {
  showData(employee);
});
// console.log(data);

//ดึงข้อมูลจาก form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(collection(db, "employees"), {
    name: form.name.value,
    age: form.age.value,
    email: form.email.value,
  });
  form.name.value = "";
  form.age.value = "";
  form.email.value = "";
  alert("บันทึกข้อมูลสำเร็จ");

  console.log(form.name.value);
  console.log(form.age.value);
  console.log(form.email.value);
});
