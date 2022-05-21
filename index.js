import {getQ, saveQ, onSnapshot,collection,db, writeUserData, getAllData} from './firebase.js';
const Qform = document.getElementById('Qform')


const ContainerQ = document.getElementById('List-Container')

window.addEventListener('DOMContentLoaded', async () =>{
  let html ="";

  const { questions } = await getAllData();
  console.log(questions)
  //const Questions= await getQ()
  questions.forEach((el, index) =>{

    html += `
    <div class="card-question" style=" justify-content:space-between;">
      <h3>${index}</h3>
      <p class="">${el.pregunta} </p>
      <i onclick={removeQuestion} class="fa-solid fa-circle-xmark fa-xl quitIcon"></i>
    </div>
    `
  } )

  ContainerQ.innerHTML=html;
});

function removeQuestion () {

}


Qform.addEventListener('submit', (e) => {
    e.preventDefault();
    
   
    const Materia = document.getElementById('Materia')
    const Area = document.getElementById('Area')
    const Pregunta = document.getElementById('Pregunta')
    const RespuestaC = document.getElementById('RespuestaC')
    const Img = document.getElementById('Img').files[0];
    const Respuesta1 = document.getElementById('Respuesta1')
    const Respuesta2 = document.getElementById('Respuesta2')
    const Respuesta3 = document.getElementById('Respuesta3')
    
    
    writeUserData(Materia.value,  Area.value, Img, Pregunta.value, RespuestaC.value, Respuesta1.value, Respuesta2.value, Respuesta3.value)
    

   
   Qform.reset()

});