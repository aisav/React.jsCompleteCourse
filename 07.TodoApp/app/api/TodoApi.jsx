var $ = require('jquery');

module.exports = {
    setTodos: function (todos) {
        if($.inArray(todos)){
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        return todos; //same argument

    },
    getTodos: function () {
        var todosString = localStorage.getItem('todos');
        var todos;

        try {
            todos = JSON.parse(todosString);
        }
        catch(e) {

        }
        return $.isArray(todos) ? todos: [];
    }
}