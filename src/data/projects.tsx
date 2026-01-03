import { Icons } from "@/components/icons";

export type ProjectCategory = "All" | "AI Agents" | "Generative AI" | "Machine Learning" | "Python" | "Gen AI" | "Full Stack" | "Deep Learning" | "NLP";

export interface Project {
  title: string;
  href: string;
  dates: string;
  active: boolean;
  description: string;
  technologies: string[];
  links: {
    type: string;
    href: string;
    icon: React.ReactNode;
  }[];
  image: string;
  category: ProjectCategory[];
}

export const allProjects: Project[] = [
  {
    title: "CareerVision.ai",
    href: "https://github.com/Rahul4112002/CareerVision.ai",
    dates: "2024",
    active: true,
    description: "Career prediction platform using ML to suggest suitable jobs and real-time listings based on user inputs using Adzuna API.",
    technologies: ["Django", "Machine Learning", "Adzuna API", "Python"],
    links: [
      {
        type: "Source",
        href: "https://github.com/Rahul4112002/CareerVision.ai",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/projects/careervision.png",
    category: ["Machine Learning", "Full Stack"],
  },
  {
    title: "Advanced AI Chatbot with Multi-Tool Integration",
    href: "https://github.com/Rahul4112002/Advanced-AI-Chatbot-with-Multi-Tool-Integration-using-LangGraph",
    dates: "2024",
    active: true,
    description: "AI chatbot using Groq Llama-3.1-8B with 95% tool accuracy and SQLite chat persistence.",
    technologies: ["Python", "LangGraph", "LangChain", "Streamlit", "Groq", "SQLite"],
    links: [
      {
        type: "Source",
        href: "https://github.com/Rahul4112002/Advanced-AI-Chatbot-with-Multi-Tool-Integration-using-LangGraph",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/projects/aichatbot.png",
    category: ["Gen AI", "Full Stack"],
  },
  {
    title: "Car Price Prediction API",
    href: "https://github.com/Rahul4112002/car-price-prediction-api",
    dates: "2024",
    active: true,
    description: "ML-powered REST API with FastAPI predicting car prices with 85%+ accuracy and Redis caching.",
    technologies: ["Python", "FastAPI", "Machine Learning", "Docker", "Redis", "Prometheus"],
    links: [
      {
        type: "Source",
        href: "https://github.com/Rahul4112002/car-price-prediction-api",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/projects/carpriceprediction.png",
    category: ["Machine Learning", "Full Stack"],
  },
  {
    title: "RecipePro.ai",
    href: "https://github.com/Rahul4112002/RecipePro.ai",
    dates: "2024",
    active: true,
    description: "AI-powered recipe generator using Google Generative AI and LangChain for personalized cooking experiences.",
    technologies: ["Django", "LangChain", "Gemini", "Python"],
    links: [
      {
        type: "Source",
        href: "https://github.com/Rahul4112002/RecipePro.ai",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/projects/recipepro.png",
    category: ["Gen AI", "Full Stack"],
  },
  {
    title: "Conversational AI Chatbot with Google Gemini",
    href: "https://github.com/Rahul4112002/Conversational-AI-Chatbot-with-Google-Gemini",
    dates: "2024",
    active: true,
    description: "Flask-based chatbot powered by Gemini API with SQLite database, real-time responses, and purple-gradient UI.",
    technologies: ["Flask", "Google Gemini", "GenAI"],
    links: [
      {
        type: "Source",
        href: "https://github.com/Rahul4112002/Conversational-AI-Chatbot-with-Google-Gemini",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/projects/Conversational AI Chatbot with Google Gemini.png",
    category: ["Gen AI", "Full Stack"],
  },
  {
    title: "StockVision",
    href: "https://github.com/Rahul4112002/StockVision",
    dates: "2024",
    active: true,
    description: "Real-time stock trend forecasting platform using LSTM models and interactive chart visualizations.",
    technologies: ["Django", "LSTM", "Yahoo API"],
    links: [
      {
        type: "Source",
        href: "https://github.com/Rahul4112002/StockVision",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/projects/StockVision.png",
    category: ["Deep Learning", "Full Stack"],
  },
  {
    title: "Parkinsons Detection",
    href: "https://github.com/Rahul4112002/Parkinsons--Diseases-Detection",
    dates: "2024",
    active: true,
    description: "ML model for detecting Parkinson's disease using multiple classification algorithms.",
    technologies: ["Machine Learning", "Classification"],
    links: [
      {
        type: "Source",
        href: "https://github.com/Rahul4112002/Parkinsons--Diseases-Detection",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/projects/Parkinsons Detection.png",
    category: ["Machine Learning"],
  },
  {
    title: "Fake News Detection",
    href: "https://github.com/Rahul4112002/Fake-News-Detection",
    dates: "2024",
    active: true,
    description: "Harnesses ML techniques to classify news articles as real or fake.",
    technologies: ["NLP", "Machine Learning"],
    links: [
      {
        type: "Source",
        href: "https://github.com/Rahul4112002/Fake-News-Detection",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/projects/Smart ML classifier for identifying real vs fake news..png",
    category: ["NLP", "Machine Learning"],
  },
  {
    title: "Credit Card Fraud Detection",
    href: "https://github.com/Rahul4112002/CREDIT-CARD-FRAUD-DETECTION",
    dates: "2024",
    active: true,
    description: "ML model to detect fraud in credit card transactions using Random Forest.",
    technologies: ["Random Forest", "Machine Learning"],
    links: [
      {
        type: "Source",
        href: "https://github.com/Rahul4112002/CREDIT-CARD-FRAUD-DETECTION",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/projects/Detect fraudulent transactions instantly with machine learning..png",
    category: ["Machine Learning"],
  },
  {
    title: "Customer Churn Prediction",
    href: "https://github.com/Rahul4112002/Customer-Churn-Prediction",
    dates: "2024",
    active: true,
    description: "Predicting whether bank customers will stay or leave using Random Forest.",
    technologies: ["Random Forest", "Machine Learning"],
    links: [
      {
        type: "Source",
        href: "https://github.com/Rahul4112002/Customer-Churn-Prediction",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/projects/Accurate churn prediction using machine learning.png",
    category: ["Machine Learning"],
  },
  {
    title: "RAG Application with LangChain",
    href: "https://github.com/Rahul4112002/RAG-Application-with-LangChain",
    dates: "2024",
    active: true,
    description: "A Retrieval-Augmented Generation (RAG) application built with LangChain for enhanced document querying.",
    technologies: ["LangChain", "RAG"],
    links: [
      {
        type: "Source",
        href: "https://github.com/Rahul4112002/RAG-Application-with-LangChain",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/projects/RAG Application with LangChain.png",
    category: ["Gen AI"],
  },
  {
    title: "Web Scraper using LangChain",
    href: "https://github.com/Rahul4112002/Web-Scrapper-Using-Langchain",
    dates: "2024",
    active: true,
    description: "LangChain web-scraper that extracts, cleans, and embeds web content to power retrieval-augmented generation (RAG) for LLM-backed QA and summarization.",
    technologies: ["LangChain", "RAG", "Web Scraping"],
    links: [
      {
        type: "Source",
        href: "https://github.com/Rahul4112002/Web-Scrapper-Using-Langchain",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/projects/Web Scraper using LangChain.png",
    category: ["Gen AI", "NLP"],
  },
  {
    title: "Forest Fire Prediction",
    href: "https://github.com/Rahul4112002/Forest-Fire-Precition",
    dates: "2024",
    active: true,
    description: "Predictive model to forecast forest fire occurrences based on environmental factors.",
    technologies: ["Machine Learning", "Predictive Modeling"],
    links: [
      {
        type: "Source",
        href: "https://github.com/Rahul4112002/Forest-Fire-Precition",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/projects/Forest Fire Prediction.png",
    category: ["Machine Learning"],
  },
  {
    title: "Diabetes Prediction",
    href: "https://github.com/Rahul4112002/Diabetes-Prediction",
    dates: "2024",
    active: true,
    description: "ML project that predicts whether a patient is diabetic based on health parameters.",
    technologies: ["Healthcare", "Classification"],
    links: [
      {
        type: "Source",
        href: "https://github.com/Rahul4112002/Diabetes-Prediction",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/projects/Diabetes Prediction.png",
    category: ["Machine Learning"],
  },
];

export const projectCategories: ProjectCategory[] = ["All", "AI Agents", "Generative AI", "Machine Learning", "Python", "Gen AI", "Full Stack", "Deep Learning", "NLP"];

// Projects organized by new categories
export const aiAgentsProjects = allProjects.filter(p => 
  p.technologies.some(t => t.toLowerCase().includes('langgraph') || t.toLowerCase().includes('agent')) ||
  p.title.toLowerCase().includes('agent') ||
  p.description.toLowerCase().includes('agent')
);

export const generativeAIProjects = allProjects.filter(p => 
  p.category.includes('Gen AI') ||
  p.technologies.some(t => 
    t.toLowerCase().includes('langchain') || 
    t.toLowerCase().includes('gemini') || 
    t.toLowerCase().includes('rag') ||
    t.toLowerCase().includes('genai') ||
    t.toLowerCase().includes('llm')
  )
);

export const machineLearningProjects = allProjects.filter(p => 
  p.category.includes('Machine Learning') ||
  p.technologies.some(t => 
    t.toLowerCase().includes('machine learning') || 
    t.toLowerCase().includes('random forest') ||
    t.toLowerCase().includes('classification') ||
    t.toLowerCase().includes('prediction')
  )
);

export const pythonProjects = allProjects.filter(p => 
  p.technologies.some(t => 
    t.toLowerCase().includes('python') || 
    t.toLowerCase().includes('django') || 
    t.toLowerCase().includes('flask') ||
    t.toLowerCase().includes('fastapi') ||
    t.toLowerCase().includes('streamlit')
  )
);

// Load admin-added projects from API
export async function getAdminProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/api/admin/projects', { cache: 'no-store' });
    if (!response.ok) return [];
    
    const data = await response.json();
    const adminProjects = data.projects || [];
    
    // Transform admin projects to match Project interface
    return adminProjects.map((p: any) => ({
      title: p.title,
      href: p.source_link,
      dates: new Date(p.created_at).getFullYear().toString(),
      active: true,
      description: p.description,
      technologies: [],
      links: [
        ...(p.source_link ? [{
          type: "Source",
          href: p.source_link,
          icon: <Icons.github className="size-3" />,
        }] : []),
        ...(p.live_link ? [{
          type: "Website",
          href: p.live_link,
          icon: <Icons.globe className="size-3" />,
        }] : [])
      ],
      image: p.image_url || "/placeholder-project.png",
      category: [p.category as ProjectCategory],
    }));
  } catch (error) {
    console.error('Error loading admin projects:', error);
    return [];
  }
}

// Get all projects (static + admin-added)
export async function getAllProjects(): Promise<Project[]> {
  const adminProjects = await getAdminProjects();
  return [...allProjects, ...adminProjects];
}
