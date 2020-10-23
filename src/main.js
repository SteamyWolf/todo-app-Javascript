
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
// const todo = document.querySelector('.todo');


// const fetchTodos = async () => {
//     fetch('http://localhost:3000/addedTodos', {
//         method: 'GET'
//     })
//         .then((response) => {
//             return response.json()
//         })
//         .then((todos) => {
//             let initalTodos = todos.map(todo => {
//                 return {
//                     id: todo.id,
//                     todo: todo.todo,
//                     complete: todo.complete,
//                     category: todo.category
//                 }
//             })
//         })
// }
// fetchTodos();

// categoryCheck()

let localData;

async function getinitalTodos() {
    const response = await fetch('http://localhost:3000/initialTodos');
    const todos = await response.json();
    return todos.map(todo => {
        return {
            id: todo.id,
            todo: todo.todo,
            complete: todo.complete,
            category: todo.category
        }
    });
}

getinitalTodos().then(todos => {
    const formatedTodos = formatTodos(todos);
    localData = formatedTodos;
    categoryCheck('', formatedTodos);
});

function formatTodos(initalTodos) {
    let finalArray = [];
    //find unique categories and put them in an array
    let categories = [...new Set(initalTodos.map(todo => todo.category))]
    for (let i = 0; i < categories.length; i++) {
        //push an empty array to push into the finalArray array
        const currentArray = []
        //this gets all the todos for the current category
        const currentCatTodos = initalTodos.filter(todo => {
            return todo.category == categories[i]
        })
        //loop over all the todos for the current category and push them into the currentarray
        currentCatTodos.forEach(todo => {
            currentArray.push(todo)
        })
        //push the current array into the final array
        finalArray.push(currentArray)
    }
    return finalArray;
}


//SAVE---------------------------------------------------------------------------------------------------------------------------------------------------------------
// let data = initalTodos.map(todo => [todo]);




// let data = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : allArray;
// localStorage.setItem('todos', JSON.stringify(data))

//COMPLETED ARRAY//
// let completed = localStorage.getItem('completed') ? JSON.parse(localStorage.getItem('completed')) : [];
// localStorage.setItem('completed', JSON.stringify(completed))
let completed = [];

//ONLOAD FUNCTION & CALLED ON SUBMIT
function categoryCheck(formArray, data) {
    if (formArray) {
        //WHEN THE USER ADDS A NEW TODO W/ CATEGORY THIS HAPPENS:
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                if (data[i].includes(...formArray)) { break }
                if (data[i][j].category.toLowerCase() === formArray[0].category.toLowerCase()) {
                    data[i].push(...formArray);
                    // localStorage.setItem('todos', JSON.stringify(data));
                    console.log({ ...formArray })
                    fetch('http://localhost:3000/initialTodos', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(...formArray)
                    })
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
            // localStorage.setItem('todos', JSON.stringify(data))
            fetch('http://localhost:3000/initialTodos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(...formArray)
            })
        }
    }

    //WHEN THE APP FIRST STARTS THIS HAPPENS:
    let combinedCategories = data.map(arr => {
        if (arr.length > 0) {
            return createCategories(arr)
        }
    })

    categoryList.innerHTML = [...combinedCategories]
    return categoryList.innerHTML.replace(/,/g, '')
}
// categoryCheck('', data)






//Event Listeners//
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (todoInput.value.length === 0 || categoryInput.value.length === 0) {
        return alert('You need to fill out both inputs')
    } else {
        let todo = {
            id: 1,
            todo: todoInput.value,
            complete: false,
            category: categoryInput.value
        }
        // initalTodos.push(todo);
        let createdArray = [];
        createdArray.push(todo)
        categoryCheck(createdArray, localData)
        form.reset()
    }
}
)

//Clear Button
clearBtn.addEventListener('click', event => {
    completed = [];
    // localStorage.setItem('completed', JSON.stringify(completed))
    document.location.reload();
});



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
            <li class="todo" onclick="removeTodo(event)">
                <i class="fas fa-times-circle" id="circle-x"></i>
                ${todo.todo}
            </li>
            `).join('')
    return todoHTML
}

function removeTodo(event) {
    const indexOfElement = [...event.target.parentElement.children].indexOf(event.target)
    const indexOfParent = [...event.target.parentElement.parentElement.parentElement.children].indexOf(event.target.parentElement.parentElement);
    for (let i = 0; i < localData.length; i++) {
        if (localData[i].length === 0) {
            let arrIndex = localData.indexOf(localData[i]);
            localData.splice(arrIndex, 1);
            // localStorage.setItem('todos', JSON.stringify(data))
            // localStorage.setItem('completed', JSON.stringify(completed))
            break;
        } else { continue }
    }
    localData[indexOfParent][indexOfElement].complete = true;
    completed.push(...localData[indexOfParent].splice(indexOfElement, 1))
    // localStorage.setItem('todos', JSON.stringify(data));
    // localStorage.setItem('completed', JSON.stringify(completed))
    fetch('http://localhost:3000/addedTodos', {
        method: 'DELETE'
    })
    displayCompleted(completed)
    categoryCheck('', localData);
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

// let initialFiltering = initalTodos.map(todo => [todo]);

//     let filtered = [];
//     for (let arr in initalTodos) {
//         for (let filter in initialFiltering) {
//             if (!initialFiltering[arr][filter]) { break }
//             if (initalTodos[arr].category == initialFiltering[arr][filter].category) {
//                 let takenOut = initialFiltering[arr].filter(filter => filter.category === initalTodos[arr].category)
//                 if (filtered[0]) {
//                     for (let deep in filtered) {
//                         if (takenOut[0].category === filtered[deep].category) {
//                             filtered[deep].push(...takenOut)
//                         } else if (filtered[deep].includes(takenOut[0])) { break }
//                         else { filtered.push(takenOut) }
//                     }
//                 } else {
//                     filtered.push(takenOut)
//                 }
//             }
//         }
//     }

//     return filtered;


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