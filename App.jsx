import React, { useState, useEffect, useCallback } from 'react';
import { Aperture, Code, Brain, Send, Loader2, Moon, Sun, Github, Linkedin, MessageSquare, FileText } from 'lucide-react';

// --- API Configuration ---
// The API key is retrieved from Vercel's environment variables at runtime.
// Vercel will inject the actual key provided in the dashboard.
const apiKey = ""; 
const modelName = "gemini-2.5-flash-preview-09-2025";
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

// --- Portfolio Data (Mocked) ---
const PORTFOLIO_DATA = {
  name: "Nitesh Kumar",
  title: "Senior Full-Stack Engineer",
  bio: "Specializing in the Next.js App Router, React Server Components (RSC), and robust, data-driven cloud architectures. I deliver high-performance, scalable web solutions that meet modern industry standards. Passionate about leveraging AI for better developer experience and user interaction.",
  skills: [
    { icon: 'React', name: 'Next.js & React', detail: 'App Router, RSC, SSG, SSR, Incremental Adoption.' },
    { icon: 'TypeScript', name: 'TypeScript', detail: 'Ensuring type safety and maintainability for large-scale applications.' },
    { icon: 'Database', name: 'Database & ORM', detail: 'PostgreSQL, MongoDB, Prisma, Drizzle ORM.' },
    { icon: 'Cloud', name: 'Cloud & DevOps', detail: 'Vercel, AWS, Docker, CI/CD pipelines.' },
    { icon: 'AI', name: 'AI Integration', detail: 'Gemini API integration for personalized and dynamic experiences.' },
    { icon: 'Testing', name: 'Testing', detail: 'Unit, integration (Jest, Vitest), and E2E (Playwright) testing.' },
  ],
  projects: [
    { title: 'Serverless E-Commerce Platform', desc: 'A modern Next.js 16 storefront using Partial Pre-Rendering (PPR) for instant product page loads. Integrated with Stripe and Vercel\'s Edge functions.', tags: ['Next.js 16', 'PPR', 'Stripe', 'TypeScript'] },
    { title: 'Real-time Analytics Dashboard', desc: 'Built with React and WebSockets. Utilizes Recoil for global state management and D3.js for complex data visualizations. Focus on performance and accessibility.', tags: ['React', 'D3.js', 'WebSockets', 'Tailwind CSS'] },
    { title: 'AI Content Generation Tool', desc: 'A full-stack application leveraging the Gemini API for creative text generation. Features Server Actions for secure, fast form handling and database persistence.', tags: ['Next.js Server Actions', 'Gemini API', 'PostgreSQL', 'Auth.js'] },
  ],
};

// --- Helper Functions ---

/**
 * Executes a fetch request with exponential backoff for resilience.
 */
const fetchWithExponentialBackoff = async (url, options, maxRetries = 3) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);
      if (attempt === maxRetries - 1) {
        throw new Error("API request failed after multiple retries.");
      }
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// --- Components ---

const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      if (newTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newTheme;
    });
  }, []);

  return { isDark, toggleTheme };
};

const Header = ({ isDark, toggleTheme }) => (
  <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b dark:border-gray-800 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
        {PORTFOLIO_DATA.name} <span className="text-indigo-500">.ai</span>
      </h1>
      <nav className="hidden md:flex space-x-6">
        {['About', 'Skills', 'Projects', 'AI Chat'].map(item => (
          <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
            {item}
          </a>
        ))}
      </nav>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle dark mode"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>
  </header>
);

const Section = ({ id, title, children }) => (
  <section id={id} className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl font-extrabold mb-12 text-gray-900 dark:text-gray-50 border-b-4 border-indigo-500 pb-2 inline-block">
      {title}
    </h2>
    {children}
  </section>
);

const HeroSection = () => (
  <div className="pt-24 pb-16 bg-gradient-to-br from-indigo-50 dark:from-gray-950 to-white dark:to-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tighter mb-4">
        Hello, I'm <span className="text-indigo-600 dark:text-indigo-400">{PORTFOLIO_DATA.name}</span>.
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
        {PORTFOLIO_DATA.title}
      </p>
      <div className="flex justify-center space-x-4">
        <a
          href="#projects"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="px-6 py-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-semibold rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 border border-indigo-600 dark:border-indigo-400 transition duration-300 transform hover:scale-105"
        >
          Get In Touch
        </a>
      </div>
    </div>
  </div>
);

const AboutSection = () => (
  <Section id="about" title="About Me">
    <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-xl">
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        {PORTFOLIO_DATA.bio}
      </p>
      <div className="mt-6 flex space-x-4">
        <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition">
          <Github className="w-6 h-6 inline mr-1" />
          GitHub
        </a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition">
          <Linkedin className="w-6 h-6 inline mr-1" />
          LinkedIn
        </a>
      </div>
    </div>
  </Section>
);

