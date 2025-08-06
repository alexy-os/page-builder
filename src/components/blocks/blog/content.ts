import type { SplitBlogData, GridBlogData } from "@ui8kit/blocks";

interface SplitBlogDataContent {
  news: SplitBlogData;
  slider: SplitBlogData;
  featured: SplitBlogData;
  newsletter: SplitBlogData;
  timeline: SplitBlogData;
}

interface GridBlogDataContent {
  cards: GridBlogData;
  postsGrid: GridBlogData;
  filtered: GridBlogData;
  compact: GridBlogData;
  featured: GridBlogData;
}

// Sample blog posts data
const samplePosts = [
  {
    id: "1",
    title: "Getting Started with React 18 and Concurrent Features",
    description: "Learn how to leverage React 18's new concurrent features to build faster, more responsive applications with better user experience.",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c5f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    date: "Mar 15, 2024",
    readTime: "8 min read",
    image: {
      src: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "React development"
    },
    category: "React",
    categoryId: "react"
  },
  {
    id: "2",
    title: "Building Scalable APIs with Node.js and TypeScript",
    description: "A comprehensive guide to creating robust, type-safe APIs that can handle enterprise-level traffic and complexity.",
    author: {
      name: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    date: "Mar 12, 2024",
    readTime: "12 min read",
    image: {
      src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Node.js development"
    },
    category: "Backend",
    categoryId: "backend"
  },
  {
    id: "3",
    title: "CSS Grid vs Flexbox: When to Use Each Layout Method",
    description: "Understanding the differences between CSS Grid and Flexbox, and knowing when to use each for optimal web layouts.",
    author: {
      name: "Emma Thompson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    date: "Mar 10, 2024",
    readTime: "6 min read",
    image: {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "CSS layout design"
    },
    category: "CSS",
    categoryId: "css"
  },
  {
    id: "4",
    title: "Database Design Patterns for Modern Applications",
    description: "Explore essential database design patterns that will help you build efficient, maintainable data layers for your applications.",
    author: {
      name: "David Park",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    date: "Mar 8, 2024",
    readTime: "10 min read",
    image: {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Database design"
    },
    category: "Database",
    categoryId: "database"
  },
  {
    id: "5",
    title: "Advanced Git Workflows for Team Collaboration",
    description: "Master advanced Git techniques and workflows that will streamline your team's development process and reduce conflicts.",
    author: {
      name: "Lisa Johnson",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    date: "Mar 5, 2024",
    readTime: "7 min read",
    image: {
      src: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Git workflow"
    },
    category: "DevOps",
    categoryId: "devops"
  },
  {
    id: "6",
    title: "Mobile-First Design Principles and Best Practices",
    description: "Learn how to design and develop applications with a mobile-first approach for better user experience across all devices.",
    author: {
      name: "Alex Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    date: "Mar 3, 2024",
    readTime: "9 min read",
    image: {
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Mobile design"
    },
    category: "Design",
    categoryId: "design"
  }
];

const sampleCategories = [
  { id: "react", name: "React" },
  { id: "backend", name: "Backend" },
  { id: "css", name: "CSS" },
  { id: "database", name: "Database" },
  { id: "devops", name: "DevOps" },
  { id: "design", name: "Design" }
];

const featuredPost = {
  id: "featured",
  title: "The Complete Guide to Modern JavaScript Frameworks",
  description: "An in-depth comparison of React, Vue, Angular, and Svelte, helping you choose the right framework for your next project based on performance, learning curve, and ecosystem.",
  author: {
    name: "Alex Kim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
  },
  date: "Mar 18, 2024",
  readTime: "15 min read",
  image: {
    src: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "JavaScript frameworks comparison"
  },
  category: "JavaScript",
  categoryId: "javascript"
};

export const SplitBlogContent: SplitBlogDataContent = {
  news: {
    badge: "Tech News",
    title: "Latest in Technology",
    subtitle: "Stay informed with the latest developments",
    description: "Get the most recent updates, insights, and analysis from the world of technology and software development.",
    posts: samplePosts
  },
  slider: {
    tagline: "Featured Articles",
    title: "Trending posts this week",
    description: "Discover the most popular and engaging articles from our community of expert developers and designers.",
    viewAllText: "View All Articles",
    posts: samplePosts
  },
  featured: {
    badge: "Editor's Choice",
    title: "Must-read article of the month",
    description: "Our editorial team has selected this comprehensive guide as essential reading for all web developers.",
    posts: samplePosts,
    featuredPost
  },
  newsletter: {
    badge: "Weekly Digest",
    title: "Subscribe to our developer newsletter",
    description: "Get the best articles, tutorials, and industry insights delivered directly to your inbox every week.",
    posts: samplePosts.slice(0, 3)
  },
  timeline: {
    badge: "Development Journey",
    title: "Our latest project milestones",
    description: "Follow our development journey as we build and iterate on new features.",
    posts: [
      {
        ...samplePosts[0],
        date: "Week 4 - Mar 15",
        title: "Launch: AI-Powered Code Completion",
        description: "Successfully launched our new AI-powered code completion feature, reducing development time by 40%."
      },
      {
        ...samplePosts[1],
        date: "Week 3 - Mar 8",
        title: "Beta Testing: Advanced Analytics Dashboard",
        description: "Started beta testing with 100+ developers. Initial feedback shows 95% satisfaction rate."
      },
      {
        ...samplePosts[2],
        date: "Week 2 - Mar 1",
        title: "Research: Developer Workflow Optimization",
        description: "Completed comprehensive research on developer workflows, identifying key pain points and opportunities."
      },
      {
        ...samplePosts[3],
        date: "Week 1 - Feb 22",
        title: "Planning: Q2 Feature Roadmap",
        description: "Finalized our Q2 roadmap based on user feedback and market research, prioritizing performance improvements."
      }
    ]
  }
};

export const GridBlogContent: GridBlogDataContent = {
  cards: {
    badge: "Latest Posts",
    title: "Discover our latest insights",
    description: "Stay up-to-date with the latest trends, tutorials, and best practices.",
    posts: samplePosts
  },
  postsGrid: {
    badge: "Blog",
    title: "Expert insights and tutorials",
    description: "Learn from industry experts and level up your development skills.",
    buttonText: "View All Posts",
    posts: samplePosts
  },
  filtered: {
    badge: "Topics",
    title: "Browse by category",
    description: "Find articles that match your interests.",
    categories: sampleCategories,
    posts: samplePosts
  },
  compact: {
    badge: "Recent",
    title: "Latest updates",
    description: "Quick access to our most recent articles.",
    posts: samplePosts.slice(0, 4)
  },
  featured: {
    badge: "Featured",
    title: "Editor's picks and trending articles",
    description: "Our most popular and impactful articles.",
    posts: samplePosts
  }
};
