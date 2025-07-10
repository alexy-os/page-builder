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
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style type="text/tailwindcss">
        ${themeCSS} * { @apply border-border outline-ring/50; } button, .button { @apply cursor-pointer; }
    </style>
</head>
<body class="bg-background text-foreground antialiased">
${blocksHTML}

<!-- THEME TOGGLE - DELETE THIS SECTION IF NOT NEEDED -->
<div id="theme-toggle" style="position: fixed; bottom: 20px; left: 20px; z-index: 9999;">
  <button onclick="toggleTheme()" style="
    background: var(--color-primary); 
    color: var(--color-primary-foreground); 
    border: none; 
    border-radius: var(--radius-lg); 
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