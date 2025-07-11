import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { 
  getThemeById, 
  generateTailwindThemeCSS,
  generateGoogleFontsURLForTheme
} from "@/lib/themeManager";
import { allComponents } from "../components/blocks/index";

export function exportToHTML(blocks: any[], projectName: string, themeId: string) {
  // Create static HTML from React components
  const renderBlocksToHTML = () => {
    return blocks.map((block: any) => {
      const BlockComponent = allComponents[block.type as keyof typeof allComponents];
      if (!BlockComponent) return '';
      
      // Render component to static HTML
      return renderToStaticMarkup(
          React.createElement(BlockComponent as any, { 
            content: block.content
          })
      );
    }).join('\n');
  };

  const blocksHTML = renderBlocksToHTML();
  
  // Generate CSS styles for theme from schema
  const generateThemeCSS = () => {
    const themeData = getThemeById(themeId);
    if (!themeData) {
      console.warn(`Theme with ID ${themeId} not found`);
      return '';
    }
    
    return generateTailwindThemeCSS(themeData.schema);
  };

  const themeCSS = generateThemeCSS();
  const fontsURL = generateGoogleFontsURLForTheme(themeId);

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName} - Drag & Drop Page Builder</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzN2I5ZjMiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zcXVpcmNsZS1pY29uIGx1Y2lkZS1zcXVpcmNsZSI+PHBhdGggZD0iTTEyIDNjNy4yIDAgOSAxLjggOSA5cy0xLjggOS05IDktOS0xLjgtOS05IDEuOC05IDktOSIvPjwvc3ZnPg==" />
    ${fontsURL ? `<link href="${fontsURL}" rel="stylesheet">` : ''}
    <script src="https://cdn.tailwindcss.com"></script>
    <script>tailwind.config={content:[],darkMode:'class',theme:{extend:{colors:{border:'hsl(var(--border))',input:'hsl(var(--input))',ring:'hsl(var(--ring))',background:'hsl(var(--background))',foreground:'hsl(var(--foreground))',primary:{DEFAULT:'hsl(var(--primary))',foreground:'hsl(var(--primary-foreground))'},secondary:{DEFAULT:'hsl(var(--secondary))',foreground:'hsl(var(--secondary-foreground))'},destructive:{DEFAULT:'hsl(var(--destructive))',foreground:'hsl(var(--destructive-foreground))'},muted:{DEFAULT:'hsl(var(--muted))',foreground:'hsl(var(--muted-foreground))'},accent:{DEFAULT:'hsl(var(--accent))',foreground:'hsl(var(--accent-foreground))'},popover:{DEFAULT:'hsl(var(--popover))',foreground:'hsl(var(--popover-foreground))'},card:{DEFAULT:'hsl(var(--card))',foreground:'hsl(var(--card-foreground))'},chart:{1:'hsl(var(--chart-1))',2:'hsl(var(--chart-2))',3:'hsl(var(--chart-3))',4:'hsl(var(--chart-4))',5:'hsl(var(--chart-5))'},sidebar:{DEFAULT:'hsl(var(--sidebar))',foreground:'hsl(var(--sidebar-foreground))',primary:'hsl(var(--sidebar-primary))','primary-foreground':'hsl(var(--sidebar-primary-foreground))',accent:'hsl(var(--sidebar-accent))','accent-foreground':'hsl(var(--sidebar-accent-foreground))',border:'hsl(var(--sidebar-border))',ring:'hsl(var(--sidebar-ring))'}},borderRadius:{lg:'var(--radius)',md:'calc(var(--radius) - 2px)',sm:'calc(var(--radius) - 4px)'},fontFamily:{sans:['var(--font-sans)','system-ui','sans-serif'],mono:['var(--font-mono)','monospace'],serif:['var(--font-serif)','serif']},boxShadow:{'2xs':'var(--shadow-2xs)',xs:'var(--shadow-xs)',sm:'var(--shadow-sm)',DEFAULT:'var(--shadow)',md:'var(--shadow-md)',lg:'var(--shadow-lg)',xl:'var(--shadow-xl)','2xl':'var(--shadow-2xl)'},letterSpacing:{tighter:'calc(var(--tracking-normal) - 0.05em)',tight:'calc(var(--tracking-normal) - 0.025em)',normal:'var(--tracking-normal)',wide:'calc(var(--tracking-normal) + 0.025em)',wider:'calc(var(--tracking-normal) + 0.05em)',widest:'calc(var(--tracking-normal) + 0.1em)'},spacing:{xs:'calc(var(--spacing) * 1)',sm:'calc(var(--spacing) * 2)',md:'calc(var(--spacing) * 3)',lg:'calc(var(--spacing) * 4)',xl:'calc(var(--spacing) * 6)','2xl':'calc(var(--spacing) * 8)'},keyframes:{"accordion-down":{from:{height:"0"},to:{height:"var(--radix-accordion-content-height)"}},"accordion-up":{from:{height:"var(--radix-accordion-content-height)"},to:{height:"0"}},"caret-blink":{"0%,70%,100%":{opacity:"1"},"20%,50%":{opacity:"0"}}},animation:{"accordion-down":"accordion-down 0.2s ease-out","accordion-up":"accordion-up 0.2s ease-out","caret-blink":"caret-blink 1.25s ease-out infinite"}}},plugins:[]}</script>
    <style type="text/tailwindcss">
        ${themeCSS}
        @layer base {
          * { @apply border-border outline-ring/50; }
          body { @apply bg-background text-foreground; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }
          button, .button { @apply cursor-pointer; }
        }
    </style>
</head>
<body class="bg-background text-foreground antialiased">
${blocksHTML}

<!-- THEME TOGGLE - DELETE THIS SECTION IF NOT NEEDED -->
<div id="theme-toggle" style="position: fixed; bottom: 20px; left: 20px; z-index: 9999;">
  <button onclick="toggleTheme()" style="
    background: hsl(var(--primary)); 
    color: hsl(var(--primary-foreground)); 
    border: none; 
    border-radius: var(--radius); 
    padding: 12px; 
    cursor: pointer; 
    box-shadow: var(--shadow-lg);
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
  " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
    <span id="theme-icon">🌙</span>
  </button>
</div>

<script>
// THEME TOGGLE SCRIPT - DELETE THIS SECTION IF NOT NEEDED
function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById('theme-icon');
  
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    icon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    icon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
}

// Load saved theme on page load
(function() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const icon = document.getElementById('theme-icon');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    icon.textContent = '☀️';
  } else {
    icon.textContent = '🌙';
  }
})();
</script>
<!-- END THEME TOGGLE -->

</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${projectName.replace(/\s+/g, '_')}.html`;
  link.click();
  
  URL.revokeObjectURL(url);
} 