//inital data array. DO NOT EDIT OR REMOVE - Use these as the inital app state.
//This is the kind of data you would traditionally get from a data base.
//For now we are just going to mock it.
let initalTodos = [
    { id: 1, todo: "Buy milk.", complete: false, category: "Grocery" },
    { id: 1, todo: "Clean the cat box.", complete: false, category: "House" },
    { id: 1, todo: "Chips and salsa.", complete: false, category: "Grocery" },
    { id: 1, todo: "Finish Homework for DGM 3760", complete: false, category: "School" }
]

//Query Selectors //
const categoryList = document.querySelector('.category-list');
const categoryInput = document.querySelector('.category-input');
const todoInput = document.querySelector('.input-todo');
const todoList = document.querySelector('.todo-list');
const form = document.querySelector('form')
const submitBtn = document.querySelector('.submit-button');
const completedDiv = document.querySelector('.completed');
const completedList = document.querySelector('.completed-list');
const clearBtn = document.querySelector('.clearCompleted');




//Static Information//
let filteredGrocery = initalTodos.filter(todo => todo.category === "Grocery")
let filteredHouse = initalTodos.filter(todo => todo.category === "House")
let filteredSchool = initalTodos.filter(todo => todo.category === "School")
let allArray = [[...filteredGrocery], [...filteredHouse], [...filteredSchool]]

let data = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : allArray;
localStorage.setItem('todos', JSON.stringify(data))

console.log(data)
console.log(allArray)

//COMPLETED ARRAY//
let completed = localStorage.getItem('completed') ? JSON.parse(localStorage.getItem('completed')) : [];
localStorage.setItem('completed', JSON.stringify(completed))

//ONLOAD FUNCTION & CALLED ON SUBMIT
let categoryCheck = (formArray) => {

    // let data = [];

    if (formArray) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                if (data[i].includes(...formArray)) { break }
                if (data[i][j].category.toLowerCase() === formArray[0].category.toLowerCase()) {
                    data[i].push(...formArray);
                    localStorage.setItem('todos', JSON.stringify(data));
                }
            }
        }
        let categorized = [];
        data.forEach(arr => {
            let filtering = arr.filter(todo => todo.category.toLowerCase() === formArray[0].category.toLowerCase());
            if (filtering.length > 0) {
                categorized.push(filtering)
            }
        })
        console.log(categorized)
        if (categorized.length === 0) {
            data.push(formArray);
            localStorage.setItem('todos', JSON.stringify(data))
        }
    }

    let combinedCategories = data.map(arr => {
        if (arr.length > 0) {
            return createCategories(arr)
        }
    })

    categoryList.innerHTML = [...combinedCategories]
    return categoryList.innerHTML.replace(/,/g, '')
}
categoryCheck()






//Event Listeners//
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (todoInput.value.length === 0 || categoryInput.value.length === 0) {
        return alert('You need to fill out both inputs')
    } else {
        let formArray = initalTodos.filter(todo => todo.category.toLowerCase().includes(categoryInput.value.toLowerCase()))
        if (formArray.length > 0) {
            console.log('matches/push to existing category')
            let todo = {
                id: 1,
                todo: todoInput.value,
                complete: false,
                category: categoryInput.value
            }
            initalTodos.push(todo);
            // localStorage.setItem('todos', JSON.stringify(todo))
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
    }
})


clearBtn.addEventListener('click', event => {
    completed = [];
    localStorage.setItem('completed', JSON.stringify(completed))
    document.location.reload();
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
    <li class="todo" onClick="removeTodo(event)">
        <i class="fas fa-times-circle" id="circle-x"></i>
        ${todo.todo}
    </li>
    `).join('')
    return todoHTML
}

function removeTodo(event) {
    const indexOfElement = [...event.target.parentElement.children].indexOf(event.target)
    const indexOfParent = [...event.target.parentElement.parentElement.parentElement.children].indexOf(event.target.parentElement.parentElement);
    console.log(indexOfParent, 'parent')
    console.log(indexOfElement, 'child')

    for (let i = 0; i < data.length; i++) {
        if (data[i].length === 0) {
            let arrIndex = data.indexOf(data[i]);
            data.splice(arrIndex, 1);
            localStorage.setItem('todos', JSON.stringify(data))
            localStorage.setItem('completed', JSON.stringify(completed))
            break;
        } else { continue }
    }
    console.log(data)
    data[indexOfParent][indexOfElement].complete = true;
    completed.push(...data[indexOfParent].splice(indexOfElement, 1))
    localStorage.setItem('todos', JSON.stringify(data));
    localStorage.setItem('completed', JSON.stringify(completed))


    displayCompleted(completed)

    categoryCheck();
}

function displayCompleted(arr) {
    const li = arr.map(todo => `
        <li class="completed-todo">
            ${todo.todo}
        </li>
    `).join('')
    completedList.innerHTML = li
}
displayCompleted(completed)








//BELOW LIES CODE GRAVEYARD OF GOOD INTENTIONS BUT FAILED ATTEMPTS//


    

    // if (!formArray) {
    //     localStorage.setItem('todos', JSON.stringify(allArray));
    //     data.push(...JSON.parse(localStorage.getItem('todos')))
    // }

//     let itemsArray = localStorage.getItem('items')
//   ? JSON.parse(localStorage.getItem('items'))
//   : []

    // if (localStorage.getItem('todos')) {
    //     JSON.parse(localStorage.getItem('todos'));
    // } else {
    //     allArray = allArray;
    // }
    // console.log(allArray, 'after all the filtering')


    // let data = [];

    // if (!formArray) {
    //     if (localStorage.getItem('todos')) {
    //         data.push(...JSON.parse(localStorage.getItem('todos')))
    //     } else {
    //         localStorage.setItem('todos', JSON.stringify(allArray));
    //         data.push(...JSON.parse(localStorage.getItem('todos')))
    //     }
    // } else {
        
    // }

    // localStorage.setItem('todos', JSON.stringify(data))
    // console.log(data)


    // let data = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : allArray;


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



