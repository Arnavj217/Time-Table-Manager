# 🧠 AI-Powered Academic Timetable Scheduler

An intelligent scheduling system that automates and optimizes academic planning using Artificial Intelligence and hybrid technology architecture. Whether it's assigning faculty, allocating classrooms/labs, or managing overlapping student batches, this solution brings speed, accuracy, and adaptability to educational institutions.

---

## 🎯 Objective

To develop a smart timetable generation system that handles complex scheduling constraints such as:

- Faculty availability
- Classroom and lab allocation
- Subject load distribution
- Batch-level requirements
- Time slot conflicts
- Custom rules and preferences

All while ensuring efficiency, flexibility, and ease of use through an intuitive web interface.

---

## 🚀 Key Features

- ✅ *Conflict-Free Scheduling*: Automatically avoids overlaps between rooms, teachers, and student groups.
- 🧠 *AI-Based Logic*: Utilizes constraint satisfaction and optimization algorithms to generate the most efficient schedule.
- 🔁 *Dynamic Input Handling*: Easily add/edit subjects, rooms, teachers, time slots, and student batches.
- 🌐 *Responsive Web UI*: Built with HTML/CSS/JS for a modern, mobile-friendly experience.
- ⚡ *Performance Optimization*: Leverages C++ for time-intensive calculations to ensure rapid scheduling even with large datasets.
- 📊 *Visualization*: Timetables are displayed in an organized, readable format for both students and faculty.
- 📦 *Modular Codebase*: Well-structured and scalable for future expansion (e.g., calendar sync, export to PDF/Excel, role-based login).

---

## 🧰 Tech Stack

| Component        | Technology                       |
|------------------|----------------------------------|
| Backend Logic    | Python (Flask / FastAPI)         |
| Scheduling Engine| C++ (with Python integration)    |
| Frontend         | HTML, CSS, JavaScript            |
| Styling          | Bootstrap / Custom CSS           |
| Data Storage     | SQLite / PostgreSQL (optional)   |
| Visualization    | Tables / Timetable Cards         |

---

## ⚙ How It Works

1. *User Input*:
   - Admin enters the data: subjects, teachers, rooms, labs, batches, time slots, and constraints.
   - Input is collected through a user-friendly web form.

2. *Backend Processing*:
   - Python backend receives and validates the input.
   - The data is passed to the C++ engine for optimization.

3. *AI Optimization*:
   - C++ engine performs conflict resolution and timetable generation using AI-based heuristics (e.g., Genetic Algorithm / Backtracking / Greedy).
   - The result is passed back to Python.

4. *Timetable Display*:
   - The finalized schedule is rendered on the frontend using tables/cards.
   - Users can view and download their personalized timetables.

---

## 📥 Website Link : https://aravj217.github.io/Time-Table-Manager/
