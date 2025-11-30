import { NextRequest, NextResponse } from "next/server";

// Your portfolio knowledge base
const PORTFOLIO_CONTEXT = `
# About Rahul Chauhan

Rahul Chauhan is an AI & Backend Engineer with strong knowledge in Generative AI, RAG (Retrieval-Augmented Generation), and AI Agents. He is proficient in Machine Learning, Deep Learning, and NLP with hands-on experience in building intelligent systems using FastAPI and Django. He is a 4x Hackathon Winner with a passion for delivering innovative solutions.

## Education
- B.Tech in Artificial Intelligence and Data Science from Thakur College of Engineering and Technology, Mumbai
- CGPA: 9.41/10
- Graduated: May 2025
- HSC from Sardar Vallabhbhai Patel Vidyalaya: 84.83%

## Skills
- Programming: Python, SQL, C++
- AI/ML: Machine Learning, Deep Learning, NLP, Generative AI, RAG, Agentic AI
- Frameworks: FastAPI, Django, Flask, Streamlit
- AI Tools: LangChain, LangGraph, TensorFlow, Keras, Scikit-learn, NLTK
- Data: Pandas, Numpy, MySQL, MongoDB
- Tools: Docker, Git, MLflow, n8n, MCP
- Visualization: Matplotlib, Seaborn, Power BI

## Work Experience
1. **Edunet Foundation (AICTE & Shell India)** - AI & Data Analytics Intern (Jan 2025 - Feb 2025)
   - Developed Crop & Fertilizer Recommendation System with 92% accuracy
   - Analyzed 10K+ agricultural records for sustainable farming
   - Completed 4-week virtual internship under industry mentorship
   - Project could improve crop yield efficiency by 15-20%

2. **CodSoft** - Machine Learning Intern (Dec 2023 - Jan 2024)
   - Built Django web app for real-time ML predictions
   - Processed datasets with 10,000+ rows, optimizing feature selection
   - Implemented models with TensorFlow and Scikit-learn

## Featured Projects
1. **CareerVision.ai**: Career prediction platform using ML to suggest jobs with real-time listings via Adzuna API. Tech: Django, Machine Learning, Python

2. **Advanced AI Chatbot**: AI chatbot using Groq Llama-3.1-8B with 95% tool accuracy and SQLite chat persistence. Tech: LangGraph, LangChain, Streamlit, Groq

3. **Car Price Prediction API**: ML-powered REST API with FastAPI predicting car prices with 85%+ accuracy and Redis caching. Tech: FastAPI, Docker, Redis, Prometheus

4. **RecipePro.ai**: AI-powered recipe generator using Google Generative AI and LangChain. Tech: Django, LangChain, Gemini

5. **StockVision**: Real-time stock trend forecasting using LSTM models with interactive visualizations. Tech: Django, LSTM, Yahoo API

6. **RAG Application with LangChain**: Retrieval-Augmented Generation for enhanced document querying

7. **Web Scraper using LangChain**: Extracts and embeds web content for RAG-powered QA

8. **Fake News Detection**: ML classifier using NLP to identify real vs fake news

9. **Credit Card Fraud Detection**: Random Forest model for fraud detection

10. **Parkinsons Detection**: ML model for Parkinson's disease detection

## Certifications
- Python 101 for Data Science - IBM
- Basics of DSA - Simplilearn
- Flask Python - Great Learning
- Data Science Masters 2.0 - PW Skills (In Progress)

## Achievements
- 4x Hackathon Winner
- Multiple workshops and technical events participant

## Contact
- Email: rahulchauhan4708@gmail.com
- Phone: +91 8828489397
- GitHub: https://github.com/Rahul4112002
- LinkedIn: https://linkedin.com/in/rahul-chauhan-932522230
- Twitter/X: https://x.com/R4hulChauhan
- Location: Mumbai, Maharashtra, India
`;

