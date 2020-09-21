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
const form = document.querySelector('form')
const submitBtn = document.querySelector('.submit-button');





//Static Information//
let filteredGrocery = initalTodos.filter(todo => todo.category === "Grocery")
    // allArray.push(filteredGrocery)

let filteredHouse = initalTodos.filter(todo => todo.category === "House")
    // allArray.push(filteredHouse)

let filteredSchool = initalTodos.filter(todo => todo.category === "School")
    // allArray.push(filteredSchool)

let allArray = [[...filteredGrocery], [...filteredHouse], [...filteredSchool]] //add newlyCreated here manually?
    // console.log(allArray, 'allArray1')


let newlyCreated = []


let categoryCheck = (formArray) => { //[[{todo}]]

    // let arr = initalTodos.filter(todo => todo.todo === null)
    // arr.forEach


    if (formArray) {
        for (let i = 0; i < allArray.length; i++) {
            for (let j = 0; j < allArray[i].length; j++) {
                if (allArray[i].includes(...formArray)) { break }
                if (allArray[i][j].category === formArray[0].category) {
                    console.log('first if statement');
                    allArray[i].push(...formArray)
                } else {
                    console.log('did not include')
                }
            }
        }
        let categorized = [];
        allArray.forEach(arr => {
            let filtering = arr.filter(todo => todo.category === formArray[0].category);
            if (filtering.length > 0) {
                categorized.push(filtering)
            }
        })
        console.log(categorized)
        if (categorized.length === 0) {
            allArray.push(formArray)
        }
    }
    

    // if (formArray) { 
    //     for (let i = 0; i < allArray.length; i++) {
    //         let nestedLength = allArray[i].length
    //         for (let j = 0; j < nestedLength; j++) {
    //             if (allArray[i][j].category.includes(formArray[0].category)) {
    //                 console.log('if statement 1')
    //                 allArray[i].push(...formArray)
    //                 // return allArray
    //             } else if (newlyCreated.length > 0) {
    //                 for (let n = 0; n < newlyCreated.length; n++) {
    //                     let moreNested = newlyCreated[i].length;
    //                     // if (moreNested)
    //                     for (let p = 0; p < moreNested; p++) {
    //                         if (newlyCreated[n][p].category.includes(formArray[0].category)) {
    //                             console.log('if statement 2')
    //                             return newlyCreated[n].push(formArray)
    //                         } else {
    //                             console.log('else statement 1', newlyCreated)
    //                             newlyCreated.push(formArray)
    //                             allArray.push(...newlyCreated)
    //                         }
    //                         break;
    //                     }
    //                     break;
    //                 }
                    
    //             } else {
    //                 console.log('else statement 2', newlyCreated)
    //                 newlyCreated.push(formArray)
    //                 allArray.push(...newlyCreated)
    //             }
    //             break;
    //         }
    //         break;
    //     }
        
    // }
    
    console.log(allArray, 'after all')
    

    let combinedCategories = allArray.map(arr => createCategories(arr))
    // console.log(combinedCategories)


    // combinedCategories.push(newlyCreated)


categoryList.innerHTML = [...combinedCategories]
}
categoryCheck()






//Event Listeners//
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

   
    let formArray = initalTodos.filter(todo => todo.category.includes(categoryInput.value))
    // console.log(filtered)

    if (formArray.length > 0) {
        console.log('matches/push to existing category')
        let todo = {
            id: 1,
            todo: todoInput.value,
            complete: false,
            category: categoryInput.value
        }
        initalTodos.push(todo);
        let createdArray = [];
        createdArray.push(todo)
        categoryCheck(createdArray)
        form.reset()

    } else {
        console.log('doesnt match/create a new category')
        let newTodo = {
            id: 2,
            todo: todoInput.value,
            complete: false,
            category: categoryInput.value
        }
        initalTodos.push(newTodo)
        let createdArray = [];
        createdArray.push(newTodo)
        categoryCheck(createdArray)
        form.reset()


    }
})

const todoText = document.querySelector('.todo');

todoText.addEventListener('click', (event) => {
    console.log('clicked', event)
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








//BELOW LIES CODE GRAVEYARD OF GOOD INTENTIONS BUT FAILED ATTEMPTS//

 // let todo = {
    //     id: 1,
    //     todo: todoInput.nodeValue,
    //     complete: false,
    //     category: categoryInput.value
    // }
    // initalTodos.push(todo);
    // categoryCheck(todo);
    // form.reset();


// let includesArray = []
    // let doesNotIncludeArray = [];

    // if (todo) {
    //     for (let i = 0; i < initalTodos.length; i++) {
    //         if (initalTodos[i].category.includes(todo.category)) {
    //             console.log('includes it')
    //             includesArray.push(initalTodos[i])
    //         } else {
    //             console.log('it does not include it')
    //             doesNotIncludeArray.push(initalTodos[i])
    //         }
    //     }
    // }

    // console.log(includesArray)
    // console.log(doesNotIncludeArray)


    // let testArray = []
    // for (let i = 0; i < initalTodos.length; i++) {
    //     for (let j = 0; j < initalTodos.length; i++) {
    //         if (initalTodos[i].category === initalTodos[j].category) {
    //             testArray.push(initalTodos[i])
    //         } else {
    //             console.log('jh')
    //         }
    //     }
    // }
    // console.log(testArray)

    // let creation = createCategories(includesArray)

    // return categoryList.innerHTML = [...creation]





    

    // if (filtered) {
    //     for (let i = 0; i < filtered.length; i++) {
    //         if (filtered[0].category.includes(initalTodos[i].category)) {
    //             initalTodos.push(filtered[0])
    //         } else {
    //             let newCategory = createCategories(filtered)
    //             newlyCreated.push(newCategory)
    //         }
    //     }
    // }
    // console.log(newlyCreated)



// let arrayOfCategories = [];
//     let filteredArray = []

//     for (let i = 0; i < initalTodos.length; i++) {
//         arrayOfCategories.push(initalTodos[i])
//         if (filtered) {
//             filteredArray.push(filtered[i])
//         }
//         if (filteredArray) {
//             if (arrayOfCategories[i].category.includes(filteredArray[i].category)) {
//                 arrayOfCategories.filter
//             }
//         }
//     }
//     console.log(arrayOfCategories)






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



