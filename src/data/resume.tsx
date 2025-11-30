import { Icons } from "@/components/icons";
import { HomeIcon, FolderKanban } from "lucide-react";
import { DiPostgresql } from "react-icons/di";
import { FaDocker, FaNodeJs, FaPython, FaChartBar } from "react-icons/fa";
import { 
  SiAppwrite, 
  SiKubernetes, 
  SiDjango, 
  SiFlask, 
  SiTensorflow, 
  SiScikitlearn, 
  SiCplusplus, 
  SiMysql,
  SiMongodb,
  SiPandas,
  SiNumpy,
  SiGit,
  SiKeras,
  SiStreamlit,
  SiFastapi
} from "react-icons/si";
import { BiBrain } from "react-icons/bi";

export const DATA = {
  name: "Rahul Chauhan",
  initials: "RC",
  url: "https://rahul4112.me",
  location: "Mumbai, Maharashtra, India",
  locationLink: "https://www.google.com/maps/place/Mumbai,+Maharashtra",
  description:
    "AI & Backend Engineer | 4x Hackathon Winner",
  summary:
    "**AI & Backend Engineer** with strong knowledge in **Generative AI**, **RAG (Retrieval-Augmented Generation)**, and **AI Agents**. Proficient in **Machine Learning**, **Deep Learning**, and **NLP** with hands-on experience in building intelligent systems using **FastAPI** and **Django**. **4x Hackathon Winner** with a passion for delivering innovative solutions. Recently graduated with **B.Tech in Artificial Intelligence and Data Science** from **Thakur College of Engineering and Technology, Mumbai** (**CGPA: 9.41/10**). Eager to leverage cutting-edge AI technologies to solve real-world problems.",
  avatarUrl: "/me.png",
  skills: [
    {
      name: "Python",
      icon: <FaPython className="size-3" />,
    },
    {
      name: "SQL",
      icon: <SiMysql className="size-3" />,
    },
    {
      name: "Machine Learning",
      icon: <SiScikitlearn className="size-3" />,
    },
    {
      name: "Deep Learning",
      icon: <SiTensorflow className="size-3" />,
    },
    {
      name: "NLP",
      icon: <BiBrain className="size-3" />,
    },
    {
      name: "Generative AI",
      icon: <BiBrain className="size-3" />,
    },
    {
      name: "RAG",
      icon: <BiBrain className="size-3" />,
    },
    {
      name: "Agentic AI",
      icon: <BiBrain className="size-3" />,
    },
    {
      name: "MySQL",
      icon: <SiMysql className="size-3" />,
    },
    {
      name: "Pandas",
      icon: <SiPandas className="size-3" />,
    },
    {
      name: "Numpy",
      icon: <SiNumpy className="size-3" />,
    },
    {
      name: "MongoDB",
      icon: <SiMongodb className="size-3" />,
    },
    {
      name: "Git",
      icon: <SiGit className="size-3" />,
    },
    {
      name: "MLflow",
      icon: <SiTensorflow className="size-3" />,
    },
    {
      name: "Docker",
      icon: <FaDocker className="size-3" />,
    },
    {
      name: "TensorFlow",
      icon: <SiTensorflow className="size-3" />,
    },
    {
      name: "Keras",
      icon: <SiKeras className="size-3" />,
    },
    {
      name: "Scikit-learn",
      icon: <SiScikitlearn className="size-3" />,
    },
    {
      name: "NLTK",
      icon: <BiBrain className="size-3" />,
    },
    {
      name: "LangChain",
      icon: <Icons.chain className="size-3" />,
    },
    {
      name: "LangGraph",
      icon: <Icons.chain className="size-3" />,
    },
    {
      name: "n8n",
      icon: <Icons.nextjs className="size-3" />,
    },
    {
      name: "MCP",
      icon: <Icons.nextjs className="size-3" />,
    },
    {
      name: "Matplotlib",
      icon: <FaChartBar className="size-3" />,
    },
    {
      name: "Seaborn",
      icon: <FaChartBar className="size-3" />,
    },
    {
      name: "Power BI",
      icon: <FaChartBar className="size-3" />,
    },
    {
      name: "FastAPI",
      icon: <SiFastapi className="size-3" />,
    },
    {
      name: "Django",
      icon: <SiDjango className="size-3" />,
    },
    {
      name: "Flask",
      icon: <SiFlask className="size-3" />,
    },
    {
      name: "Streamlit",
      icon: <SiStreamlit className="size-3" />,
    },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: FolderKanban, label: "Projects" },
  ],
  contact: {
    email: "rahulchauhan4708@gmail.com",
    tel: "+91 8828489397",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Rahul4112002",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/rahul-chauhan-932522230",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/R4hulChauhan",
        icon: Icons.x,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:rahulchauhan4708@gmail.com",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Edunet Foundation",
      href: "https://www.aicte-india.org/",
      badges: [],
      location: "Remote",
      title: "AI & Data Analytics Intern",
      logoUrl: "/work-experience/edunetfoundation.png",
      start: "January 2025",
      end: "February 2025",
      description: [
        "- Developed a **Crop & Fertilizer Recommendation System** with **92% accuracy**.",
        "- Analyzed **10K+ agricultural records** to enable sustainable farming.",
        "- Completed a **4-week virtual internship** under industry mentorship.",
        "- Delivered a project that could improve **crop yield efficiency by 15–20%**.",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.aicte-india.org/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
    },
    {
      company: "CodSoft",
      href: "https://www.codsoft.in/",
      badges: [],
      location: "Remote",
      title: "Machine Learning Intern",
      logoUrl: "/work-experience/codesoft.png",
      start: "December 2023",
      end: "January 2024",
      description: [
        "- Built a **Django web app** to display real-time machine learning predictions.",
        "- Processed datasets with **10,000+ rows**, optimizing feature selection.",
        "- Implemented models with **TensorFlow** and **Scikit-learn**.",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.codsoft.in/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
    },
  ],
  education: [
    {
      school: "Thakur College of Engineering and Technology",
      href: "https://www.tcetmumbai.in/",
      degree:
        "B.Tech - Artificial Intelligence and Data Science | CGPA: 9.41",
      logoUrl: "/thakurcollege.png",
      start: "Sep 2021",
      end: "May 2025",
    },
    {
      school: "Sardar Vallabhbhai Patel Vidyalaya",
      href: "#",
      degree:
        "HSC Board Examination | Percentage: 84.83%",
      logoUrl: "/svpv.png",
      start: "Jun 2020",
      end: "Mar 2021",
    },
  ],
  projects: [
    {
      title: "CareerVision.ai",
      href: "https://github.com/Rahul4112002/CareerVision.ai",
      dates: "2024",
      active: true,
      description:
        "Career prediction platform using ML to suggest suitable jobs and real-time listings based on user inputs using Adzuna API.",
      technologies: ["Django", "Machine Learning", "Adzuna API", "Python"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Rahul4112002/CareerVision.ai",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/careervision.png",
    },
    {
      title: "Advanced AI Chatbot with Multi-Tool Integration",
      href: "https://github.com/Rahul4112002/Advanced-AI-Chatbot-with-Multi-Tool-Integration-using-LangGraph",
      dates: "2024",
      active: true,
      description:
        "AI chatbot using Groq Llama-3.1-8B with 95% tool accuracy and SQLite chat persistence.",
      technologies: ["Python", "LangGraph", "LangChain", "Streamlit", "Groq", "SQLite"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Rahul4112002/Advanced-AI-Chatbot-with-Multi-Tool-Integration-using-LangGraph",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/aichatbot.png",
    },
    {
      title: "Car Price Prediction API",
      href: "https://github.com/Rahul4112002/car-price-prediction-api",
      dates: "2024",
      active: true,
      description:
        "ML-powered REST API with FastAPI predicting car prices with 85%+ accuracy and Redis caching.",
      technologies: ["Python", "FastAPI", "Machine Learning", "Docker", "Redis", "Prometheus"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Rahul4112002/car-price-prediction-api",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/carpriceprediction.png",
    },
    {
      title: "RecipePro.ai",
      href: "https://github.com/Rahul4112002/RecipePro.ai",
      dates: "2024",
      active: true,
      description:
        "AI-powered recipe generator using Google Generative AI and LangChain for personalized cooking experiences.",
      technologies: ["Django", "LangChain", "Gemini", "Python"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Rahul4112002/RecipePro.ai",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/recipepro.png",
    },
  ],
  positions: [
    {
      title: "Python 101 for Data Science",
      dates: "2024",
      location: "IBM",
      description:
        "Completed IBM's Python 101 for Data Science certification, covering fundamental Python programming concepts for data analysis.",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      links: [
        {
          title: "IBM",
          href: "https://www.ibm.com/",
        },
      ],
    },
    {
      title: "Basics of DSA",
      dates: "2024",
      location: "Simplilearn",
      description:
        "Completed certification in Data Structures and Algorithms fundamentals from Simplilearn.",
      image: "/simplilearn.png",
      links: [
        {
          title: "Simplilearn",
          href: "https://www.simplilearn.com/",
        },
      ],
    },
    {
      title: "Flask Python",
      dates: "2024",
      location: "Great Learning",
      description:
        "Completed Flask web development certification covering building web applications using Python Flask framework.",
      image: "/greatlearning.png",
      links: [
        {
          title: "Great Learning",
          href: "https://www.mygreatlearning.com/",
        },
      ],
    },
    {
      title: "Data Science Masters 2.0",
      dates: "2023 - Present",
      location: "PW Skills",
      description:
        "Currently enrolled in comprehensive Data Science Masters program covering Machine Learning, Deep Learning, NLP, and advanced analytics.",
      image: "https://pwskills.com/images/PWSkills-main.png",
      links: [
        {
          title: "PW Skills",
          href: "https://pwskills.com/",
        },
      ],
    },
  ],
  achievements: [
    {
      title: "Achievement 1",
      dates: "2024-2025",
      location: "Hackathon/Workshop",
      image: "/achievements/a1.jpeg",
    },
    {
      title: "Achievement 2",
      dates: "2024-2025",
      location: "Hackathon/Workshop",
      image: "/achievements/a2.jpeg",
    },
    {
      title: "Achievement 3",
      dates: "2024-2025",
      location: "Hackathon/Workshop",
      image: "/achievements/a3.jpeg",
    },
    {
      title: "Achievement 4",
      dates: "2024-2025",
      location: "Hackathon/Workshop",
      image: "/achievements/a4.jpeg",
    },
    {
      title: "Achievement 5",
      dates: "2024-2025",
      location: "Hackathon/Workshop",
      image: "/achievements/a5.jpeg",
    },
    {
      title: "Achievement 6",
      dates: "2024-2025",
      location: "Hackathon/Workshop",
      image: "/achievements/a6.jpeg",
    },
    {
      title: "Achievement 7",
      dates: "2024-2025",
      location: "Hackathon/Workshop",
      image: "/achievements/a7.jpeg",
    },
    {
      title: "Achievement 8",
      dates: "2024-2025",
      location: "Hackathon/Workshop",
      image: "/achievements/a8.jpeg",
    },
    {
      title: "Achievement 9",
      dates: "2024-2025",
      location: "Hackathon/Workshop",
      image: "/achievements/a9.jpeg",
    },
    {
      title: "Achievement 10",
      dates: "2024-2025",
      location: "Hackathon/Workshop",
      image: "/achievements/a10.jpeg",
    },
    {
      title: "Achievement 11",
      dates: "2024-2025",
      location: "Hackathon/Workshop",
      image: "/achievements/a11.jpeg",
    },
    {
      title: "Achievement 12",
      dates: "2024-2025",
      location: "Hackathon/Workshop",
      image: "/achievements/a12.jpeg",
    },
    {
      title: "Achievement 13",
      dates: "2024-2025",
      location: "Hackathon/Workshop",
      image: "/achievements/a13.jpeg",
    },
    {
      title: "Achievement 14",
      dates: "2024-2025",
      location: "Hackathon/Workshop",
      image: "/achievements/a14.jpeg",
    },
    {
      title: "Achievement 15",
      dates: "2024-2025",
      location: "Hackathon/Workshop",
      image: "/achievements/a15.jpeg",
    },
    {
      title: "Mumbai Hacks",
      dates: "2024-2025",
      location: "Mumbai",
      image: "/achievements/mumbai hacks.png",
    },
  ],
} as const;
