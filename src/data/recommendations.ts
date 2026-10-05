/**
 * LinkedIn recommendations.
 *
 * These are the DEFAULTS: the values verified from the public LinkedIn pages on
 * 2026-10-02. At runtime the site also fetches `/data/recommendations.json`; any
 * field present there overrides the default for the matching `id`, and anything
 * missing, malformed or unreachable silently falls back to what is written here.
 * See `useRecommendations` and the README section "Keeping recommendations current".
 *
 * LinkedIn gives individual recommendations no permalink, so each entry links to
 * the recommender's own profile and to Zaid's recommendations page, where the
 * text can be checked.
 */

export const RECOMMENDATIONS_URL = "https://www.linkedin.com/in/zaidworks515/details/recommendations/?detailScreenTabIndex=0";
export const RECOMMENDATION_TOTAL = 9;

export type Recommendation = {
  id: string;
  name: string;
  /** Current job title. Left empty when it could not be verified publicly. */
  designation?: string;
  /** Current company, as shown on the recommender's public profile. */
  company?: string;
  /** How they worked with Zaid, taken from the recommendation itself. */
  relationship: string;
  profileUrl: string;
  photo?: string;
  text: string;
  /** Optional phrase inside `text` to emphasise. Ignored if not found. */
  highlight?: string;
  /** Date the defaults were last verified (YYYY-MM-DD). */
  verifiedOn: string;
};

export const defaultRecommendations: Recommendation[] = [
  {
    id: "raza-abbas",
    name: "Raza Abbas",
    company: "Trade Foresight",
    relationship: "Worked with Zaid at Inseyab",
    profileUrl: "https://www.linkedin.com/in/raza-abbas-zafar/",
    photo: "/media/people/raza-abbas.webp",
    text:
      "I’ve had the pleasure of working with Zaid Ahmed at Inseyab over the past year, and his contribution to the companies AI initiatives has been nothing short of impressive. He approaches complex machine learning challenges with a level of diligence and technical curiosity that is rare to find. Beyond his skills, Zaid carries a disciplined, professional work ethic that makes him a reliable anchor for the team. He’s someone who consistently delivers results while maintaining a great attitude, and I would recommend him highly for any forward-thinking tech environment.",
    highlight: "a level of diligence and technical curiosity that is rare to find",
    verifiedOn: "2026-10-02",
  },
  {
    id: "mazhar-niaz",
    name: "Mazhar Niaz",
    company: "Goomerce",
    relationship: "Zaid’s senior developer at Tesseract Innovations",
    profileUrl: "https://www.linkedin.com/in/mazharniaz/",
    photo: "/media/people/mazhar-niaz.webp",
    text:
      "I had the chance to work closely with Zaid and was always impressed by his dedication and willingness to take on challenges. He is a dependable team member who approaches problems thoughtfully and is always eager to learn and improve.\n\nBeyond his technical skills, Zaid is easy to work with, communicates well, and maintains a professional attitude. I enjoyed working with him and would confidently recommend him to any team looking for a motivated and capable engineer.",
    highlight: "approaches problems thoughtfully",
    verifiedOn: "2026-10-02",
  },
];
