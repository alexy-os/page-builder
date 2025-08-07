// Post content data based on examples; content/design unchanged
import type { CenteredPostData, SplitPostData } from "@ui8kit/blocks";

interface CenteredPostDataContent {
  centeredPostClassic: CenteredPostData,
  centeredPostMinimal: CenteredPostData,
  centeredPostMagazine: CenteredPostData,
  centeredPostFeatured: CenteredPostData,
  centeredPostEditorial: CenteredPostData
}

interface SplitPostDataContent {
  splitPostStandard: SplitPostData,
  splitPostAuthor: SplitPostData,
  splitPostMedia: SplitPostData,
  splitPostSidebar: SplitPostData,
  splitPostHero: SplitPostData
}

const baseCenteredPost: CenteredPostData = {
  title: "The Future of Web Development: Trends to Watch in 2024",
  subtitle:
    "Exploring the latest innovations and technologies that will shape how we build web applications in the coming year.",
  excerpt:
    "From AI-powered development tools to advanced CSS features, discover the key trends that every developer should know about.",
  author: {
    name: "Sarah Johnson",
    role: "Senior Frontend Developer",
    bio: "Sarah is a passionate web developer with over 8 years of experience building modern web applications. She specializes in React and TypeScript."
  },
  meta: {
    category: "Technology",
    readTime: "8 min read",
    publishedDate: "March 15, 2024",
    views: "2.5K",
    likes: "184",
    comments: "23"
  },
  image: {
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    alt: "Modern web development workspace with multiple monitors showing code"
  },
  tags: ["Web Development", "JavaScript", "React", "TypeScript", "Frontend"],
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Technology", href: "/blog/technology" }
  ]
};

export const CenteredPostContent: CenteredPostDataContent = {
  centeredPostClassic: baseCenteredPost,
  centeredPostMinimal: {
    ...baseCenteredPost,
    title: "Minimalist Design Principles for Modern Interfaces",
    subtitle: undefined,
    excerpt: undefined
  },
  centeredPostMagazine: {
    ...baseCenteredPost,
    title: "The Art of Digital Storytelling",
    excerpt:
      "How modern brands are using interactive media and immersive experiences to connect with their audiences in meaningful ways.",
    author: { name: "David Chen", role: "Creative Director & UX Designer" },
    meta: { ...baseCenteredPost.meta, category: "Design" }
  },
  centeredPostFeatured: {
    ...baseCenteredPost,
    title: "Building Scalable Applications with Microservices",
    subtitle:
      "A comprehensive guide to architecting distributed systems that can handle millions of users while maintaining performance and reliability.",
    image: {
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      alt: "Server infrastructure and cloud computing visualization"
    },
    meta: { ...baseCenteredPost.meta, category: "Architecture", views: "12.8K", likes: "892", comments: "156" }
  },
  centeredPostEditorial: {
    ...baseCenteredPost,
    title: "The Philosophy of Code: Writing Software as Literature",
    subtitle:
      "Exploring the intersection between programming and creative writing, and how we can craft code that tells a story.",
    author: { name: "Dr. Emily Rodriguez", role: "Computer Science Professor & Author" },
    meta: { ...baseCenteredPost.meta, category: "Philosophy", readTime: "12 min read" },
    image: {
      src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      alt: "Vintage typewriter with programming books in background"
    }
  }
};

const baseSplitPost: SplitPostData = {
  title: "Mastering React Performance Optimization",
  subtitle: "Learn advanced techniques to make your React applications lightning fast",
  excerpt:
    "Discover proven strategies for optimizing React applications, from component memoization to bundle splitting and everything in between.",
  author: {
    name: "Alex Thompson",
    role: "Senior React Developer",
    bio: "Alex has been working with React for over 6 years and has helped optimize performance for applications serving millions of users."
  },
  meta: {
    category: "Development",
    readTime: "10 min read",
    publishedDate: "March 20, 2024",
    views: "4.2K",
    likes: "298",
    comments: "45"
  },
  image: {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    alt: "Developer working on React code optimization"
  },
  tags: ["React", "Performance", "JavaScript", "Optimization", "Frontend"],
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" }
  ],
  relatedLinks: [
    { title: "React Hooks Best Practices", href: "/blog/react-hooks" },
    { title: "State Management Patterns", href: "/blog/state-management" },
    { title: "Modern JavaScript Techniques", href: "/blog/modern-js" }
  ]
};

export const SplitPostContent: SplitPostDataContent = {
  splitPostStandard: baseSplitPost,
  splitPostAuthor: {
    ...baseSplitPost,
    title: "Design Systems That Scale: Lessons from Industry Leaders",
    excerpt:
      "Building design systems that can grow with your organization while maintaining consistency and usability across all touchpoints.",
    author: { name: "Maria Garcia", role: "Design Systems Lead", bio: "Maria has led design system initiatives at three Fortune 500 companies and is passionate about creating scalable, accessible design solutions." },
    meta: { ...baseSplitPost.meta, category: "Design Systems", readTime: "15 min read" },
    image: { src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80", alt: "Design system components and style guide" }
  },
  splitPostMedia: {
    ...baseSplitPost,
    title: "The Visual Guide to CSS Grid Layout",
    subtitle: "Master CSS Grid with interactive examples and real-world use cases",
    meta: { ...baseSplitPost.meta, category: "CSS", readTime: "6 min read" },
    image: { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80", alt: "CSS Grid layout visualization and code examples" },
    tags: ["CSS", "Grid", "Layout", "Frontend", "Tutorial"]
  },
  splitPostSidebar: {
    ...baseSplitPost,
    title: "Building Accessible Web Applications",
    author: { name: "Jennifer Kim", role: "Accessibility Engineer" },
    meta: { ...baseSplitPost.meta, category: "Accessibility", readTime: "12 min read" },
    image: { src: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80", alt: "Accessibility testing tools and screen reader" },
    relatedLinks: [
      { title: "WCAG Guidelines Explained", href: "/blog/wcag-guidelines" },
      { title: "Screen Reader Testing", href: "/blog/screen-reader-testing" },
      { title: "Color Contrast Best Practices", href: "/blog/color-contrast" },
      { title: "Keyboard Navigation Patterns", href: "/blog/keyboard-navigation" }
    ]
  },
  splitPostHero: {
    ...baseSplitPost,
    title: "The Complete Guide to Modern JavaScript",
    subtitle: "Everything you need to know about ES2024 features and beyond",
    author: { name: "Michael Chen", role: "JavaScript Architect & Technical Writer" },
    meta: { ...baseSplitPost.meta, category: "JavaScript", readTime: "20 min read", views: "15.7K", likes: "1.2K", comments: "89" },
    image: { src: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80", alt: "Modern JavaScript development environment with code editor" },
    tags: ["JavaScript", "ES2024", "Modern JS", "Programming", "Tutorial"]
  }
};


