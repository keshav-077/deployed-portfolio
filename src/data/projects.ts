// Project_Dataset — the single source of truth for the Owner's projects.
//
// Categories follow the professional taxonomy (Generative AI, LLM & RAG,
// Computer Vision [which includes real-time detection & surveillance], NLP,
// Reinforcement Learning, AI for Agriculture & Science, Cloud & Distributed
// Systems, Desktop AI Applications). There is intentionally NO separate
// "Real-time Detection" category — those projects live under Computer Vision.
//
// Flagship projects are marked `featured` with a `featureOrder` and carry a
// rich `detail` case-study block surfaced in the project detail modal.

import type { Project } from './types';

export const projects: Project[] = [
  // ---------------------------------------------------------------------------
  // LLM & RAG
  // ---------------------------------------------------------------------------
  {
    id: 'healthcare-assistant',
    name: 'Healthcare Assistant',
    description:
      'RAG-powered medical assistant that grounds LLM responses in a curated healthcare knowledge base, combining LangChain orchestration with OpenAI GPT and a Pinecone vector store for accurate, context-aware answers.',
    category: 'LLM & RAG',
    techStack: ['LangChain', 'RAG', 'OpenAI', 'Pinecone'],
    githubUrl: 'https://github.com/keshav-077/medical-chatbot-rag',
    liveUrl: 'https://medical-chatbot-179320.vercel.app',
    featured: true,
    featureOrder: 1,
    detail: {
      problem:
        'Patients and clinicians struggle to get quick, reliable answers from dense medical literature, and general-purpose chatbots hallucinate clinically unsafe information.',
      solution:
        'A Retrieval-Augmented Generation assistant that retrieves from a curated medical knowledge base and grounds every LLM response in retrieved sources to reduce hallucination.',
      architecture:
        'Documents are embedded and stored in Pinecone; LangChain performs semantic retrieval on each query and feeds the grounded context to OpenAI GPT for generation. Deployed as a web app on Vercel.',
      features: [
        'Context-grounded medical answers',
        'Semantic vector retrieval over a medical corpus',
        'Conversational memory',
        'Source-grounded generation to limit hallucination',
      ],
      challenges:
        'Chunking medical documents meaningfully, minimizing hallucination on clinical topics, and keeping retrieval + generation latency low.',
      relatedTech: ['LangChain', 'Pinecone', 'OpenAI GPT', 'Vercel'],
    },
  },
  {
    id: 'source-code-analysis-chatbot',
    name: 'Source Code Analysis Chatbot',
    description:
      'RAG-powered semantic search tool for querying and analyzing large codebases, using LangChain orchestration with FAISS vector stores for contextual code understanding.',
    category: 'LLM & RAG',
    techStack: ['LangChain', 'RAG', 'FAISS', 'GPT'],
    githubUrl: 'https://github.com/keshav-077/source-code-analysis-using-langchain',
    featured: true,
    featureOrder: 3,
    detail: {
      problem:
        'Understanding a large, unfamiliar codebase is slow and manual, and keyword search misses semantic intent.',
      solution:
        'A RAG chatbot that ingests a repository and answers natural-language questions about it with contextual, code-aware responses.',
      architecture:
        'Code files are loaded and chunked, embedded into a FAISS vector store, and retrieved by LangChain to ground GPT answers about the codebase.',
      features: [
        'Repository ingestion and indexing',
        'Semantic code search',
        'Contextual explanations of code',
        'Natural-language Q&A over source',
      ],
      challenges:
        'Chunking source code in semantically meaningful units and working within LLM context-window limits for large repos.',
      relatedTech: ['LangChain', 'FAISS', 'OpenAI GPT'],
    },
  },
  {
    id: 'vertexai-rag',
    name: 'VertexAI RAG Implementation',
    description:
      'Complete Retrieval-Augmented Generation pipeline built on Google Cloud VertexAI, enabling context-aware AI responses through efficient document retrieval and LLM synthesis.',
    category: 'LLM & RAG',
    techStack: ['VertexAI', 'RAG', 'GCP', 'LangChain'],
    githubUrl: 'https://github.com/keshav-077/vertexai-rag-implementation',
  },
  {
    id: 'vertexai-llm-finetuning',
    name: 'VertexAI LLM Fine-Tuning',
    description:
      'Comprehensive supervised fine-tuning pipeline for large language models using Google Cloud VertexAI, covering data preparation, training configuration, and model deployment.',
    category: 'LLM & RAG',
    techStack: ['VertexAI', 'Fine-Tuning', 'GCP', 'LLM'],
    githubUrl: 'https://github.com/keshav-077/vertexai-llm-finetuning',
  },
  {
    id: 'vertexai-gemini-chatbot',
    name: 'VertexAI Gemini Chatbot',
    description:
      "Production-ready conversational chatbot powered by Google's Gemini model through VertexAI, featuring streaming responses and optimized prompt engineering for real-world deployment.",
    category: 'LLM & RAG',
    techStack: ['Gemini', 'VertexAI', 'GCP', 'Chatbot'],
    githubUrl: 'https://github.com/keshav-077/vertexai-gemini-chatbot',
  },
  {
    id: 'chainlit-llm-assistant',
    name: 'Chainlit LLM Assistant',
    description:
      'Conversational AI application built with the Chainlit framework, delivering intuitive LLM-powered interactions with rich UI elements and seamless chat-based workflows.',
    category: 'LLM & RAG',
    techStack: ['Chainlit', 'LLM', 'Python', 'AI'],
    githubUrl: 'https://github.com/keshav-077/chainlit-llm-assistant',
  },
  {
    id: 'vibe-apply-job-automation',
    name: 'Vibe Apply — Job Search Automation',
    description:
      'Intelligent job-hunting automation tool that scrapes listings, auto-generates tailored cover letters, and sends personalized cold emails — eliminating repetitive application workflows.',
    category: 'LLM & RAG',
    techStack: ['Automation', 'NLP', 'Python', 'LLM'],
    githubUrl: 'https://github.com/keshav-077/-Job-Application-Assistant-HackByte3.0',
  },

  // ---------------------------------------------------------------------------
  // Computer Vision (includes real-time detection & surveillance)
  // ---------------------------------------------------------------------------
  {
    id: 'ai-border-security',
    name: 'AI-Driven Border Security & Strategic Management System',
    description:
      'Real-time weapon detection and person re-identification pipeline for border security, combining YOLOv8 object detection with OSNet re-identification for high-accuracy threat monitoring.',
    category: 'Computer Vision',
    techStack: ['YOLOv8', 'OSNet', 'OpenCV', 'Python'],
    githubUrl:
      'https://github.com/keshav-077/AI-Driven-Border-Security-and-Strategic-Management-System',
    featured: true,
    featureOrder: 2,
    detail: {
      problem:
        'Manual surveillance cannot reliably detect threats and re-identify individuals across multiple camera feeds in real time.',
      solution:
        'A real-time pipeline that detects weapons and re-identifies people across cameras, feeding a strategic monitoring dashboard.',
      architecture:
        'YOLOv8 performs real-time weapon/object detection; OSNet handles person re-identification across camera feeds; OpenCV drives the video pipeline and alerting layer.',
      features: [
        'Real-time weapon detection',
        'Cross-camera person re-identification',
        'Live video processing pipeline',
        'Threat alerting for strategic management',
      ],
      challenges:
        'Sustaining real-time inference throughput while keeping re-identification accurate across changing viewpoints and lighting.',
      relatedTech: ['YOLOv8', 'OSNet', 'OpenCV'],
    },
  },
  {
    id: 'intelligent-vehicle-recognition-alpr',
    name: 'Intelligent Vehicle Recognition Platform (ALPR)',
    description:
      'Production-grade Automatic License Plate Recognition system that combines YOLOv5 for vehicle detection with InceptionResNetV2 for license plate recognition. It detects vehicles, crops plate regions, performs OCR with Tesseract, and exposes both a Flask production app and a Streamlit demo, plus a documented REST API returning plate text, confidence scores, and bounding-box coordinates.',
    category: 'Computer Vision',
    techStack: [
      'Python',
      'TensorFlow',
      'Keras',
      'OpenCV',
      'PIL',
      'YOLOv5',
      'ONNX',
      'InceptionResNetV2',
      'Tesseract OCR',
      'PyTesseract',
      'Flask',
      'Streamlit',
      'Bootstrap 5',
      'Gunicorn',
    ],
    githubUrl: 'https://github.com/keshav-077/intelligent-vehicle-recognition-platform',
    featured: true,
    featureOrder: 4,
    detail: {
      problem:
        'Automating reliable vehicle and license-plate recognition for access control and monitoring requires stitching detection, cropping, and OCR into a production-ready service.',
      solution:
        'A production-grade ALPR platform that detects vehicles, isolates plate regions, and recognizes plate text, exposed through both a Flask production app and a Streamlit demo with a documented REST API.',
      architecture:
        'YOLOv5 detects the vehicle and localizes the plate region; the cropped plate is passed to InceptionResNetV2 and Tesseract OCR for recognition. A Flask app (port 5000) serves production traffic behind Gunicorn, a Streamlit app (port 8501) provides an interactive demo, and a REST API returns recognized plate text, confidence scores, and bounding-box coordinates.',
      features: [
        'YOLOv5 vehicle detection and plate localization',
        'InceptionResNetV2 + Tesseract OCR plate recognition',
        'Documented REST API (plate text, confidence, bounding boxes)',
        'Dual interfaces: Flask production app and Streamlit demo',
      ],
      challenges:
        'Achieving robust OCR accuracy across varied plate styles and lighting while keeping the multi-stage detection → OCR pipeline responsive.',
      relatedTech: ['YOLOv5', 'InceptionResNetV2', 'Tesseract OCR', 'Flask', 'Streamlit'],
    },
  },
  {
    id: 'deepfake-detection',
    name: 'Deepfake Detection',
    description:
      'Robust deepfake video detection framework fusing EfficientNet-B0 spatial features with BiLSTM temporal modeling to identify manipulated media with high accuracy.',
    category: 'Computer Vision',
    techStack: ['EfficientNet', 'BiLSTM', 'PyTorch', 'CNN'],
    githubUrl: 'https://github.com/keshav-077/DeepFake-Detection-using-Deep-Learning',
    featured: true,
    featureOrder: 6,
    detail: {
      problem:
        'Manipulated video ("deepfakes") erodes trust in digital media and is difficult to detect from single frames alone.',
      solution:
        'A detector that combines spatial and temporal signals to classify videos as authentic or manipulated with high accuracy.',
      architecture:
        'EfficientNet-B0 extracts per-frame spatial features which are sequenced through a BiLSTM to model temporal inconsistencies, followed by a classification head.',
      features: [
        'Spatial + temporal deepfake detection',
        'Frame-sequence modeling with BiLSTM',
        'High-accuracy authenticity classification',
      ],
      challenges:
        'Generalizing across different manipulation techniques and compression artifacts without overfitting to a single dataset.',
      relatedTech: ['EfficientNet-B0', 'BiLSTM', 'PyTorch'],
    },
  },
  {
    id: 'object-detection-hackbyte',
    name: 'Duality HackByte — YOLOv8 Object Detection',
    description:
      'Optimized lightweight object detection pipeline built on YOLOv8s with advanced augmentation strategies and tuned hyperparameters for the Duality HackByte competition dataset.',
    category: 'Computer Vision',
    techStack: ['YOLOv8s', 'Augmentation', 'Python', 'CV'],
    githubUrl:
      'https://github.com/keshav-077/Duality-HackByte-Object-Detection-using-YOLOv8s',
  },
  {
    id: 'sign-language-detection',
    name: 'Sign Language Detection',
    description:
      'Real-time sign language gesture recognition using MediaPipe hand tracking combined with custom CNN architectures for accessible communication assistance.',
    category: 'Computer Vision',
    techStack: ['MediaPipe', 'CNN', 'TensorFlow', 'OpenCV'],
    githubUrl: 'https://github.com/keshav-077/Sign_Language_Detection',
  },

  // ---------------------------------------------------------------------------
  // Generative AI
  // ---------------------------------------------------------------------------
  {
    id: 'dcgan-image-generation',
    name: 'Image Generation with DCGAN',
    description:
      'Deep Convolutional GAN implementation for high-quality image synthesis, utilizing convolutional-transpose layers with progressive training for realistic output generation.',
    category: 'Generative AI',
    techStack: ['DCGAN', 'PyTorch', 'GANs', 'CNN'],
    githubUrl: 'https://github.com/keshav-077/1mage-Generation-using-DCGAN',
  },
  {
    id: 'vae-digit-generation',
    name: 'Digit Generation with VAE',
    description:
      'Variational Autoencoder built with TensorFlow/Keras for generating novel MNIST-style digit images through learned latent space representations and probabilistic decoding.',
    category: 'Generative AI',
    techStack: ['VAE', 'TensorFlow', 'Keras', 'Generative'],
    githubUrl: 'https://github.com/keshav-077/Digit-Generation-Using-VAE',
  },
  {
    id: 'progressive-gan',
    name: 'Progressive GAN Implementation',
    description:
      'Progressive Growing GAN for high-resolution image synthesis with smooth layer transitions, scaling from 4×4 to 256×256 resolution through incremental network growth.',
    category: 'Generative AI',
    techStack: ['PyTorch', 'GANs', 'Progressive Training', 'CNN'],
    githubUrl: 'https://github.com/keshav-077/Progressive-GAN-Implementation',
  },
  {
    id: 'wgan',
    name: 'Wasserstein GAN (WGAN)',
    description:
      "Wasserstein GAN implementation leveraging Earth Mover's distance for stable adversarial training and high-quality image generation with improved convergence.",
    category: 'Generative AI',
    techStack: ['WGAN', 'PyTorch', 'GANs', 'Optimization'],
    githubUrl: 'https://github.com/keshav-077/WGAN-GAN-Implementation',
  },
  {
    id: 'srgan',
    name: 'Super-Resolution GAN (SRGAN)',
    description:
      'Photo-realistic single image super-resolution using perceptual loss and adversarial training, achieving 4× upscaling with sharp, natural detail recovery.',
    category: 'Generative AI',
    techStack: ['SRGAN', 'PyTorch', 'Super-Resolution', 'CNN'],
    githubUrl: 'https://github.com/keshav-077/Super-Resolution-GAN-SRGAN',
  },
  {
    id: 'cyclegan',
    name: 'CycleGAN Image Translation',
    description:
      'Unpaired image-to-image translation using Cycle-Consistent Adversarial Networks for seamless domain transformation without paired training data.',
    category: 'Generative AI',
    techStack: ['CycleGAN', 'PyTorch', 'Image Translation', 'GANs'],
    githubUrl: 'https://github.com/keshav-077/CycleGAN-Image-Translation',
  },
  {
    id: 'ddpm-diffusion',
    name: 'Diffusion Models (DDPM)',
    description:
      'State-of-the-art image generation using Denoising Diffusion Probabilistic Models with TensorFlow, implementing iterative noise removal for high-fidelity synthesis.',
    category: 'Generative AI',
    techStack: ['DDPM', 'TensorFlow', 'Diffusion', 'Generative'],
    githubUrl: 'https://github.com/keshav-077/Diffusion-Models-Implementation',
  },
  {
    id: 'clothes-inpainting-sam',
    name: 'Clothes Inpainting with SAM',
    description:
      "AI-powered clothes replacement pipeline combining Meta's Segment Anything Model for precise garment segmentation with Stable Diffusion for photorealistic inpainting and outfit generation.",
    category: 'Generative AI',
    techStack: ['SAM', 'Stable Diffusion', 'Inpainting', 'Python'],
    githubUrl: 'https://github.com/keshav-077/clothes-inpainting-sam',
  },
  {
    id: 'multimodal-generation-ai',
    name: 'Multimodal Generation AI',
    description:
      'Multimodal AI image generation system leveraging CLIP for semantic text-image alignment and VQGAN for high-fidelity visual synthesis from natural language prompts.',
    category: 'Generative AI',
    techStack: ['CLIP', 'VQGAN', 'PyTorch', 'Multimodal'],
    githubUrl: 'https://github.com/keshav-077/multimodal-generation-ai',
  },

  // ---------------------------------------------------------------------------
  // NLP
  // ---------------------------------------------------------------------------
  {
    id: 'language-translation-summarization',
    name: 'Language Translation & Summarization',
    description:
      'End-to-end multi-language translation and text summarization pipeline leveraging mBART for translation and Pegasus for abstractive summarization of long documents.',
    category: 'NLP',
    techStack: ['mBART', 'Pegasus', 'HuggingFace', 'NLP'],
    githubUrl: 'https://github.com/keshav-077/Language-Translation-and-Summarization',
    featured: true,
    featureOrder: 5,
    detail: {
      problem:
        'Cross-language document understanding and digesting long documents are slow, manual tasks that off-the-shelf tools handle poorly together.',
      solution:
        'An end-to-end pipeline that translates across languages and produces abstractive summaries of long documents.',
      architecture:
        'mBART performs multilingual translation and Pegasus generates abstractive summaries, both served through Hugging Face Transformers.',
      features: [
        'Multi-language translation',
        'Abstractive long-document summarization',
        'Composable translate-then-summarize pipeline',
      ],
      challenges:
        'Handling long documents within model limits while preserving meaning across translation and summarization.',
      relatedTech: ['mBART', 'Pegasus', 'Hugging Face Transformers'],
    },
  },
  {
    id: 'sentiment-analysis-engine',
    name: 'Sentiment / Hate Speech Detection',
    description:
      'NLP classifier detecting toxic, aggressive, and hateful language patterns in digital communications, enabling safer online interactions through real-time content moderation.',
    category: 'NLP',
    techStack: ['NLP', 'Classification', 'Python', 'ML'],
    githubUrl: 'https://github.com/keshav-077/Sentiment_analysis',
  },

  // ---------------------------------------------------------------------------
  // Reinforcement Learning
  // ---------------------------------------------------------------------------
  {
    id: 'rl-music-recommendation',
    name: 'Music Recommendation System',
    description:
      'Reinforcement learning-based music recommendation engine that dynamically adapts to user listening patterns using reward-driven preference optimization.',
    category: 'Reinforcement Learning',
    techStack: ['RL', 'Python', 'Gym', 'PyTorch'],
    githubUrl:
      'https://github.com/keshav-077/Music-Recommend-system-using-Reinforcement-Learning',
  },

  // ---------------------------------------------------------------------------
  // AI for Agriculture & Science
  // ---------------------------------------------------------------------------
  {
    id: 'crop-disease-detection',
    name: 'Crop Detection',
    description:
      'CNN-based precision agriculture tool for automated crop and disease classification from leaf images, enabling early intervention and improved farming outcomes.',
    category: 'AI for Agriculture & Science',
    techStack: ['CNN', 'TensorFlow', 'OpenCV', 'Agriculture'],
    githubUrl: 'https://github.com/keshav-077/Crop_Detection',
  },
  {
    id: 'earthquake-prediction',
    name: 'Earthquake Magnitude Prediction',
    description:
      'Deep learning model for seismic activity forecasting using LSTM networks trained on historical geological data with feature engineering for temporal pattern recognition.',
    category: 'AI for Agriculture & Science',
    techStack: ['LSTM', 'Scikit-learn', 'TensorFlow', 'Pandas'],
    githubUrl: 'https://github.com/keshav-077/Earthquake_prediction',
  },

  // ---------------------------------------------------------------------------
  // Cloud & Distributed Systems
  // ---------------------------------------------------------------------------
  {
    id: 'cloudstack-messenger',
    name: 'CloudStack Messenger',
    description:
      'Modern cloud-native messaging platform built with React, Go, PostgreSQL, Redis & Nginx — a full-stack microservices architecture with Docker-containerized deployment.',
    category: 'Cloud & Distributed Systems',
    techStack: ['React', 'Go', 'PostgreSQL', 'Redis', 'Nginx', 'Docker'],
    githubUrl: 'https://github.com/keshav-077/cloudstack-messenger',
    featured: true,
    featureOrder: 7,
    detail: {
      problem:
        'Building a scalable, real-time messaging platform requires coordinating multiple services, persistence, and low-latency delivery.',
      solution:
        'A cloud-native messaging platform built as containerized microservices with a React client and a Go backend.',
      architecture:
        'A React frontend talks to Go microservices behind an Nginx gateway; PostgreSQL provides durable storage and Redis handles caching / real-time delivery, all packaged with Docker.',
      features: [
        'Real-time messaging',
        'Microservices architecture',
        'Containerized deployment with Docker',
        'PostgreSQL persistence + Redis caching',
      ],
      challenges:
        'Ensuring reliable real-time delivery and orchestrating multiple services with consistent state.',
      relatedTech: ['React', 'Go', 'PostgreSQL', 'Redis', 'Nginx', 'Docker'],
    },
  },
  {
    id: 'broken-semantic-search',
    name: 'Broken Semantic Search (Fixed)',
    description:
      'Diagnosed and repaired a broken semantic search service, restoring correct vector-based retrieval and ranking through systematic debugging of the embedding and query pipeline.',
    category: 'Cloud & Distributed Systems',
    techStack: ['Python', 'Vector Search', 'Embeddings', 'Debugging'],
    githubUrl: 'https://github.com/keshav-077/broken-semantic-search-v3-fixed',
  },
  {
    id: 'durable-queue-wal',
    name: 'Durable Queue (Write-Ahead Log Recovery)',
    description:
      'A durable message queue implementing write-ahead logging for crash recovery and reliable delivery, demonstrating systems-level persistence and fault-tolerance techniques.',
    category: 'Cloud & Distributed Systems',
    techStack: ['Python', 'Write-Ahead Log', 'Systems', 'Fault Tolerance'],
    githubUrl:
      'https://github.com/keshav-077/Durable-Queue-WAL-Recovery-Implementation',
  },

  // ---------------------------------------------------------------------------
  // Desktop AI Applications
  // ---------------------------------------------------------------------------
  {
    id: 'dontcaught-ai-assistant',
    name: 'DontCaught — Stealth AI Desktop Assistant',
    description:
      'Lightweight desktop AI assistant built with Tauri and React, featuring a translucent overlay invisible to video calls and screen recordings while providing real-time AI-powered assistance.',
    category: 'Desktop AI Applications',
    techStack: ['Tauri', 'React', 'AI', 'Desktop'],
    githubUrl: 'https://github.com/keshav-077/Dontcaught-AI-assistant',
  },
];

export default projects;
