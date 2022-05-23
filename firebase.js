// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection,addDoc, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getDatabase, onValue, set, push, get, child, ref as ref_database } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js"
import { getStorage, ref as ref_storage, uploadBytes } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnxwk-ryq1GCdz8f5SKmkiuDg0vrKnHQw",
  authDomain: "quizapp-39c91.firebaseapp.com",
  databaseURL: "https://quizapp-39c91.firebaseio.com",
  projectId: "quizapp-39c91",
  storageBucket: "quizapp-39c91.appspot.com",
  messagingSenderId: "199863734003",
  appId: "1:199863734003:web:ea2c79e014ca20ec80f186",
  measurementId: "G-V7WJQQLZD5"
};

const QUESTIONS_URL = 'quiz/questions/';
const ANSWERS_URL = 'quiz/answers/';
const IMAGES_URL = 'quiz/images/';
const AREA_URL = 'quiz/area/';
const MATTERS_URL = 'quiz/matters/';


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const database = getDatabase();
const storage = getStorage(app);

//Data
var all = [];
var questions = [];
var answers = [];
var images = [];
var areas = [];
var matters = [];


export const saveQ = (Materia, Area, Pregunta, RespuestaC, Respuesta1, Respuesta2, Respuesta3  ) =>{
      addDoc(collection(db,'Preguntas'),{Materia: Materia, Area: Area, Pregunta: Pregunta, RespuestaC: RespuestaC, Respuesta1: Respuesta1, Respuesta2: Respuesta2, Respuesta3: Respuesta3, })
}

export const getQ =() => getDocs(collection(db,'Preguntas'))
export const onGetQ = () => console.log('onGetQ')
export{
  onSnapshot,collection, db
}

export const getAllData = async () =>{
  const dbRef = ref_database(database);
  await get(child(dbRef, 'quiz')).then((snapshot) => {
    if (snapshot.exists()) {
      all = Object.values(snapshot.val());
      answers = Object.values(all[0]);
      areas = Object.values(all[1]);
      images = Object.values(all[2]);
      matters = Object.values(all[3]);
      questions = Object.values(all[4]);
    } 
    else {
        console.log("No data available");
    }
    }).catch((error) => {
      console.error(error);
  })


  return { answers, areas, images, matters, questions }
}
  

export const writeUserData = (Materia, Area, Img, Pregunta, RespuestaC, Respuesta1, Respuesta2, Respuesta3) =>{

  const questionListRef = ref_database(database, QUESTIONS_URL);
  const addQuestionRef = push(questionListRef);
  const addAnswerListRef = ref_database(database, ANSWERS_URL + addQuestionRef.key);
  const addImageListRef = ref_database(database, IMAGES_URL + addQuestionRef.key);
  const addAreaListRef = ref_database(database, AREA_URL + addQuestionRef.key);
  const addMatterListRef = ref_database(database, MATTERS_URL + addQuestionRef.key);

  const storageRef = ref_storage(storage, 'images/' + addQuestionRef.key);

  if(Img){
    uploadBytes(storageRef, Img).then((snapshot) => {
      console.log('Uploaded a blob or file!', storageRef);
    });
    set(addImageListRef, {
      image: addQuestionRef.key,
    });
  }
  else{
    set(addImageListRef, {
      image: false,
    });
  }

  set(addQuestionRef, {
    pregunta: Pregunta,
  });
  set(addAnswerListRef, {
    ans1: Respuesta1,
    ans2: Respuesta2,
    ans3: Respuesta3,
    ans4: RespuestaC,
    rans: 4,
  })
  set(addAreaListRef, {
    area: Area,
  })
  set(addMatterListRef, {
    matter: Materia,
  })
}
