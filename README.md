#🚀 AI-Powered Portfolio Website
A modern AI-Integrated Portfolio Website built using React + Vite + Tailwind CSS + Gemini AI API.
This website showcases skills, projects, and includes a smart AI chatbot that answers questions like a professional assistant.
##🧠 Features
✔ Fully Responsive UI
✔ Dark & Light Mode
✔ AI Chatbot powered by Google Gemini API
✔ Project Case Study Generator
✔ Smooth Scrolling Navigation
✔ Tailwind CSS Styling
✔ Ready for GitHub & Vercel Deployment
🛠 Tech Stack
Technology	Purpose
React + Vite	Frontend framework
Tailwind CSS	Styling & responsive layout
Gemini API	AI chatbot & summaries
Lucide-react	Icons
Vercel	Deployment
Node.js	Runtime (v18+)
📁 Project Structure
ai-portfolio-website/
│── public/
│── src/
│   ├── App.jsx        # Main Portfolio + AI Logic
│   ├── main.jsx       # Rendering React App
│   ├── index.css      # Tailwind styles
│   ├── assets/        # Images / Icons
│── .env               # API key stored here
│── package.json
│── README.md
🔧 Installation
1️⃣ Clone the Repository
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
2️⃣ Install Dependencies
npm install
3️⃣ Run Development Server
npm run dev
🔑 Setup Gemini API
📌 Create a .env file in root:
VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
👉 Get your API key from:
https://aistudio.google.com/apikey
📌 Restart your dev server after adding .env:
npm run dev
⚙ Gemini API Configuration (Already Done in App.jsx)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = "gemini-2.0-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
📤 Deploy to Vercel
Push code to GitHub:
git add .
git commit -m "AI Portfolio Completed"
git push origin main
Then go to https://vercel.com → Import GitHub Repo → Add Environment Variable:
VITE_GEMINI_API_KEY = YOUR_API_KEY_HERE
Click Deploy — DONE 🎉
🧠 AI Chatbot – Ask Questions Like:
What skills does Nitesh have?
Give case study summary of project 1.
Explain his cloud architecture experience.
What technologies does he use?
📬 Contact
Social	Link
GitHub	https://github.com/YOURPROFILE
LinkedIn	https://linkedin.com/in/YOURPROFILE
Email	your@email.com
⭐ If You Like This Project
Please star this repo 🌟 — it motivates me to build more!
📄 License
This project is open-source and free to use.
You can modify and use it as your own portfolio 🔥
