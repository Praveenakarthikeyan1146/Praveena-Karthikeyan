const form = document.getElementById("habit-form");
const input = document.getElementById("habit-input");
const list = document.getElementById("habit-list");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Load saved habits on page load
window.addEventListener("DOMContentLoaded", () => {
  habits.forEach(habit => {
    createHabitElement(habit.text, habit.checked);
  });
});

// Form submit handler
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const habitText = input.value.trim();
  if (habitText === "") return;

  habits.push({ text: habitText, checked: false });
  saveHabits();
  createHabitElement(habitText, false);
  input.value = "";
});

// Save habits to localStorage
function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

// Create a new habit element
function createHabitElement(text, checked) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");

  span.textContent = checked ?  '${text}✅' : text;
  deleteBtn.textContent = "❌";
  deleteBtn.title = "Delete habit";

  if (checked) li.classList.add("checked");

  // Toggle habit completed
  span.addEventListener("click", () => {
    const index = habits.findIndex(h => h.text === text);
    if (index !== -1) {
      habits[index].checked = !habits[index].checked;
      saveHabits();
      span.textContent = habits[index].checked ? '${text}✅' : text;
      li.classList.toggle("checked");
    }
  });

  // Delete habit
  deleteBtn.addEventListener("click", () => {
    const index = habits.findIndex(h => h.text === text);
    if (index !== -1) {
      habits.splice(index, 1);
      saveHabits();
      li.remove();
    }
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}