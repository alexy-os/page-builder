// Gallery content data based on agreed examples; content/design unchanged
import type { GridGalleryData, SplitGalleryData } from "@ui8kit/blocks";

interface GridGalleryDataContent {
  gridGalleryGrid: GridGalleryData,
  gridGalleryMasonry: GridGalleryData,
  gridGalleryCarousel: GridGalleryData,
  gridGalleryMosaic: GridGalleryData,
  gridGalleryMinimal: GridGalleryData,
  gridGalleryCards: GridGalleryData,
  gridGalleryPolaroid: GridGalleryData,
  gridGalleryMagazine: GridGalleryData
}

interface SplitGalleryDataContent {
  splitGalleryShowcase: SplitGalleryData,
  splitGalleryPortfolio: SplitGalleryData
}

const createSampleImages = (count: number = 12) => {
  const imageUrls = [
    "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  const categories = ["Landscape", "Portrait", "Architecture", "Nature", "Urban", "Abstract"];
  const titles = [
    "Golden Hour", "City Lights", "Natural Beauty", "Modern Lines", "Wild Nature", "Human Stories",
    "Sunset Dreams", "Urban Jungle", "Mountain Peak", "Ocean Waves", "Forest Path", "Sky High"
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: `img-${index + 1}`,
    src: imageUrls[index % imageUrls.length],
    alt: `Gallery image ${index + 1}`,
    title: titles[index % titles.length],
    category: categories[index % categories.length],
    description: `Beautiful ${categories[index % categories.length].toLowerCase()} photography`,
    likes: `${Math.floor(Math.random() * 500) + 50}`,
    views: `${Math.floor(Math.random() * 2000) + 200}`
  }));
};

const baseGridGallery: GridGalleryData = {
  title: "Photography Gallery",
  description: "A collection of stunning photographs from around the world",
  images: createSampleImages(12),
  stats: { totalImages: "240+", categories: "6", views: "50K+" },
  categories: ["Landscape", "Portrait", "Architecture", "Nature", "Urban", "Abstract"]
};

export const GridGalleryContent: GridGalleryDataContent = {
  gridGalleryGrid: { ...baseGridGallery, title: "Classic Photo Grid", badge: "Featured Collection" },
  gridGalleryMasonry: { ...baseGridGallery, title: "Masonry Gallery", subtitle: "Pinterest-style layout with dynamic heights" },
  gridGalleryCarousel: { ...baseGridGallery, title: "Interactive Gallery Carousel", images: createSampleImages(9) },
  gridGalleryMosaic: { ...baseGridGallery, title: "Dynamic Mosaic Layout", description: "Varied sizes create an engaging visual experience" },
  gridGalleryMinimal: { ...baseGridGallery, title: "Minimal Gallery", subtitle: "Clean design focused on the imagery", badge: "Curated" },
  gridGalleryCards: { ...baseGridGallery, title: "Photo Cards Collection", badge: "Community Favorites" },
  gridGalleryPolaroid: { ...baseGridGallery, title: "Vintage Polaroid Collection", description: "Nostalgic photo memories with a vintage twist", images: createSampleImages(8) },
  gridGalleryMagazine: { ...baseGridGallery, title: "Editorial Showcase", subtitle: "Professional photography with magazine-style presentation", badge: "Featured" }
};

export const SplitGalleryContent: SplitGalleryDataContent = {
  splitGalleryShowcase: {
    title: "Creative Photography Showcase",
    subtitle: "Capturing moments that tell extraordinary stories",
    description: "Explore our curated collection of stunning photographs from around the world, featuring landscapes, portraits, and urban scenes that inspire and captivate.",
    badge: "Featured Collection",
    images: [
      { id: "1", src: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Mountain landscape at sunset", title: "Golden Hour Mountains", category: "Landscape", description: "Breathtaking mountain vista during golden hour" },
      { id: "2", src: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Urban architecture photography", title: "Modern Architecture", category: "Architecture", description: "Contemporary building design in the city" },
      { id: "3", src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Portrait photography", title: "Human Connection", category: "Portrait", description: "Intimate portrait capturing genuine emotion" },
      { id: "4", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Nature macro photography", title: "Nature's Details", category: "Macro", description: "Intricate details of the natural world" }
    ],
    stats: { totalImages: "240+", categories: "12", views: "50K+" },
    primaryButtonText: "View Full Gallery",
    secondaryButtonText: "Share Collection"
  },
  splitGalleryPortfolio: {
    title: "Professional Photography Portfolio",
    description: "A curated selection of my finest work spanning multiple genres and styles, showcasing technical excellence and creative vision.",
    badge: "Portfolio 2024",
    images: [
      { id: "p1", src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Wedding photography", title: "Eternal Moments", category: "Wedding" },
      { id: "p2", src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Fashion photography", title: "Style & Grace", category: "Fashion" },
      { id: "p3", src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Landscape photography", title: "Natural Beauty", category: "Landscape" },
      { id: "p4", src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Corporate photography", title: "Professional Edge", category: "Corporate" }
    ],
    stats: { totalImages: "150+", categories: "8", views: "25K+" },
    primaryButtonText: "View Portfolio",
    secondaryButtonText: "Contact Me"
  }
};