const SkillsSection = () => {
  const IconMap = {
    'React': Code,
    'TypeScript': Aperture,
    'Database': Brain,
    'Cloud': Sun,
    'AI': MessageSquare,
    'Testing': Loader2
  };

  return (
    <Section id="skills" title="Industry Standard Skills">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PORTFOLIO_DATA.skills.map((skill, index) => {
          const Icon = IconMap[skill.icon] || Code;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transform hover:shadow-2xl transition duration-300">
              <Icon className="w-8 h-8 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{skill.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{skill.detail}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

const ProjectCard = ({ project }) => {
  const [summary, setSummary] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [error, setError] = useState(null);

  const generateSummary = useCallback(async () => {
    setIsLoadingSummary(true);
    setError(null);
    setSummary('');

    const userQuery = `Generate a 3-paragraph executive summary (around 150 words total) for this software project to be used in a professional case study. Focus on the value proposition, the technology used, and the measurable outcome. Project Details: Title: ${project.title}, Description: ${project.desc}, Technologies: ${project.tags.join(', ')}. Format the output with line breaks between paragraphs.`;
    const systemPrompt = "You are an expert technical writer and product marketer for a Senior Full-Stack Engineer. Your goal is to turn technical descriptions into compelling, professional case studies.";
    
    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    };

    try {
      const response = await fetchWithExponentialBackoff(apiUrl, options);
      const result = await response.json();
      const aiText = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (aiText) {
        setSummary(aiText);
      } else {
        throw new Error("Received an invalid response from the AI.");
      }
    } catch (e) {
      console.error("API Error:", e);
      setError("Failed to generate summary. Please check the API status.");
    } finally {
      setIsLoadingSummary(false);
    }
  }, [project]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-xl flex flex-col gap-6 border-l-4 border-indigo-500">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">{project.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{project.desc}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 text-xs font-medium text-indigo-700 bg-indigo-100 rounded-full dark:bg-indigo-900 dark:text-indigo-200">
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={summary ? () => setSummary('') : generateSummary}
            disabled={isLoadingSummary}
            className="px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition duration-300 flex items-center gap-2 disabled:bg-pink-300 disabled:cursor-not-allowed text-sm"
          >
            {isLoadingSummary ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : summary ? (
              <>Hide Summary</>
            ) : (
              <>✨ Generate Detailed Case Study Summary</>
            )}
          </button>
        </div>
        <div className="lg:w-1/3 flex items-center justify-center">
          <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 italic text-sm">
            Project Showcase
          </div>
        </div>
      </div>
      
      {(summary || error) && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="flex items-center text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
            <FileText className="w-5 h-5 mr-2 text-pink-600" />
            Executive Summary
          </h4>
          {error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed text-base">{summary}</p>
          )}
        </div>
      )}
    </div>
  );
};

const ProjectsSection = () => (
  <Section id="projects" title="Featured Projects">
    <div className="space-y-12">
      {PORTFOLIO_DATA.projects.map((project, index) => (
        <ProjectCard key={index} project={project} projectIndex={index} />
      ))}
    </div>
  </Section>
);

const AIChatbot = () => {
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: "Hello! I am Nitesh's portfolio AI assistant. Ask me anything about his skills, projects, or professional goals." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const systemPrompt = `You are the professional AI persona of Senior Software Developer Nitesh Kumar. Your portfolio contains projects in Next.js, React, and TypeScript, and your professional goals are focused on full-stack development and cloud architecture. Your bio is: "${PORTFOLIO_DATA.bio}". Respond to the user's questions concisely and professionally, maintaining the persona of Nitesh Kumar. DO NOT mention you are an AI model.`;

  const callGeminiApi = async (newHistory) => {
    setError(null);
    setIsLoading(true);

    const contents = newHistory.map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const payload = {
      contents: contents,
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    };

    try {
      const response = await fetchWithExponentialBackoff(apiUrl, options);
      const result = await response.json();

      const aiText = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (aiText) {
        setChatHistory(prev => [...prev, { role: 'ai', text: aiText }]);
      } else {
        throw new Error("Received an invalid response from the AI.");
      }
    } catch (e) {
      console.error("API Error:", e);
      setError("Sorry, I'm currently unable to access the portfolio knowledge base. Please try asking again later.");
      setChatHistory(prev => [...prev, { role: 'ai', text: "I apologize, but I encountered a technical difficulty while processing your request. Please try asking again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', text: input.trim() };
    const newHistory = [...chatHistory, userMessage];

    setChatHistory(newHistory);
    setInput('');
    callGeminiApi(newHistory);
  };

  return (
    <Section id="ai-chat" title="AI Assistant">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 h-[500px] flex flex-col border border-indigo-200 dark:border-indigo-900">
        <div className="flex-grow overflow-y-auto space-y-4 pr-2">
          {chatHistory.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-md ${
                message.role === 'user'
                  ? 'bg-indigo-500 text-white rounded-br-none'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-50 rounded-tl-none'
              }`}>
                <p className="text-sm font-medium">{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-tl-none">
                <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
              </div>
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
        <form onSubmit={handleSendMessage} className="mt-4 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Nitesh's AI assistant a question..."
            disabled={isLoading}
            className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-50 transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </form>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
          This AI is trained on Nitesh's professional background and is available 24/7.
        </p>
      </div>
    </Section>
  );
};

const Footer = () => (
  <footer className="bg-gray-100 dark:bg-gray-900 border-t dark:border-gray-800 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
      <p className="text-sm">
        Built with React, Tailwind CSS, and powered by the Gemini API.
        <br/>
        &copy; {new Date().getFullYear()} {PORTFOLIO_DATA.name}. All rights reserved.
      </p>
    </div>
  </footer>
);

// --- Main App Component ---
const App = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans transition-colors duration-300">
      <style>{`
        /* Custom scrollbar for chat */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: ${isDark ? '#1f2937' : '#f1f1f1'};
        }
        ::-webkit-scrollbar-thumb {
          background: ${isDark ? '#4f46e5' : '#888'};
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? '#6366f1' : '#555'};
        }
        html {
            scroll-behavior: smooth;
        }
      `}</style>

      <Header isDark={isDark} toggleTheme={toggleTheme} />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <AIChatbot />
      </main>

      <Footer />
    </div>
  );
};

export default App;