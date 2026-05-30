import { news as mockNews } from "../data/mockNews";

const HN_API_URL = "https://hn.algolia.com/api/v1/search_by_date";
const MOCK_DELAY_MS = 260;
const HITS_PER_PAGE = 24;

export const categories = [
  { id: "all", name: "All Signals", short: "ALL", icon: "radar" },
  { id: "ai", name: "AI", short: "AI", icon: "spark" },
  { id: "telecom", name: "Telecom", short: "TEL", icon: "tower" },
  { id: "security", name: "Cybersecurity", short: "SEC", icon: "shield" },
  { id: "cloud", name: "Cloud", short: "CLD", icon: "cloud" },
  { id: "hardware", name: "Hardware", short: "HW", icon: "cpu" },
  { id: "voip", name: "VoIP", short: "VOIP", icon: "phone" },
];

export const categoryColors = {
  ai: "#818cf8",
  telecom: "#38bdf8",
  security: "#f472b6",
  cloud: "#a78bfa",
  hardware: "#fbbf24",
  voip: "#34d399",
};

const categoryQueries = {
  ai: "AI artificial intelligence machine learning LLM OpenAI model agents",
  telecom: "telecom 5G 6G network broadband fiber satellite carrier",
  security: "cybersecurity security CVE vulnerability breach ransomware exploit",
  cloud: "cloud AWS Azure GCP Kubernetes serverless infrastructure",
  hardware: "hardware chip semiconductor GPU CPU NPU datacenter silicon",
  voip: "VoIP SIP WebRTC PBX Asterisk telephony voice",
};

const categoryKeywords = {
  ai: ["ai", "artificial intelligence", "machine learning", "llm", "openai", "model", "agent", "neural"],
  telecom: ["telecom", "5g", "6g", "network", "broadband", "fiber", "satellite", "carrier", "radio"],
  security: ["security", "cyber", "cve", "vulnerability", "breach", "ransomware", "exploit", "malware"],
  cloud: ["cloud", "aws", "azure", "gcp", "kubernetes", "serverless", "infrastructure", "datacenter"],
  hardware: ["hardware", "chip", "semiconductor", "gpu", "cpu", "npu", "silicon", "device"],
  voip: ["voip", "sip", "webrtc", "pbx", "asterisk", "telephony", "voice", "call"],
};

const defaultQuery = Object.values(categoryQueries).join(" ");

const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

export async function fetchNewsSignals({ query = "", category = "all", signal } = {}) {
  const mode = import.meta.env.VITE_NEWS_MODE || "live";

  if (mode === "mock") {
    await sleep(MOCK_DELAY_MS);
    return buildMockPayload();
  }

  try {
    const payload = await fetchHackerNewsSignals({ query, category, signal });
    return {
      ...payload,
      source: "api",
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }

    console.warn("Hacker News API unavailable, falling back to mock data.", error);

    await sleep(MOCK_DELAY_MS);
    return buildMockPayload(error);
  }
}

async function fetchHackerNewsSignals({ query, category, signal }) {
  const url = buildAlgoliaUrl({ query, category });
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Hacker News API returned ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.hits)) {
    throw new Error("Unexpected Hacker News API response");
  }

  const preferredCategory = category === "all" ? null : category;
  const news = data.hits
    .map((hit, index) => mapHitToSignal(hit, index, preferredCategory))
    .filter(Boolean);

  if (news.length > 0) {
    news[0] = { ...news[0], hot: true };
  }

  return {
    categories,
    categoryColors,
    news,
    radarData: buildRadarData(news),
  };
}

function buildAlgoliaUrl({ query, category }) {
  const url = new URL(import.meta.env.VITE_NEWS_API_URL || HN_API_URL);
  const categoryQuery = category === "all" ? "" : categoryQueries[category] || "";
  const searchQuery = [query.trim(), categoryQuery].filter(Boolean).join(" ") || defaultQuery;

  url.searchParams.set("query", searchQuery);
  url.searchParams.set("tags", "story");
  url.searchParams.set("hitsPerPage", String(HITS_PER_PAGE));

  return url;
}

