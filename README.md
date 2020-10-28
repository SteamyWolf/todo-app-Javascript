# Todo App - Wyatt

## How to get it running on your machine
To visit the actual site go to: https://wyatt-todo-app.netlify.app/.

Run locally on your machine by downloading the code from gitHub and starting the node server with npm start. This will start nodemon manager with the localHost port 3000. 

## API DataBase
The server is running mongoose which uses data from MongoDB. There are no endpoints that you will need to manually hit since these endpoints are automatically hit while using the app.

But there are 2 endpoints you will automatically be using:
- https://todo-app-wyatt.herokuapp.com/initialTodos
- https://todo-app-wyatt.herokuapp.com/addedTodos

The first is to GET, POST, and DELETE todos from the database.
The second is to POST and DELETE the completed todos from the database.

## Architecture
This app took me for a ride. Lets get into some of the architecture to show how this app creates a todo in the correct category:

### Main Function
My main function that is called when the app loads is the 
```javascript
    categoryCheck()
```
function. This function is only called when
```javascript
    async function getinitalTodos() {
    const response = await fetch('https://todo-app-wyatt.herokuapp.com/initialTodos', {
        headers: { 'Access-Control-Allow-Orgin': 'Content-Type', 'Content-Type': 'application/json' },
    });
    const todos = await response.json();
    return todos;
}
```
this function is called. Using the async await, I can make it so that the Javascript will not continue on loading unless the data has been received. This may take a few seconds to load upon first initialization of the app.

```javascript
getinitalTodos().then(todos => {
    const formatedTodos = formatTodos(todos);
    localData = formatedTodos;
    categoryCheck('', formatedTodos);
});
```

Notice how categoryCheck() takes in those formatedTodos as the main data throughout the app. 

### Understanding categoryCheck()
This is a complicated function to understand and to understand it, first we need to create a new todo in the correct category with the click event listener:

```javascript
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
        // localData.push(todo);
        let createdArray = [];
        createdArray.push(todo)
        categoryCheck(createdArray, localData)
        form.reset()
    }
}
)
```
This function is called when the user submits the form. Notice how categoryCheck() is called again but this time it is passed the newly created array with the localData stored upon initialization.

*So we know that categoryCheck() is called on initialization with an empty array as its first paramater and the database data as the second. And it is also called when the user submits the form. categoryCheck() will do 2 different things: one for the first initialization data and one for every form submission. Let's break it down.

```javascript
function categoryCheck(formArray, data) {
    if (formArray) {
        //WHEN THE USER ADDS A NEW TODO W/ CATEGORY THIS HAPPENS:
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                if (data[i].includes(...formArray)) { break }
                if (data[i][j].category.toLowerCase() === formArray[0].category.toLowerCase()) {
                    data[i].push(...formArray);
                    fetch('https://todo-app-wyatt.herokuapp.com/initialTodos', {
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
            fetch('https://todo-app-wyatt.herokuapp.com/initialTodos', {
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
```
Look at the comments in the function above. Notice how the first things that happens is the check on the formArray. If it is true, meaning that the user has submitted the form, then the function will proceed to push that newly created category and todo onto the correct category array. If it is not true, upon initialization, then the function will create the combinedCategories arrays and change the HTML with those generated lists. 

### RemoveTodo
This was a touch function as well. Just finding the index of the todo selected proved to be very hard in itself. Take a look at what was required to find the specific index:
```javascript
const indexOfElement = [...event.target.parentElement.children].indexOf(event.target)
    const indexOfParent = [...event.target.parentElement.parentElement.parentElement.children].indexOf(event.target.parentElement.parentElement);
```
That's a lot of parentElements. Once that was found correctly I proceeded to splice off that index and push it to an array called completed that shows up on a list of completed todos like so:
```javascript
let completedTodo = localData[indexOfParent].splice(indexOfElement, 1)
    completed.push(...completedTodo);
```
I also checked to make sure there were no empty arrays laying around after a user deleted all of the todos within it:
```javascript
for (let i = 0; i < localData.length; i++) {
        if (localData[i].length === 0) {
            let arrIndex = localData.indexOf(localData[i]);
            localData.splice(arrIndex, 1);
            // localStorage.setItem('todos', JSON.stringify(data))
            // localStorage.setItem('completed', JSON.stringify(completed))
            break;
        } else { continue }
    }
```
At the end of the function I call categoryCheck again to change the UI.
```javascript
    categoryCheck('', localData);
```



