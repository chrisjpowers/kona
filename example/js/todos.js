var todoList, todoForm, deleteButton, pagination, settingsForm, addTodo, allTodos, settings, todoView;
$(function() {
  todoList = $("#todo-list"),
  todoForm = $("#todo-form"),
  deleteButton = $("#done-button"),
  pagination = $("#pagination"),
  settingsForm = $("#settings-form"),
  addTodo = $("#add-todo"),
  allTodos = kona([
    {name: "Do the Wash", priority: "medium"},
    {name: "Walk the Dog", priority: "medium"},
    {name: "Work Out", priority: "low"},
    {name: "Do Stuff", priority: "low"},
    {name: "Do Laundry", priority: "low"},
    {name: "Feed the Cats", priority: "low"},
    {name: "Book Travel Plans", priority: "low"},
    {name: "File Taxes", priority: "high"}
  ]),
  settings = kona({
    doneButtonText: "Done, Remove From List",
    todosPerPage: 4
  }),
  todoView = allTodos.view({limit: settings.todosPerPage()});
  
  todoList.kona("bind", todoView, {
    content: function(todo) {
      return todo.name() + " (" + todo.priority() + ")";
    }
  });

  todoList.delegate("li", "click", function(e) {
    var todo = $(this).kona("binded");
    todoForm.kona("bind", todo);
  });

  deleteButton.click(function(e) {
    e.preventDefault();
    var todo = todoForm.kona("binded");
    allTodos.remove(todo);
    todoForm.find(":input").val("");
  })
  .kona("bind", "text", settings.doneButtonText);

  addTodo.click(function(e) {
    e.preventDefault();
    var newTodo = kona({name: "New Todo", priority: "low"});
    allTodos.insert(newTodo, 0);
    todoForm.kona("bind", newTodo);
  });

  settingsForm.kona("bind", settings);

  pagination.kona("paginator", todoView);

  allTodos.bind("added", function(e, newObject) {
    todoView.update({page: 1});
  });

  settings.bind("changed", function(e, attr, newVal, oldVal) {
    if(attr === "todosPerPage") {
      todoView.update({limit: parseInt(newVal, 10)});
    }
  });
});
