// Simplified English-only events data
export const events = {
  2025: [
    {
      id: 1,
      name: "South Summit Brazil",
      location: "Porto Alegre, Brazil",
      country: "Brazil",
      region: "Latin America",
      date: "2025-03-25",
      endDate: "2025-03-27",
      attendees: 23000,
      popularity: 85,
      aiPresence: 65,
      rating: 3.5,
      confirmed: true,
      tags: ["general tech"],
      description: "Annual innovation and startup event connecting entrepreneurs, investors, and corporations.",
      focus: "Entrepreneurship, startups, and innovation"
    },
    {
      id: 2,
      name: "Jalisco Talent Land",
      location: "Guadalajara, Mexico",
      country: "Mexico",
      region: "Latin America", 
      date: "April",
      endDate: null,
      attendees: 40000,
      popularity: 92,
      aiPresence: 50,
      rating: 4.0,
      confirmed: false,
      tags: ["general tech"],
      description: "Mexico's largest technology and young talent festival, supported by the state of Jalisco.",
      focus: "Technology talent development, entrepreneurship, programming"
    },
    {
      id: 3,
      name: "Latam Startup",
      location: "Mexico City, Mexico", 
      country: "Mexico",
      region: "Latin America",
      date: "2025-05-20",
      endDate: "2025-05-22",
      attendees: 15000,
      popularity: 75,
      aiPresence: 70,
      rating: 3.5,
      confirmed: true,
      tags: ["startups"],
      description: "Premier startup and venture capital event for Latin America's entrepreneurial ecosystem.",
      focus: "Startups, venture capital, and entrepreneurship"
    },
    {
      id: 4,
      name: "Campus Party Brasil",
      location: "São Paulo, Brazil",
      country: "Brazil", 
      region: "Latin America",
      date: "Last week of July",
      endDate: null,
      attendees: 120000,
      popularity: 65,
      aiPresence: 40,
      rating: 3.0,
      confirmed: false,
      tags: ["general tech"],
      description: "Massive tech festival combining technology, creativity, entrepreneurship, and digital entertainment.",
      focus: "Technology, creativity, and digital culture"
    },
    {
      id: 5,
      name: "RD Summit",
      location: "Florianópolis, Brazil",
      country: "Brazil",
      region: "Latin America",
      date: "2025-11-05",
      endDate: "2025-11-07", 
      attendees: 25000,
      popularity: 88,
      aiPresence: 60,
      rating: 4.0,
      confirmed: true,
      tags: ["marketing", "sales"],
      description: "Latin America's largest marketing and sales event, focusing on digital strategies and growth.",
      focus: "Digital marketing, sales, and growth strategies"
    },
    {
      id: 6,
      name: "Web Summit Rio",
      location: "Rio de Janeiro, Brazil",
      country: "Brazil",
      region: "Latin America", 
      date: "2025-05-05",
      endDate: "2025-05-08",
      attendees: 22000,
      popularity: 90,
      aiPresence: 75,
      rating: 4.5,
      confirmed: true,
      tags: ["general tech"],
      description: "Global technology conference bringing together industry leaders, startups, and investors.",
      focus: "Technology innovation, startups, and global trends"
    },
    {
      id: 7,
      name: "Viva Technology México",
      location: "Mexico City, Mexico",
      country: "Mexico",
      region: "Latin America",
      date: "September",
      endDate: null,
      attendees: 18000,
      popularity: 80,
      aiPresence: 55,
      rating: 3.5,
      confirmed: false,
      tags: ["general tech"],
      description: "Innovation and tech conference focusing on digital transformation and emerging technologies.",
      focus: "Digital transformation and emerging technologies"
    },
    {
      id: 8,
      name: "Colombia 4.0",
      location: "Bogotá, Colombia",
      country: "Colombia",
      region: "Latin America",
      date: "Last week of October",
      endDate: null,
      attendees: 35000,
      popularity: 82,
      aiPresence: 45,
      rating: 3.5,
      confirmed: false,
      tags: ["general tech"],
      description: "Annual digital economy meeting organized by Colombia's Ministry of ICT.",
      focus: "Digital ecosystems and 4.0 content"
    },
    {
      id: 9,
      name: "Nerdearla",
      location: "Buenos Aires, Argentina",
      country: "Argentina",
      region: "Latin America",
      date: "2025-09-23",
      endDate: "2025-09-27",
      attendees: 16000,
      popularity: 30,
      aiPresence: 45,
      rating: 3.0,
      confirmed: true,
      tags: ["general tech"],
      description: "Community conference created by sysarmy; technical talks on open source software, AI, security, DevOps and nerd culture.",
      focus: "Technology & open-source software development"
    },
    {
      id: 10,
      name: "Argentina Game Show",
      location: "Buenos Aires, Argentina", 
      country: "Argentina",
      region: "Latin America",
      date: "October",
      endDate: null,
      attendees: 100000,
      popularity: 50,
      aiPresence: 15,
      rating: 2.5,
      confirmed: false,
      tags: ["gaming"],
      description: "100k-visitor gamer expo; AI appears marginally in dev talks and game-engine demos.",
      focus: "Gaming, entertainment, game development"
    }
  ],
  
  2026: [
    {
      id: 11,
      name: "South Summit Brazil",
      location: "Porto Alegre, Brazil",
      country: "Brazil",
      region: "Latin America",
      date: "March",
      endDate: null,
      attendees: 25000,
      popularity: 85,
      aiPresence: 70,
      rating: 3.5,
      confirmed: false,
      tags: ["general tech"],
      description: "Annual innovation and startup event connecting entrepreneurs, investors, and corporations.",
      focus: "Entrepreneurship, startups, and innovation"
    },
    {
      id: 12,
      name: "Jalisco Talent Land", 
      location: "Guadalajara, Mexico",
      country: "Mexico",
      region: "Latin America",
      date: "April",
      endDate: null,
      attendees: 42000,
      popularity: 92,
      aiPresence: 55,
      rating: 4.0,
      confirmed: false,
      tags: ["general tech"],
      description: "Mexico's largest technology and young talent festival, supported by the state of Jalisco.",
      focus: "Technology talent development, entrepreneurship, programming"
    }
  ]
}

// Helper functions
export const getEventsByYear = (year) => {
  return events[year] || []
}

export const getAvailableYears = () => {
  return Object.keys(events).sort()
}

export const getAllEvents = () => {
  return Object.values(events).flat()
}

// Export for backwards compatibility
export const availableYears = getAvailableYears()
export const allEvents = getAllEvents()