import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Content = {
  title: string
  description: string
  categories: {
    id: string
    category: string
    openings: {
      id: string
      title: string
      location: string
      link: string
    }[]
  }[]
}

const content: Content = {
  title: 'Explore Career Opportunities',
  description: 'Become part of a team of advanced system design based on Radix and shadcn/ui',
  categories: [
    {
      id: 'engineering',
      category: 'Engineering',
      openings: [
        {
          id: 'senior-software-engineer',
          title: 'Senior Software Engineer',
          location: 'Remote',
          link: '#'
        },
        {
          id: 'product-manager',
          title: 'Product Manager',
          location: 'Windhoek, Namibia',
          link: '#'
        },
        {
          id: 'qa-engineer',
          title: 'QA Engineer',
          location: 'Remote',
          link: '#'
        },
        {
          id: 'tech-support',
          title: 'Technical Support Specialist',
          location: 'Remote',
          link: '#'
        }
      ]
    },
    {
      id: 'marketing',
      category: 'Marketing',
      openings: [
        {
          id: 'content-writer',
          title: 'Content Writer',
          location: 'Fes, Morocco',
          link: '#'
        },
        {
          id: 'social-media-manager',
          title: 'Social Media Manager',
          location: 'Goa, India',
          link: '#'
        }
      ]
    }
  ]
} as const

type CareerSectionProps = React.ComponentPropsWithoutRef<"section"> & Partial<Content>;

export const CareerSection = (props: CareerSectionProps) => {
  const { title, description, categories } = {
    ...content,
    ...props
  };

  return (
    <section 
      aria-labelledby="careers-heading" 
      className="w-full py-16 lg:py-32 bg-background"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-screen-lg">
        <header className="mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl py-4">
            {description}
          </p>
        </header>

        <div className="space-y-12">
          {categories?.map((category) => (
            <article key={category.id}>
              <h3 className="py-4 text-xl font-bold text-muted-foreground">
                {category.category}
              </h3>

              {category.openings.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between border-b border-border py-4"
                >
                  <a
                    href={job.link}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {job.title}
                  </a>

                  <div
                    className={cn(
                      buttonVariants({
                        variant: 'outline',
                        size: 'sm'
                      }),
                      'rounded-full cursor-default'
                    )}
                  >
                    {job.location}
                  </div>
                </div>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}