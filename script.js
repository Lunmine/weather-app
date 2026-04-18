let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");

    if (!input.value.trim()) return;

    tasks.push({ text: input.value, done: false });
    input.value = "";

    saveTasks();
    render();
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    render();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    render();
}

function render() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.done) li.classList.add("done");

        li.innerHTML = `
    <div class="left">
        <div class="box" onclick="toggleTask(${index})">
        ${task.done ? "✔" : ""}
        </div><span>${task.text}</span></div>

    <button onclick="deleteTask(${index})">✕</button>
    `;

        list.appendChild(li);
    });

    document.getElementById("counter").innerText =
        tasks.filter(t => !t.done).length + " tasks left";
}

render();