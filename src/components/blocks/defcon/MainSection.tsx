import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, CircuitBoard, HardDrive, Network } from "lucide-react";

interface ServerMetric {
  id: string;
  name: string;
  value: string;
  status: "normal" | "warning" | "critical";
  icon: "cpu" | "memory" | "disk" | "network";
  trend: "up" | "down" | "stable";
}

interface MainSectionProps {
  content: {
    servers: Array<{
      id: string;
      name: string;
      status: "online" | "degraded" | "offline";
      metrics: ServerMetric[];
    }>;
  };
}

export default function MainSection({ content }: MainSectionProps) {
  const { servers } = content;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "defcon-status-online";
      case "degraded":
        return "defcon-status-degraded";
      case "offline":
        return "defcon-status-offline";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getMetricIcon = (icon: string) => {
    switch (icon) {
      case "cpu":
        return <Cpu className="w-4 h-4" />;
      case "memory":
        return <CircuitBoard className="w-4 h-4" />;
      case "disk":
        return <HardDrive className="w-4 h-4" />;
      case "network":
        return <Network className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getMetricStatus = (status: string) => {
    switch (status) {
      case "normal":
        return "defcon-metric-normal";
      case "warning":
        return "defcon-metric-warning";
      case "critical":
        return "defcon-metric-critical";
      default:
        return "text-muted-foreground";
    }
  };

  const getTrendArrow = (trend: string) => {
    switch (trend) {
      case "up":
        return "↑";
      case "down":
        return "↓";
      default:
        return "→";
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servers.map((server) => (
          <Card key={server.id} className="defcon-card defcon-theme-transition p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-card-foreground">{server.name}</h3>
              <Badge variant="outline" className={`defcon-badge ${getStatusColor(server.status)} defcon-theme-transition`}>
                {server.status.toUpperCase()}
              </Badge>
            </div>
            <div className="space-y-3">
              {server.metrics.map((metric) => (
                <div key={metric.id} className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg defcon-theme-transition">
                  <div className="flex items-center gap-2">
                    <div className={`${getMetricStatus(metric.status)}`}>
                      {getMetricIcon(metric.icon)}
                    </div>
                    <span className="text-sm text-muted-foreground">{metric.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-mono ${getMetricStatus(metric.status)}`}>
                      {metric.value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {getTrendArrow(metric.trend)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export const mainSectionTemplate = {
  id: "defconMainSection",
  name: "Server Monitoring Dashboard",
  description: "Main dashboard displaying server status and metrics",
  component: MainSection,
  defaultContent: {
    servers: [
      {
        id: "server1",
        name: "Production Server",
        status: "online",
        metrics: [
          {
            id: "cpu1",
            name: "CPU Usage",
            value: "45%",
            status: "normal",
            icon: "cpu",
            trend: "stable"
          },
          {
            id: "mem1",
            name: "Memory Usage",
            value: "6.2GB/16GB",
            status: "normal",
            icon: "memory",
            trend: "up"
          },
          {
            id: "disk1",
            name: "Disk Space",
            value: "234GB/512GB",
            status: "warning",
            icon: "disk",
            trend: "up"
          },
          {
            id: "net1",
            name: "Network I/O",
            value: "45MB/s",
            status: "normal",
            icon: "network",
            trend: "down"
          }
        ]
      },
      {
        id: "server2",
        name: "Backup Server",
        status: "online",
        metrics: [
          {
            id: "cpu2",
            name: "CPU Usage",
            value: "12%",
            status: "normal",
            icon: "cpu",
            trend: "stable"
          },
          {
            id: "mem2",
            name: "Memory Usage",
            value: "4.1GB/16GB",
            status: "normal",
            icon: "memory",
            trend: "stable"
          },
          {
            id: "disk2",
            name: "Disk Space",
            value: "890GB/1TB",
            status: "normal",
            icon: "disk",
            trend: "up"
          },
          {
            id: "net2",
            name: "Network I/O",
            value: "12MB/s",
            status: "normal",
            icon: "network",
            trend: "stable"
          }
        ]
      }
    ]
  }
}; 