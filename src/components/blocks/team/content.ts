// Team content data based on examples; content/design unchanged
import type { GridTeamData, SplitTeamData } from "@ui8kit/blocks";

interface GridTeamDataContent {
  gridTeamGrid: GridTeamData,
  gridTeamCards: GridTeamData,
  gridTeamMinimal: GridTeamData,
  gridTeamShowcase: GridTeamData,
  gridTeamDirectory: GridTeamData
}

interface SplitTeamDataContent {
  splitTeamLeadership: SplitTeamData,
  splitTeamShowcase: SplitTeamData,
  splitTeamHiring: SplitTeamData,
  splitTeamCulture: SplitTeamData,
  splitTeamDepartments: SplitTeamData
}

const sampleTeamMembers = [
  {
    id: "member-1",
    name: "Sarah Johnson",
    position: "CEO & Founder",
    description: "Visionary leader with 15+ years of experience in technology and business development.",
    department: "Leadership",
    bio: "Visionary leader with 15+ years of experience in technology and business development.",
    avatar: { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", alt: "Sarah Johnson" },
    social: { linkedin: "https://linkedin.com/in/sarahjohnson", twitter: "https://twitter.com/sarahj", website: "https://sarahjohnson.com" },
    skills: ["Strategy", "Leadership", "Innovation"],
    location: "San Francisco, CA",
    featured: true
  },
  {
    id: "member-2",
    name: "Michael Chen",
    position: "CTO",
    description: "Technical architect and engineering leader focused on scalable systems and team growth.",
    department: "Engineering",
    bio: "Technical architect and engineering leader focused on scalable systems and team growth.",
    social: { linkedin: "https://linkedin.com/in/michaelchen", email: "michael@company.com" },
    skills: ["Architecture", "Cloud", "Team Building"],
    location: "Seattle, WA",
    featured: true
  },
  {
    id: "member-3",
    name: "Emily Rodriguez",
    position: "Head of Product",
    description: "Product strategist with a passion for user experience and data-driven decision making.",
    department: "Product",
    bio: "Product strategist with a passion for user experience and data-driven decision making.",
    avatar: { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", alt: "Emily Rodriguez" },
    social: { linkedin: "https://linkedin.com/in/emilyrodriguez", website: "https://emilyrodriguez.design" },
    skills: ["Product Strategy", "UX Design", "Analytics"],
    location: "Austin, TX",
    featured: true
  },
  {
    id: "member-4",
    name: "David Park",
    position: "Senior Developer",
    description: "Full-stack developer with expertise in React, Node.js, and cloud technologies.",
    department: "Engineering",
    bio: "Full-stack developer with expertise in React, Node.js, and cloud technologies.",
    social: { linkedin: "https://linkedin.com/in/davidpark", twitter: "https://twitter.com/davidpark_dev" },
    skills: ["React", "Node.js", "AWS"],
    location: "Remote"
  },
  {
    id: "member-5",
    name: "Lisa Thompson",
    position: "Marketing Director",
    description: "Creative marketing professional specializing in digital campaigns and brand development.",
    department: "Marketing",
    bio: "Creative marketing professional specializing in digital campaigns and brand development.",
    avatar: { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", alt: "Lisa Thompson" },
    social: { linkedin: "https://linkedin.com/in/lisathompson", twitter: "https://twitter.com/lisa_marketing" },
    skills: ["Digital Marketing", "Brand Strategy", "Growth"],
    location: "New York, NY"
  },
  {
    id: "member-6",
    name: "Alex Kumar",
    position: "Data Scientist",
    description: "Data scientist with expertise in machine learning and statistical analysis.",
    department: "Analytics",
    bio: "Data scientist with expertise in machine learning and statistical analysis.",
    social: { linkedin: "https://linkedin.com/in/alexkumar", email: "alex@company.com" },
    skills: ["Machine Learning", "Python", "Statistics"],
    location: "Boston, MA",
    featured: true
  },
  {
    id: "member-7",
    name: "Maria Santos",
    position: "UX Designer",
    description: "User experience designer passionate about creating intuitive and accessible digital experiences.",
    department: "Design",
    bio: "User experience designer passionate about creating intuitive and accessible digital experiences.",
    avatar: { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", alt: "Maria Santos" },
    social: { linkedin: "https://linkedin.com/in/mariasantos", website: "https://mariasantos.design" },
    skills: ["UX Design", "User Research", "Prototyping"],
    location: "Los Angeles, CA"
  },
  {
    id: "member-8",
    name: "James Wilson",
    position: "DevOps Engineer",
    description: "DevOps specialist focused on automation, monitoring, and reliable deployment pipelines.",
    department: "Engineering",
    bio: "DevOps specialist focused on automation, monitoring, and reliable deployment pipelines.",
    social: { linkedin: "https://linkedin.com/in/jameswilson", twitter: "https://twitter.com/james_devops" },
    skills: ["Docker", "Kubernetes", "CI/CD"],
    location: "Denver, CO"
  }
];

export const GridTeamContent: GridTeamDataContent = {
  gridTeamGrid: {
    title: "Meet Our Team",
    description: "Talented professionals working together to build amazing products and deliver exceptional results.",
    badge: "Our Team",
    members: sampleTeamMembers,
    stats: { totalMembers: "50+", departments: "8", locations: "12" }
  },
  gridTeamCards: {
    title: "Our Amazing Team",
    subtitle: "Get to know the passionate individuals who make our company successful every day.",
    badge: "Team Spotlight",
    members: sampleTeamMembers.slice(0, 6)
  },
  gridTeamMinimal: {
    title: "The People Behind Our Success",
    subtitle: "Simple introductions to the talented individuals driving our mission forward.",
    badge: "Team",
    members: sampleTeamMembers.slice(0, 8)
  },
  gridTeamShowcase: {
    title: "Our World-Class Team",
    description: "Meet the exceptional professionals who bring diverse expertise and passion to everything we do.",
    members: sampleTeamMembers,
    hiring: { title: "Join Our Team", description: "We're always looking for talented individuals to join our growing company.", openPositions: 5 }
  },
  gridTeamDirectory: {
    title: "Team Directory",
    description: "Browse our complete team directory to find the right person for your needs.",
    members: sampleTeamMembers,
    stats: { totalMembers: "50+", departments: "8", locations: "12" }
  }
};

export const SplitTeamContent: SplitTeamDataContent = {
  splitTeamLeadership: {
    title: "Meet Our Leadership Team",
    description: "Experienced leaders driving innovation and growth with a shared vision for the future of technology.",
    badge: "Leadership",
    members: sampleTeamMembers,
    stats: { totalMembers: "50+", departments: "8", locations: "12" }
  },
  splitTeamShowcase: {
    title: "Our Amazing Team",
    subtitle: "Talented professionals from diverse backgrounds working together to build the future.",
    badge: "Meet the Team",
    members: sampleTeamMembers
  },
  splitTeamHiring: {
    title: "Join Our Growing Team",
    description: "We're always looking for passionate individuals who want to make a difference and grow their careers with us.",
    members: sampleTeamMembers,
    hiring: {
      title: "We're Hiring!",
      description: "Explore exciting opportunities across engineering, product, design, and marketing roles.",
      ctaText: "View Open Positions",
      openPositions: 8
    }
  },
  splitTeamCulture: {
    title: "Our Culture & Values",
    subtitle: "Building an inclusive, innovative, and collaborative workplace where everyone can thrive.",
    badge: "Company Culture",
    members: sampleTeamMembers,
    stats: { totalMembers: "50+", locations: "12", departments: "8" }
  },
  splitTeamDepartments: {
    title: "Cross-Functional Excellence",
    description: "Our diverse departments work together seamlessly to deliver exceptional results and drive innovation across all areas of our business.",
    members: sampleTeamMembers,
    stats: { totalMembers: "50+", departments: "8", locations: "12" }
  }
};


