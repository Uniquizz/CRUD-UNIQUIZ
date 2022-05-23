import data from  "./db.js"

export const getjson = () => {

    var answers = []
    var area = []
    var images =[]
    var matters =[]
    var questions =[]
   
    Object.values(data.__collections__.Preguntas).forEach((element) => {
       answers = [
           ...answers,
           {
               ans1: element.Respuesta1,
               ans2: element.Respuesta2,
               ans3: element.Respuesta3,
               ans4: element.RespuestaC,
               rans: 4,
           }
        ]

       area =[
           ...area,
           {
               area: element.Area
           }
        ]

       images =[
           ...images,
           {
               image: false
           }
        ]

       matters =[
           ...matters,
           {
               matter: element.Materia
           }
        ]

       questions =[
           ...questions,
           {
               question: element.Pregunta
           }
        ]



    });


    return{
        answers,
        area,
        images,
        matters,
        questions,
    }


}