function mapHitToSignal(hit, index, preferredCategory) {
  const title = hit.title || hit.story_title;
  if (!title) return null;

  const cleanStoryText = stripHtml(hit.story_text || hit.comment_text || "");
  const url = hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`;
  const textForCategory = `${title} ${cleanStoryText} ${url}`;
  const cat = preferredCategory || inferCategory(textForCategory) || "cloud";
  const points = Number(hit.points || 0);
  const comments = Number(hit.num_comments || 0);
  const score = Math.max(points, comments, 1);

  return {
    id: `hn-${hit.objectID}`,
    cat,
    title,
    summary: buildSummary({ cleanStoryText, source: getSource(url), points, comments }),
    source: getSource(url),
    time: formatTimeAgo(hit.created_at),
    read: estimateReadMinutes(title, cleanStoryText),
    trend: `+${Math.min(99, Math.max(3, Math.round(score / 3)))}%`,
    live: isLive(hit.created_at) || index < 3,
    url,
    hnUrl: `https://news.ycombinator.com/item?id=${hit.objectID}`,
  };
}

function buildMockPayload(error) {
  const normalizedNews = mockNews.map((item) => ({
    ...item,
    cat: item.cat === "5g6g" ? "telecom" : item.cat,
  }));

  return {
    categories,
    categoryColors,
    news: normalizedNews,
    radarData: buildRadarData(normalizedNews),
    source: "mock",
    error: error ? error.message : null,
    updatedAt: new Date().toISOString(),
  };
}

function inferCategory(text) {
  const normalizedText = text.toLowerCase();

  return Object.entries(categoryKeywords)
    .map(([cat, keywords]) => ({
      cat,
      score: keywords.reduce((total, keyword) => total + (normalizedText.includes(keyword) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score)
    .find((item) => item.score > 0)?.cat;
}

function buildRadarData(news) {
  const counts = categories
    .filter((category) => category.id !== "all")
    .map((category) => ({
      cat: category.id,
      label: category.name,
      count: news.filter((item) => item.cat === category.id).length,
    }));
  const max = Math.max(...counts.map((item) => item.count), 1);

  return counts.map((item) => ({
    cat: item.cat,
    label: item.label,
    value: Math.round((item.count / max) * 100),
  }));
}

function buildSummary({ cleanStoryText, source, points, comments }) {
  if (cleanStoryText.length > 80) {
    return truncate(cleanStoryText, 220);
  }

  const score = points > 0 ? `${points} punktow` : "aktywny watek";
  const discussion = comments > 0 ? `${comments} komentarzy` : "nowa dyskusja";

  return `Sygnal z Hacker News: ${source}, ${score} i ${discussion}. Watek pasuje do monitorowanych trendow AI, telecom i infrastruktury.`;
}

function stripHtml(value) {
  return decodeHtml(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function decodeHtml(value) {
  if (typeof document === "undefined") return value;
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
}

function truncate(value, maxLength) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trim()}...`;
}

function getSource(value) {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "news.ycombinator.com";
  }
}

function estimateReadMinutes(title, text) {
  const words = `${title} ${text}`.trim().split(/\s+/).filter(Boolean).length;
  return Math.min(8, Math.max(2, Math.ceil(words / 180)));
}

function formatTimeAgo(value) {
  if (!value) return "teraz";

  const createdAt = new Date(value).getTime();
  const diffMs = Date.now() - createdAt;
  const minutes = Math.max(1, Math.floor(diffMs / 60000));

  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} godz`;

  const days = Math.floor(hours / 24);
  return `${days} dni`;
}

function isLive(value) {
  if (!value) return false;
  return Date.now() - new Date(value).getTime() < 4 * 60 * 60 * 1000;
}
