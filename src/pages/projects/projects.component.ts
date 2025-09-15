import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

interface Project {
  title: string;
  image: string;
  tags: string[];
  description: string;
  repoUrl: string;
  categories: string[];
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  
  readonly filters = ['all', 'genai', 'full-stack', 'machine-learning', 'deep-learning', 'nlp'];
  activeFilter = signal('all');

  projects = signal<Project[]>([
    {
      title: 'RecipePro.ai',
      image: 'recipe.png',
      tags: ['Django', 'LangChain', 'Gemini'],
      description: 'AI-powered recipe generator using Google Generative AI and LangChain for personalized cooking experiences.',
      repoUrl: 'https://github.com/Rahul4112002/RecipePro.ai',
      categories: ['genai', 'full-stack']
    },
    {
      title: 'CareerVision.ai',
      image: 'career.png',
      tags: ['Django', 'ML', 'Adzuna API'],
      description: 'Career prediction platform using ML to suggest suitable jobs and real-time listings based on user inputs.',
      repoUrl: 'https://github.com/Rahul4112002/CareerVision.ai',
      categories: ['machine-learning', 'full-stack']
    },
    {
      title: 'StockVision',
      image: 'stock.png',
      tags: ['Django', 'LSTM', 'Yahoo API'],
      description: 'Real-time stock trend forecasting platform using LSTM models and interactive chart visualizations.',
      repoUrl: 'https://github.com/Rahul4112002/StockVision',
      categories: ['deep-learning', 'full-stack']
    },
    {
      title: 'Parkinsons Detection',
      image: 'https://raw.githubusercontent.com/Rahul4112002/my-portfolio/main/parkinsons.png',
      tags: ['ML', 'Classification'],
      description: "ML model for detecting Parkinson's disease using multiple classification algorithms.",
      repoUrl: 'https://github.com/Rahul4112002/Parkinsons--Diseases-Detection',
      categories: ['machine-learning']
    },
    {
      title: 'Fake News Detection',
      image: 'news.png',
      tags: ['NLP', 'ML'],
      description: 'Harnesses ML techniques to classify news articles as real or fake.',
      repoUrl: 'https://github.com/Rahul4112002/Fake-News-Detection',
      categories: ['machine-learning', 'nlp']
    },
    {
      title: 'Credit Card Fraud Detection',
      image: 'card.png',
      tags: ['Random Forest'],
      description: 'ML model to detect fraud in credit card transactions using Random Forest.',
      repoUrl: 'https://github.com/Rahul4112002/CREDIT-CARD-FRAUD-DETECTION',
      categories: ['machine-learning']
    },
    {
      title: 'Customer Churn Prediction',
      image: 'churn.png',
      tags: ['Random Forest'],
      description: 'Predicting whether bank customers will stay or leave using Random Forest.',
      repoUrl: 'https://github.com/Rahul4112002/Customer-Churn-Prediction',
      categories: ['machine-learning']
    },
    {
      title: 'Forest Fire Prediction',
      image: 'fire.png',
      tags: ['ML', 'Predictive Modeling'],
      description: 'Predictive model to forecast forest fire occurrences based on environmental factors.',
      repoUrl: 'https://github.com/Rahul4112002/Forest-Fire-Precition',
      categories: ['machine-learning']
    },
    {
      title: 'Diabetes Prediction',
      image: 'diabetes.png',
      tags: ['Healthcare', 'Classification'],
      description: 'ML project that predicts whether a patient is diabetic based on health parameters.',
      repoUrl: 'https://github.com/Rahul4112002/Diabetes-Prediction',
      categories: ['machine-learning']
    }
  ]);
  
  filteredProjects = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') {
      return this.projects();
    }
    return this.projects().filter(p => p.categories.includes(filter));
  });

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }
}