import {
  BarChartHorizontal,
  BatteryCharging,
  CircleHelp,
  Layers,
  WandSparkles,
  ZoomIn,
} from 'lucide-react';

const iconMap = {
  BarChartHorizontal,
  BatteryCharging,
  CircleHelp,
  Layers,
  WandSparkles,
  ZoomIn,
} as const;

interface FeaturesThreeColumnsIconsProps {
  content: {
    title: string;
    description: string;
    features: Array<{
      title: string;
      description: string;
      icon: keyof typeof iconMap;
    }>;
  };
}

export default function FeaturesThreeColumnsIcons({ content }: FeaturesThreeColumnsIconsProps) {
  const { title, description, features } = content;
  
  return (
    <section className="w-full py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-10 md:mb-20 flex gap-2 flex-col">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl text-left mb-12">{description}</p>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features?.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <div key={index} className="flex flex-col items-center text-center bg-card border border-border rounded-md p-6 hover:shadow-lg transition-all">
                <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-accent">
                  {IconComponent && <IconComponent className="h-6 w-6 text-accent-foreground" />}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const featuresThreeColumnsIconsTemplate = {
  id: "featuresThreeColumnsIcons",
  name: "Features Three Columns Icons",
  description: "A three-column layout with icons for features",
  component: FeaturesThreeColumnsIcons,
  defaultContent: {
    title: 'Flexible UI Development',
    description: 'Create your website with our intuitive and customizable UI components',
    features: [
      { title: 'Quality', description: 'We prioritize excellence and precision in all our offerings to ensure unparalleled user satisfaction.', icon: 'BarChartHorizontal' },
      { title: 'Experience', description: 'Our seasoned team provides insights and expertise drawn from years of industry know-how.', icon: 'BatteryCharging' },
      { title: 'Support', description: 'Around-the-clock assistance to ensure your needs are met with urgency and attention.', icon: 'CircleHelp' },
      { title: 'Innovation', description: 'Driving progress through creativity and forward-thinking solutions.', icon: 'WandSparkles' },
      { title: 'Results', description: 'Focusing on delivering tangible outcomes that align with your goals.', icon: 'ZoomIn' },
      { title: 'Efficiency', description: 'Streamlined processes that save you time and resources, boosting productivity.', icon: 'Layers' }
    ]
  }
};