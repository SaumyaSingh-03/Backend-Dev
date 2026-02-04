import fs from "fs";
function loginUser(email, password) {
    try {
        if (!fs.existsSync("todo.json")) {
            return "No users found. Please register first.";
        }
        const users = JSON.parse(fs.readFileSync("todo.json", "utf-8"));

        const user = users.find(
            (u) => u.email === email && u.password === password);

        if (!user) {
            return "Invalid email or password";
        }
        return "Login successful";

    } catch (error) {
        return `Error: ${error.message}`;
    }
}
export default loginUser