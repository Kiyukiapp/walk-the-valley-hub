import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, Share, Download, ExternalLink, Music, Headphones, Youtube } from "lucide-react";
import valleyBackground from "@/assets/images/backgrounds/valley-background.jpg";
import wtvLogoWhite from "@/assets/images/branding/wtv-logo-white.png";
import medvascLogo from "@/assets/images/logos/medvasc.png";
import healthtechhubLogo from "@/assets/images/logos/healthtechhub.png";

// Mock episode data (in a real app, this would come from an API)
const episodeData = {
  "health-tech-hub-walks-the-valley": {
    id: "health-tech-hub-walks-the-valley",
    title: "Health Tech Hub walks the valley",
    description: "A round-table discussion with two guests who approach healthcare innovation from distinct but connected perspectives.",
    publishDate: "2025-12-26",
    duration: "55:00",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&crop=center",
    category: "Innovation Ecosystem",
    guest: "Martin Broch Pedersen & Nicolas Bouchet",
    companyLogo: healthtechhubLogo,
    youtubeId: "QkvP_xdYBhw",
    season: 2,
    fullDescription: `In this episode of Walk the Valley, we do something a little different. A round-table discussion with two guests who approach healthcare innovation from distinct but connected perspectives.

We're joined by Martin Broch Pedersen, Business Development Director at Health Tech Hub Copenhagen, who works closely with early-stage healthtech startups on regulation, reimbursement, and commercialisation through programmes like Health Tech Pathways. Martin focuses on building the support structures that help founders learn faster, adapt earlier, and survive the valley of death.

We're also joined by Nicolas Bouchet, Investment Manager at Health Tech Hub Copenhagen, who brings the investor lens. Nicolas explores how startups can turn attention into actual investment, what makes a company investable, and why strong business models matter more than visibility alone.`,
    keyTakeaways: [
      "Why saving money long-term often means investing earlier",
      "Why building product and market in parallel beats waiting for a 'finished' product",
      "What builds investor credibility and why fitting into existing budget streams matters",
      "Why knowing what you don't know is one of a founder's strongest assets",
      "Understanding the system you're building in and working with it"
    ],
    appleUrl: "https://podcasts.apple.com/se/podcast/walk-the-valley/id1791839096?l=en-GB&i=1000742358187",
    spotifyUrl: "https://open.spotify.com/episode/3VJqXRG5ePDXCgnjPB5yIK?si=TIIleSvfQ024SNcoZGqIOg"
  },
  "cathrin-johansson-walks-the-valley": {
    id: "cathrin-johansson-walks-the-valley",
    title: "Cathrin Johansson Walks the Valley",
    description: "How MedVasc is bringing a catheter device to the US market, and why starting early with regulatory is critical for startups.",
    publishDate: "2025-12-03",
    duration: "45:00",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&crop=center",
    category: "MedTech Innovation",
    guest: "Cathrin Johansson",
    companyLogo: medvascLogo,
    youtubeId: "7GR62WyoNBk",
    season: 2,
    fullDescription: `In this episode of Walk The Valley, Will talks to Cathrin Johansson CEO of Medtech company MedVasc. We learn about her companies work to bring a catheter device to market, their decision to focus on the US market, and why starting early with regulatory is critical for startups.

We dig into the challenges of fundraising in 2025, building long-lasting trust with investors, and keeping the balance of clinical need, regulatory timing, and commercial urgency. Cathrin also breaks down how she approaches leadership in a small team, how MedVasc is preparing for market entry, and what founders often underestimate when bringing a device from prototype to patients.`,
    keyTakeaways: [
      "Why MedVasc chose to focus on the US market for their catheter device",
      "The importance of starting regulatory processes early for medtech startups",
      "Challenges of fundraising in 2025 and building investor trust",
      "Balancing clinical need, regulatory timing, and commercial urgency",
      "Leadership strategies for small medtech teams"
    ],
    appleUrl: "https://podcasts.apple.com/se/podcast/walk-the-valley/id1791839096?l=en-GB&i=1000739391731",
    spotifyUrl: "https://open.spotify.com/episode/5xeAg2ZPycFfpeGhUIYq1e?si=YumbnuqQQQugbEVdzGU7Wg"
  },
  "Zdravko-Obradovic-walks-the-valley": {
    id: "Zdravko-Obradovic-walks-the-valley",
    title: "Zdravko Obradović walks the valley",
    description: "How the Balkans are reshaping clinical trials with AI-driven automation and smarter systems.",
    publishDate: "2025-11-01",
    duration: "50:30",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop&crop=center",
    category: "Clinical Trials",
    guest: "Zdravko Obradović",
    youtubeId: "gDUYXLx5O4M",
    season: 2,
    fullDescription: `In this episode, Kata talks with Zdravko Obradović, CEO and founder of Clinical Trial Bid and EBS Clinical Research, about how the Balkans are reshaping clinical trials. From the fax-machine era to AI-driven trials, Zdravko shows how automation can cut timelines from years to months without compromising safety.

Serbia offers shorter approvals, stronger investigator networks, and 30–40% lower costs. Zdravko shares how his team boosted recruitment from 42 to 126 patients in just nine weeks, and how his AI-powered platform helps startups execute trials faster and smarter.

The future of clinical research is faster and fairer—when technology removes barriers, even small innovators can bring life-changing ideas to market.`,
    keyTakeaways: [
      "How AI-driven automation is cutting clinical trial timelines from years to months",
      "Serbia's competitive advantages: shorter approvals, stronger networks, 30-40% lower costs",
      "Scaling patient recruitment from 42 to 126 patients in just nine weeks",
      "Making clinical research accessible through AI-powered platforms",
      "The future of clinical trials: faster, fairer, and more innovative"
    ],
    appleUrl: "https://podcasts.apple.com/se/podcast/walk-the-valley/id1791839096?l=en-GB&i=1000736340248",
    spotifyUrl: "https://open.spotify.com/episode/6nhq38uYRGa9NvAh63F9al?si=uP4iZ2d9TWuBLwnidgHhSA"
  },
  "elisabeth-carlson-walks-the-valley": {
    id: "elisabeth-carlson-walks-the-valley",
    title: "Prof. Elisabeth Carlson - Department of Care Science",
    description: "How healthcare education evolved from pandemic crisis to digital transformation, and what it means for the future of patient care.",
    publishDate: "2025-10-15",
    duration: "52:45",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&crop=center",
    category: "Healthcare Education",
    guest: "Prof. Elisabeth Carlson",
    youtubeId: "om98-BbGC8o",
    season: 2,
    fullDescription: `In this episode of Walk the Valley, Will sits down with Professor Elizabeth Carlson, Head of Research and Education at Malmö University's Department of Care Science. With a background as both a nurse and academic, Elizabeth offers a grounded yet forward-looking perspective on how healthcare is evolving.

They discuss how the pandemic reshaped healthcare education, forcing a rapid shift to digital learning, and how that momentum continues to influence care delivery today. The conversation explores the promises and limitations of AI in healthcare, the rise of decentralised care, and the challenges of balancing innovation with human connection.

Whether you're a healthcare professional, educator, or innovator, this episode offers valuable insights into the transformation of care education and delivery in an increasingly digital world.`,
    keyTakeaways: [
      "How the pandemic accelerated digital transformation in healthcare education",
      "The promises and limitations of AI in healthcare delivery",
      "Understanding the shift toward decentralised care models",
      "Balancing technological innovation with human connection in care",
      "The evolving role of healthcare education in modern care delivery"
    ],
    appleUrl: "https://podcasts.apple.com/se/podcast/prof-elisabeth-carlson-department-of-care-science/id1791839096?i=1000733016784",
    spotifyUrl: "https://open.spotify.com/episode/5AdGz2i1vrWT5ONy5jBgBU"
  },
  "sarah-morgan-walks-the-valley": {
    id: "sarah-morgan-walks-the-valley",
    title: "Sarah Morgan Walks the Valley",
    description: "Whether you're a founder, clinician, or innovator, this episode is a reminder that real healthcare impact comes from looking beyond technology, digging deep into the system, and designing solutions that people can truly adopt.",
    publishDate: "2025-09-24",
    duration: "48:30",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&crop=center",
    category: "Product development/ supply chain",
    guest: "Sarah Morgan",
    youtubeId: "dVoIitA_ZSA",
    season: 2,
    fullDescription: `In this episode of Walk the Valley, Kata sits down with Sarah Morgan, industrial designer turned healthtech entrepreneur and founder of NanoLit Technologies. Sarah applies design thinking to healthcare, using light to support recovery, sleep health, and quality of life in hospitals and senior care.

Sarah takes us from the quantum physics of light to the practical barriers of healthcare supply chains, showing how better lighting can profoundly impact patient outcomes and recovery environments.`,
    keyTakeaways: [
      "Applying design thinking to healthcare innovation",
      "Using light therapy for recovery and sleep health",
      "Navigating healthcare supply chain barriers",
      "Impact of lighting on patient outcomes and dementia care",
      "Bridging the gap between quantum physics and practical healthcare solutions"
    ],
    appleUrl: "https://podcasts.apple.com/se/podcast/walk-the-valley/id1791839096?l=en-GB",
    spotifyUrl: "https://open.spotify.com/episode/0IIKIxavbDz9dUkyfnBXN5?si=aLmD-Q75TGSH986_nX04Yg"
  },
  "mads-vad-kristensen-walks-the-valley": {
    id: "mads-vad-kristensen-walks-the-valley",
    title: "Mads Vad Kristensen walks the valley",
    description: "In this episode of Walk the Valley, Kata talks with Mads Vad Kristensen, a central figure in Denmark's innovation ecosystem with a background in venture capital and university spinouts.",
    publishDate: "2025-03-09",
    duration: "52:15",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&crop=center",
    category: "Innovation Ecosystem",
    guest: "Mads Vad Kristensen",
    youtubeId: "8ts8MtFgYVs",
    season: 2,
    fullDescription: `In this Walk the Valley episode, Kata talks with Mads Vad Kristensen, a key player in Denmark's innovation scene with experience in venture capital and spinouts.

Mads explains why many health tech startups stall in the valley of death and how to avoid it—by building multidisciplinary teams early and tackling R&D, regulatory, and commercialisation in parallel. He also highlights the funding gap between angels and cautious VCs, noting that resilient, prepared teams remain the best predictor of success.

For founders, researchers, and supporters alike, this episode shares practical advice on strengthening teams, extending runway, and improving chances of reaching market.`,
    keyTakeaways: [
      "Building multidisciplinary teams early in development",
      "Working on R&D, regulatory, and commercialisation in parallel",
      "Understanding the funding gap between angels and VCs",
      "Why resilient, well-prepared teams predict success",
      "Practical wisdom for strengthening teams and extending runway"
    ],
    appleUrl: "https://podcasts.apple.com/se/podcast/mads-vad-kristensen-innovation-partner-at-dtu-skylab/id1791839096?i=1000724692409",
    spotifyUrl: "https://creators.spotify.com/pod/profile/katalin-vikuk/episodes/Mads-Vad-Kristensen-Innovation-Partner-at-DTU-SkyLab-e37l84a"
  },
  "paula-petcu-walks-the-valley": {
    id: "paula-petcu-walks-the-valley",
    title: "Paula Petcu walks the valley",
    description: "In this episode of Walk the Valley, we talk with Paula Petcu, CTO of Interhuman AI, about navigating the rapidly evolving intersection of artificial intelligence and healthcare.",
    publishDate: "2025-09-25",
    duration: "45:30",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&crop=center",
    category: "Mental Health",
    guest: "Paula Petcu",
    youtubeId: "_YVYi5NuLiY",
    season: 1,
    fullDescription: `In this episode of Walk the Valley, we talk with Paula Petcu, CTO of Interhuman AI, about navigating the rapidly evolving intersection of artificial intelligence and healthcare. Paula shares her insights on the EU AI Act—its benefits in ensuring safety and fairness, as well as the challenges it poses for startups navigating heavy regulatory demands. Finally, she offers practical advice for early-stage companies entering the healthcare market, including the importance of partnerships, regulatory understanding, and learning from shared experiences within the digital health community.`,
    keyTakeaways: [
      "Understanding the EU AI Act and its impact on healthcare startups",
      "Benefits of AI regulation in ensuring safety and fairness",
      "Challenges regulatory demands pose for startups",
      "Practical advice for entering the healthcare market",
      "Importance of partnerships in digital health community"
    ],
    appleUrl: "https://podcasts.apple.com/dm/podcast/paula-petcu-cto-of-interhuman-ai/id1791839096?i=1000684910066",
    spotifyUrl: "https://creators.spotify.com/pod/profile/katalin-vikuk/episodes/Paula-Petcu-CTO-of-Interhuman-AI-e2tq80h/a-abo6it2"
  },
  "balder-onarheim-walks-the-valley": {
    id: "balder-onarheim-walks-the-valley",
    title: "Balder Onarheim walks the valley",
    description: "We chat with Balder Ornarheim, visionary founder of Plato Science, a neurostimulation company pushing the boundaries of mental health and wellness technology.",
    publishDate: "2025-11-09",
    duration: "48:15",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=400&fit=crop&crop=center",
    category: "Mental Health",
    guest: "Balder Onarheim",
    youtubeId: "11sw9spg3FM",
    season: 1,
    fullDescription: `We chat with Balder Ornarheim, visionary founder of Plato Science, a neurostimulation company pushing the boundaries of mental health and wellness technology. Balder shares his experiences navigating the complex healthcare market, from securing product validation to overcoming long regulatory and ethics approval processes. He sheds light on the funding challenges unique to early-stage healthcare ventures and offers practical advice on building a product that stands out without disrupting existing systems.`,
    keyTakeaways: [
      "Navigating complex healthcare market dynamics",
      "Securing product validation in neurostimulation",
      "Overcoming regulatory and ethics approval processes",
      "Understanding funding challenges in healthcare ventures",
      "Building products that integrate with existing systems"
    ],
    appleUrl: "https://podcasts.apple.com/dm/podcast/balder-onarheim-founder-of-plato-science/id1791839096?i=1000684909984",
    spotifyUrl: "https://creators.spotify.com/pod/profile/katalin-vikuk/episodes/Balder-Onarheim-founder-of-Plato-Science-e2tq791/a-abo6i4a"
  },
  "kush-punyani-walks-the-valley": {
    id: "kush-punyani-walks-the-valley",
    title: "Kush Punyani walks the valley",
    description: "We sit down with Kush, the founder of Spermosens, a company breaking new ground in male fertility.",
    publishDate: "2024-12-15",
    duration: "46:45",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop&crop=center",
    category: "Reproductive Health",
    guest: "Kush Punyani",
    youtubeId: "rfzN6CReI48",
    season: 1,
    fullDescription: `We sit down with Kush, the founder of Spermosens, a company breaking new ground in male fertility. Kush shares his journey of building a healthcare startup focused on creating products that integrate seamlessly into existing clinical workflows. We dive into the challenges of pre-market development, navigating the funding landscape, and the common pitfalls of B2C models in healthcare. Kush also discusses the unique "valleys of death" that he's encountered in bringing a medical product to market.`,
    keyTakeaways: [
      "Breaking new ground in male fertility innovation",
      "Integrating products into existing clinical workflows",
      "Challenges of pre-market development in healthcare",
      "Navigating the healthcare funding landscape",
      "Avoiding common pitfalls of B2C models in healthcare"
    ],
    appleUrl: "https://podcasts.apple.com/dm/podcast/kush-punyani-founder-of-spermosense/id1791839096?i=1000684910144",
    spotifyUrl: "https://creators.spotify.com/pod/profile/katalin-vikuk/episodes/Kush-Punyani-founder-of-Spermosense-e2tq7c6/a-abo6i86"
  },
  "december-2025-walk-the-valley": {
    id: "december-2025-walk-the-valley",
    title: "December Ramble",
    description: "Why 80% of HealthTech startups fail. In the latest episode of Walk the Valley, Will and I take an honest look at why so many promising healthcare startups stumble in the valley of death.",
    publishDate: "2025-01-21",
    duration: "52:30",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757192-0d22ac4ce659?w=800&h=400&fit=crop&crop=center",
    category: "Walk The Valley",
    guest: "Will & Kata",
    youtubeId: "iZCe2iApsPg",
    season: 1,
    fullDescription: `Why 80% of HealthTech startups fail. In the latest episode of Walk the Valley, Will and I take an honest look at why so many promising healthcare startups stumble in the valley of death. This episode is full of lessons for anyone navigating healthcare innovation—especially if you're trying to make it through the valley. Curious to know how even well-funded startups lose their footing and, most importantly, how you can avoid the same mistakes?`,
    keyTakeaways: [
      "Understanding why 80% of HealthTech startups fail",
      "Common mistakes that lead to failure in healthcare innovation",
      "How well-funded startups can still lose their footing",
      "Practical strategies for avoiding common pitfalls",
      "Lessons learned from the valley of death"
    ],
    appleUrl: "https://podcasts.apple.com/dm/podcast/walk-the-valley-christmas-episode/id1791839096?i=1000684909983",
    spotifyUrl: "https://creators.spotify.com/pod/profile/katalin-vikuk/episodes/Walk-the-Valley-Christmas-Episode-e2tq81q/a-abo6iuv"
  },
  "kristine-kuni-buccoliero-walks-the-valley": {
    id: "kristine-kuni-buccoliero-walks-the-valley",
    title: "Kristine Kuni Buccoliero walks the valley",
    description: "In today's episode, I sit down with Kristine, founder and CEO of NeoCare Nordic, a company on the verge of a major milestone with their groundbreaking neonatal care solution.",
    publishDate: "2025-01-29",
    duration: "49:20",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757199-0f1e6b2f9e68?w=800&h=400&fit=crop&crop=center",
    category: "Neonatal Care",
    guest: "Kristine Kuni Buccoliero",
    youtubeId: "aW-OWkhYHQo",
    season: 1,
    fullDescription: `In today's episode, I sit down with Kristine, founder and CEO of NeoCare Nordic, a company on the verge of a major milestone with their groundbreaking neonatal care solution. We discuss what it takes to bring a health tech product to life—from securing CE marking and entering test markets, to crafting a funding strategy that maximizes soft funding and attracts investors. Kristine also shares her insights on working directly with hospitals, creating evidence-based standards, and navigating the tricky gaps between funding cycles.`,
    keyTakeaways: [
      "Bringing health tech products to life in neonatal care",
      "Securing CE marking and entering test markets",
      "Crafting funding strategies that maximize soft funding",
      "Working directly with hospitals and healthcare providers",
      "Creating evidence-based standards in healthcare"
    ],
    appleUrl: "https://podcasts.apple.com/dm/podcast/kristine-kuni-buccoliero-ceo-and-founder-of-neocare-nordic/id1791839096?i=1000686647626",
    spotifyUrl: "https://creators.spotify.com/pod/profile/katalin-vikuk/episodes/Kristine-Kuni-Buccoliero-CEO-and-founder-of-Neocare-Nordic-e2u4ouk/a-abojmva"
  },
  "finn-ketler-walks-the-valley": {
    id: "finn-ketler-walks-the-valley",
    title: "Finn Ketler walks the valley",
    description: "In this episode, I sit down with Finn Ketler, a seasoned expert in healthcare innovation and commercialization.",
    publishDate: "2025-02-20",
    duration: "47:15",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757199-1df3b3ad8ced?w=800&h=400&fit=crop&crop=center",
    category: "MedTech Innovation",
    guest: "Finn Ketler",
    youtubeId: "R_wlP9RICp0",
    season: 1,
    fullDescription: `In this episode, I sit down with Finn Ketler, a seasoned expert in healthcare innovation and commercialization. With years of experience navigating market entry, regulation, and strategic growth, Finn has built a deep understanding of what it takes to succeed in the healthcare space. Discussions about healthcare startups often circle back to funding challenges, but there's so much more to consider when building a medtech company. Today, we're shifting gears to explore what really drives success – beyond securing investment. And, of course, we'll tackle the big question: Is there really more than one valley of death, or is it all just one major challenge with different roadblocks?`,
    keyTakeaways: [
      "Healthcare innovation and commercialization expertise",
      "Market entry and regulatory navigation strategies",
      "What drives success beyond securing investment",
      "Understanding the complexities of medtech companies",
      "Exploring multiple valleys of death in healthcare"
    ],
    appleUrl: "https://podcasts.apple.com/dm/podcast/finn-ketler-managing-partner-and-founder-of-coopmed/id1791839096?i=1000694257258",
    spotifyUrl: "https://creators.spotify.com/pod/profile/katalin-vikuk/episodes/Finn-Ketler-managing-partner-and-founder-of-CoopMed-e2v3f3r"
  },
  "christian-hoding-walks-the-valley": {
    id: "christian-hoding-walks-the-valley",
    title: "Christian Høding walks the valley",
    description: "In this episode I am joined by Christian Höding, founder and CEO of Hird.io, and an expert in management consulting, strategy, and execution.",
    publishDate: "2025-03-07",
    duration: "51:45",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757175-e3a90c7a5bde?w=800&h=400&fit=crop&crop=center",
    category: "Startup Funding",
    guest: "Christian Høding",
    youtubeId: "OaTdx1OJ3sA",
    season: 1,
    fullDescription: `In this episode I am joined by Christian Höding, founder and CEO of Hird.io, and an expert in management consulting, strategy, and execution. Startups in healthcare often focus on securing funding, but the reality is—strategy, execution, and leadership are just as critical for survival. In this episode, we take a deep dive into turning strategy into action, exploring what works and what doesn't when trying to navigate the challenges of healthcare innovation. We discuss how to choose the right market wisely to avoid costly missteps and ensure long-term success.`,
    keyTakeaways: [
      "Turning strategy into action in healthcare startups",
      "The critical role of execution and leadership",
      "Navigating challenges beyond funding in healthcare",
      "Choosing the right market to avoid costly missteps",
      "Ensuring long-term success in healthcare innovation"
    ],
    appleUrl: "https://podcasts.apple.com/dm/podcast/christian-h%C3%B8ding-founder-and-ceo-of-hird/id1791839096?i=1000698230415",
    spotifyUrl: "https://creators.spotify.com/pod/profile/katalin-vikuk/episodes/Christian-Hding--founder-and-CEO-of-Hird-e2vqgug"
  },
  "hanna-sjostrom-walks-the-valley": {
    id: "hanna-sjostrom-walks-the-valley",
    title: "Hanna Sjöström walks the valley",
    description: "In this episode we are joined by Hanna Sjöström, CEO of Neola Medical, a company pioneering neonatal lung monitoring.",
    publishDate: "2025-03-25",
    duration: "46:30",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757164-b4b7da8e4d7c?w=800&h=400&fit=crop&crop=center",
    category: "Medtech Commercialisation",
    guest: "Hanna Sjöström",
    youtubeId: "D6npFEWJ-uk",
    season: 1,
    fullDescription: `In this episode we are joined by Hanna Sjöström, CEO of Neola Medical, a company pioneering neonatal lung monitoring. But before stepping into the medtech world, Hanna built her career in fast-moving consumer goods, holding leadership roles at L'Oréal and Coca-Cola. Her transition from global brands to leading an early-stage medical device company is a testament to the power of adaptable leadership and strategic vision. In this episode, we explore what it takes to step in as an external CEO and drive innovation in a highly specialized, high-stakes field like neonatal care.`,
    keyTakeaways: [
      "Transitioning from consumer goods to medtech leadership",
      "Pioneering neonatal lung monitoring technology",
      "Adaptable leadership in specialized healthcare fields",
      "Strategic vision for early-stage medical devices",
      "Driving innovation in high-stakes neonatal care"
    ],
    appleUrl: "https://podcasts.apple.com/se/podcast/hanna-sj%C3%B6str%C3%B6m-ceo-of-neola-medical/id1791839096?i=1000700754105",
    spotifyUrl: "https://creators.spotify.com/pod/profile/katalin-vikuk/episodes/Hanna-Sjstrm--CEO-of-Neola-Medical-e30kt2q"
  },
  "april-2025-walk-the-valley": {
    id: "april-2025-walk-the-valley",
    title: "April Ramble",
    description: "In this special episode of Walk the Valley, Will and Kata dive into one of the most overlooked – and most critical – factors in healthcare innovation: knowing your customer.",
    publishDate: "2025-04-29",
    duration: "48:45",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757264-8b9c5c10a44c?w=800&h=400&fit=crop&crop=center",
    category: "Walk The Valley",
    guest: "Will & Kata",
    youtubeId: "2rQbIro1qv4",
    season: 1,
    fullDescription: `In this special episode of Walk the Valley, Will and Kata dive into one of the most overlooked – and most critical – factors in healthcare innovation: knowing your customer. Borrowing the term KYC from the financial world, we reframe it to mean something much deeper: understanding your users and customers through deliberate research and value proposition design. Because no amount of technology, funding, or hype can save a startup that's solving the wrong problem.`,
    keyTakeaways: [
      "The critical importance of knowing your customer in healthcare",
      "Understanding users through deliberate research",
      "Value proposition design in healthcare innovation",
      "Why technology and funding can't save wrong solutions",
      "Applying KYC principles to healthcare startups"
    ],
    appleUrl: "https://podcasts.apple.com/se/podcast/knowing-your-customers-and-designing-your-value/id1791839096?i=1000705450336",
    spotifyUrl: "https://creators.spotify.com/pod/profile/katalin-vikuk/episodes/Knowing-Your-Customers-and-designing-your-Value-Proporsition-e325rol"
  },
  "julie-dalsgaard-walks-the-valley": {
    id: "julie-dalsgaard-walks-the-valley",
    title: "Julie Dalsgaard walks the valley",
    description: "In this episode Will talks with Julie Dalsgaard, CEO of Lifeline Robotics, a Danish MedTech startup born at the peak of the COVID-19 pandemic.",
    publishDate: "2025-05-15",
    duration: "50:15",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757188-53a8e10ab9cc?w=800&h=400&fit=crop&crop=center",
    category: "MedTech Startups",
    guest: "Julie Dalsgaard",
    youtubeId: "dO0Fy2aBwEU",
    season: 1,
    fullDescription: `In this episode Will talks with Julie Dalsgaard, CEO of Lifeline Robotics, a Danish MedTech startup born at the peak of the COVID-19 pandemic. Julie shares what it was like to build a company in the middle of a global crisis, and how Lifeline Robotics navigated the difficult shift from emergency pandemic use to long-term clinical relevance. From pivoting toward general practice to operating in the grey zone between robotics and medical devices, her journey offers a grounded and honest look at the messy reality of healthcare innovation.`,
    keyTakeaways: [
      "Building a medtech startup during the COVID-19 pandemic",
      "Navigating the shift from emergency to long-term clinical use",
      "Pivoting business models in healthcare innovation",
      "Operating in the grey zone between robotics and medical devices",
      "The messy reality of healthcare innovation"
    ],
    appleUrl: "https://podcasts.apple.com/dm/podcast/jule-dalsgard-ceo-of-lifeline-robotics/id1791839096?i=1000708654316",
    spotifyUrl: "https://creators.spotify.com/pod/profile/katalin-vikuk/episodes/Jule-Dalsgard-CEO-of-Lifeline-Robotics-e32tglj"
  },
  "tomas-de-souza-walks-the-valley": {
    id: "tomas-de-souza-walks-the-valley",
    title: "Tomas de Souza walks the valley",
    description: "In this episode of Walk the Valley, Tomas shares an honest and reflective conversation on what it means to lead a startup when things don't go as planned.",
    publishDate: "2025-06-02",
    duration: "44:30",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757198-b3c8f3e5b3d9?w=800&h=400&fit=crop&crop=center",
    category: "Leadership & Resilience",
    guest: "Tomas de Souza",
    youtubeId: "hY-zKv3-fsI",
    season: 1,
    fullDescription: `In this episode of Walk the Valley, Tomas shares an honest and reflective conversation on what it means to lead a startup when things don't go as planned. From dealing with the emotional toll of uncertainty to understanding the importance of early scenario planning, Tomas opens up about the unseen challenges that many founders face but rarely talk about.`,
    keyTakeaways: [
      "Leading a startup when things don't go as planned",
      "Dealing with the emotional toll of uncertainty",
      "The importance of early scenario planning",
      "Unseen challenges that founders face",
      "Building resilience in healthcare leadership"
    ],
    appleUrl: "https://podcasts.apple.com/se/podcast/tomas-de-souza-former-ceo-of-ablemind/id1791839096?i=1000710927468&l=en-GB",
    spotifyUrl: "https://creators.spotify.com/pod/profile/katalin-vikuk/episodes/Tomas-de-Souza-former-CEO-of-Ablemind-e33n7bs"
  },
  "1": {
    id: "1",
    title: "From Lab to Market: The Healthcare Innovation Journey",
    description: "Exploring the complex path from scientific discovery to commercial success in healthcare, featuring insights from industry veterans.",
    publishDate: "2024-01-15",
    duration: "45:30",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&crop=center",
    category: "Innovation",
    guest: "Dr. Sarah Chen",
    youtubeId: "dQw4w9WgXcQ", // Placeholder YouTube ID
    fullDescription: `In this comprehensive episode, we dive deep into the complex journey of transforming healthcare discoveries into commercial successes. Dr. Sarah Chen, a renowned expert in healthcare innovation, shares her extensive experience navigating the challenges between laboratory breakthroughs and market-ready products.

We explore the critical phase known as the "valley of death" - that challenging period where promising scientific discoveries often fail to reach commercialization. Dr. Chen provides practical insights into building commercial frameworks around intellectual property, understanding market dynamics, and creating sustainable business models in the healthcare sector.

Key topics covered include strategic timing of patent applications, the importance of early market validation, building relationships with key stakeholders in the healthcare ecosystem, and understanding the complex regulatory landscape that governs medical innovation.

This episode is essential listening for researchers, entrepreneurs, and anyone involved in bringing healthcare innovations to market.`,
    keyTakeaways: [
      "Understanding the valley of death in healthcare innovation",
      "Strategic approaches to intellectual property management",
      "Building commercial frameworks around scientific discoveries",
      "Market validation strategies for healthcare products",
      "Navigating regulatory requirements and compliance"
    ]
  },
  "2": {
    id: "2",
    title: "Navigating the Valley of Death in Medical Technology",
    description: "Understanding the critical phase between discovery and commercialization, and strategies to bridge the gap.",
    publishDate: "2024-01-08",
    duration: "52:15",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop&crop=center",
    category: "Strategy",
    guest: "Marcus Rodriguez",
    youtubeId: "dQw4w9WgXcQ",
    fullDescription: `Marcus Rodriguez, a seasoned medical technology entrepreneur, joins us to discuss the notorious "valley of death" that claims so many promising healthcare innovations. With over 15 years of experience in medical device development, Marcus provides a roadmap for successfully navigating this critical phase.

This episode focuses on practical strategies for bridging the gap between scientific discovery and commercial viability. We examine real-world case studies of both successful transitions and common pitfalls that lead to failure in the commercialization process.

Marcus shares insights on building effective teams, securing appropriate funding at each stage, and developing go-to-market strategies that resonate with healthcare providers and patients alike.`,
    keyTakeaways: [
      "Identifying and avoiding common commercialization pitfalls",
      "Building cross-functional teams for successful product development",
      "Funding strategies for different stages of development",
      "Creating compelling value propositions for healthcare stakeholders",
      "Timing market entry for maximum impact"
    ]
  }
};

const EpisodeDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Get episode data (in a real app, this would be fetched from an API)
  const episode = id ? episodeData[id as keyof typeof episodeData] : null;

  if (!episode) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Episode Not Found</h1>
          <p className="text-muted-foreground mb-8">The episode you're looking for doesn't exist.</p>
          <Link to="/episodes">
            <Button variant="professional">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Episodes
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{episode.title} | Walk the Valley Podcast</title>
        <meta name="description" content={episode.description} />
        <link rel="canonical" href={`https://www.walkthevalley.lovable.app/episodes/${episode.id}`} />
        <meta property="og:title" content={`${episode.title} | Walk the Valley`} />
        <meta property="og:description" content={episode.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.walkthevalley.lovable.app/episodes/${episode.id}`} />
        <meta property="og:image" content={episode.thumbnailUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PodcastEpisode",
            "name": episode.title,
            "description": episode.description,
            "datePublished": episode.publishDate,
            "duration": episode.duration,
            "partOfSeries": {
              "@type": "PodcastSeries",
              "name": "Walk the Valley",
              "url": "https://walkthevalley.lovable.app/"
            },
            "url": `https://walkthevalley.lovable.app/episodes/${episode.id}`,
            "genre": episode.category
          })}
        </script>
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center" 
        style={{ backgroundImage: `url(${valleyBackground})` }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Logo */}
            <div className="mb-8">
              <img 
                src={wtvLogoWhite} 
                alt="Walk the Valley" 
                className="h-16 mx-auto"
              />
            </div>
            
            {/* Episode Info */}
            <div className="flex items-center justify-center space-x-4 text-sm text-white/80 mb-4">
              <Badge className="bg-white/20 text-white border-white/30">
                {episode.category}
              </Badge>
              {(episode as any).season && (
                <Badge className="bg-primary/80 text-primary-foreground border-primary/50">
                  Season {(episode as any).season}
                </Badge>
              )}
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(episode.publishDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {episode.title}
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              {episode.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section - 2 Columns */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* YouTube Column (3/5 width) */}
            <div className="lg:col-span-3">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-elegant">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${episode.youtubeId}`}
                  title={episode.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              
              {/* Listen On Section */}
              {((episode as any).appleUrl || (episode as any).spotifyUrl) && (
                <Card className="bg-gradient-card shadow-card mt-4">
                  <CardContent className="p-4">
                     <div className="flex items-center gap-3">
                       <h3 className="text-sm font-semibold text-foreground">Listen On</h3>
                       <Button 
                         variant="outline" 
                         size="sm"
                         className="px-3 border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700"
                         onClick={() => {
                           const youtubeUrl = episode.id === 'elisabeth-carlson-walks-the-valley' 
                             ? 'https://youtu.be/om98-BbGC8o?si=e3utdbWf9cGaVWgc'
                             : `https://youtu.be/${episode.youtubeId}`;
                           window.open(youtubeUrl, '_blank');
                         }}
                       >
                         <Youtube className="h-3 w-3 mr-1" />
                         YouTube
                       </Button>
                       {(episode as any).appleUrl && (
                         <Button 
                           variant="outline" 
                           size="sm"
                           className="px-3 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                           onClick={() => window.open((episode as any).appleUrl, '_blank')}
                         >
                           <Music className="h-3 w-3 mr-1" />
                           Apple
                         </Button>
                       )}
                       {(episode as any).spotifyUrl && (
                         <Button 
                           variant="outline" 
                           size="sm"
                           className="px-3 border-yellow-500 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700"
                           onClick={() => window.open((episode as any).spotifyUrl, '_blank')}
                         >
                           <Headphones className="h-3 w-3 mr-1" />
                           Spotify
                         </Button>
                       )}
                     </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Content Column (2/5 width) */}
            <div className="lg:col-span-2">
              {/* About This Episode */}
              <Card className="bg-gradient-card shadow-card h-fit">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">About This Episode</h2>
                  <div className="text-sm text-muted-foreground">
                    {episode.fullDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-3 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section - 2 Columns */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Never Miss Episode */}
            <Card className="bg-gradient-primary text-primary-foreground shadow-glow">
              <CardContent className="p-6 text-center flex flex-col justify-center h-full">
                <h3 className="text-lg font-bold mb-3">Never Miss an Episode</h3>
                <p className="text-sm opacity-90 mb-4">
                  Subscribe to get notified about new episodes and exclusive content.
                </p>
                <Button variant="secondary" className="w-full">
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>

            {/* Key Takeaways */}
            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Key Takeaways</h3>
                <ul className="space-y-3">
                  {episode.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {takeaway}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EpisodeDetail;