// Simple keyword-based RAG (you can enhance with actual embeddings later)
function generateResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  // Skills related
  if (lowerMessage.includes("skill") || lowerMessage.includes("technology") || lowerMessage.includes("tech stack")) {
    return "Rahul's core skills include:\n\n🤖 AI/ML: Machine Learning, Deep Learning, NLP, Generative AI, RAG, Agentic AI\n\n💻 Frameworks: FastAPI, Django, Flask, Streamlit\n\n🧠 AI Tools: LangChain, LangGraph, TensorFlow, Keras, Scikit-learn\n\n📊 Data: Python, SQL, Pandas, Numpy, MySQL, MongoDB\n\n🛠️ DevOps: Docker, Git, MLflow\n\nHe's particularly strong in building intelligent systems with GenAI and RAG!";
  }

  // Projects related
  if (lowerMessage.includes("project") || lowerMessage.includes("built") || lowerMessage.includes("developed")) {
    if (lowerMessage.includes("ai") || lowerMessage.includes("genai") || lowerMessage.includes("gen ai")) {
      return "Rahul's GenAI projects include:\n\n✨ **Advanced AI Chatbot**: Using Groq Llama-3.1-8B with 95% tool accuracy, LangGraph & LangChain\n\n🍳 **RecipePro.ai**: AI recipe generator with Google Gemini & LangChain\n\n📄 **RAG Application**: Document querying system with LangChain\n\n🌐 **Web Scraper**: LangChain-powered web scraping for RAG-based QA\n\nHe specializes in RAG and Agentic AI systems!";
    }
    if (lowerMessage.includes("ml") || lowerMessage.includes("machine learning")) {
      return "Rahul's ML projects showcase diverse applications:\n\n💼 **CareerVision.ai**: ML-based career prediction with Adzuna API\n\n🚗 **Car Price Prediction API**: FastAPI-based REST API with 85%+ accuracy\n\n📰 **Fake News Detection**: NLP classifier for news verification\n\n💳 **Credit Card Fraud Detection**: Random Forest for fraud prevention\n\n🏥 **Parkinsons Detection**: Healthcare ML classifier\n\nAll projects demonstrate production-ready ML solutions!";
    }
    return "Rahul has built 14+ projects across:\n\n🤖 **GenAI & RAG**: Chatbots, recipe generators, document QA systems\n\n📊 **Machine Learning**: Career prediction, fraud detection, disease detection\n\n🧠 **Deep Learning**: Stock forecasting with LSTM\n\n🌐 **Full Stack**: Django & FastAPI applications with ML integration\n\nCheck out his GitHub: https://github.com/Rahul4112002";
  }

  // Experience related
  if (lowerMessage.includes("experience") || lowerMessage.includes("intern") || lowerMessage.includes("work")) {
    return "Rahul has professional experience from:\n\n🌾 **Edunet Foundation (AICTE & Shell)** - AI & Data Analytics Intern\n• Built Crop & Fertilizer Recommendation System (92% accuracy)\n• Analyzed 10K+ agricultural records\n• Jan 2025 - Feb 2025\n\n💻 **CodSoft** - Machine Learning Intern\n• Django web app for ML predictions\n• Processed 10,000+ row datasets\n• TensorFlow & Scikit-learn implementation\n• Dec 2023 - Jan 2024\n\nHe's also a 4x Hackathon Winner!";
  }

  // Education related
  if (lowerMessage.includes("education") || lowerMessage.includes("degree") || lowerMessage.includes("college") || lowerMessage.includes("university")) {
    return "📚 **Education Background**:\n\n🎓 **B.Tech in AI & Data Science**\nThakur College of Engineering and Technology, Mumbai\n• CGPA: 9.41/10 (Excellent academic performance!)\n• Graduated: May 2025\n• Specialization: Artificial Intelligence and Data Science\n\n📖 **HSC Board**\nSardar Vallabhbhai Patel Vidyalaya\n• Percentage: 84.83%\n\nHis strong academic foundation complements his practical project experience!";
  }

  // Certifications
  if (lowerMessage.includes("certif") || lowerMessage.includes("course")) {
    return "📜 **Certifications**:\n\n✅ Python 101 for Data Science - IBM\n✅ Basics of DSA - Simplilearn\n✅ Flask Python - Great Learning\n✅ Data Science Masters 2.0 - PW Skills (In Progress)\n\nRahul continuously upskills in Data Science, ML, and Web Development!";
  }

  // Django/FastAPI related
  if (lowerMessage.includes("django") || lowerMessage.includes("fastapi") || lowerMessage.includes("backend")) {
    return "Rahul is skilled in backend development with:\n\n🚀 **FastAPI**: Built Car Price Prediction API with Redis caching, Docker, and Prometheus monitoring\n\n🐍 **Django**: Created CareerVision.ai, RecipePro.ai, and StockVision with ML integration\n\n🌶️ **Flask**: Built Conversational AI Chatbot and completed certification\n\nHe specializes in building production-ready APIs that integrate ML models!";
  }

  // LangChain/RAG related
  if (lowerMessage.includes("langchain") || lowerMessage.includes("rag") || lowerMessage.includes("retrieval")) {
    return "Rahul is an expert in RAG and LangChain:\n\n🔗 **LangChain Projects**:\n• Advanced AI Chatbot with LangGraph & multi-tool integration\n• RAG Application for document querying\n• Web Scraper with RAG-powered QA\n• RecipePro.ai with Google Gemini\n\n🎯 **RAG Expertise**:\n• Retrieval-Augmented Generation implementation\n• Vector databases and embeddings\n• LLM-backed question answering\n• Agentic AI systems\n\nThis is his specialty area!";
  }

  // Contact related
  if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("reach") || lowerMessage.includes("phone")) {
    return "📧 **Contact Rahul**:\n\n✉️ Email: rahulchauhan4708@gmail.com\n📱 Phone: +91 8828489397\n💼 LinkedIn: linkedin.com/in/rahul-chauhan-932522230\n💻 GitHub: github.com/Rahul4112002\n🐦 Twitter/X: @R4hulChauhan\n📍 Location: Mumbai, Maharashtra, India\n\nFeel free to reach out for opportunities or collaborations!";
  }

  // Hackathon/achievements
  if (lowerMessage.includes("hackathon") || lowerMessage.includes("achievement") || lowerMessage.includes("win")) {
    return "🏆 **Achievements**:\n\n🥇 4x Hackathon Winner - Rahul has won multiple hackathons showcasing his problem-solving and rapid development skills!\n\n📸 His portfolio features 16 achievement photos from various hackathons and technical workshops.\n\nThese wins demonstrate his ability to build innovative solutions under pressure and work effectively in teams!";
  }

  // CGPA/academic
  if (lowerMessage.includes("cgpa") || lowerMessage.includes("gpa") || lowerMessage.includes("academic") || lowerMessage.includes("grade")) {
    return "📊 **Academic Excellence**:\n\n🎓 B.Tech CGPA: 9.41/10 from TCET Mumbai\n🎓 HSC Percentage: 84.83%\n\nRahul's strong academic performance (9.41 CGPA) reflects his dedication and deep understanding of AI & Data Science concepts. He graduated in May 2025 with distinction!";
  }

  // Default response with suggestions
  return `I'd be happy to help you learn about Rahul! You can ask me about:

💡 His **skills** and technologies
🚀 His **projects** (GenAI, ML, Full Stack)
💼 His **work experience** and internships
🎓 His **education** and certifications
🏆 His **hackathon wins** and achievements
📱 How to **contact** him

What would you like to know?`;
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message" },
        { status: 400 }
      );
    }

    // Generate response using keyword-based RAG
    const response = generateResponse(message);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
