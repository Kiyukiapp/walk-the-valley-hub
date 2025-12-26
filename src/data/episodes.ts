// Shared episodes data for the Walk the Valley podcast
import ablemindLogo from '@/assets/images/logos/ablemind.png';
import aprilrambleLogo from '@/assets/images/logos/aprilramble.png';
import coopmedLogo from '@/assets/images/logos/coopmed.png';
import decemberrambleLogo from '@/assets/images/logos/decemberramble.png';
import dtuLogo from '@/assets/images/logos/dtu.png';
import hirdLogo from '@/assets/images/logos/hird.png';
import interhumanLogo from '@/assets/images/logos/interhuman.png';
import lifelineroboticsLogo from '@/assets/images/logos/lifelinerobotics.png';
import neocarenordicLogo from '@/assets/images/logos/neocarenordic.png';
import neolamedicalLogo from '@/assets/images/logos/neolamedical.png';
import platoscienceLogo from '@/assets/images/logos/platoscience.png';
import spermosansLogo from '@/assets/images/logos/spermosans.png';
import nanolitLogo from '@/assets/images/logos/nanolit.png';
import malmoUniversityLogo from '@/assets/images/logos/malmo-university.png';
import ctbLogo from '@/assets/images/logos/ctb.png';
import medvascLogo from '@/assets/images/logos/medvasc.png';
import wtvLogo from '@/assets/images/branding/wtv-logo-white.png';
import valleyBackground from '@/assets/images/backgrounds/valley-background.jpg';

export interface Episode {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  duration: string;
  thumbnailUrl: string;
  category: string;
  guest?: string;
  companyLogo?: string;
  season?: number;
}

