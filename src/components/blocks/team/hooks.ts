// Team-specific content management hooks
import { GridTeamContent, SplitTeamContent } from './content';

export interface TeamContentHooks {
  getGridTeamContent: (templateId: keyof typeof GridTeamContent) => any;
  getSplitTeamContent: (templateId: keyof typeof SplitTeamContent) => any;
}

// Content provider for team blocks
export function getTeamContent(templateId: string): any {
  if (templateId.startsWith('gridTeam')) {
    const key = templateId as keyof typeof GridTeamContent;
    return GridTeamContent[key] || null;
  }

  if (templateId.startsWith('splitTeam')) {
    const key = templateId as keyof typeof SplitTeamContent;
    return SplitTeamContent[key] || null;
  }

  return null;
}

// Check if templateId is team type
export function isTeamTemplate(templateId: string): boolean {
  return templateId.includes('Team') || templateId.includes('team');
}

// Clean content for serialization (remove React components/functions)
export function cleanTeamContent(content: any): any {
  if (!content || typeof content !== 'object') return content;

  const cleaned = { ...content } as any;

  Object.keys(cleaned).forEach(key => {
    const value = cleaned[key];

    if (typeof value === 'function' || (typeof value === 'object' && value?.$$typeof)) {
      delete cleaned[key];
    } else if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        cleaned[key] = value.map(item => cleanTeamContent(item));
      } else {
        cleaned[key] = cleanTeamContent(value);
      }
    }
  });

  return cleaned;
}


