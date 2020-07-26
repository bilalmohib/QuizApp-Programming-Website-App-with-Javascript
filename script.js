alert("Please Click on the submit button after ten questions are finished"+
" and restart button appears to save your score permanently.It will never be "+
" Shared with any website.Other than this.Do you agree?Dont mention your email if you dont want.");

const startButton = document.getElementById('start-btn');
const nextButtton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');



   // Your web app's Firebase configuration
   const firebaseConfig = {
    apiKey: "AIzaSyDYUyz4xKFnmzFZL53k9_s2652AWh8AxFw",
    authDomain: "chat-application-27ab4.firebaseapp.com",
    databaseURL: "https://chat-application-27ab4.firebaseio.com",
    projectId: "chat-application-27ab4",
    storageBucket: "chat-application-27ab4.appspot.com",
    messagingSenderId: "433296968616",
    appId: "1:433296968616:web:020defb862c1bd5af02b9d",
    measurementId: "G-19ZPF0TWCM"
  }; 

    // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


   var database = firebase.database();




var hour=0;
var min=0;
var sec=0;
var msec=0;

let shuffledQuestions,currentQuestionIndex;

startButton.addEventListener('click',startGame);
nextButtton.addEventListener('click',()=>{
    currentQuestionIndex++;
    setNextQuestion();
})

var dateTime;

let countRightAnswers = 0;
function startGame()
{
    hour=0;
    min=0;
    sec=0;
    msec=0;
    countRightAnswers = 0; 
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(()=>Math.random()- .5);
    currentQuestionIndex=0;
    questionContainerElement.classList.remove('hide');
    document.getElementById("top").style="display:inline-block";
    document.getElementById("min").style="display:inline-block";
    document.getElementById("sec").style="display:inline-block";
    document.getElementById("count").style="display:inline-block";
    document.getElementById("hd").style="display:inline-block";
    document.getElementById("scoreList").style="display:block";
    document.getElementById("submit").style="display:block";
    setNextQuestion();
  
    document.getElementById("msec").style="display:inline-block";



    

}




function setNextQuestion()
{
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);

}

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
     const button = document.createElement('button');
     button.innerText = answer.text;
     button.classList.add('btn');
     if(answer.correct)
     {
      
         button.dataset.correct=answer.correct;
     }        
     button.addEventListener('click',selectAnswer);
     answerButtonsElement.appendChild(button);
    });
}