export const allEpisodes: Episode[] = [
  {
    id: "cathrin-johansson-walks-the-valley",
    title: "Cathrin Johansson Walks the Valley",
    description: "In this episode of Walk The Valley, Will talks to Cathrin Johansson CEO of Medtech company MedVasc. We learn about her companies work to bring a catheter device to market, their decision to focus on the US market, and why starting early with regulatory is critical for startups.",
    publishDate: "2025-12-03",
    duration: "45:00",
    thumbnailUrl: valleyBackground,
    category: "MedTech Innovation",
    guest: "Cathrin Johansson",
    companyLogo: medvascLogo,
    season: 2
  },
  {
    id: "Zdravko-Obradovic-walks-the-valley",
    title: "Zdravko Obradović walks the valley",
    description: "In this episode of Walk the Valley, Kata talks with Zdravko Obradović, CEO and founder of Clinical Trial Bid and EBS Clinical Research, about how the Balkans are reshaping the landscape of clinical trials. Zdravko takes us from the fax-machine era to the rise of AI-driven trials, showing how automation and smart systems can cut timelines from years to months without compromising safety. He shares how Serbia offers a compelling edge (shorter approvals, stronger investigator networks, and 30–40% lower costs) backed by a story of boosting recruitment from 42 to 126 patients in just nine weeks.",
    publishDate: "2025-11-01",
    duration: "50:30",
    thumbnailUrl: valleyBackground,
    category: "Clinical Trials",
    guest: "Zdravko Obradović",
    companyLogo: ctbLogo,
    season: 2
  },
  {
    id: "elisabeth-carlson-walks-the-valley",
    title: "Prof. Elisabeth Carlson - Department of Care Science",
    description: "In this episode of Walk the Valley, Will sits down with Professor Elizabeth Carlson, Head of Research and Education at Malmö University's Department of Care Science. With a background as both a nurse and academic, Elizabeth offers a grounded yet forward-looking perspective on how healthcare is evolving. They discuss how the pandemic reshaped healthcare education, forcing a rapid shift to digital learning, and how that momentum continues to influence care delivery today. The conversation explores the promises and limitations of AI in healthcare, the rise of decentralised care, and the challenges of balancing innovation with human connection.",
    publishDate: "2025-10-15",
    duration: "52:45",
    thumbnailUrl: valleyBackground,
    category: "Healthcare Education",
    guest: "Prof. Elisabeth Carlson",
    companyLogo: malmoUniversityLogo,
    season: 2
  },
  {
    id: "sarah-morgan-walks-the-valley",
    title: "Sarah Morgan Walks the Valley",
    description: "In this episode of Walk the Valley, Kata talks with Sarah Morgan, industrial designer and founder of NanoLit Technologies, who brings design thinking to healthcare by using light to improve recovery, sleep, and quality of life. From the science of light to the practical hurdles of supply chains, Sarah shows how better lighting can transform hospitals and senior care, highlighting both the challenges of introducing hardware into medical systems and the powerful intersection of science, design, and human care.",
    publishDate: "2025-09-24",
    duration: "48:30",
    thumbnailUrl: valleyBackground,
    category: "Product development/ supply chain",
    guest: "Sarah Morgan",
    companyLogo: nanolitLogo,
    season: 2
  },
  {
    id: "mads-vad-kristensen-walks-the-valley",
    title: "Mads Vad Kristensen walks the valley",
    description: "In this episode of Walk the Valley, Kata talks with Mads Vad Kristensen, a central figure in Denmark's innovation ecosystem with a background in venture capital and university spinouts.\n\nMads shares hard-earned insights on why so many health tech startups get stuck in the valley of death, and what could be done differently. From the importance of building multidisciplinary teams early, to avoiding the trap of sequential development, he explains why working on R&D, regulatory, and commercialisation in parallel is key to survival.\n\nThe conversation also dives into the funding gap that leaves startups stranded between early angels and cautious VCs, and why resilient, well-prepared teams are ultimately the biggest predictor of success.\n\nWhether you're a founder, researcher, or part of the innovation support system, this episode offers practical wisdom on how to strengthen teams, extend runway, and increase the odds of making it to market.",
    publishDate: "2025-03-09",
    duration: "52:15",
    thumbnailUrl: valleyBackground,
    category: "Innovation Ecosystem",
    guest: "Mads Vad Kristensen",
    companyLogo: dtuLogo,
    season: 2
  },
  {
    id: "tomas-de-souza-walks-the-valley",
    title: "Tomas de Souza walks the valley",
    description: "In this episode of Walk the Valley, Tomas shares an honest and reflective conversation on what it means to lead a startup when things don't go as planned.",
    publishDate: "2025-06-02",
    duration: "44:30",
    thumbnailUrl: valleyBackground,
    category: "Leadership & Resilience",
    guest: "Tomas de Souza",
    companyLogo: ablemindLogo,
    season: 1
  },
  {
    id: "julie-dalsgaard-walks-the-valley",
    title: "Julie Dalsgaard walks the valley",
    description: "In this episode Will talks with Julie Dalsgaard, CEO of Lifeline Robotics, a Danish MedTech startup born at the peak of the COVID-19 pandemic.",
    publishDate: "2025-05-15",
    duration: "50:15",
    thumbnailUrl: valleyBackground,
    category: "MedTech Startups",
    guest: "Julie Dalsgaard",
    companyLogo: lifelineroboticsLogo,
    season: 1
  },
  {
    id: "april-2025-walk-the-valley",
    title: "April Ramble",
    description: "In this special episode of Walk the Valley, Will and Kata dive into one of the most overlooked – and most critical – factors in healthcare innovation: knowing your customer.",
    publishDate: "2025-04-29",
    duration: "48:45",
    thumbnailUrl: valleyBackground,
    category: "Walk The Valley",
    guest: "Will & Kata",
    companyLogo: aprilrambleLogo,
    season: 1
  },
  {
    id: "hanna-sjostrom-walks-the-valley",
    title: "Hanna Sjöström walks the valley",
    description: "In this episode we are joined by Hanna Sjöström, CEO of Neola Medical, a company pioneering neonatal lung monitoring.",
    publishDate: "2025-03-25",
    duration: "46:30",
    thumbnailUrl: valleyBackground,
    category: "Medtech Commercialisation",
    guest: "Hanna Sjöström",
    companyLogo: neolamedicalLogo,
    season: 1
  },
  {
    id: "christian-hoding-walks-the-valley",
    title: "Christian Høding walks the valley",
    description: "In this episode I am joined by Christian Höding, founder and CEO of Hird.io, and an expert in management consulting, strategy, and execution.",
    publishDate: "2025-03-07",
    duration: "51:45",
    thumbnailUrl: valleyBackground,
    category: "Startup Funding",
    guest: "Christian Høding",
    companyLogo: hirdLogo,
    season: 1
  },
  {
    id: "finn-ketler-walks-the-valley",
    title: "Finn Ketler walks the valley",
    description: "In this episode, I sit down with Finn Ketler, a seasoned expert in healthcare innovation and commercialization.",
    publishDate: "2025-02-20",
    duration: "47:15",
    thumbnailUrl: valleyBackground,
    category: "MedTech Innovation",
    guest: "Finn Ketler",
    companyLogo: coopmedLogo,
    season: 1
  },
  {
    id: "kristine-kuni-buccoliero-walks-the-valley",
    title: "Kristine Kuni Buccoliero walks the valley",
    description: "In today's episode, I sit down with Kristine, founder and CEO of NeoCare Nordic, a company on the verge of a major milestone with their groundbreaking neonatal care solution.",
    publishDate: "2025-01-29",
    duration: "49:20",
    thumbnailUrl: valleyBackground,
    category: "Neonatal Care",
    guest: "Kristine Kuni Buccoliero",
    companyLogo: neocarenordicLogo,
    season: 1
  },
  {
    id: "december-2025-walk-the-valley",
    title: "December Ramble",
    description: "Why 80% of HealthTech startups fail. In the latest episode of Walk the Valley, Will and I take an honest look at why so many promising healthcare startups stumble in the valley of death.",
    publishDate: "2025-01-21",
    duration: "52:30",
    thumbnailUrl: valleyBackground,
    category: "Walk The Valley",
    guest: "Will & Kata",
    companyLogo: decemberrambleLogo,
    season: 1
  },
  {
    id: "kush-punyani-walks-the-valley",
    title: "Kush Punyani walks the valley",
    description: "We sit down with Kush, the founder of Spermosens, a company breaking new ground in male fertility.",
    publishDate: "2024-12-15",
    duration: "46:45",
    thumbnailUrl: valleyBackground,
    category: "Reproductive Health",
    guest: "Kush Punyani",
    companyLogo: spermosansLogo,
    season: 1
  },
  {
    id: "balder-onarheim-walks-the-valley",
    title: "Balder Onarheim walks the valley",
    description: "We chat with Balder Ornarheim, visionary founder of Plato Science, a neurostimulation company pushing the boundaries of mental health and wellness technology.",
    publishDate: "2024-11-09",
    duration: "48:15",
    thumbnailUrl: valleyBackground,
    category: "Mental Health",
    guest: "Balder Onarheim",
    companyLogo: platoscienceLogo,
    season: 1
  },
  {
    id: "paula-petcu-walks-the-valley",
    title: "Paula Petcu walks the valley",
    description: "In this episode of Walk the Valley, we talk with Paula Petcu, CTO of Interhuman AI, about navigating the rapidly evolving intersection of artificial intelligence and healthcare.",
    publishDate: "2024-09-25",
    duration: "45:30",
    thumbnailUrl: valleyBackground,
    category: "Mental Health",
    guest: "Paula Petcu",
    companyLogo: interhumanLogo,
    season: 1
  }
];

// Get the latest 3 episodes sorted by publish date
export const getLatestEpisodes = (count: number = 3): Episode[] => {
  return allEpisodes
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, count);
};

// Get random episodes using Fisher-Yates shuffle algorithm
export const getRandomEpisodes = (count: number = 3): Episode[] => {
  const shuffled = [...allEpisodes];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
};

// Categories for filtering
export const categories = [
  "All", 
  "Mental Health", 
  "Reproductive Health", 
  "Walk The Valley", 
  "Neonatal Care", 
  "MedTech Innovation", 
  "Startup Funding", 
  "Medtech Commercialisation", 
  "MedTech Startups", 
  "Leadership & Resilience",
  "Innovation Ecosystem",
  "Product development/ supply chain",
  "Healthcare Education",
  "Clinical Trials"
];