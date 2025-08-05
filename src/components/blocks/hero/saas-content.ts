import type { CenteredHeroData, HeroData } from "@ui8kit/blocks";
import { Info, Rocket, Play, ArrowRight, Heart } from "lucide-react";
import { Code, BookOpen, ExternalLink, Shield, Zap } from "lucide-react";

interface CenteredHeroDataContent {
  centeredHeroSimple: CenteredHeroData;
  centeredHeroWithTopButton: CenteredHeroData;
  centeredHeroWithImage: CenteredHeroData;
  centeredHeroWithStats: CenteredHeroData;
  centeredHeroMission: CenteredHeroData;
}

interface SplitHeroDataContent {
  splitHeroMedia: HeroData;
  splitHeroLeftMedia: HeroData;
  splitHeroGallery: HeroData;
  splitHeroWithTopButton: HeroData;
  splitHeroSecurity: HeroData;
}

export const CenteredHeroContent: CenteredHeroDataContent = {
  centeredHeroSimple: {
    badge: 'SAAS Cloud Essentials',
    title: 'Launch and scale your SAAS applications effortlessly',
    description: 'Empower your business with our robust cloud platform designed for SAAS deployment, offering seamless scalability, real-time analytics, and secure infrastructure to grow your user base.' ,
    primaryButtonText: 'Start Your SAAS Journey',
    secondaryButtonText: 'View Demo',
    primaryButtonIcon: Rocket,
    secondaryButtonIcon: Play
  },
  centeredHeroWithTopButton: {
    topButton: {
      text: '✨ New: AI-optimized SAAS cloud solutions',
      href: '#'
    },
    badge: 'AI-Driven Cloud',
    title: 'Automate and optimize your SAAS operations with intelligent cloud tools',
    description: 'Leverage AI to streamline SAAS workflows, reduce costs, and enhance performance, allowing your team to focus on innovation while our cloud handles scalability and security.' ,
    primaryButtonText: 'Explore AI Features',
    secondaryButtonText: 'Learn More',
    primaryButtonIcon: Info,
    secondaryButtonIcon: Rocket
  },
  centeredHeroWithImage: {
    title: 'Visualize and manage your SAAS cloud architecture',
    description: 'Design, deploy, and monitor SAAS applications with intuitive tools that ensure high availability, data security, and effortless scaling for your cloud infrastructure.' ,
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'SAAS cloud management dashboard',
    primaryButtonText: 'Build Your SAAS Cloud',
    secondaryButtonText: 'Watch Tutorial'
  },
  centeredHeroWithStats: {
    badge: 'Trusted SAAS Platform',
    title: 'Join thousands trusting our SAAS cloud for reliable performance',
    description: 'Our cloud platform powers SAAS businesses worldwide, providing the tools for rapid deployment, advanced analytics, and enterprise-grade security.' ,
    stats: [
      {
        id: '1',
        value: '10M+',
        label: 'SAAS Deployments'
      },
      {
        id: '2',
        value: '150+',
        label: 'Countries'
      },
      {
        id: '3',
        value: '99.99%',
        label: 'Uptime'
      },
      {
        id: '4',
        value: '24/7',
        label: 'Support'
      }
    ],
    primaryButtonText: 'Get Started',
    secondaryButtonText: 'View Case Studies',
    primaryButtonIcon: ArrowRight
  },
  centeredHeroMission: {
    badge: 'Our SAAS Mission',
    title: 'Building cloud technologies that empower SAAS innovation',
    description: 'We are committed to providing SAAS businesses with secure, scalable cloud solutions that foster growth, collaboration, and global connectivity.' ,
    stats: [
      {
        id: '1',
        value: '500M+',
        label: 'API Calls Daily'
      },
      {
        id: '2',
        value: '195',
        label: 'Countries Served'
      },
      {
        id: '3',
        value: '1B+',
        label: 'User Sessions'
      }
    ],
    primaryButtonText: 'Join Our SAAS Cloud',
    secondaryButtonText: 'Read Our Story',
    primaryButtonIcon: Heart
  }
};

export const SplitHeroContent: SplitHeroDataContent = {
  splitHeroMedia: {
    badge: 'SAAS Cloud Launch',
    title: 'Build and deploy SAAS apps with cutting-edge cloud technology',
    description: 'Transform your SAAS ideas into scalable solutions with our cloud platform, featuring AI optimizations, robust security, and seamless integration.' ,
    image: {
      src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'SAAS cloud dashboard'
    },
    primaryButtonText: 'Start SAAS Deployment',
    secondaryButtonText: 'View Demo',
    primaryButtonIcon: Rocket,
    secondaryButtonIcon: Info
  },
  splitHeroLeftMedia: {
    badge: 'Developer Tools for SAAS',
    title: 'Code, deploy, and scale SAAS applications smarter',
    description: 'Equip your development team with SAAS-focused tools for building secure, high-performance cloud applications that adapt to growing demands.' ,
    image: {
      src: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'SAAS development environment'
    },
    primaryButtonText: 'Start Coding',
    secondaryButtonText: 'Documentation',
    primaryButtonIcon: Code,
    secondaryButtonIcon: BookOpen
  },
  splitHeroGallery: {
    badge: 'SAAS Portfolio Showcase',
    title: 'Highlight your SAAS successes with dynamic galleries',
    description: 'Present your SAAS products and case studies in an engaging way, backed by our cloud infrastructure for fast, secure, and scalable presentations.' ,
    images: [
      {
        id: '1',
        src: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        alt: 'SAAS portfolio example 1'
      },
      {
        id: '2',
        src: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        alt: 'SAAS portfolio example 2'
      },
      {
        id: '3',
        src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        alt: 'SAAS portfolio example 3'
      }
    ],
    primaryButtonText: 'Explore SAAS Gallery',
    secondaryButtonText: 'Learn More',
    primaryButtonIcon: BookOpen,
    secondaryButtonIcon: Code
  },
  splitHeroWithTopButton: {
    topButton: {
      text: '🎉 New Funding for SAAS Cloud',
      href: '#'
    },
    badge: 'SAAS Innovation Funding',
    title: 'We raised funds to enhance SAAS cloud capabilities',
    description: 'With new investments, we\'re advancing our SAAS platform to deliver even better security, AI features, and global scalability for your business.' ,
    images: [
      {
        id: '1',
        src: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        alt: 'SAAS funding showcase 1'
      },
      {
        id: '2',
        src: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        alt: 'SAAS funding showcase 2'
      },
      {
        id: '3',
        src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        alt: 'SAAS funding showcase 3'
      }
    ],
    primaryButtonText: 'Read More',
    secondaryButtonText: 'Join Us',
    primaryButtonIcon: ExternalLink,
    secondaryButtonIcon: Rocket
  },
  splitHeroSecurity: {
    badge: 'SAAS Security Solutions',
    title: 'Secure your SAAS applications with enterprise-grade cloud protection',
    description: 'Protect your SAAS business from threats with our comprehensive cloud security features, including encryption, compliance tools, and real-time monitoring.' ,
    image: {
      src: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      alt: 'SAAS security dashboard'
    },
    primaryButtonText: 'Start Security Audit',
    secondaryButtonText: 'View Features',
    primaryButtonIcon: Shield,
    secondaryButtonIcon: Zap
  }
};