(function() {

    function createAppTitle(title){
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm(){
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList(){
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem({name, id, done = false}) { 
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name; 

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            id,
            name,
            done,
            doneButton,
            deleteButton,
        };
    }

    function generateId(itemsList){
        let maxId = 0;
        for (let item of itemsList){
            if (item.id >= maxId){
                maxId = item.id + 1;
            }
        }
        return maxId === 0 ? 0 : maxId
    }

    function dataToJson(data){
        return JSON.stringify(data);
    }

    function jsonToData(data){
        return JSON.parse(data);
    }

    function getListData(listName){
        return jsonToData(localStorage.getItem(listName));
    }

    function setListData(listName, data){
        localStorage.setItem(listName, dataToJson(data));
    }

    function createTodoApp(container, title = 'Список дел', listName){
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        let todoItemsList = [];
        let startLocalStorage = getListData(listName)

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        todoItemForm.button.disabled = "true";
        todoItemForm.input.addEventListener("input", function () {
            todoItemForm.button.disabled = !todoItemForm.input.value
                ? true
                : false;
        });

        if (!(startLocalStorage === null || startLocalStorage.length === 0)){
            todoItemsList = startLocalStorage;

            for (let item of todoItemsList){
                let todoItem = createTodoItem({
                    name: item.name,
                    id: item.id,
                    done: item.done,
                })

                todoItem.doneButton.addEventListener('click', function(){
                    todoItem.item.classList.toggle("list-group-item-success");
                    for (let item of todoItemsList){
                        if (item.id === todoItem.id){
                            todoItem.done = todoItem.done ? false : true;
                            item.done = todoItem.done;
                            setListData(listName, todoItemsList);
                            break
                        }
                    }
                });
                todoItem.deleteButton.addEventListener('click', function(){
                    let needDel = false;

                    if (confirm("Вы уверены?")) {
                        needDel = true;
                    }

                    if (needDel) {
                        todoItem.item.remove();
                        for (let item of todoItemsList) {
                            if (item.id === todoItem.id) {
                                todoItemsList.splice(todoItemsList.indexOf(item),1);
                                break;
                            }
                        }
                        setListData(listName, todoItemsList);
                    }
                });
                todoList.append(todoItem.item);
            }
        }

        todoItemForm.form.addEventListener('submit', function(e){
            e.preventDefault();
            if (!todoItemForm.input.value.trim()){
                return;
            };
            
            let todoItem = createTodoItem({name: todoItemForm.input.value, id: generateId(todoItemsList)}); 
                        todoItem.doneButton.addEventListener('click', function(){
                todoItem.item.classList.toggle('list-group-item-success');
                for (let item of todoItemsList){
                    if (item.id === todoItem.id){
                        todoItem.done = todoItem.done ? false : true;
                        item.done = todoItem.done;
                        setListData(listName, todoItemsList);
                        break; 
                    }
                }
            });



            todoItem.deleteButton.addEventListener('click', function(){
                let needDel = false;
                if (confirm('Вы уверены?')){
                    needDel = true;
                }
                if (needDel){
                    todoItem.item.remove();
                    for(let item of todoItemsList){
                        if (item.id === todoItem.id){
                            todoItemsList.splice(
                                todoItemsList.indexOf(item), 1
                            );
                            break;
                        }
                    }
                    setListData(listName, todoItemsList);
                }
            });
                
            todoList.append(todoItem.item);
            todoItemsList.push({
                id: todoItem.id,
                name: todoItem.name,
                done: todoItem.done,
            });

            todoItemForm.input.value = '';

            setListData(listName, todoItemsList);
        });
    }

    window.createTodoApp = createTodoApp;
})();