function resetState()
{
    nextButtton.classList.add('hide');
    while(answerButtonsElement.firstChild)
    {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
    
}

function selectAnswer(e)
{
     const selectedButton = e.target;
     const correct = selectedButton.dataset.correct;
     setStatusClass(document.body,correct);
     Array.from(answerButtonsElement.children).forEach(button=>{
         setStatusClass(button,button.dataset.correct);
     })
     if(shuffledQuestions.length>currentQuestionIndex+1)
     {
        nextButtton.classList.remove('hide');
     }    
     else{
        
        startButton.innerText='Restart';
        startButton.classList.remove('hide');
     }
     if (selectedButton.dataset = correct) {
        countRightAnswers++;
        var Score=document.getElementById("scorechange");
        Score.innerHTML=countRightAnswers;
     // +1, change it if you need +10, +25 etc
     }
     
}


function submit()
{
    alert(countRightAnswers);
    var name=prompt("Enter you name: ");
    var email=prompt("Enter you email(Optional): ");
    var opinion=prompt("Enter you opinion about the quiz: ");
    while(name==""||opinion=="")
    {
        alert("Please fill these fields so that I now that who are you?");
        var name=prompt("Enter you name: ");
        var email=prompt("Enter you email: ");
        var opinion=prompt("Enter you opinion about the quiz: ");
        if(name!=""&&email!=""&&opinion!="")
        {
            break;
            alert("Submitted");
        }
    }
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    dateTime = date+' '+time;


    dateTime=dateTime.toString();

    console.log(email+name+countRightAnswers+dateTime);
          var newMessageKey = database.ref().child('Quiz').push().key;
          database.ref('Quiz/'+newMessageKey+'/email').set(email);
          database.ref('Quiz/'+newMessageKey+'/name').set(name);
          database.ref('Quiz/'+newMessageKey+'/Score').set(countRightAnswers);
          database.ref('Quiz/'+newMessageKey+'/Opinion').set(opinion);
          database.ref('Quiz/'+newMessageKey+'/date').set(dateTime);
}


function setStatusClass(element,correct)
{
    clearStatusClass(element);
    if(correct)
    {
        element.classList.add('correct');
    }
    else{
        element.classList.add('wrong');
    }
}

function clearStatusClass(element)
{
    element.classList.remove('correct');
    element.classList.remove('wrong');
    
}

const questions = [
    {
        question:'Q:1 Which statement about templates is true?',
        answers:[
            {text:'Templates allow us to declare generic types of data',correct:true},
            {text:'Templates are protected members',correct:false},
            {text:'Templates allow us to declare generic types of data',correct:false},
            {text:'None of these',correct:false}
        ]
    },
    {
        question:'Q:2 What is the function of the new int; expression?',
        answers:[
            {text:'Deletes all memory on the heap',correct:false},
            {text:'Declares a function named new int',correct:false},
            {text:'Allocates memory on the heap',correct:true},
            {text:'All of these',correct:false}
            
        ]
    },
    {
        question:'Q:3 A class public members are available to...',
        answers:[
            {text:'...class member function only',correct:false},
            {text:'...derived classs member functions only',correct:false},
            {text:'..everyone',correct:true},
            {text:'None of these',correct:false}
        ]
    },
    {
        question:'Q:4 What does protected mean?',
        answers:[
            {text:'members are private',correct:false},
            {text:'members are available to derived class members',correct:true},
            {text:'members are available to everyone',correct:false},
            {text:'None of these',correct:false}
        ]
    },
    {
        question:'Q:5 Java has pointers?',
        answers:[
            {text:'Not at all',correct:true},
            {text:'Agree',correct:false},
            {text:'Strongly Agree',correct:false},
            {text:'Not Sure',correct:false}
        ]
    },
    {
        question:'Q:6 A pure virtual function...?',
        answers:[
            {text:'...has no body and must be implemented in derived classes',correct:true},
            {text:'...must always return void',correct:false},
            {text:'..Is used as normal member functions',correct:false},
            {text:'...must have an implementation',correct:false}
        ]
    },
    {
        question:'Q:7 An abstract class is a class that...?',
        answers:[
            {text:'...has at least two methods declared',correct:false},
            {text:'...was declared using the abstract keyword',correct:false},
            {text:'...has a pure virtual function',correct:true},
            {text:'...is similar to normal class',correct:false}
        ]
    },
    {
        question:'Q:8 Select the statement that expresses the general rule for destructors in inheritance.',
        answers:[
            {text:'The base class destructor is called before the derived class destructor',correct:false},
            {text:'The derived class destructor is called before the base class destructor',correct:true},
            {text:'The base class contructor is called after the base class constructor',correct:false},
            {text:'The derived class constructor is called after the base class destructor',correct:false}
        ]
    }
    ,
    {
        question:'Q:9 What is the output of the following code?'+
        'int a=3;'+
        'int b=2;'+
        'b=a++;'+
        'cout<<++b;',
        answers:[
            {text:'3',correct:false},
            {text:'5',correct:false},
            {text:'4',correct:true},
            {text:'2',correct:false}
        ]
    }
    ,
    {
        question:'Q:10 If class D inherits class B, when an object of class D is created...',
        answers:[
            {text:'...the Ds constructor is called before the Bs constructor',correct:false},
            {text:'...the Bs constructor is called before the Ds constructor',correct:true},
            {text:'...only Ds constructor is called',correct:false},
            {text:'U.A.E',correct:false}
        ]
    }
]

var mseconds=document.getElementById("msec");
var minutes=document.getElementById("min");
var seconds=document.getElementById("sec");







var interval;
//The timer of quiz
function start()
{
    interval = setInterval(function(){
        msec++;
        mseconds.innerHTML = msec+" ms";
        if(msec>=100)
        {
            sec++;
            seconds.innerHTML = sec+" s";
            msec=0;
            var secg=sec;
            secg=parseInt(secg);
        }
        if(sec>=60)
        {
            min++;
            minutes.innerHTML=min+" min";
            sec=0;
        }
    },10);   
jl();
  
 
}
function jl()
{
    setTimeout(function(){
        clearInterval(interval);
    },300000);
    startGame();
}
document.getElementById("count").style="color:green;";
  //The timer of the quiz
  


//This is the perfect way to retrieve data leaving all the dull ways of youtubers now
var leadsRef = database.ref('Quiz');
leadsRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      // console.log(childData.message)

var name = document.createTextNode('Name: ' + childData.name);
var email = document.createTextNode('Email: ' + childData.email);
var Scores = document.createTextNode('Score : ' + childData.Score);
var Opinion = document.createTextNode('Opinion : ' + childData.Opinion);
var date = document.createTextNode('Date: ' + childData.date);




var ult = document.getElementById("scoreList");
var lit = document.createElement("li");
lit.setAttribute('class','uls');
lit.appendChild(name);
lit.appendChild(document.createElement('br'));
lit.appendChild(email);
lit.appendChild(document.createElement('br'));
lit.appendChild(Scores);
lit.appendChild(document.createElement('br'));
lit.appendChild(Opinion);
lit.appendChild(document.createElement('br'));
lit.appendChild(date);
lit.appendChild(document.createElement('br'));
ult.appendChild(lit);



//Hey this is
    });
});
//This is the perfect way to retrieve data leaving all the dull ways of youtubers now
