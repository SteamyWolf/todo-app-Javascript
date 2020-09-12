//inital data array. DO NOT EDIT OR REMOVE - Use these as the inital app state.
//This is the kind of data you would traditionally get from a data base.
//For now we are just going to mock it.
let initalTodos = [
    {id: 1, todo: "Buy milk.", complete: false, category: "Grocery"},
    {id: 1, todo: "Clean the cat box.", complete: false, category: "House"},
    {id: 1, todo: "Chips and salsa.", complete: false, category: "Grocery"},
    {id: 1, todo: "Finish Homework for DGM 3760", complete: false, category: "School"}
]

//Query Selectors //
const categoryList = document.querySelector('.category-list');
const categoryInput = document.querySelector('.category-input');

const todoInput = document.querySelector('.input-todo');
const todoList = document.querySelector('.todo-list');

const submitBtn = document.querySelector('.submit-button');



//Static Information//
let categoryCheck = () => {

    let filteredGrocery = initalTodos.filter(todo => todo.category === "Grocery")
    console.log(filteredGrocery)

    let filteredHouse = initalTodos.filter(todo => todo.category === "House")
    console.log(filteredHouse)

    let filteredSchool = initalTodos.filter(todo => todo.category === "School")
    console.log(filteredSchool)

    let allArray = [[...filteredGrocery], [...filteredHouse], [...filteredSchool]]
    console.log(allArray)

    let combinedCategories = allArray.map(arr => createCategories(arr))
    console.log(combinedCategories)

    return categoryList.innerHTML = combinedCategories
}
categoryCheck()





//Event Listeners//
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    let filtered = initalTodos.filter(todo => todo.category.includes(categoryInput.value))
    console.log(filtered)

    if (filtered.length > 0) {
        console.log('matches/push to existing category')
        let todo = {
            id: 1,
            todo: todoInput.value,
            complete: false,
            category: categoryInput.value
        }
        initalTodos.push(todo)
        categoryCheck()
        return console.log(initalTodos)

    } else {
        console.log('doesnt match/create a new category')


    }
})




//Functionality//
function createCategories(arr) {
    const categoryHTML = `
        <div class="single-category">
            <h2>${arr[0].category}</h2>
            <ul class="todo-list">
                ${createTodo(arr)}
            </ul>
        </div>
    `
   return [...categoryHTML].join('')
}

function createTodo(arr) {
    const todoHTML = arr.map(todo => `
    <li class="todo">${todo.todo}</li>
    `).join('')
    return todoHTML
}















// let initalTodosCheck = () => {
   
//     initalTodos.forEach(todo => categoryCheck(todo))

//     console.log(filtered)

//     

// }
// initalTodosCheck()







   
    // (filtered.forEach(todo => todo.category.includes(passedInTodo.category)))

    // if (filtered.length === 0) {
    //     console.log('skipped');
    // } else  {
    //     console.log('seen')
    //     filtered.push(initalTodos.filter(todo => todo.category === passedInTodo.category))
    // }






// const input = document.querySelector('.input-todo');
// const submitBtn = document.querySelector('.submit-button');
// const todoList = document.querySelector('.todo-list');



// //Static Information//REAL
// const sortInCategories = () => {
//     let todos = initalTodos.map((todo) => {
//         if (todo.category === 'Grocery') {
//             let grocery = `
                
//             `
//         }
//     })
// }




// //Displayed in test form
// const displayTodos = () => {
//     let todos = initalTodos
//         .map(
//             (todo) => `
//                 <div class="todo">
//                     <li>${todo.todo}</li>
//                 </div>
//                 `
//             ).join('')
//         todoList.innerHTML = todos
// }
// displayTodos();



// //Event Listeners//
// submitBtn.addEventListener('click', addTodo)
// submitBtn.addEventListener('submit', addTodo)



// //Functionality//
// function addCategory(event) {
    
// }









// function addTodo(event) {
//     event.preventDefault();
//     if (input.value === '') return

//     //TODO DIV
//     let todoDiv = document.createElement('div')
//     todoDiv.classList.add('todo')

//     //TODO LI
//     let todoLi = document.createElement('li')
//     todoLi.textContent = `${input.value}`

//     //APPEND IT TO THE DIV
//     todoDiv.appendChild(todoLi)

//     //APPEND IT TO THE UL
//     todoList.appendChild(todoDiv)
// }



