
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/QuizPage.css";


const questionsData = {
  react: [
    { question: "What is JSX in React?", options: ["A database", "A syntax extension for JavaScript", "A CSS framework", "A backend library"], answer: "A syntax extension for JavaScript" },
    { question: "What are React Hooks?", options: ["Functions that allow class components only", "Functions that allow functional components to use state and other features", "A type of Redux state management", "A built-in React API for animations"], answer: "Functions that allow functional components to use state and other features" },
    { question: "What is the difference between state and props in React?", options: ["Props are mutable, state is immutable", "Props are used for local state management, state is used for data passing", "State is mutable, props are immutable", "Props and state are the same in React"], answer: "State is mutable, props are immutable" },
    { question: "What is the purpose of the useEffect Hook?", options: ["To modify CSS properties", "To perform side effects in functional components", "To handle Redux state", "To create new components dynamically"], answer: "To perform side effects in functional components" },
    { question: "How does React handle the virtual DOM?", options: ["It creates a new HTML document every time", "It updates the real DOM directly", "It maintains a lightweight copy of the DOM and updates only changed elements", "It uses JavaScript objects to replace the real DOM"], answer: "It maintains a lightweight copy of the DOM and updates only changed elements" },
    { question: "What are controlled and uncontrolled components in React?", options: ["Controlled components rely on local state; uncontrolled components rely on Redux", "Controlled components manage their state internally; uncontrolled components use a ref", "Controlled components use Redux; uncontrolled components use React context", "Controlled components use useState; uncontrolled components use useEffect"], answer: "Controlled components manage their state internally; uncontrolled components use a ref" },
    { question: "Explain the concept of React Router.", options: ["A library for handling API requests", "A state management library", "A library for navigation in a React application", "A database handling library"], answer: "A library for navigation in a React application" },
    { question: "What is the significance of keys in lists in React?", options: ["They help to style list elements", "They uniquely identify elements for efficient updates", "They are used for event handling", "They are required for all JSX elements"], answer: "They uniquely identify elements for efficient updates" },
    { question: "How can you optimize performance in a React app?", options: ["By using inline styles", "By avoiding use of functional components", "By using memoization and React.memo", "By using class components only"], answer: "By using memoization and React.memo" },
    { question: "What is the difference between functional and class components?", options: ["Functional components cannot use state", "Class components do not support lifecycle methods", "Functional components use Hooks for state, class components use this.state", "Class components are always faster than functional components"], answer: "Functional components use Hooks for state, class components use this.state" },
  ],
  html: [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language"], answer: "Hyper Text Markup Language" },
    { question: "Which HTML tag is used to define a paragraph?", options: ["<p>", "<para>", "<pg>"], answer: "<p>" },
    { question: "Which attribute provides a unique identifier to an element?", options: ["class", "id", "name"], answer: "id" },
    { question: "How do you insert an image in HTML?", options: ["<img src='image.jpg'>", "<image src='image.jpg'>"], answer: "<img src='image.jpg'>" },
    { question: "Which tag is used for creating a hyperlink?", options: ["<link>", "<a>", "<href>"], answer: "<a>" },
    { question: "What is the purpose of the `<head>` tag?", options: ["Contains metadata", "Creates page sections"], answer: "Contains metadata" },
    { question: "Which tag is used to create a numbered list?", options: ["<ul>", "<ol>", "<li>"], answer: "<ol>" },
    { question: "What does the `alt` attribute in an `<img>` tag specify?", options: ["Alternative text", "Image alignment"], answer: "Alternative text" },
    { question: "Which HTML tag makes text bold?", options: ["<bold>", "<b>", "<strong>"], answer: "<b>" },
    { question: "What is the purpose of the `<form>` tag?", options: ["Create tables", "Define user input forms"], answer: "Define user input forms" },
  ],
  css: [
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System"], answer: "Cascading Style Sheets" },
    { question: "Which property is used to change text color?", options: ["font-color", "text-color", "color"], answer: "color" },
    { question: "How do you apply an external CSS file?", options: ["<style>", "<link>", "<css>"], answer: "<link>" },
    { question: "Which CSS property controls the space between elements?", options: ["padding", "spacing", "margin"], answer: "margin" },
    { question: "What is the default position of elements in CSS?", options: ["static", "absolute", "relative"], answer: "static" },
    { question: "Which property makes text bold in CSS?", options: ["font-style", "font-weight", "text-decoration"], answer: "font-weight" },
    { question: "Which value of the display property hides an element but still takes space?", options: ["visibility: hidden", "display: none", "opacity: 0"], answer: "visibility: hidden" },
    { question: "Which property is used to make a flex container?", options: ["display: block", "display: flex", "display: grid"], answer: "display: flex" },
    { question: "What is the purpose of `z-index` in CSS?", options: ["Controls stacking order", "Sets transparency"], answer: "Controls stacking order" },
    { question: "Which CSS unit is relative to the font size of the parent element?", options: ["px", "em", "%"], answer: "em" },
  ],
  java: [
    { question: "What is Java?", options: ["A compiled language", "An interpreted language", "Both compiled and interpreted"], answer: "Both compiled and interpreted" },
    { question: "Which keyword is used to define a class in Java?", options: ["class", "Class", "define"], answer: "class" },
    { question: "What is the default value of an int variable in Java?", options: ["0", "null", "undefined"], answer: "0" },
    { question: "Which method is the entry point of a Java application?", options: ["main()", "start()", "execute()"], answer: "main()" },
    { question: "Which keyword is used to inherit a class in Java?", options: ["extend", "extends", "inherit"], answer: "extends" },
    { question: "What is the superclass of all Java classes?", options: ["Main", "Object", "Class"], answer: "Object" },
    { question: "Which operator is used to compare two values in Java?", options: ["=", "==", "==="], answer: "==" },
    { question: "Which data type is used to store true or false values in Java?", options: ["boolean", "int", "char"], answer: "boolean" },
    { question: "Which of the following is not a primitive data type in Java?", options: ["int", "boolean", "String"], answer: "String" },
    { question: "What is the purpose of the 'final' keyword in Java?", options: ["To create a constant", "To stop inheritance", "Both"], answer: "Both" },
  ],
  oops: [
    { question: "What are the four pillars of OOP?", options: ["Encapsulation, Abstraction, Inheritance, Polymorphism", "Encapsulation, Compilation, Inheritance, Overloading", "Abstraction, Polymorphism, Compilation, Encapsulation"], answer: "Encapsulation, Abstraction, Inheritance, Polymorphism" },
    
    { question: "What is Encapsulation?", options: ["Hiding implementation details and exposing only necessary parts", "Making all data public", "Using multiple classes"], answer: "Hiding implementation details and exposing only necessary parts" },
    
    { question: "What is Inheritance in OOP?", options: ["Creating new classes from existing classes", "Hiding data using private variables", "Using multiple functions"], answer: "Creating new classes from existing classes" },
    
    { question: "Which keyword is used for inheritance in Java?", options: ["inherits", "extends", "super"], answer: "extends" },
    
    { question: "What is Polymorphism in OOP?", options: ["A class having multiple constructors", "The ability of a method to behave differently based on input", "A single function used in multiple classes"], answer: "The ability of a method to behave differently based on input" },
    
    { question: "Which type of Polymorphism is achieved using method overloading?", options: ["Compile-time Polymorphism", "Run-time Polymorphism", "Dynamic Binding"], answer: "Compile-time Polymorphism" },
    
    { question: "What is Abstraction?", options: ["Hiding implementation details and showing only necessary functionality", "Providing all details of a class to the user", "Creating multiple objects from a single class"], answer: "Hiding implementation details and showing only necessary functionality" },
    
    { question: "Which keyword is used to create an abstract class in Java?", options: ["abstract", "interface", "class"], answer: "abstract" },
    
    { question: "What is an Interface in Java?", options: ["A class with complete method definitions", "A blueprint that contains abstract methods", "A class that cannot be inherited"], answer: "A blueprint that contains abstract methods" },
    
    { question: "Which feature of OOP promotes code reusability?", options: ["Encapsulation", "Inheritance", "Polymorphism"], answer: "Inheritance" },
  ],
  python: [
    { question: "What type of language is Python?", options: ["Compiled", "Interpreted", "Both Compiled and Interpreted"], answer: "Interpreted" },

    { question: "Which keyword is used to define a function in Python?", options: ["def", "func", "define"], answer: "def" },

    { question: "Which data type is immutable in Python?", options: ["List", "Dictionary", "Tuple"], answer: "Tuple" },

    { question: "How do you start a comment in Python?", options: ["//", "#", "/* */"], answer: "#" },

    { question: "Which of the following is used for loop iteration in Python?", options: ["for", "foreach", "loop"], answer: "for" },

    { question: "What will `type(10)` return in Python 3?", options: ["int", "Integer", "number"], answer: "int" },

    { question: "Which statement is used to handle exceptions in Python?", options: ["catch", "except", "try"], answer: "try" },

    { question: "What is the output of `print(2 ** 3)`?", options: ["6", "8", "9"], answer: "8" },

    { question: "Which module in Python is used to work with random numbers?", options: ["random", "math", "statistics"], answer: "random" },

    { question: "What is the correct file extension for Python files?", options: [".py", ".python", ".pyt"], answer: ".py" },
  ],
  javascript: [
    { question: "Which keyword is used to declare a variable in JavaScript?", options: ["var", "int", "string"], answer: "var" },

    { question: "Which symbol is used for single-line comments in JavaScript?", options: ["//", "/*", "#"], answer: "//" },

    { question: "Which method is used to print something to the console?", options: ["console.log()", "print()", "log()"], answer: "console.log()" },

    { question: "Which of the following is NOT a JavaScript data type?", options: ["Number", "Boolean", "Float"], answer: "Float" },

    { question: "How do you define a function in JavaScript?", options: ["function myFunc() {}", "def myFunc() {}", "func myFunc() {}"], answer: "function myFunc() {}" },

    { question: "Which built-in function is used to parse a string into an integer?", options: ["parseInt()", "toInteger()", "int()"], answer: "parseInt()" },

    { question: "What does `typeof null` return in JavaScript?", options: ["null", "undefined", "object"], answer: "object" },

    { question: "Which operator is used for strict equality in JavaScript?", options: ["==", "===", "="], answer: "===" },

    { question: "Which event is triggered when a user clicks on an HTML element?", options: ["onhover", "onclick", "onchange"], answer: "onclick" },

    { question: "How do you create an array in JavaScript?", options: ["var arr = [];", "var arr = {};", "var arr = ()"], answer: "var arr = [];" },
  ],
  django: [
    { question: "What is Django?", options: ["A JavaScript framework", "A Python web framework", "A CSS library"], answer: "A Python web framework" },

    { question: "Which command is used to create a new Django project?", options: ["django-admin startproject", "django startapp", "python manage.py startproject"], answer: "django-admin startproject" },

    { question: "Which file contains the Django project settings?", options: ["views.py", "models.py", "settings.py"], answer: "settings.py" },

    { question: "What is the purpose of Django models?", options: ["To define the structure of a database", "To create front-end templates", "To manage static files"], answer: "To define the structure of a database" },

    { question: "Which command is used to apply migrations in Django?", options: ["python manage.py migrate", "python manage.py makemigrations", "django migrate"], answer: "python manage.py migrate" },

    { question: "Which Django component is responsible for handling user requests?", options: ["Models", "Views", "Templates"], answer: "Views" },

    { question: "What is the default database used by Django?", options: ["MySQL", "PostgreSQL", "SQLite"], answer: "SQLite" },

    { question: "Which Django file is used to define URL patterns?", options: ["models.py", "views.py", "urls.py"], answer: "urls.py" },

    { question: "How do you start the Django development server?", options: ["django runserver", "python manage.py runserver", "manage.py start"], answer: "python manage.py runserver" },

    { question: "What is the Django ORM used for?", options: ["To render HTML templates", "To manage databases using Python", "To handle user authentication"], answer: "To manage databases using Python" },
  ],
  nodejs: [
    { 
      question: "What is Node.js?", 
      options: ["A JavaScript framework", "A runtime environment for JavaScript", "A database management system"], 
      answer: "A runtime environment for JavaScript" 
    },

    { 
      question: "Which engine does Node.js use to execute JavaScript code?", 
      options: ["SpiderMonkey", "Chakra", "V8"], 
      answer: "V8" 
    },

    { 
      question: "Which command is used to initialize a new Node.js project?", 
      options: ["npm start", "node init", "npm init"], 
      answer: "npm init" 
    },

    { 
      question: "Which module in Node.js is used to create a server?", 
      options: ["fs", "http", "path"], 
      answer: "http" 
    },

    { 
      question: "Which of the following is used to import a module in Node.js?", 
      options: ["import module from 'module'", "require('module')", "include 'module'"], 
      answer: "require('module')" 
    },

    { 
      question: "Which file is commonly used to define dependencies in a Node.js project?", 
      options: ["package.json", "server.js", "index.js"], 
      answer: "package.json" 
    },

    { 
      question: "What is Express.js?", 
      options: ["A database for Node.js", "A lightweight web framework for Node.js", "A CSS framework"], 
      answer: "A lightweight web framework for Node.js" 
    },

    { 
      question: "Which global object in Node.js is used to handle file system operations?", 
      options: ["os", "http", "fs"], 
      answer: "fs" 
    },

    { 
      question: "How can you install an npm package globally?", 
      options: ["npm install package-name", "npm install -g package-name", "npm global package-name"], 
      answer: "npm install -g package-name" 
    },

    { 
      question: "Which statement is true about Node.js?", 
      options: ["Node.js can run in the browser", "Node.js is single-threaded", "Node.js does not support asynchronous programming"], 
      answer: "Node.js is single-threaded" 
    }
  ],
  c: [
    { 
      question: "Which of the following is a correct variable declaration in C?", 
      options: ["int num;", "num int;", "integer num;"], 
      answer: "int num;" 
    },

    { 
      question: "Which keyword is used to define a constant in C?", 
      options: ["const", "static", "#define"], 
      answer: "#define" 
    },

    { 
      question: "What is the default return type of a function in C?", 
      options: ["void", "int", "float"], 
      answer: "int" 
    },

    { 
      question: "Which of the following is used for dynamic memory allocation in C?", 
      options: ["malloc()", "alloc()", "new"], 
      answer: "malloc()" 
    },

    { 
      question: "Which header file is required for input and output operations in C?", 
      options: ["stdio.h", "iostream", "conio.h"], 
      answer: "stdio.h" 
    },

    { 
      question: "What does the `sizeof` operator return?", 
      options: ["Size of a variable", "Memory address of a variable", "Value of a variable"], 
      answer: "Size of a variable" 
    },

    { 
      question: "Which data type is used to store a single character in C?", 
      options: ["char", "string", "character"], 
      answer: "char" 
    },

    { 
      question: "How do you write a comment in C?", 
      options: ["# This is a comment", "// This is a comment", "-- This is a comment"], 
      answer: "// This is a comment" 
    },

    { 
      question: "Which loop is guaranteed to execute at least once?", 
      options: ["for loop", "while loop", "do-while loop"], 
      answer: "do-while loop" 
    },

    { 
      question: "Which function is used to read a string in C?", 
      options: ["scanf()", "gets()", "input()"], 
      answer: "gets()" 
    }
  ],
  cpp: [
    { 
      question: "What is the extension of a C++ source file?", 
      options: [".c", ".cpp", ".h"], 
      answer: ".cpp" 
    },

    { 
      question: "Which feature in C++ allows functions to have the same name but different parameters?", 
      options: ["Encapsulation", "Polymorphism", "Function Overloading"], 
      answer: "Function Overloading" 
    },

    { 
      question: "Which access specifier allows members to be accessed only within the same class?", 
      options: ["public", "private", "protected"], 
      answer: "private" 
    },

    { 
      question: "What is an object in C++?", 
      options: ["An instance of a class", "A type of variable", "A function"], 
      answer: "An instance of a class" 
    },

    { 
      question: "Which operator is used for dynamic memory allocation in C++?", 
      options: ["malloc", "alloc", "new"], 
      answer: "new" 
    },

    { 
      question: "Which keyword is used to prevent a function from being overridden?", 
      options: ["const", "final", "static"], 
      answer: "final" 
    },

    { 
      question: "What is the purpose of the destructor in C++?", 
      options: ["Initialize an object", "Deallocate memory when an object is destroyed", "Overload functions"], 
      answer: "Deallocate memory when an object is destroyed" 
    },

    { 
      question: "Which standard library provides input and output functionality in C++?", 
      options: ["stdio.h", "iostream", "fstream"], 
      answer: "iostream" 
    },

    { 
      question: "What is the purpose of a virtual function in C++?", 
      options: ["To allow dynamic binding", "To prevent inheritance", "To allocate memory"], 
      answer: "To allow dynamic binding" 
    },

    { 
      question: "Which of the following is true about C++?", 
      options: ["C++ supports multiple inheritance", "C++ does not support classes", "C++ does not support functions"], 
      answer: "C++ supports multiple inheritance" 
    }
  ],
  aptitude: [
    { 
      question: "If a train is moving at 60 km/h, how long will it take to cover 120 km?", 
      options: ["1 hour", "2 hours", "3 hours"], 
      answer: "2 hours" 
    },

    { 
      question: "A person buys an item for ₹200 and sells it for ₹250. What is the profit percentage?", 
      options: ["10%", "20%", "25%"], 
      answer: "25%" 
    },

    { 
      question: "What is the next number in the sequence: 2, 6, 12, 20, __?", 
      options: ["28", "30", "32"], 
      answer: "30" 
    },

    { 
      question: "A shopkeeper gives 10% discount on an item. If the original price is ₹500, what is the final price?", 
      options: ["₹400", "₹450", "₹475"], 
      answer: "₹450" 
    },

    { 
      question: "A can complete a work in 10 days, and B can complete it in 20 days. In how many days can they complete the work together?", 
      options: ["5 days", "6.67 days", "7.5 days"], 
      answer: "6.67 days" 
    },

    { 
      question: "Find the missing number in the series: 3, 9, 27, 81, __?", 
      options: ["162", "243", "324"], 
      answer: "243" 
    },

    { 
      question: "If the price of an item increases by 20%, what is the new price of a ₹300 item?", 
      options: ["₹320", "₹340", "₹360"], 
      answer: "₹360" 
    },

    { 
      question: "A father is three times as old as his son. If the sum of their ages is 40, what is the son's age?", 
      options: ["10", "12", "14"], 
      answer: "10" 
    },

    { 
      question: "The average of 5 numbers is 25. If the sum of four numbers is 90, what is the fifth number?", 
      options: ["30", "35", "40"], 
      answer: "35" 
    },

    { 
      question: "If the radius of a circle is doubled, how does the area change?", 
      options: ["Doubles", "Triples", "Quadruples"], 
      answer: "Quadruples" 
    }
  ],
  logical: [
    { 
      question: "If all apples are fruits and some fruits are oranges, then which of the following is true?", 
      options: ["All apples are oranges", "Some apples are oranges", "No relation"], 
      answer: "No relation" 
    },

    { 
      question: "What comes next in the series: 2, 6, 12, 20, __?", 
      options: ["28", "30", "32"], 
      answer: "30" 
    },

    { 
      question: "If A is the brother of B, and B is the brother of C, then what is A to C?", 
      options: ["Father", "Brother", "Uncle"], 
      answer: "Brother" 
    },

    { 
      question: "Find the odd one out: Dog, Cat, Elephant, Potato", 
      options: ["Dog", "Cat", "Potato"], 
      answer: "Potato" 
    },

    { 
      question: "If MANGO is coded as 13114715, how is APPLE coded?", 
      options: ["1161612", "1161615", "1161616"], 
      answer: "1161612" 
    },

    { 
      question: "Which number should come next: 1, 3, 6, 10, 15, __?", 
      options: ["20", "21", "22"], 
      answer: "21" 
    },

    { 
      question: "Which shape is different: Circle, Triangle, Cube, Square?", 
      options: ["Circle", "Cube", "Square"], 
      answer: "Cube" 
    },

    { 
      question: "If 'PAPER' is coded as 'PAEPR', then 'APPLE' is coded as?", 
      options: ["APLPE", "APPEL", "AELPP"], 
      answer: "APLPE" 
    },

    { 
      question: "Which word does not belong to the group: Pen, Paper, Pencil, Shirt?", 
      options: ["Pen", "Paper", "Shirt"], 
      answer: "Shirt" 
    },

    { 
      question: "If in a certain code, 2468 is written as 'BDFH', then how is 1357 written?", 
      options: ["ACEG", "BDFH", "CDEF"], 
      answer: "ACEG" 
    },
  ],
  quantitative: [
    { 
      question: "If a car travels 120 km in 3 hours, what is its speed?", 
      options: ["30 km/h", "40 km/h", "50 km/h"], 
      answer: "40 km/h" 
    },

    { 
      question: "What is the next number in the sequence: 5, 10, 20, 40, __?", 
      options: ["60", "80", "100"], 
      answer: "80" 
    },

    { 
      question: "A shopkeeper marks an item at ₹500 and gives a 10% discount. What is the selling price?", 
      options: ["₹450", "₹460", "₹470"], 
      answer: "₹450" 
    },

    { 
      question: "The sum of two numbers is 30, and their difference is 10. What is the larger number?", 
      options: ["15", "20", "25"], 
      answer: "20" 
    },

    { 
      question: "If 4 workers complete a task in 10 days, how long will 2 workers take?", 
      options: ["20 days", "15 days", "25 days"], 
      answer: "20 days" 
    },

    { 
      question: "A father is twice as old as his son. The sum of their ages is 36. What is the son's age?", 
      options: ["10", "12", "14"], 
      answer: "12" 
    },

    { 
      question: "What is the square root of 144?", 
      options: ["10", "12", "14"], 
      answer: "12" 
    },

    { 
      question: "A train moving at 60 km/h crosses a 300m bridge in how many seconds?", 
      options: ["15 sec", "18 sec", "20 sec"], 
      answer: "18 sec" 
    },

    { 
      question: "What is 15% of 200?", 
      options: ["20", "30", "40"], 
      answer: "30" 
    },

    { 
      question: "If a number is divided by 7, the remainder is 3. What is the remainder when twice the number is divided by 7?", 
      options: ["1", "3", "6"], 
      answer: "6" 
    },
  ],
  verbal: [
    { 
      question: "Find the synonym of 'Generous'.", 
      options: ["Kind", "Cruel", "Selfish"], 
      answer: "Kind" 
    },

    { 
      question: "Find the antonym of 'Diligent'.", 
      options: ["Lazy", "Hardworking", "Smart"], 
      answer: "Lazy" 
    },

    { 
      question: "Identify the correctly spelled word.", 
      options: ["Recieve", "Receive", "Recieve"], 
      answer: "Receive" 
    },

    { 
      question: "Choose the correct sentence.", 
      options: ["He go to school", "He goes to school", "He going school"], 
      answer: "He goes to school" 
    },

    { 
      question: "What is the plural of 'Child'?", 
      options: ["Childs", "Children", "Childes"], 
      answer: "Children" 
    },

    { 
      question: "Fill in the blank: He __ to the market.", 
      options: ["go", "went", "gone"], 
      answer: "went" 
    },

    { 
      question: "Choose the correct indirect speech: She said, 'I am happy.'", 
      options: ["She said she was happy", "She said she is happy", "She said she will be happy"], 
      answer: "She said she was happy" 
    },

    { 
      question: "What is the opposite of 'Honest'?", 
      options: ["Truthful", "Dishonest", "Kind"], 
      answer: "Dishonest" 
    },

    { 
      question: "Identify the verb in the sentence: 'She sings beautifully.'", 
      options: ["She", "Sings", "Beautifully"], 
      answer: "Sings" 
    },

    { 
      question: "Choose the correctly punctuated sentence.", 
      options: ["Where are you?", "Where are you", "where are you."], 
      answer: "Where are you?" 
    },
  ],
};

