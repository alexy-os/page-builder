import { TrendingUp, DollarSign, Clock, ExternalLink } from "lucide-react";

interface MarketMetric {
  id: string;
  title: string;
  volume: string;
  deadline: string;
  chartUrl: string;
  provider: string;
  link: string;
}

interface MarketsSectionProps {
  content: {
    title: string;
    subtitle: string;
    currentTime: string;
    metrics: MarketMetric[];
  };
}

export default function MarketsSection({ content }: MarketsSectionProps) {
  const { title, subtitle, currentTime, metrics } = content;

  return (
    <div className="border-t border-border bg-background defcon-theme-transition">
      <div className="container mx-auto px-6 py-16">
        <div className="bg-card/60 border border-border rounded-lg p-4 shadow-lg defcon-theme-transition">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold font-mono text-card-foreground">{title}</h3>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <div className="text-xs text-muted-foreground font-mono">{subtitle}</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground font-mono">{currentTime}</div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-2" style={{ width: "fit-content" }}>
              {metrics.map((metric) => (
                <div key={metric.id} className="flex-shrink-0 w-96">
                  <a href={metric.link} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="bg-background/50 border border-border rounded-lg p-3 hover:border-primary defcon-theme-transition h-full cursor-pointer defcon-focus">
                      <div className="mb-3">
                        <h4 className="text-sm font-bold text-foreground leading-tight mb-2 h-10 overflow-hidden">
                          {metric.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            <span>{metric.volume}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{metric.deadline}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="w-full h-80 bg-card rounded border border-border overflow-hidden relative">
                          <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            className="rounded"
                            title={metric.title}
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
                            referrerPolicy="no-referrer-when-downgrade"
                            src={metric.chartUrl}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground font-mono">{metric.provider}</div>
                        <div className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 defcon-theme-transition font-mono">
                          <span>VIEW & ANALYZE</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const marketsSectionTemplate = {
  id: "defconMarketsSection",
  name: "Server Performance Metrics",
  description: "A section displaying server performance metrics and trends",
  component: MarketsSection,
  defaultContent: {
    title: "PERFORMANCE METRICS",
    subtitle: "LIVE DATA",
    currentTime: "12:55Z",
    metrics: [
      {
        id: "metric1",
        title: "CPU Utilization Trend (24h)",
        volume: "85%",
        deadline: "Real-time",
        chartUrl: "https://grafana.example.com/cpu-metrics",
        provider: "Grafana",
        link: "https://grafana.example.com/d/cpu"
      },
      {
        id: "metric2",
        title: "Memory Usage Pattern",
        volume: "75%",
        deadline: "Real-time",
        chartUrl: "https://grafana.example.com/memory-metrics",
        provider: "Grafana",
        link: "https://grafana.example.com/d/memory"
      },
      {
        id: "metric3",
        title: "Network Throughput",
        volume: "2.5GB/s",
        deadline: "Real-time",
        chartUrl: "https://grafana.example.com/network-metrics",
        provider: "Grafana",
        link: "https://grafana.example.com/d/network"
      },
      {
        id: "metric4",
        title: "Disk I/O Performance",
        volume: "120MB/s",
        deadline: "Real-time",
        chartUrl: "https://grafana.example.com/disk-metrics",
        provider: "Grafana",
        link: "https://grafana.example.com/d/disk"
      }
    ]
  }
}; 