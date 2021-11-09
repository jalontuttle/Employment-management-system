const inquirer = require('inquirer');
const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL Username
      user:process.env.DB_USER,
      // TODO: Add MySQL Password
      password: process.env.DB_PASS,
      database: process.env.DB_HOST,
      port: 3306
    },
    console.log(`Connected to the employer_db database.`)
);

db.connect(err => {
    if(err) throw err;
    console.log('connected');
    menu()
})

function menu() {
inquirer
    .prompt([
        {
            name: 'init',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Add Employee', 'Update Employee Role', 'View All Employees', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
        },
    ])
    .then((answers) => {
        console.log(answers);
        if(answers.init === 'Add Employee') {
            addEmployee();
        }else if (answers.init === 'View All Departments') {
            viewDept();
        }else if(answers.init === 'Add Department') {
            addDept();
        }else if (answers.init === 'Add Role') {
            addRole();
        }else if(answers.init === 'View All Employees') {
            viewEmplyees();
        }else if (answers.init === 'Update Employee Role') {
            updateRole();
        } else {
        }
    })
}

function addEmployee() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'firstName',
        message: 'What is the associates first name?',
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'What is the associates last name?',    
    },
    {
        type: 'input',
        name: 'role',
        message: 'What is the associates role?',  
    },
    {
        type: 'input',
        name: 'manager',
        message: 'Who is the associates manager?', 
    },
    ])
    .then((answers) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.firstName}', '${answers.lastName}', ${answers.role}, ${answers.manager})`), (err) => {
            if (err) throw err;
            console.log('New associate added');
            menu();
        }
    })
}

function viewDept() {
    db.query('SELECT * FROM department', (err, data) => {
          if(err) throw err;
          console.table(data);
          menu();
    })
 }
 
 function addDept() {
     inquirer.prompt({
         type: 'input',
         name: 'newDept',
         message: 'What new department would you like to add?',
     })
     .then((answers) => {
         db.query(`INSERT INTO department (name) VALUES ('${answers.newDept}')`), (err) => {
             if (err) throw err;
             console.log('New department created');
             menu();
         }
     }) 
 }
 
 function addRole() {
     inquirer.prompt([
     {
         type: 'input',
         name: 'newRole',
         message: 'What new Role would you like to add?',
     },
     {
         type: 'input',
         name: 'salary',
         message: 'What is the salary for this role?',
     },
     {
         type: 'input',
         name: 'department',
         message: 'What department does this role belong to?',
     },
     ])
     .then((answers) => {
         db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.newRole}', ${answers.salary}, ${answers.department})`), (err) => {
             if (err) throw err;
             console.log('New Role created');
             menu();
         }
     }) 
 }
 
 function viewEmplyees() {
     db.query('SELECT * FROM employee', (err, data) => {
         if(err) throw err;
         console.table(data);
         menu();
   })
 }
 
 function updateRole() {
 
 }