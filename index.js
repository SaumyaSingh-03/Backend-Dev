import registerUser from "./registerUser.js"; 
import loginUser from "./loginUser.js";
import createTodo from "./createTodo.js";
import del from "./del.js";
console.log(registerUser("Saumya", "saumya03@gmail.com", "123d"))
console.log(loginUser("saumya03@gmail.com", "123d"));
console.log(createTodo("Saumya", "todo", false));
console.log(del("Saumya"));