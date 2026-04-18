import globalData from "./global.json";
import homepageData from "./homepage.json";
import aboutData from "./about.json";

export const caseStudies: never[] = [];

export const navLinks: Array<{ label: string; href: string }> = globalData.navLinks;

export const siteConfig = {
  name: globalData.siteName,
  role: homepageData.roleLabel,
  tagline: homepageData.tagline,
  subTagline: homepageData.subtitle,
  qualifier: homepageData.experienceQualifier,
  email: globalData.contactEmail,
  about: aboutData,
};
