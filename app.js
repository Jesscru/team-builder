const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let team = [];


// prompt for manager
const addManager = () => {
  inquirer.prompt([
     
    {
      type: 'input',
      name: 'name',
      message: 'What is the employee\'s name?',
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is the employee\'s id number?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is the employee\'s email adress?',
    },

    {
      type: 'input',
      name: 'officeNumber',
      message: 'What is the manager\'s office number?',
    }

    ]).then(data => {
      createTeam();
      // if (data.role === 'Manager'){
        const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
        team.push(manager);
       
      // }
    })
  }


   // prompt for Engineer
    const addEngineer = () => {
    inquirer.prompt([
        
      {
        type: 'input',
        name: 'name',
        message: 'What is the employee\'s name?',
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the employee\'s id number?',
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the employee\'s email adress?',
      },
    
      {
        type: 'input',
        name: 'github',
        message: 'What is the engineer\s github username?',
      }
      
      ]).then(data => {
        createTeam();
        // if (data.role === 'Engineer'){
          const engineer = new Engineer(data.name, data.id, data.email, data.school);
          team.push(engineer);
        // }
      })
    }


    // prompt for intern
    const addIntern = () => {
    inquirer.prompt([
      
      {
        type: 'input',
        name: 'name',
        message: 'What is the employee\'s name?',
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the employee\'s id number?',
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the employee\'s email adress?',
      },
    
      {
        type: 'input',
        name: 'school',
        message: 'What school did the intern attend?',
      }

      ]).then(data => {
        createTeam();
          const intern = new Intern(data.name, data.id, data.email, data.school);
          team.push(intern);
      })
    }
   
  // after manager, asks what other employee is to be made. Leaves function if none, starts other prompts if intern or engineer
      function createTeam() {
        inquirer.prompt([
          {
            type: "checkbox",
            name: "role",
            message: "Which type of team member would you like to add?",
            choices: [
              "Engineer",
              "Intern",
              "I don't want to add any more team members"
            ]
          }
        ]).then(data => {
          if (data.role === "Engineer") {
            addEngineer();
          } else if (data.role === "Intern") { 
            addIntern();
           } else {
            buildTeam();
          }
        });
      }
    

  addManager();

  function buildTeam(){
    if (!fs.existsSync(OUTPUT_DIR)){
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(team));
  }


 
  // .then(buildTeam())
  // .catch((err) => console.error(err));





 




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
