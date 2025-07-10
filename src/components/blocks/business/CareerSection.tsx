interface CareerSectionProps {
  content: {
    // Simplified props based on typical structure, e.g.:
    title: string;
    description: string;
    jobs: Array<{
      title: string;
      description: string;
      location: string;
    }>;
  };
}

export default function CareerSection({ content }: CareerSectionProps) {
  const { title, description, jobs } = content;
  return (
    <section className="w-full py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{title}</h2>
        <p className="text-muted-foreground mb-8">{description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs?.map((job) => (
            <div key={job.title} className="bg-card p-6 rounded-md border border-border hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-card-foreground">{job.title}</h3>
              <p className="text-muted-foreground mt-2">{job.description}</p>
              <p className="text-muted-foreground mt-2">{job.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const careerSectionTemplate = {
  id: "businessCareerSection",
  name: "Career Section",
  description: "A section for displaying career opportunities",
  component: CareerSection,
  defaultContent: {
    title: "Join Our Team",
    description: "Explore exciting career paths with us.",
    jobs: [
      { title: "Job 1", description: "Description here", location: "Location here" },
      { title: "Job 2", description: "Description here", location: "Location here" }
    ]
  }
};