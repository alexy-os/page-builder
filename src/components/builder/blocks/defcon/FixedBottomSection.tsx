interface FixedBottomSectionProps {
  content: {
    fullText: string;
    shortText: string;
    severity: "info" | "warning" | "error";
  };
}

export default function FixedBottomSection({ content }: FixedBottomSectionProps) {
  const { fullText, shortText, severity } = content;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error":
        return "bg-red-500 border-red-500/70 text-white";
      case "warning":
        return "bg-yellow-500 border-yellow-500/70 text-black";
      default:
        return "bg-blue-500 border-blue-500/70 text-white";
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 border-t px-3 sm:px-6 py-1.5 sm:py-2 defcon-theme-transition ${getSeverityColor(severity)}`}>
      <div className="text-center text-xs sm:text-xs font-bold tracking-wider sm:tracking-widest">
        <span className="hidden sm:inline">{fullText}</span>
        <span className="sm:hidden">{shortText}</span>
      </div>
    </div>
  );
}

export const fixedBottomSectionTemplate = {
  id: "defconFixedBottomSection",
  name: "Fixed Bottom Status Bar",
  description: "A fixed bottom bar displaying system status information",
  component: FixedBottomSection,
  defaultContent: {
    fullText: "SYSTEM STATUS // FOR AUTHORIZED PERSONNEL ONLY // SERVER MONITORING DIVISION",
    shortText: "SYSTEM STATUS // MONITORING DIV",
    severity: "info"
  }
}; 