const QuizPage = () => {

  useEffect(() => {
  document.documentElement.scrollTop = 0;
}, []);

  const { quizName } = useParams();
  const navigate = useNavigate();
  const questions = questionsData[quizName] || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentQuestion].answer;

    if (isCorrect) {
      setScore(score + 1);
      alert("✅ Correct Answer!");
    } else {
      alert("❌ Incorrect Answer. Try again!");
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Redirect to Score Page after last question
        navigate(
          `/score?quiz=${quizName}&score=${score + (isCorrect ? 1 : 0)}&total=${questions.length}`
        );
      }
    }, 1000);
  };

  return (
    <div className="quiz-container">
      {questions.length === 0 ? (
        <p>No questions available for this quiz.</p>
      ) : (
        <div className="quiz-card">
          <div className="quiz-header">
            <span>
              {currentQuestion + 1} of {questions.length}
            </span>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="quiz-content">
            <h2 className="quiz-question">{questions[currentQuestion].question}</h2>
            <div className="quiz-options">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`quiz-option ${
                    selectedAnswer === option
                      ? option === questions[currentQuestion].answer
                        ? "correct"
                        : "incorrect"
                      : ""
                  }`}
                  onClick={() => handleAnswerClick(option)}
                  disabled={selectedAnswer !== null}
                  aria-disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;