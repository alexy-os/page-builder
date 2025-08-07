// Testimonial content data based on examples; content/design unchanged
import type { GridTestimonialData, SplitTestimonialData } from "@ui8kit/blocks";

interface GridTestimonialDataContent {
  gridTestimonialGrid: GridTestimonialData,
  gridTestimonialMasonry: GridTestimonialData,
  gridTestimonialMinimal: GridTestimonialData,
  gridTestimonialCards: GridTestimonialData,
  gridTestimonialCompact: GridTestimonialData,
  gridTestimonialSlider: GridTestimonialData,
  gridTestimonialMagazine: GridTestimonialData
}

interface SplitTestimonialDataContent {
  splitTestimonialFeatured: SplitTestimonialData,
  splitTestimonialCarousel: SplitTestimonialData,
  splitTestimonialStats: SplitTestimonialData
}

const sampleTestimonials = [
  { id: "testimonial-1", rating: 5, quote: "This product has completely transformed how our team works. The intuitive design and powerful features make complex tasks feel effortless.", author: "Sarah Johnson", position: "Product Manager", description: "This product has completely transformed how our team works.", company: "TechStart Inc", avatar: { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", alt: "Sarah Johnson" }, verified: true },
  { id: "testimonial-2", rating: 5, quote: "Outstanding customer service and product quality. The support team went above and beyond to ensure we had everything set up correctly.", author: "Michael Chen", position: "CTO", description: "Outstanding customer service and product quality.", company: "Digital Solutions Co", verified: true },
  { id: "testimonial-3", rating: 4, quote: "Great value for money. The features are comprehensive and the learning curve is minimal. Our productivity has increased significantly.", author: "Emily Rodriguez", position: "Operations Director", description: "Great value for money with comprehensive features.", company: "Growth Partners LLC", avatar: { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", alt: "Emily Rodriguez" }, verified: false },
  { id: "testimonial-4", rating: 5, quote: "Exceptional quality and attention to detail. The team clearly cares about delivering a superior user experience.", author: "David Park", position: "Senior Developer", description: "Exceptional quality and attention to detail.", company: "CodeCraft Studios", verified: true },
  { id: "testimonial-5", rating: 5, quote: "Seamless integration and fantastic results. The ROI was evident within the first month of usage.", author: "Lisa Thompson", position: "Marketing Director", description: "Seamless integration and fantastic results.", company: "Creative Agency Pro", avatar: { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", alt: "Lisa Thompson" }, verified: true },
  { id: "testimonial-6", rating: 4, quote: "Reliable and efficient solution that has streamlined our entire workflow. Highly recommended for growing businesses.", author: "Alex Kumar", position: "Business Analyst", description: "Reliable and efficient solution that has streamlined our workflow.", company: "Data Insights Ltd", verified: true },
  { id: "testimonial-7", rating: 5, quote: "The best investment we've made this year. Customer support is responsive and the platform is incredibly user-friendly.", author: "Maria Santos", position: "Project Manager", description: "The best investment we've made this year.", company: "Innovation Hub", avatar: { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", alt: "Maria Santos" }, verified: true },
  { id: "testimonial-8", rating: 5, quote: "Outstanding performance and reliability. This tool has become indispensable for our daily operations.", author: "James Wilson", position: "Tech Lead", description: "Outstanding performance and reliability.", company: "Future Systems", verified: false }
];

export const GridTestimonialContent: GridTestimonialDataContent = {
  gridTestimonialGrid: {
    title: "What Our Customers Say",
    description: "Join thousands of satisfied customers who have transformed their business with our platform.",
    badge: "Customer Reviews",
    testimonials: sampleTestimonials,
    stats: { averageRating: "4.8", totalReviews: "2,400+" }
  },
  gridTestimonialMasonry: {
    title: "Success Stories",
    subtitle: "Real experiences from real customers who've achieved incredible results with our solution.",
    testimonials: sampleTestimonials
  },
  gridTestimonialMinimal: {
    title: "Customer Voices",
    subtitle: "Simple, authentic feedback from the people who matter most.",
    badge: "Testimonials",
    testimonials: sampleTestimonials.slice(0, 4)
  },
  gridTestimonialCards: {
    title: "Customer Excellence Awards",
    badge: "Verified Reviews",
    testimonials: sampleTestimonials,
    stats: { totalReviews: "5,000+", averageRating: "4.9" }
  },
  gridTestimonialCompact: {
    title: "Quick Reviews",
    description: "See what customers are saying in a quick, digestible format.",
    testimonials: sampleTestimonials
  },
  gridTestimonialSlider: {
    title: "Customer Feedback Stream",
    description: "Browse through our latest customer reviews and success stories.",
    testimonials: sampleTestimonials
  },
  gridTestimonialMagazine: {
    title: "Featured Customer Stories",
    subtitle: "In-depth testimonials from industry leaders who trust our platform to drive their success.",
    badge: "Premium Reviews",
    testimonials: sampleTestimonials,
    stats: { totalReviews: "10K+", averageRating: "4.9", satisfied: "98%" }
  }
};

export const SplitTestimonialContent: SplitTestimonialDataContent = {
  splitTestimonialFeatured: {
    title: "Trusted by Industry Leaders",
    description: "See what our customers are saying about their experience with our platform and how it's transformed their business operations.",
    badge: "Customer Stories",
    testimonials: sampleTestimonials,
    ctaText: "Read All Reviews"
  },
  splitTestimonialCarousel: {
    title: "Join Thousands of Happy Customers",
    subtitle: "Discover why companies of all sizes choose our solution to drive their success.",
    badge: "Customer Reviews",
    testimonials: sampleTestimonials
  },
  splitTestimonialStats: {
    title: "Proven Results Speak for Themselves",
    description: "Our customers consistently rate us highly and see measurable improvements in their business metrics within weeks of implementation.",
    testimonials: sampleTestimonials,
    stats: { totalReviews: "2,500+", averageRating: "4.9", satisfied: "98%" },
    ctaText: "Start Your Free Trial"
  }
};


