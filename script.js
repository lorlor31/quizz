//types "QCMn" "QCM1"
//Idees essayer de mettre des checkbox à la palce des options
const quizz= document.getElementById("quizz") ;

const datas = [
    {
    "question" : "Altorouter permet de :" ,
    "reponses" : [
        "créer des routes" ,
        "créer des Models" ,
        "créer des Views" ,
    ],
    "type" : "QCM1",
    "bonnes" : [1] 
    ,
    },
    {
        "question" : "Generate va nous servir à " ,
        "reponses" : [
            "avoir des noms d'URL plus clairs" ,
            "dynamiser le menu" ,
            "créer des routes" ,
        ],
        "type" : "QCMn",
        "bonnes" : [1,2] 
        ,
        },
] ;

let userAnswersTotal=[] ; //tabl d'objets
let userAnswersTotalArray=[] ;
let userAnswersTotalArrayBool=[];
let correctAnswers= datas.map((questions)=>(questions.bonnes)) ;
let score=0 ;
console.log(correctAnswers) ;

//Display d'une question - réponse et mémorisation des réponsse clickées
function displayQuestion (data,index) {
    //Insertion d'une question
    const questionFieldset= document.createElement("fieldset") ;
    const question =document.createElement("legend") ;
    questionFieldset.setAttribute("id","question"+index) ;  
    questionFieldset.setAttribute("class","m-3 p-3 bg-primary d-inline-block w-80 border-dark" ) ;
    question.textContent=data.question ;
    //Insertion des réponses possibles 
    const answerCheckboxes=document.createElement("div") ;
    answerCheckboxes.setAttribute("class","p-1 bg-primary d-flex flex-column " ) ;
    let userAnswers={} ;
        //Fonction pour une réponse
        function createCheckBox(reponse,indexDeReponse){
            //1/Création d'un wrapper pour le label plus la case
            const wrapper=document.createElement("div") ;
            //1/ Creation de l'input
            const answerCheckbox= document.createElement("input") ;
            answerCheckbox.setAttribute("class","answerCheckbox p-3") ;  
            answerCheckbox.setAttribute("name","answer"+"Q"+index+"choix"+indexDeReponse) ;    
            answerCheckbox.setAttribute("id","answer"+"Q"+index+"choix"+indexDeReponse) ;  
            answerCheckbox.setAttribute("type","checkbox") ;  
            answerCheckbox.setAttribute("value",reponse) ;  
            //2/ Creation du label
            const checkboxLabel = document.createElement("label") ;
            checkboxLabel.setAttribute("class"," p-1 bg-secondary d-inline-block" ) ;

            checkboxLabel.setAttribute("for","answer"+"Q"+index+"choix"+indexDeReponse) ;
            checkboxLabel.textContent=reponse ;
            //3/ Ajout d'un EventListener
            answerCheckbox.addEventListener("click",()=> {
                if (answerCheckbox.checked){
                    //userAnswers[`${indexDeReponse}`]=true ;
                    userAnswers[indexDeReponse]=true ;
                }
                else {
                    userAnswers[indexDeReponse]=false ;
                }
                //enregistrer les valeurs clickées ds un tableau, si la valeu y est,l'enlever, 
                //peut etre n'enregistrer que l'index 
                //et comparer avec un tableau qui contient les bonnes réponsés
                
                
            }) ;
            //3/bis si une reponse n'est pas cochée, la mettre comme false
            if (userAnswers[indexDeReponse]==undefined) {
                userAnswers[indexDeReponse]=false ;
            }
            
            //4/Append à la div globale
            wrapper.appendChild(answerCheckbox) ;
            wrapper.appendChild(checkboxLabel) ;
            answerCheckboxes.appendChild(wrapper) ;
            
            // console.log(userAnswersTotal) ;
            //     console.log("tabl",userAnswersTotalArray) ;
            //     console.log(userAnswersTotalArray) ;
        }
    //Boucle de cette fct sur toutes les réponses
    data.reponses.forEach((reponse,indexDeReponse)=>createCheckBox(reponse,indexDeReponse));
    questionFieldset.appendChild(question) ;
    questionFieldset.appendChild(answerCheckboxes) ;
    quizz.appendChild(questionFieldset) ;
    userAnswersTotal[index]=userAnswers ;
    //console.log(userAnswersTotal) ;
}

datas.forEach((data,index)=>displayQuestion(data,index)) ;



//Vérification des réponses //appelée ds displayQuestion()

function checkAnswers(e) {
    //e.preventDefault() ;
    //convertir un tableau d'objets en  tableau de tableau de réponses justes [1,2]
    //1/Conversion du tableau d'onbjets en tableau avec juste les boolééens par réponse
    userAnswersTotalArrayBool=[] ;
    userAnswersTotal.forEach((objet) =>{
        userAnswersTotalArrayBool.push(Object.values(objet))
    })
    //Rajouter des tableaux vides dsla variable userAnswersTotalArray
    userAnswersTotalArray=userAnswersTotal.map((tabl)=>[]);
    //2/Pour chaque index du tableau de bool, je rajoute l'index ds mon tableau final si true
    for (let i=0 ; i<userAnswersTotalArrayBool.length;i++) {
        for (let j=0 ; j<userAnswersTotalArrayBool[i].length ; j++){
            if(userAnswersTotalArrayBool[i][j]==true) {
                userAnswersTotalArray[j].push(j) ;
            }
        }
    }
    //Comparaison de chq case des tableauw de reponses
    score=0;
    correctAnswers.forEach((correctAnswer,index)=>{
        if (correctAnswer=userAnswersTotalArray[index]) {
            score++ ;
        }
    })
    console.log( "userAnswersTotal" ,userAnswersTotal ,
    "userAnswersTotalArray" ,userAnswersTotalArray,
    "userAnswersTotalArrayBool",userAnswersTotalArrayBool,
    "score",score
    )
}

checkAnswers() ;


const submitButton=document.getElementById("submitButton") ;
submitButton.addEventListener("click",(e)=>{checkAnswers();e.preventDefault();} ) ;


//////const checkboxes= document.querySelectorAll('input[type="checkbox"]');
//const checkboxes= document.querySelectorAll('input[type="checkbox"]:checked');
//const checkboxes= document.querySelector([type="checkbox"]) ;
//console.log("cg",checkboxes) ;
