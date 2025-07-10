import { LucideChevronDown } from "lucide-react";

interface AdvertisementSectionProps {
  content: {
    title: string;
    icon: string;
    status: {
      text: string;
      type: "success" | "warning" | "error";
    };
  };
}

export default function AdvertisementSection({ content }: AdvertisementSectionProps) {
  const { title, icon, status } = content;

  const getStatusColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/20 text-green-500";
      case "warning":
        return "bg-yellow-500/20 text-yellow-500";
      case "error":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <div className="border-t border-border bg-background defcon-theme-transition">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-center gap-2 py-2 px-4 bg-card/30 border border-border rounded-lg hover:border-primary defcon-theme-transition cursor-pointer group defcon-focus">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center defcon-theme-transition ${getStatusColor(status.type)}`}>
            <span className="text-xs">{icon}</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground group-hover:text-primary defcon-theme-transition">
            {title}
          </span>
          <LucideChevronDown className="w-3 h-3 text-muted-foreground group-hover:text-primary defcon-theme-transition" />
        </div>
      </div>
    </div>
  );
}

export const advertisementSectionTemplate = {
  id: "defconAdvertisementSection",
  name: "Server Status Advertisement",
  description: "A section displaying server status and monitoring information",
  component: AdvertisementSection,
  defaultContent: {
    title: "Server Monitoring Active",
    icon: "📊",
    status: {
      text: "All Systems Operational",
      type: "success"
    }
  }
}; 