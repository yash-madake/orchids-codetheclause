# Sushruta - Senior Care Companion

Sushruta is a comprehensive role-based senior care application designed to bridge the gap between seniors, doctors, and caretakers. It provides a secure, accessible, and feature-rich platform for health monitoring, medication management, and emergency assistance.

## 🚀 Features

### 🔐 Role-Based Access Control
- **Senior**: Personal dashboard for health tracking, medication reminders, and wellness.
- **Doctor**: Patient management, medical history review, and prescription oversight (requires Senior ID).
- **Caretaker**: Daily routine monitoring, task management, and activity logging (requires Senior ID).

### 🏥 Key Functionalities
- **Health Dashboard**: Real-time tracking of Steps, Heart Rate, BP, and Sleep.
- **Medication Tracker**: Daily schedule, reminders, and inventory management.
- **AI Assistant**: "Sushruta Assistant" chatbot for health queries and companionship (powered by Ollama/Qwen).
- **Emergency SOS**: One-tap alert system for immediate assistance.
- **Reports & Documents**: Secure storage for medical reports and prescriptions.
- **Appointments**: Scheduling and reminders for doctor visits.
- **Wellness**: Yoga videos, meditation guides, and emotional well-being resources.

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4, Recharts/Chart.js
- **Backend**: Python (Flask) for AI Chatbot API
- **AI Model**: Ollama (Qwen/Llama) for local inference
- **Data**: LocalStorage (with MockBackend simulation)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- [Ollama](https://ollama.com/) (for the AI Chatbot)

### 1. Frontend Setup
```bash
# Install dependencies
npm install

# Start the Development Server
npm run dev
```
The application will be available at `http://localhost:5173`.

### 2. Backend Setup (AI Chatbot)
The AI Chatbot requires a Python backend and a running Ollama instance.

#### A. Install Python Dependencies
```bash
pip install -r requirements.txt
```

#### B. Setup Ollama
1. Download and install [Ollama](https://ollama.com/).
2. Pull the model used by the chatbot (default is `qwen3:4b-instruct`, or you can change it in `chatbot.py`):
   ```bash
   ollama pull qwen3:4b-instruct
   ```
3. Ensure Ollama is running (usually on port 11434).

#### C. Run the Backend Server
```bash
python web_app.py
```
The backend will start on `http://localhost:5001`.

## 🔑 Demo Credentials

Use the following credentials to log in:

| Role | Phone | PIN | Senior ID | Notes |
|------|-------|-----|-----------|-------|
| **Senior** | 9876543210 | 1234 | - | Access personal dashboard |
| **Doctor** | 9876543220 | 5678 | SEN001 | View patient (Senior) data |
| **Caretaker** | 9876543230 | 9012 | SEN001 | Monitor senior's daily tasks |

> **Note:** For Doctor and Caretaker login, you must enter the Senior ID (`SEN001`) to access the specific senior's data.

## 🧪 Testing the Application

1. **Login as Senior**: Check your health score, mark medications as taken, and chat with the AI Assistant.
2. **AI Chatbot**: Go to the "Assistant" tab. Ensure `web_app.py` and Ollama are running. Type a message like "I have a headache".
3. **Emergency**: Test the SOS button (simulation).
4. **Login as Doctor/Caretaker**: Use the credentials above to see how the data reflects the Senior's activities.

## 📂 Project Structure

- `src/`: React source code
  - `components/`: UI Components (Dashboards, Login, Cards)
  - `tabs/`: Feature tabs (Medicines, Reports, AI Assistant)
  - `contexts/`: Auth and Language context
  - `utils/`: Mock Database and helpers
- `web_app.py`: Flask backend for Chatbot
- `chatbot.py`: AI Logic interacting with Ollama

## ⚠️ Troubleshooting

- **Chatbot not responding?**
  - Ensure `python web_app.py` is running.
  - Ensure Ollama is running (`ollama serve`).
  - Check if the model `qwen3:4b-instruct` is pulled.
  - Check the browser console for connection errors to `localhost:5001`.

- **Build errors?**
  - Run `npm install` again.
  - Clear `node_modules` and `package-lock.json` if issues persist.
