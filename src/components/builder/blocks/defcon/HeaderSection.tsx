import { Clock, Archive, TrendingUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderSectionProps {
  content: {
    timestamps: {
      lastUpdate: string;
      nextUpdate: string;
    };
    monitoring: {
      count: number;
      status: "operational" | "degraded" | "critical";
    };
    buttons: Array<{
      id: string;
      text: string;
      shortText: string;
      icon: "history" | "metrics";
    }>;
  };
}

export default function HeaderSection({ content }: HeaderSectionProps) {
  const { timestamps, monitoring, buttons } = content;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-500";
      case "degraded":
        return "text-yellow-500";
      case "critical":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getButtonStyle = (type: string) => {
    switch (type) {
      case "history":
        return "bg-blue-500/10 border-blue-500 text-blue-500 hover:bg-blue-500/20 defcon-theme-transition";
      case "metrics":
        return "bg-cyan-500/10 border-cyan-500 text-cyan-500 hover:bg-cyan-500/20 defcon-theme-transition";
      default:
        return "bg-muted border-border text-muted-foreground hover:bg-muted/80 defcon-theme-transition";
    }
  };

  return (
    <div className="bg-card border-b border-border px-3 sm:px-6 py-2 defcon-theme-transition">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-2 sm:gap-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-green-500 flex-shrink-0" />
            <span className="text-muted-foreground text-xs">LAST UPDATE: {timestamps.lastUpdate}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Clock className="w-3 h-3 text-yellow-500 flex-shrink-0" />
            <span className="text-muted-foreground">NEXT UPDATE: {timestamps.nextUpdate}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full flex-shrink-0 bg-yellow-500 animate-pulse"></span>
            <span className="text-muted-foreground">{monitoring.count} SERVERS MONITORED</span>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4">
          {buttons.map((button) => (
            <Button
              key={button.id}
              variant="outline"
              size="sm"
              className={`flex items-center gap-1 px-2 sm:px-3 py-1 font-mono text-xs defcon-focus ${getButtonStyle(button.icon)}`}
            >
              {button.icon === "history" ? <Archive className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
              <span className="hidden sm:inline">{button.text}</span>
              <span className="sm:hidden">{button.shortText}</span>
              <ChevronDown className="w-2.5 h-2.5" />
            </Button>
          ))}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground hidden sm:inline">STATUS:</span>
            <span className={getStatusColor(monitoring.status)}>
              {monitoring.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const headerSectionTemplate = {
  id: "defconHeaderSection",
  name: "Server Monitoring Header",
  description: "A header section displaying server monitoring status and controls",
  component: HeaderSection,
  defaultContent: {
    timestamps: {
      lastUpdate: "2024-03-20T10:30:00Z",
      nextUpdate: "2024-03-20T10:35:00Z"
    },
    monitoring: {
      count: 12,
      status: "operational"
    },
    buttons: [
      {
        id: "history",
        text: "HISTORY",
        shortText: "HIST",
        icon: "history"
      },
      {
        id: "metrics",
        text: "METRICS",
        shortText: "MTR",
        icon: "metrics"
      }
    ]
  }
}; 