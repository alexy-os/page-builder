import AdvertisementSection, { advertisementSectionTemplate } from './AdvertisementSection';
import FixedBottomSection, { fixedBottomSectionTemplate } from './FixedBottomSection';
import FooterSection, { footerSectionTemplate } from './FooterSection';
import HeaderSection, { headerSectionTemplate } from './HeaderSection';
import HistorySection, { historySectionTemplate } from './HistorySection';
import MainSection, { mainSectionTemplate } from './MainSection';
import MarketsSection, { marketsSectionTemplate } from './MarketsSection';
import TimelineSection, { timelineSectionTemplate } from './TimelineSection';

// Export individual components and templates
export { AdvertisementSection, advertisementSectionTemplate };
export { FixedBottomSection, fixedBottomSectionTemplate };
export { FooterSection, footerSectionTemplate };
export { HeaderSection, headerSectionTemplate };
export { HistorySection, historySectionTemplate };
export { MainSection, mainSectionTemplate };
export { MarketsSection, marketsSectionTemplate };
export { TimelineSection, timelineSectionTemplate };

// Export all defcon templates as an array
export const defconTemplates = [
  advertisementSectionTemplate,
  fixedBottomSectionTemplate,
  footerSectionTemplate,
  headerSectionTemplate,
  historySectionTemplate,
  mainSectionTemplate,
  marketsSectionTemplate,
  timelineSectionTemplate
];

// Export all defcon components as an object
export const defconComponents = {
  defconAdvertisementSection: AdvertisementSection,
  defconFixedBottomSection: FixedBottomSection,
  defconFooterSection: FooterSection,
  defconHeaderSection: HeaderSection,
  defconHistorySection: HistorySection,
  defconMainSection: MainSection,
  defconMarketsSection: MarketsSection,
  defconTimelineSection: TimelineSection
}; 