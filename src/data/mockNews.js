export const categories = [
  { id: "all", name: "All Signals", short: "ALL", icon: "radar" },
  { id: "ai", name: "AI", short: "AI", icon: "spark" },
  { id: "telecom", name: "Telecom", short: "TEL", icon: "tower" },
  { id: "5g6g", name: "5G / 6G", short: "5G6G", icon: "radioTower" },
  { id: "voip", name: "VoIP", short: "VOIP", icon: "phone" },
  { id: "security", name: "Cybersecurity", short: "SEC", icon: "shield" },
  { id: "cloud", name: "Cloud", short: "CLD", icon: "cloud" },
  { id: "hardware", name: "Hardware", short: "HW", icon: "cpu" },
];

export const categoryColors = {
  ai: "#818cf8",
  telecom: "#38bdf8",
  "5g6g": "#22d3ee",
  voip: "#34d399",
  security: "#f472b6",
  cloud: "#a78bfa",
  hardware: "#fbbf24",
};

export const news = [
  {
    id: "n1",
    cat: "ai",
    hot: true,
    title: "Nowy model open-source dorownuje GPT-klasie w zadaniach agentowych",
    summary:
      "Laboratorium udostepnilo wagi modelu 120B, ktory w benchmarkach narzedziowych wypada na rowni z czolowymi modelami zamknietymi, przy czterokrotnie nizszym koszcie inferencji.",
    source: "ModelWatch",
    time: "12 min",
    read: 6,
    trend: "+38%",
    live: true,
  },
  {
    id: "n2",
    cat: "5g6g",
    title: "Pierwsze komercyjne testy 6G w pasmie sub-THz osiagaja 240 Gb/s",
    summary:
      "Operator zademonstrowal transmisje na dystansie 500 m w warunkach miejskich, zapowiadajac pilotaz dla zastosowan przemyslowych w 2027 roku.",
    source: "SpectrumDaily",
    time: "41 min",
    read: 4,
    trend: "+12%",
  },
  {
    id: "n3",
    cat: "security",
    title: "Krytyczna podatnosc w bibliotece SIP - natychmiastowa latka zalecana",
    summary:
      "Blad przepelnienia bufora pozwala na zdalne wykonanie kodu na centralach obslugujacych pakiety INVITE. Ocena ryzyka: CVSS 9.1.",
    source: "CVE Feed",
    time: "1 godz",
    read: 3,
    trend: "+64%",
    live: true,
  },
  {
    id: "n4",
    cat: "voip",
    title: "Asterisk 22 wprowadza natywne kodeki AI do redukcji szumow",
    summary:
      "Nowa galaz PBX integruje przetwarzanie neuronowe w czasie rzeczywistym, obnizajac pasmo o 30% przy zachowaniu jakosci HD Voice.",
    source: "PBX Insider",
    time: "2 godz",
    read: 5,
    trend: "+9%",
  },
  {
    id: "n5",
    cat: "cloud",
    title: "Hyperscaler uruchamia regiony brzegowe dedykowane inferencji",
    summary:
      "Nowa oferta GPU-as-a-Service skraca opoznienia do ponizej 15 ms dla aplikacji konwersacyjnych w Europie Srodkowej.",
    source: "CloudOps",
    time: "3 godz",
    read: 4,
    trend: "+21%",
  },
  {
    id: "n6",
    cat: "telecom",
    title: "Konsolidacja rynku: dwaj operatorzy lacza infrastrukture swiatlowodowa",
    summary:
      "Fuzja obejmie 2,1 mln gospodarstw domowych i ma przyspieszyc wdrozenie FTTH na obszarach wiejskich.",
    source: "TelcoTimes",
    time: "4 godz",
    read: 3,
    trend: "-4%",
  },
  {
    id: "n7",
    cat: "hardware",
    title: "Nowy NPU brzegowy: 80 TOPS przy 4 W dla urzadzen telekomunikacyjnych",
    summary:
      "Uklad celuje w stacje bazowe i bramki VoIP, umozliwiajac lokalna analize pakietow bez wysylania danych do chmury.",
    source: "SiliconBeat",
    time: "5 godz",
    read: 6,
    trend: "+17%",
  },
  {
    id: "n8",
    cat: "ai",
    title: "Regulator publikuje wytyczne dotyczace audytu modeli w telekomunikacji",
    summary:
      "Dokument definiuje wymogi przejrzystosci dla systemow AI sterujacych ruchem sieciowym i obsluga klienta.",
    source: "PolicyDesk",
    time: "6 godz",
    read: 7,
    trend: "+5%",
  },
  {
    id: "n9",
    cat: "security",
    title: "Botnet wykorzystuje przejete routery 5G CPE do atakow DDoS",
    summary:
      "Kampania zainfekowala okolo 40 tys. urzadzen brzegowych. Zalecana jest rotacja domyslnych hasel i aktualizacja firmware.",
    source: "ThreatLab",
    time: "7 godz",
    read: 4,
    trend: "+28%",
  },
  {
    id: "n10",
    cat: "5g6g",
    title: "Network slicing wchodzi do oferty B2B dla zastosowan krytycznych",
    summary:
      "Operator oferuje gwarantowane plastry sieci z SLA dla sluzb ratunkowych i automatyki przemyslowej.",
    source: "SpectrumDaily",
    time: "9 godz",
    read: 5,
    trend: "+11%",
  },
  {
    id: "n11",
    cat: "cloud",
    title: "Otwarty standard FinOps dla kosztow inferencji AI nabiera tempa",
    summary:
      "Konsorcjum chmurowe publikuje metryki kosztu na token, ulatwiajace porownywanie dostawcow GPU.",
    source: "CloudOps",
    time: "11 godz",
    read: 3,
    trend: "+8%",
  },
  {
    id: "n12",
    cat: "voip",
    title: "WebRTC zyskuje wsparcie dla szyfrowania post-kwantowego",
    summary:
      "Aktualizacja przegladarek wprowadza wymiane kluczy odpornych na komputery kwantowe w polaczeniach glosowych.",
    source: "PBX Insider",
    time: "13 godz",
    read: 5,
    trend: "+14%",
  },
  {
    id: "n13",
    cat: "hardware",
    title: "Modulowe anteny mmWave obnizaja koszt small cells o polowe",
    summary:
      "Producent prezentuje rozwiazanie plug-and-play upraszczajace geste wdrozenia 5G w miastach.",
    source: "SiliconBeat",
    time: "16 godz",
    read: 4,
    trend: "+6%",
  },
  {
    id: "n14",
    cat: "telecom",
    title: "eSIM-only: kolejny rynek wycofuje fizyczne karty SIM",
    summary:
      "Regulator zatwierdzil harmonogram pelnego przejscia na eSIM do konca 2027 roku.",
    source: "TelcoTimes",
    time: "19 godz",
    read: 3,
    trend: "+3%",
  },
];

export const radarData = [
  { cat: "ai", label: "AI", value: 92 },
  { cat: "telecom", label: "Telecom", value: 58 },
  { cat: "5g6g", label: "5G/6G", value: 74 },
  { cat: "voip", label: "VoIP", value: 46 },
  { cat: "security", label: "Security", value: 81 },
  { cat: "cloud", label: "Cloud", value: 63 },
  { cat: "hardware", label: "Hardware", value: 51 },
];
