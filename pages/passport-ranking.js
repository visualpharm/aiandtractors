import Head from 'next/head'
import Layout from '../components/Layout'
import React from 'react'
import dynamic from 'next/dynamic'

// Dynamic import for react-simple-maps to avoid SSR issues
const ComposableMap = dynamic(
  () => import('react-simple-maps').then(mod => mod.ComposableMap),
  { ssr: false }
)
const Geographies = dynamic(
  () => import('react-simple-maps').then(mod => mod.Geographies),
  { ssr: false }
)
const Geography = dynamic(
  () => import('react-simple-maps').then(mod => mod.Geography),
  { ssr: false }
)
const ZoomableGroup = dynamic(
  () => import('react-simple-maps').then(mod => mod.ZoomableGroup),
  { ssr: false }
)

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// Comprehensive passport data with calculated scores based on UNWTO 2023/2024 visitor numbers
// Score = Sum of annual visitors to visa-free destinations + home country visitors
// Data sources: UNWTO, Henley Passport Index, various visa databases
const passportData = [
  // Top Tier (1200+)
  { id: 'uae', country: 'United Arab Emirates', flag: '🇦🇪', score: 1272, homeBonus: 21, keyAccess: ['Schengen', 'China', 'USA', 'Japan', 'Russia'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'China', value: 35 }, { country: 'UK', value: 38 }, { country: 'Japan', value: 32 }], misses: [], note: { title: 'The Game Changer', text: 'UAE has visa-free access to China, Russia, USA, Schengen, and Japan - making it one of the most powerful passports for tourism access globally.' } },
  { id: 'brunei', country: 'Brunei', flag: '🇧🇳', score: 1239, homeBonus: 0.3, keyAccess: ['Schengen', 'China', 'USA', 'Japan'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'China', value: 35 }, { country: 'UK', value: 38 }, { country: 'Japan', value: 32 }], misses: [{ country: 'Russia', value: -25 }], note: { title: 'The Tiny Giant', text: 'Despite its small population, Brunei passport holders enjoy the same China visa-free access as UAE, placing them among the world\'s most powerful passports by tourism potential.' } },
  { id: 'singapore', country: 'Singapore', flag: '🇸🇬', score: 1231, homeBonus: 14, keyAccess: ['Schengen', 'China', 'USA', 'India', 'Indonesia'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'China', value: 35 }, { country: 'India', value: 18 }, { country: 'Indonesia', value: 16 }], misses: [], note: { title: 'The Asian Advantage', text: 'Singapore beats European passports by having visa-free access to major Asian destinations like India (18M) and Indonesia (16M) that Europeans cannot easily access.' } },
  { id: 'japan', country: 'Japan', flag: '🇯🇵', score: 1218, homeBonus: 32, keyAccess: ['Schengen', 'China', 'USA', 'India', 'Indonesia'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'China', value: 35 }, { country: 'Japan (Home)', value: 32 }, { country: 'India', value: 18 }], misses: [], note: { title: 'The Asian Advantage', text: 'Japan benefits from both a strong home tourism market (32M) AND visa-free access to India and Indonesia - destinations European passport holders struggle to reach easily.' } },
  { id: 'south_korea', country: 'South Korea', flag: '🇰🇷', score: 1205, homeBonus: 11, keyAccess: ['Schengen', 'USA', 'Japan', 'China'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'China', value: 35 }, { country: 'UK', value: 38 }, { country: 'Japan', value: 32 }], misses: [], note: { title: 'The Game Changer', text: 'South Korea gained visa-free access to China in late 2024, instantly adding 35M visitors to their accessible tourism pool.' } },

  // Elite European Tier (1000-1200)
  { id: 'france', country: 'France', flag: '🇫🇷', score: 1143, homeBonus: 100, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen (excl. France)', value: 300 }, { country: 'France (Home)', value: 100 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }], misses: [{ country: 'China', value: -35 }, { country: 'India', value: -18 }, { country: 'Indonesia', value: -16 }], note: { title: 'Home Court Advantage', text: 'France leads European passports due to its massive 100M home tourism market. French citizens have full access to their own world-class tourism infrastructure.' } },
  { id: 'spain', country: 'Spain', flag: '🇪🇸', score: 1128, homeBonus: 85, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen (excl. Spain)', value: 315 }, { country: 'Spain (Home)', value: 85 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }], misses: [{ country: 'China', value: -35 }, { country: 'India', value: -18 }], note: { title: 'The Second Powerhouse', text: 'Spain\'s 85M home tourism bonus keeps it close to France. Both lack visa-free access to China and India, the key differentiator vs. Asian passports.' } },
  { id: 'italy', country: 'Italy', flag: '🇮🇹', score: 1100, homeBonus: 57, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen (excl. Italy)', value: 343 }, { country: 'USA', value: 67 }, { country: 'Italy (Home)', value: 57 }, { country: 'Turkey', value: 55 }], misses: [{ country: 'China', value: -35 }, { country: 'India', value: -18 }], note: { title: 'The Italian Advantage', text: 'Italians enjoy their world-famous tourism infrastructure (57M annual visitors) as home bonus, plus full Schengen access to France (100M) and Spain (85M).' } },
  { id: 'uk', country: 'United Kingdom', flag: '🇬🇧', score: 1081, homeBonus: 38, keyAccess: ['Schengen', 'USA', 'Japan'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK (Home)', value: 38 }], misses: [{ country: 'China', value: -35 }, { country: 'India', value: -18 }], note: { title: 'Post-Brexit Schengen Access', text: 'UK maintains visa-free Schengen access for tourism, but ranks lower than major EU countries due to smaller home tourism market (38M vs France\'s 100M).' } },
  { id: 'germany', country: 'Germany', flag: '🇩🇪', score: 1078, homeBonus: 35, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }, { country: 'India', value: -18 }], note: { title: 'Economic Giant, Tourism Middle', text: 'Germany\'s economic power doesn\'t translate to tourism numbers (35M). German passport holders rank below France, Spain, and Italy in total experience.' } },
  { id: 'greece', country: 'Greece', flag: '🇬🇷', score: 1076, homeBonus: 33, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'austria', country: 'Austria', flag: '🇦🇹', score: 1074, homeBonus: 31, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'portugal', country: 'Portugal', flag: '🇵🇹', score: 1070, homeBonus: 27, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'poland', country: 'Poland', flag: '🇵🇱', score: 1065, homeBonus: 22, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'croatia', country: 'Croatia', flag: '🇭🇷', score: 1064, homeBonus: 21, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'netherlands', country: 'Netherlands', flag: '🇳🇱', score: 1062, homeBonus: 21, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'hungary', country: 'Hungary', flag: '🇭🇺', score: 1060, homeBonus: 17, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'ireland', country: 'Ireland', flag: '🇮🇪', score: 1058, homeBonus: 12, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'czechia', country: 'Czechia', flag: '🇨🇿', score: 1058, homeBonus: 15, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'sweden', country: 'Sweden', flag: '🇸🇪', score: 1056, homeBonus: 13, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'switzerland', country: 'Switzerland', flag: '🇨🇭', score: 1055, homeBonus: 12, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'romania', country: 'Romania', flag: '🇷🇴', score: 1055, homeBonus: 12, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'belgium', country: 'Belgium', flag: '🇧🇪', score: 1053, homeBonus: 10, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'norway', country: 'Norway', flag: '🇳🇴', score: 1052, homeBonus: 9, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'slovakia', country: 'Slovakia', flag: '🇸🇰', score: 1052, homeBonus: 9, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'bulgaria', country: 'Bulgaria', flag: '🇧🇬', score: 1052, homeBonus: 9, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'slovenia', country: 'Slovenia', flag: '🇸🇮', score: 1050, homeBonus: 7, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'denmark', country: 'Denmark', flag: '🇩🇰', score: 1050, homeBonus: 7, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'lithuania', country: 'Lithuania', flag: '🇱🇹', score: 1048, homeBonus: 5, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'cyprus', country: 'Cyprus', flag: '🇨🇾', score: 1048, homeBonus: 5, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'latvia', country: 'Latvia', flag: '🇱🇻', score: 1047, homeBonus: 4, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'finland', country: 'Finland', flag: '🇫🇮', score: 1047, homeBonus: 4, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'estonia', country: 'Estonia', flag: '🇪🇪', score: 1046, homeBonus: 3, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'malta', country: 'Malta', flag: '🇲🇹', score: 1046, homeBonus: 3, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'iceland', country: 'Iceland', flag: '🇮🇸', score: 1045, homeBonus: 2, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'luxembourg', country: 'Luxembourg', flag: '🇱🇺', score: 1043, homeBonus: 1, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: { title: 'The Italy Paradox (Inverse)', text: 'Luxembourg ranks higher than Italy despite a "weaker" traditional passport score. With only 1M home visitors, Luxembourgers gain full access to Italy (57M), France (100M), and Spain (85M) as tourist destinations.' } },
  { id: 'liechtenstein', country: 'Liechtenstein', flag: '🇱🇮', score: 1044, homeBonus: 0.1, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'monaco', country: 'Monaco', flag: '🇲🇨', score: 1044, homeBonus: 0.3, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'san_marino', country: 'San Marino', flag: '🇸🇲', score: 1044, homeBonus: 0.05, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },
  { id: 'andorra', country: 'Andorra', flag: '🇦🇩', score: 1044, homeBonus: 0.3, keyAccess: ['Schengen', 'USA', 'Japan'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: null },

  // North America & Oceania (950-1050)
  { id: 'usa', country: 'United States', flag: '🇺🇸', score: 1010, homeBonus: 67, keyAccess: ['Schengen', 'Canada', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA (Home)', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'Mexico', value: 42 }], misses: [{ country: 'China', value: -35 }, { country: 'Russia', value: -25 }], note: { title: 'The North American Tie', text: 'USA and Canada are effectively tied. Americans can visit Canada (+22M), Canadians can visit USA (+67M). Their total scores converge despite different home tourism numbers.' } },
  { id: 'australia', country: 'Australia', flag: '🇦🇺', score: 1008, homeBonus: 10, keyAccess: ['Schengen', 'USA', 'Japan', 'UK', 'NZ'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: { title: 'The Oceania Standout', text: 'Australia\'s Western-aligned passport provides full Schengen and USA access. The small home tourism bonus (10M) is offset by strong global access.' } },
  { id: 'new_zealand', country: 'New Zealand', flag: '🇳🇿', score: 1002, homeBonus: 4, keyAccess: ['Schengen', 'USA', 'Japan', 'UK', 'AU'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: { title: 'Small Country, Big Access', text: 'Despite tiny population and tourism (4M home), New Zealanders access the same 400M Schengen market as Americans and Europeans.' } },
  { id: 'canada', country: 'Canada', flag: '🇨🇦', score: 989, homeBonus: 22, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Mexico', value: 42 }], misses: [{ country: 'China', value: -35 }], note: { title: 'The North American Tie', text: 'Canada and USA are effectively tied. Canadians gain USA\'s massive 67M tourism market, while Americans gain Canada\'s 22M. The difference is minimal when you factor in their similar visa-free access to Europe.' } },

  // Asia Pacific Elite (900-1000)
  { id: 'hong_kong', country: 'Hong Kong', flag: '🇭🇰', score: 985, homeBonus: 26, keyAccess: ['Schengen', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'UK', value: 38 }, { country: 'Japan', value: 32 }, { country: 'Thailand', value: 28 }], misses: [{ country: 'USA', value: -67 }], note: { title: 'The USA Gap', text: 'Hong Kong passport holders need a US visa, losing access to 67M visitors. This single restriction drops them significantly below Singapore and Japan.' } },
  { id: 'taiwan', country: 'Taiwan', flag: '🇹🇼', score: 1009, homeBonus: 6, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'UK', value: 38 }, { country: 'Japan', value: 32 }, { country: 'Thailand', value: 28 }], misses: [{ country: 'China', value: -35 }], note: { title: 'Strong Global Access', text: 'Taiwan has visa-free access to USA via the Visa Waiver Program since 2012, plus full Schengen access. Only China remains restricted.' } },
  { id: 'malaysia', country: 'Malaysia', flag: '🇲🇾', score: 925, homeBonus: 26, keyAccess: ['Schengen', 'Japan', 'ASEAN'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'Japan', value: 32 }, { country: 'Thailand', value: 28 }], misses: [{ country: 'USA', value: -67 }, { country: 'China', value: -35 }], note: null },

  // Latin America & Caribbean (700-900)
  { id: 'mexico', country: 'Mexico', flag: '🇲🇽', score: 885, homeBonus: 42, keyAccess: ['Schengen', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'Mexico (Home)', value: 42 }, { country: 'UK', value: 38 }], misses: [{ country: 'USA', value: -67 }, { country: 'China', value: -35 }], note: { title: 'The LATAM Leader (with asterisk)', text: 'Mexico has the highest tourism potential in Latin America but cannot access their neighbor USA visa-free (-67M). This single restriction keeps them below European passport holders.' } },
  { id: 'israel', country: 'Israel', flag: '🇮🇱', score: 872, homeBonus: 5, keyAccess: ['Schengen', 'USA', 'Japan'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'UK', value: 38 }], misses: [{ country: 'Many Arab nations', value: -50 }], note: { title: 'USA Access Helps', text: 'Israel is one of few Middle Eastern nations with both Schengen AND USA visa-free access, offsetting restricted access to many Arab nations.' } },
  { id: 'chile', country: 'Chile', flag: '🇨🇱', score: 935, homeBonus: 5, keyAccess: ['Schengen', 'USA', 'Japan', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'USA', value: 67 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'China', value: -35 }], note: { title: 'LATAM Leader with USA Access', text: 'Chile gained USA Visa Waiver Program access in 2014, making it the only Latin American country with visa-free access to USA, Schengen, and Japan.' } },
  { id: 'argentina', country: 'Argentina', flag: '🇦🇷', score: 842, homeBonus: 7, keyAccess: ['Schengen', 'Japan', 'Russia'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'Russia', value: 25 }], misses: [{ country: 'USA', value: -67 }, { country: 'China', value: -35 }], note: { title: 'The Russia Bonus', text: 'Argentina has visa-free access to Russia (+25M), a destination most Western passport holders cannot easily reach. However, losing USA (-67M) outweighs this advantage.' } },
  { id: 'barbados', country: 'Barbados', flag: '🇧🇧', score: 812, homeBonus: 0.5, keyAccess: ['Schengen', 'UK', 'Canada'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'UK', value: 38 }, { country: 'Canada', value: 22 }], misses: [{ country: 'USA', value: -67 }, { country: 'China', value: -35 }], note: null },
  { id: 'bahamas', country: 'Bahamas', flag: '🇧🇸', score: 805, homeBonus: 8, keyAccess: ['Schengen', 'UK', 'Canada'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'UK', value: 38 }, { country: 'Canada', value: 22 }], misses: [{ country: 'USA', value: -67 }, { country: 'China', value: -35 }], note: null },
  { id: 'brazil', country: 'Brazil', flag: '🇧🇷', score: 798, homeBonus: 6, keyAccess: ['Schengen', 'Japan', 'Russia'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'Japan', value: 32 }], misses: [{ country: 'USA', value: -67 }, { country: 'China', value: -35 }], note: null },
  { id: 'st_kitts', country: 'St. Kitts and Nevis', flag: '🇰🇳', score: 792, homeBonus: 0.1, keyAccess: ['Schengen', 'UK', 'Canada'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'UK', value: 38 }, { country: 'Canada', value: 22 }], misses: [{ country: 'USA', value: -67 }], note: null },
  { id: 'antigua', country: 'Antigua and Barbuda', flag: '🇦🇬', score: 788, homeBonus: 0.3, keyAccess: ['Schengen', 'UK', 'Canada'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'UK', value: 38 }, { country: 'Canada', value: 22 }], misses: [{ country: 'USA', value: -67 }], note: null },
  { id: 'costa_rica', country: 'Costa Rica', flag: '🇨🇷', score: 765, homeBonus: 3, keyAccess: ['Schengen', 'Japan'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'Japan', value: 32 }], misses: [{ country: 'USA', value: -67 }, { country: 'China', value: -35 }], note: null },
  { id: 'panama', country: 'Panama', flag: '🇵🇦', score: 758, homeBonus: 2, keyAccess: ['Schengen', 'Japan'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'Japan', value: 32 }], misses: [{ country: 'USA', value: -67 }, { country: 'China', value: -35 }], note: null },
  { id: 'grenada', country: 'Grenada', flag: '🇬🇩', score: 752, homeBonus: 0.2, keyAccess: ['Schengen', 'UK', 'China'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'UK', value: 38 }, { country: 'China', value: 35 }], misses: [{ country: 'USA', value: -67 }], note: null },
  { id: 'uruguay', country: 'Uruguay', flag: '🇺🇾', score: 752, homeBonus: 3, keyAccess: ['Schengen', 'Japan', 'Russia'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'Russia', value: 25 }], misses: [{ country: 'USA', value: -67 }, { country: 'China', value: -35 }], note: null },
  { id: 'serbia', country: 'Serbia', flag: '🇷🇸', score: 1152, homeBonus: 2, keyAccess: ['Schengen', 'Russia', 'Turkey', 'China'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'China', value: 35 }, { country: 'Thailand', value: 28 }, { country: 'Russia', value: 25 }], misses: [{ country: 'USA', value: -67 }], note: { title: 'Unique Dual Access', text: 'Serbia has visa-free access to both Schengen (since 2009) AND Russia AND China - a rare combination that few passports offer. Only USA access is restricted.' } },
  { id: 'st_lucia', country: 'St. Lucia', flag: '🇱🇨', score: 748, homeBonus: 0.4, keyAccess: ['Schengen', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'UK', value: 38 }], misses: [{ country: 'USA', value: -67 }], note: null },
  { id: 'dominica', country: 'Dominica', flag: '🇩🇲', score: 745, homeBonus: 0.1, keyAccess: ['Schengen', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'UK', value: 38 }], misses: [{ country: 'USA', value: -67 }], note: null },
  { id: 'trinidad', country: 'Trinidad and Tobago', flag: '🇹🇹', score: 742, homeBonus: 0.5, keyAccess: ['Schengen', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'UK', value: 38 }], misses: [{ country: 'USA', value: -67 }, { country: 'China', value: -35 }], note: null },
  { id: 'st_vincent', country: 'St. Vincent and the Grenadines', flag: '🇻🇨', score: 742, homeBonus: 0.1, keyAccess: ['Schengen', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'UK', value: 38 }], misses: [{ country: 'USA', value: -67 }], note: null },
  { id: 'peru', country: 'Peru', flag: '🇵🇪', score: 738, homeBonus: 4, keyAccess: ['Schengen', 'Japan'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'Japan', value: 32 }], misses: [{ country: 'USA', value: -67 }, { country: 'China', value: -35 }], note: null },
  { id: 'montenegro', country: 'Montenegro', flag: '🇲🇪', score: 1038, homeBonus: 2, keyAccess: ['Schengen', 'Russia', 'Turkey'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'Thailand', value: 28 }, { country: 'Russia', value: 25 }, { country: 'UAE', value: 21 }], misses: [{ country: 'USA', value: -67 }], note: { title: 'Schengen Access Since 2009', text: 'Montenegro gained Schengen visa-free access in December 2009, giving strong European travel freedom.' } },
  { id: 'north_macedonia', country: 'North Macedonia', flag: '🇲🇰', score: 1028, homeBonus: 1, keyAccess: ['Schengen', 'Russia', 'Turkey'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'Thailand', value: 28 }, { country: 'Russia', value: 25 }, { country: 'UAE', value: 21 }], misses: [{ country: 'USA', value: -67 }], note: { title: 'Schengen Access Since 2009', text: 'North Macedonia gained Schengen visa-free access in December 2009, as part of the Western Balkans liberalization.' } },
  { id: 'colombia', country: 'Colombia', flag: '🇨🇴', score: 725, homeBonus: 5, keyAccess: ['Schengen', 'Japan'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'Japan', value: 32 }], misses: [{ country: 'USA', value: -67 }, { country: 'China', value: -35 }], note: null },
  { id: 'albania', country: 'Albania', flag: '🇦🇱', score: 1022, homeBonus: 6, keyAccess: ['Schengen', 'Russia', 'Turkey'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'Thailand', value: 28 }, { country: 'Russia', value: 25 }, { country: 'UAE', value: 21 }], misses: [{ country: 'USA', value: -67 }], note: { title: 'Schengen Access Since 2010', text: 'Albania gained Schengen visa-free access in December 2010, joining the Western Balkans visa liberalization.' } },
  { id: 'bosnia', country: 'Bosnia and Herzegovina', flag: '🇧🇦', score: 715, homeBonus: 1, keyAccess: ['Russia', 'Turkey'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Russia', value: 25 }, { country: 'UAE', value: 21 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'ecuador', country: 'Ecuador', flag: '🇪🇨', score: 712, homeBonus: 2, keyAccess: ['Schengen'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }], misses: [{ country: 'USA', value: -67 }, { country: 'China', value: -35 }], note: null },
  { id: 'paraguay', country: 'Paraguay', flag: '🇵🇾', score: 708, homeBonus: 1, keyAccess: ['Schengen', 'Russia'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'Russia', value: 25 }], misses: [{ country: 'USA', value: -67 }, { country: 'China', value: -35 }], note: null },
  { id: 'jamaica', country: 'Jamaica', flag: '🇯🇲', score: 698, homeBonus: 4, keyAccess: ['Schengen', 'UK'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'UK', value: 38 }], misses: [{ country: 'USA', value: -67 }, { country: 'China', value: -35 }], note: null },
  { id: 'venezuela', country: 'Venezuela', flag: '🇻🇪', score: 685, homeBonus: 1, keyAccess: ['Schengen', 'Russia'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'Russia', value: 25 }], misses: [{ country: 'USA', value: -67 }, { country: 'China', value: -35 }], note: null },
  { id: 'ukraine', country: 'Ukraine', flag: '🇺🇦', score: 1032, homeBonus: 6, keyAccess: ['Schengen', 'Turkey', 'Japan'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }, { country: 'Japan', value: 32 }, { country: 'Thailand', value: 28 }], misses: [{ country: 'USA', value: -67 }], note: { title: 'Schengen Access Since 2017', text: 'Ukraine gained Schengen visa-free access in June 2017. Combined with visa-free access to Turkey, Japan, and UK, Ukrainians have strong travel freedom despite USA restriction.' } },
  { id: 'bolivia', country: 'Bolivia', flag: '🇧🇴', score: 678, homeBonus: 1, keyAccess: ['Schengen', 'Russia'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'Russia', value: 25 }], misses: [{ country: 'USA', value: -67 }, { country: 'China', value: -35 }], note: null },
  { id: 'moldova', country: 'Moldova', flag: '🇲🇩', score: 1018, homeBonus: 0.2, keyAccess: ['Schengen', 'Turkey', 'Russia'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }, { country: 'Thailand', value: 28 }, { country: 'Russia', value: 25 }], misses: [{ country: 'USA', value: -67 }], note: { title: 'Schengen Access Since 2014', text: 'Moldova gained Schengen visa-free access in April 2014. This significantly boosted their passport power with access to 400M+ tourists in Europe.' } },
  { id: 'georgia', country: 'Georgia', flag: '🇬🇪', score: 1058, homeBonus: 6, keyAccess: ['Schengen', 'Turkey', 'Japan'], topContributors: [{ country: 'Schengen', value: 400 }, { country: 'Turkey', value: 55 }, { country: 'UK', value: 38 }, { country: 'Japan', value: 32 }, { country: 'Thailand', value: 28 }], misses: [{ country: 'USA', value: -67 }, { country: 'Russia', value: -25 }], note: { title: 'Schengen Access Since 2017', text: 'Georgia gained Schengen visa-free access in March 2017. Unlike Ukraine and Moldova, Georgia does not have visa-free access to Russia due to political tensions.' } },
  { id: 'armenia', country: 'Armenia', flag: '🇦🇲', score: 645, homeBonus: 1, keyAccess: ['Russia', 'Georgia'], topContributors: [{ country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Russia', value: 25 }, { country: 'UAE', value: 21 }, { country: 'Georgia', value: 6 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'azerbaijan', country: 'Azerbaijan', flag: '🇦🇿', score: 632, homeBonus: 3, keyAccess: ['Russia', 'Turkey', 'Georgia'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Russia', value: 25 }, { country: 'UAE', value: 21 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'qatar', country: 'Qatar', flag: '🇶🇦', score: 628, homeBonus: 4, keyAccess: ['Schengen (limited)', 'ASEAN'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Indonesia', value: 16 }, { country: 'Singapore', value: 14 }], misses: [{ country: 'USA', value: -67 }, { country: 'Schengen', value: -350 }], note: null },
  { id: 'turkey', country: 'Turkey', flag: '🇹🇷', score: 624, homeBonus: 55, keyAccess: ['Japan', 'Thailand', 'Indonesia'], topContributors: [{ country: 'Turkey (Home)', value: 55 }, { country: 'Japan', value: 32 }, { country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Singapore', value: 14 }], misses: [{ country: 'Schengen', value: -350 }, { country: 'USA', value: -67 }, { country: 'UK', value: -38 }], note: null },
  { id: 'kuwait', country: 'Kuwait', flag: '🇰🇼', score: 598, homeBonus: 0.5, keyAccess: ['Schengen (limited)', 'ASEAN'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Indonesia', value: 16 }, { country: 'Singapore', value: 14 }], misses: [{ country: 'USA', value: -67 }, { country: 'Schengen', value: -350 }], note: null },
  { id: 'bahrain', country: 'Bahrain', flag: '🇧🇭', score: 592, homeBonus: 12, keyAccess: ['Schengen (limited)', 'ASEAN'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Indonesia', value: 16 }, { country: 'Singapore', value: 14 }], misses: [{ country: 'USA', value: -67 }, { country: 'Schengen', value: -350 }], note: null },
  { id: 'thailand', country: 'Thailand', flag: '🇹🇭', score: 585, homeBonus: 28, keyAccess: ['Japan', 'South Korea', 'ASEAN'], topContributors: [{ country: 'Japan', value: 32 }, { country: 'Thailand (Home)', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Singapore', value: 14 }, { country: 'South Korea', value: 11 }], misses: [{ country: 'Schengen', value: -350 }, { country: 'USA', value: -67 }], note: null },
  { id: 'oman', country: 'Oman', flag: '🇴🇲', score: 578, homeBonus: 3, keyAccess: ['Schengen (limited)', 'ASEAN'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Indonesia', value: 16 }, { country: 'Singapore', value: 14 }], misses: [{ country: 'USA', value: -67 }, { country: 'Schengen', value: -350 }], note: null },
  { id: 'saudi_arabia', country: 'Saudi Arabia', flag: '🇸🇦', score: 568, homeBonus: 27, keyAccess: ['ASEAN', 'China'], topContributors: [{ country: 'China', value: 35 }, { country: 'Thailand', value: 28 }, { country: 'Saudi Arabia (Home)', value: 27 }, { country: 'Malaysia', value: 26 }, { country: 'Indonesia', value: 16 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'russia', country: 'Russia', flag: '🇷🇺', score: 512, homeBonus: 25, keyAccess: ['Turkey', 'Thailand', 'UAE'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Thailand', value: 28 }, { country: 'Russia (Home)', value: 25 }, { country: 'UAE', value: 21 }, { country: 'Indonesia', value: 16 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }, { country: 'Japan', value: -32 }], note: null },
  { id: 'south_africa', country: 'South Africa', flag: '🇿🇦', score: 498, homeBonus: 9, keyAccess: ['ASEAN', 'Brazil', 'Russia'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Russia', value: 25 }, { country: 'South Africa (Home)', value: 9 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'belarus', country: 'Belarus', flag: '🇧🇾', score: 495, homeBonus: 0.5, keyAccess: ['Russia', 'China'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'China', value: 35 }, { country: 'Thailand', value: 28 }, { country: 'Russia', value: 25 }, { country: 'UAE', value: 21 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }, { country: 'UK', value: -38 }], note: null },
  { id: 'indonesia', country: 'Indonesia', flag: '🇮🇩', score: 495, homeBonus: 16, keyAccess: ['Japan', 'ASEAN', 'Turkey'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Japan', value: 32 }, { country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Indonesia (Home)', value: 16 }], misses: [{ country: 'Schengen', value: -350 }, { country: 'USA', value: -67 }], note: null },
  { id: 'china', country: 'China', flag: '🇨🇳', score: 485, homeBonus: 35, keyAccess: ['Russia', 'ASEAN', 'Serbia'], topContributors: [{ country: 'China (Home)', value: 35 }, { country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Russia', value: 25 }, { country: 'Indonesia', value: 16 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }, { country: 'Japan', value: -32 }], note: null },
  { id: 'jordan', country: 'Jordan', flag: '🇯🇴', score: 485, homeBonus: 5, keyAccess: ['Malaysia', 'Turkey'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Indonesia', value: 16 }, { country: 'Jordan (Home)', value: 5 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'kazakhstan', country: 'Kazakhstan', flag: '🇰🇿', score: 478, homeBonus: 9, keyAccess: ['Russia', 'Turkey', 'China'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'China', value: 35 }, { country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Russia', value: 25 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'mauritius', country: 'Mauritius', flag: '🇲🇺', score: 468, homeBonus: 1, keyAccess: ['ASEAN', 'Africa'], topContributors: [{ country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Indonesia', value: 16 }, { country: 'Singapore', value: 14 }, { country: 'South Africa', value: 9 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'seychelles', country: 'Seychelles', flag: '🇸🇨', score: 458, homeBonus: 0.4, keyAccess: ['ASEAN', 'Africa'], topContributors: [{ country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Indonesia', value: 16 }, { country: 'Singapore', value: 14 }, { country: 'South Africa', value: 9 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'kosovo', country: 'Kosovo', flag: '🇽🇰', score: 458, homeBonus: 0.2, keyAccess: ['Turkey', 'Albania'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Albania', value: 6 }, { country: 'Montenegro', value: 2 }, { country: 'North Macedonia', value: 1 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }, { country: 'Russia', value: -25 }], note: null },
  { id: 'micronesia', country: 'Micronesia', flag: '🇫🇲', score: 442, homeBonus: 0.05, keyAccess: ['USA (Compact)', 'Pacific'], topContributors: [{ country: 'USA', value: 67 }, { country: 'Japan', value: 32 }], misses: [{ country: 'Schengen', value: -350 }], note: null },
  { id: 'marshall', country: 'Marshall Islands', flag: '🇲🇭', score: 438, homeBonus: 0.05, keyAccess: ['USA (Compact)', 'Pacific'], topContributors: [{ country: 'USA', value: 67 }, { country: 'Japan', value: 32 }], misses: [{ country: 'Schengen', value: -350 }], note: null },
  { id: 'vanuatu', country: 'Vanuatu', flag: '🇻🇺', score: 428, homeBonus: 0.4, keyAccess: ['Pacific', 'Russia'], topContributors: [{ country: 'Russia', value: 25 }, { country: 'Malaysia', value: 26 }, { country: 'Singapore', value: 14 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'palau', country: 'Palau', flag: '🇵🇼', score: 428, homeBonus: 0.1, keyAccess: ['Pacific', 'USA (Compact)'], topContributors: [{ country: 'USA', value: 67 }, { country: 'Japan', value: 32 }, { country: 'Taiwan', value: 6 }], misses: [{ country: 'Schengen', value: -350 }], note: null },
  { id: 'philippines', country: 'Philippines', flag: '🇵🇭', score: 428, homeBonus: 5, keyAccess: ['ASEAN', 'Israel'], topContributors: [{ country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Indonesia', value: 16 }, { country: 'Singapore', value: 14 }, { country: 'Vietnam', value: 13 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'lebanon', country: 'Lebanon', flag: '🇱🇧', score: 425, homeBonus: 2, keyAccess: ['Malaysia', 'Turkey'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'mongolia', country: 'Mongolia', flag: '🇲🇳', score: 412, homeBonus: 1, keyAccess: ['Russia', 'Turkey', 'ASEAN'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Russia', value: 25 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'fiji', country: 'Fiji', flag: '🇫🇯', score: 412, homeBonus: 1, keyAccess: ['Pacific', 'ASEAN'], topContributors: [{ country: 'Malaysia', value: 26 }, { country: 'Indonesia', value: 16 }, { country: 'Singapore', value: 14 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'uzbekistan', country: 'Uzbekistan', flag: '🇺🇿', score: 402, homeBonus: 7, keyAccess: ['Russia', 'Turkey'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Russia', value: 25 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'morocco', country: 'Morocco', flag: '🇲🇦', score: 398, homeBonus: 14, keyAccess: ['Africa', 'Turkey'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Morocco (Home)', value: 14 }, { country: 'Tunisia', value: 9 }, { country: 'Senegal', value: 2 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'botswana', country: 'Botswana', flag: '🇧🇼', score: 398, homeBonus: 2, keyAccess: ['Africa', 'ASEAN'], topContributors: [{ country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Singapore', value: 14 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'egypt', country: 'Egypt', flag: '🇪🇬', score: 398, homeBonus: 15, keyAccess: ['Malaysia', 'Turkey'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Indonesia', value: 16 }, { country: 'Egypt (Home)', value: 15 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'samoa', country: 'Samoa', flag: '🇼🇸', score: 392, homeBonus: 0.2, keyAccess: ['Pacific', 'NZ'], topContributors: [{ country: 'Malaysia', value: 26 }, { country: 'New Zealand', value: 4 }, { country: 'Fiji', value: 1 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'india', country: 'India', flag: '🇮🇳', score: 387, homeBonus: 18, keyAccess: ['Thailand', 'Indonesia', 'Malaysia'], topContributors: [{ country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'UAE', value: 21 }, { country: 'India (Home)', value: 18 }, { country: 'Indonesia', value: 16 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }, { country: 'UK', value: -38 }], note: null },
  { id: 'namibia', country: 'Namibia', flag: '🇳🇦', score: 385, homeBonus: 2, keyAccess: ['Africa', 'ASEAN'], topContributors: [{ country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Singapore', value: 14 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'tonga', country: 'Tonga', flag: '🇹🇴', score: 378, homeBonus: 0.1, keyAccess: ['Pacific'], topContributors: [{ country: 'Malaysia', value: 26 }, { country: 'Fiji', value: 1 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'vietnam', country: 'Vietnam', flag: '🇻🇳', score: 378, homeBonus: 13, keyAccess: ['ASEAN', 'Japan'], topContributors: [{ country: 'Japan', value: 32 }, { country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Indonesia', value: 16 }, { country: 'Vietnam (Home)', value: 13 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'kyrgyzstan', country: 'Kyrgyzstan', flag: '🇰🇬', score: 365, homeBonus: 1, keyAccess: ['Russia', 'Turkey'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Russia', value: 25 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'tunisia', country: 'Tunisia', flag: '🇹🇳', score: 362, homeBonus: 9, keyAccess: ['Africa', 'Turkey'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Malaysia', value: 26 }, { country: 'Morocco', value: 14 }, { country: 'Tunisia (Home)', value: 9 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'cambodia', country: 'Cambodia', flag: '🇰🇭', score: 345, homeBonus: 6, keyAccess: ['ASEAN'], topContributors: [{ country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Indonesia', value: 16 }, { country: 'Singapore', value: 14 }, { country: 'Vietnam', value: 13 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'maldives', country: 'Maldives', flag: '🇲🇻', score: 342, homeBonus: 2, keyAccess: ['ASEAN', 'Gulf'], topContributors: [{ country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'UAE', value: 21 }, { country: 'Singapore', value: 14 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'kenya', country: 'Kenya', flag: '🇰🇪', score: 342, homeBonus: 2, keyAccess: ['Africa'], topContributors: [{ country: 'Malaysia', value: 26 }, { country: 'Singapore', value: 14 }, { country: 'South Africa', value: 9 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'timor', country: 'Timor-Leste', flag: '🇹🇱', score: 342, homeBonus: 0.1, keyAccess: ['ASEAN', 'Pacific'], topContributors: [{ country: 'Malaysia', value: 26 }, { country: 'Indonesia', value: 16 }, { country: 'Singapore', value: 14 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'tanzania', country: 'Tanzania', flag: '🇹🇿', score: 328, homeBonus: 2, keyAccess: ['Africa'], topContributors: [{ country: 'Malaysia', value: 26 }, { country: 'Singapore', value: 14 }, { country: 'South Africa', value: 9 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'laos', country: 'Laos', flag: '🇱🇦', score: 328, homeBonus: 4, keyAccess: ['ASEAN'], topContributors: [{ country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Indonesia', value: 16 }, { country: 'Singapore', value: 14 }, { country: 'Vietnam', value: 13 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'tajikistan', country: 'Tajikistan', flag: '🇹🇯', score: 328, homeBonus: 0.5, keyAccess: ['Russia', 'Turkey'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Malaysia', value: 26 }, { country: 'Russia', value: 25 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'solomon', country: 'Solomon Islands', flag: '🇸🇧', score: 325, homeBonus: 0.1, keyAccess: ['Pacific'], topContributors: [{ country: 'Malaysia', value: 26 }, { country: 'Fiji', value: 1 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'ghana', country: 'Ghana', flag: '🇬🇭', score: 318, homeBonus: 1, keyAccess: ['Africa'], topContributors: [{ country: 'Malaysia', value: 26 }, { country: 'Singapore', value: 14 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'iran', country: 'Iran', flag: '🇮🇷', score: 312, homeBonus: 5, keyAccess: ['Turkey', 'Malaysia'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Malaysia', value: 26 }, { country: 'Georgia', value: 6 }, { country: 'Iran (Home)', value: 5 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }, { country: 'UK', value: -38 }], note: null },
  { id: 'nauru', country: 'Nauru', flag: '🇳🇷', score: 312, homeBonus: 0.01, keyAccess: ['Pacific'], topContributors: [{ country: 'Australia', value: 10 }, { country: 'Fiji', value: 1 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'sri_lanka', country: 'Sri Lanka', flag: '🇱🇰', score: 312, homeBonus: 2, keyAccess: ['ASEAN', 'Maldives'], topContributors: [{ country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Indonesia', value: 16 }, { country: 'Singapore', value: 14 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'papua', country: 'Papua New Guinea', flag: '🇵🇬', score: 298, homeBonus: 0.1, keyAccess: ['Pacific'], topContributors: [{ country: 'Malaysia', value: 26 }, { country: 'Fiji', value: 1 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'senegal', country: 'Senegal', flag: '🇸🇳', score: 295, homeBonus: 2, keyAccess: ['Africa'], topContributors: [{ country: 'Malaysia', value: 26 }, { country: 'Singapore', value: 14 }, { country: 'Morocco', value: 14 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'kiribati', country: 'Kiribati', flag: '🇰🇮', score: 295, homeBonus: 0.01, keyAccess: ['Pacific'], topContributors: [{ country: 'Fiji', value: 1 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'myanmar', country: 'Myanmar', flag: '🇲🇲', score: 285, homeBonus: 0.5, keyAccess: ['ASEAN (limited)'], topContributors: [{ country: 'Thailand', value: 28 }, { country: 'Malaysia', value: 26 }, { country: 'Singapore', value: 14 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'turkmenistan', country: 'Turkmenistan', flag: '🇹🇲', score: 285, homeBonus: 0.1, keyAccess: ['Turkey'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Malaysia', value: 26 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'rwanda', country: 'Rwanda', flag: '🇷🇼', score: 285, homeBonus: 2, keyAccess: ['Africa'], topContributors: [{ country: 'Singapore', value: 14 }, { country: 'South Africa', value: 9 }, { country: 'Kenya', value: 2 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'algeria', country: 'Algeria', flag: '🇩🇿', score: 285, homeBonus: 3, keyAccess: ['Africa', 'Malaysia'], topContributors: [{ country: 'Malaysia', value: 26 }, { country: 'Morocco', value: 14 }, { country: 'Tunisia', value: 9 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'nigeria', country: 'Nigeria', flag: '🇳🇬', score: 285, homeBonus: 1, keyAccess: ['Africa'], topContributors: [{ country: 'Malaysia', value: 26 }, { country: 'Singapore', value: 14 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'tuvalu', country: 'Tuvalu', flag: '🇹🇻', score: 278, homeBonus: 0.01, keyAccess: ['Pacific'], topContributors: [{ country: 'Fiji', value: 1 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'ivory_coast', country: 'Ivory Coast', flag: '🇨🇮', score: 275, homeBonus: 2, keyAccess: ['Africa'], topContributors: [{ country: 'Malaysia', value: 26 }, { country: 'Singapore', value: 14 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'uganda', country: 'Uganda', flag: '🇺🇬', score: 258, homeBonus: 2, keyAccess: ['Africa'], topContributors: [{ country: 'South Africa', value: 9 }, { country: 'Kenya', value: 2 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'zambia', country: 'Zambia', flag: '🇿🇲', score: 248, homeBonus: 1, keyAccess: ['Africa'], topContributors: [{ country: 'South Africa', value: 9 }, { country: 'Kenya', value: 2 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'ethiopia', country: 'Ethiopia', flag: '🇪🇹', score: 245, homeBonus: 1, keyAccess: ['Africa'], topContributors: [{ country: 'South Africa', value: 9 }, { country: 'Kenya', value: 2 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'zimbabwe', country: 'Zimbabwe', flag: '🇿🇼', score: 232, homeBonus: 2, keyAccess: ['Africa'], topContributors: [{ country: 'South Africa', value: 9 }, { country: 'Botswana', value: 2 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'cameroon', country: 'Cameroon', flag: '🇨🇲', score: 228, homeBonus: 1, keyAccess: ['Africa'], topContributors: [{ country: 'South Africa', value: 9 }, { country: 'Kenya', value: 2 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'bangladesh', country: 'Bangladesh', flag: '🇧🇩', score: 218, homeBonus: 1, keyAccess: ['Malaysia (limited)'], topContributors: [{ country: 'Malaysia', value: 26 }, { country: 'Maldives', value: 2 }, { country: 'Nepal', value: 1 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'mozambique', country: 'Mozambique', flag: '🇲🇿', score: 218, homeBonus: 2, keyAccess: ['Africa'], topContributors: [{ country: 'South Africa', value: 9 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'iraq', country: 'Iraq', flag: '🇮🇶', score: 198, homeBonus: 1, keyAccess: ['Malaysia', 'Turkey'], topContributors: [{ country: 'Turkey', value: 55 }, { country: 'Malaysia', value: 26 }, { country: 'Jordan', value: 5 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'pakistan', country: 'Pakistan', flag: '🇵🇰', score: 198, homeBonus: 2, keyAccess: ['Malaysia', 'Qatar'], topContributors: [{ country: 'Malaysia', value: 26 }, { country: 'Qatar', value: 4 }, { country: 'Maldives', value: 2 }, { country: 'Pakistan (Home)', value: 2 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }, { country: 'UK', value: -38 }], note: null },
  { id: 'nepal', country: 'Nepal', flag: '🇳🇵', score: 195, homeBonus: 1, keyAccess: ['SAARC'], topContributors: [{ country: 'Maldives', value: 2 }, { country: 'Nepal (Home)', value: 1 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'angola', country: 'Angola', flag: '🇦🇴', score: 195, homeBonus: 1, keyAccess: ['Africa'], topContributors: [{ country: 'South Africa', value: 9 }, { country: 'Namibia', value: 2 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'bhutan', country: 'Bhutan', flag: '🇧🇹', score: 178, homeBonus: 0.3, keyAccess: ['India', 'Bangladesh'], topContributors: [{ country: 'India', value: 18 }, { country: 'Maldives', value: 2 }, { country: 'Nepal', value: 1 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'drc', country: 'DR Congo', flag: '🇨🇩', score: 175, homeBonus: 1, keyAccess: ['Africa'], topContributors: [{ country: 'South Africa', value: 9 }, { country: 'Kenya', value: 2 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'libya', country: 'Libya', flag: '🇱🇾', score: 142, homeBonus: 0.5, keyAccess: ['Limited'], topContributors: [{ country: 'Egypt', value: 15 }, { country: 'Tunisia', value: 9 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'sudan', country: 'Sudan', flag: '🇸🇩', score: 125, homeBonus: 1, keyAccess: ['Limited'], topContributors: [{ country: 'Egypt', value: 15 }, { country: 'Ethiopia', value: 1 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'syria', country: 'Syria', flag: '🇸🇾', score: 112, homeBonus: 0.5, keyAccess: ['Malaysia', 'Iran'], topContributors: [{ country: 'Malaysia', value: 26 }, { country: 'Iran', value: 5 }, { country: 'Lebanon', value: 2 }], misses: [{ country: 'Schengen', value: -400 }, { country: 'USA', value: -67 }], note: null },
  { id: 'eritrea', country: 'Eritrea', flag: '🇪🇷', score: 85, homeBonus: 0.1, keyAccess: ['Very Limited'], topContributors: [{ country: 'Kenya', value: 2 }, { country: 'Sudan', value: 1 }], misses: [{ country: 'Almost everywhere', value: -900 }], note: null },
  { id: 'yemen', country: 'Yemen', flag: '🇾🇪', score: 85, homeBonus: 0.1, keyAccess: ['Malaysia'], topContributors: [{ country: 'Malaysia', value: 26 }], misses: [{ country: 'Almost everywhere', value: -1000 }], note: null },
  { id: 'south_sudan', country: 'South Sudan', flag: '🇸🇸', score: 78, homeBonus: 0.1, keyAccess: ['Very Limited'], topContributors: [{ country: 'Kenya', value: 2 }, { country: 'Uganda', value: 2 }], misses: [{ country: 'Almost everywhere', value: -1000 }], note: null },
  { id: 'somalia', country: 'Somalia', flag: '🇸🇴', score: 62, homeBonus: 0.1, keyAccess: ['Very Limited'], topContributors: [{ country: 'Kenya', value: 2 }], misses: [{ country: 'Almost everywhere', value: -1000 }], note: null },
  { id: 'afghanistan', country: 'Afghanistan', flag: '🇦🇫', score: 34, homeBonus: 0.1, keyAccess: ['Limited'], topContributors: [{ country: 'Maldives', value: 2 }], misses: [{ country: 'Almost everywhere', value: -1200 }], note: null },
  { id: 'north_korea', country: 'North Korea', flag: '🇰🇵', score: 28, homeBonus: 0.01, keyAccess: ['Very Limited'], topContributors: [{ country: 'Russia', value: 25 }], misses: [{ country: 'Almost everywhere', value: -1300 }], note: null },
]

const maxScore = Math.max(...passportData.map(p => p.score))

function getGradientColor(score) {
  // Smooth gradient from red (worst) -> orange -> yellow -> yellow-green -> green (best)
  const ratio = Math.min(score / maxScore, 1)

  // Use HSL color space for smooth transitions
  // Hue: 0 (red) -> 30 (orange) -> 60 (yellow) -> 90 (yellow-green) -> 120 (green)
  const hue = ratio * 120 // 0 = red, 120 = green

  // Adjust saturation and lightness based on hue for prettier colors
  // Orange/yellow (hue 20-60) looks better with higher saturation and slightly different lightness
  let saturation = 75
  let lightness = 48

  if (hue >= 20 && hue <= 60) {
    // Orange to yellow range - boost saturation for vibrancy
    saturation = 85
    lightness = 50
  } else if (hue > 60 && hue <= 90) {
    // Yellow-green - slightly less saturation
    saturation = 70
    lightness = 42
  }

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(3) + 'B'
  }
  return num + 'M'
}

// Region mapping for passports
const regionMap = {
  // Europe
  france: 'Europe', spain: 'Europe', italy: 'Europe', uk: 'Europe', germany: 'Europe',
  greece: 'Europe', austria: 'Europe', portugal: 'Europe', poland: 'Europe', croatia: 'Europe',
  netherlands: 'Europe', hungary: 'Europe', ireland: 'Europe', czechia: 'Europe', sweden: 'Europe',
  switzerland: 'Europe', romania: 'Europe', belgium: 'Europe', norway: 'Europe', slovakia: 'Europe',
  bulgaria: 'Europe', slovenia: 'Europe', denmark: 'Europe', lithuania: 'Europe', cyprus: 'Europe',
  latvia: 'Europe', finland: 'Europe', estonia: 'Europe', malta: 'Europe', iceland: 'Europe',
  luxembourg: 'Europe', liechtenstein: 'Europe', monaco: 'Europe', san_marino: 'Europe', andorra: 'Europe',
  serbia: 'Europe', montenegro: 'Europe', north_macedonia: 'Europe', albania: 'Europe', bosnia: 'Europe',
  ukraine: 'Europe', moldova: 'Europe', georgia: 'Europe', armenia: 'Europe', azerbaijan: 'Europe',
  belarus: 'Europe', russia: 'Europe', kosovo: 'Europe', turkey: 'Europe',

  // Asia
  uae: 'Asia', brunei: 'Asia', singapore: 'Asia', japan: 'Asia', south_korea: 'Asia',
  hong_kong: 'Asia', taiwan: 'Asia', malaysia: 'Asia', israel: 'Asia', qatar: 'Asia',
  kuwait: 'Asia', bahrain: 'Asia', thailand: 'Asia', oman: 'Asia', saudi_arabia: 'Asia',
  indonesia: 'Asia', china: 'Asia', jordan: 'Asia', kazakhstan: 'Asia', philippines: 'Asia',
  lebanon: 'Asia', mongolia: 'Asia', uzbekistan: 'Asia', india: 'Asia', vietnam: 'Asia',
  kyrgyzstan: 'Asia', cambodia: 'Asia', maldives: 'Asia', iran: 'Asia', sri_lanka: 'Asia',
  tajikistan: 'Asia', myanmar: 'Asia', turkmenistan: 'Asia', bangladesh: 'Asia', iraq: 'Asia',
  pakistan: 'Asia', nepal: 'Asia', bhutan: 'Asia', syria: 'Asia', yemen: 'Asia',
  afghanistan: 'Asia', north_korea: 'Asia', laos: 'Asia', timor: 'Asia',

  // Americas
  usa: 'Americas', canada: 'Americas', mexico: 'Americas', chile: 'Americas', argentina: 'Americas',
  barbados: 'Americas', bahamas: 'Americas', brazil: 'Americas', st_kitts: 'Americas', antigua: 'Americas',
  costa_rica: 'Americas', panama: 'Americas', grenada: 'Americas', uruguay: 'Americas', st_lucia: 'Americas',
  dominica: 'Americas', trinidad: 'Americas', st_vincent: 'Americas', peru: 'Americas', colombia: 'Americas',
  ecuador: 'Americas', paraguay: 'Americas', jamaica: 'Americas', venezuela: 'Americas', bolivia: 'Americas',

  // Oceania
  australia: 'Oceania', new_zealand: 'Oceania', fiji: 'Oceania', samoa: 'Oceania', tonga: 'Oceania',
  vanuatu: 'Oceania', palau: 'Oceania', micronesia: 'Oceania', marshall: 'Oceania', nauru: 'Oceania',
  kiribati: 'Oceania', tuvalu: 'Oceania', solomon: 'Oceania', papua: 'Oceania',

  // Africa
  south_africa: 'Africa', mauritius: 'Africa', seychelles: 'Africa', morocco: 'Africa', botswana: 'Africa',
  egypt: 'Africa', namibia: 'Africa', tunisia: 'Africa', kenya: 'Africa', tanzania: 'Africa',
  ghana: 'Africa', rwanda: 'Africa', algeria: 'Africa', nigeria: 'Africa', ivory_coast: 'Africa',
  uganda: 'Africa', zambia: 'Africa', ethiopia: 'Africa', zimbabwe: 'Africa', cameroon: 'Africa',
  mozambique: 'Africa', angola: 'Africa', drc: 'Africa', libya: 'Africa', sudan: 'Africa',
  eritrea: 'Africa', south_sudan: 'Africa', somalia: 'Africa', senegal: 'Africa',
}

// ISO 3166-1 numeric codes for world-atlas TopoJSON
const isoNumericMap = {
  '784': 'uae', '096': 'brunei', '702': 'singapore', '392': 'japan', '410': 'south_korea',
  '250': 'france', '724': 'spain', '380': 'italy', '826': 'uk', '276': 'germany',
  '300': 'greece', '040': 'austria', '620': 'portugal', '616': 'poland', '191': 'croatia',
  '528': 'netherlands', '348': 'hungary', '372': 'ireland', '203': 'czechia', '752': 'sweden',
  '756': 'switzerland', '642': 'romania', '056': 'belgium', '578': 'norway', '703': 'slovakia',
  '100': 'bulgaria', '705': 'slovenia', '208': 'denmark', '440': 'lithuania', '196': 'cyprus',
  '428': 'latvia', '246': 'finland', '233': 'estonia', '470': 'malta', '352': 'iceland',
  '442': 'luxembourg', '438': 'liechtenstein', '492': 'monaco', '674': 'san_marino', '020': 'andorra',
  '840': 'usa', '036': 'australia', '554': 'new_zealand', '124': 'canada',
  '344': 'hong_kong', '158': 'taiwan', '458': 'malaysia',
  '484': 'mexico', '376': 'israel', '152': 'chile', '032': 'argentina',
  '052': 'barbados', '044': 'bahamas', '076': 'brazil', '659': 'st_kitts', '028': 'antigua',
  '188': 'costa_rica', '591': 'panama', '308': 'grenada', '858': 'uruguay', '688': 'serbia',
  '662': 'st_lucia', '212': 'dominica', '780': 'trinidad', '670': 'st_vincent', '604': 'peru',
  '499': 'montenegro', '807': 'north_macedonia', '170': 'colombia', '008': 'albania', '070': 'bosnia',
  '218': 'ecuador', '600': 'paraguay', '388': 'jamaica', '862': 'venezuela', '804': 'ukraine',
  '068': 'bolivia', '498': 'moldova', '268': 'georgia', '051': 'armenia', '031': 'azerbaijan',
  '634': 'qatar', '792': 'turkey', '414': 'kuwait', '048': 'bahrain', '764': 'thailand',
  '512': 'oman', '682': 'saudi_arabia', '643': 'russia', '710': 'south_africa', '112': 'belarus',
  '360': 'indonesia', '156': 'china', '400': 'jordan', '398': 'kazakhstan', '480': 'mauritius',
  '690': 'seychelles', '383': 'kosovo', '583': 'micronesia', '584': 'marshall', '548': 'vanuatu',
  '585': 'palau', '608': 'philippines', '422': 'lebanon', '496': 'mongolia', '242': 'fiji',
  '860': 'uzbekistan', '504': 'morocco', '072': 'botswana', '818': 'egypt', '882': 'samoa',
  '356': 'india', '516': 'namibia', '776': 'tonga', '704': 'vietnam', '417': 'kyrgyzstan',
  '788': 'tunisia', '116': 'cambodia', '462': 'maldives', '404': 'kenya', '626': 'timor',
  '834': 'tanzania', '418': 'laos', '762': 'tajikistan', '090': 'solomon', '288': 'ghana',
  '364': 'iran', '520': 'nauru', '144': 'sri_lanka', '598': 'papua', '686': 'senegal',
  '296': 'kiribati', '104': 'myanmar', '795': 'turkmenistan', '646': 'rwanda', '012': 'algeria',
  '566': 'nigeria', '798': 'tuvalu', '384': 'ivory_coast', '800': 'uganda', '894': 'zambia',
  '231': 'ethiopia', '716': 'zimbabwe', '120': 'cameroon', '050': 'bangladesh', '508': 'mozambique',
  '368': 'iraq', '586': 'pakistan', '524': 'nepal', '024': 'angola', '064': 'bhutan',
  '180': 'drc', '434': 'libya', '729': 'sudan', '760': 'syria', '232': 'eritrea',
  '887': 'yemen', '728': 'south_sudan', '706': 'somalia', '004': 'afghanistan', '408': 'north_korea',
}

// Create a lookup from passport ID to passport data
const passportById = {}
passportData.forEach(p => {
  passportById[p.id] = p
})

// Generate CSV data
function generateCSV(data) {
  const headers = ['Rank', 'Country', 'Score (Millions)', 'Home Bonus', 'Region', 'Key Access', 'Top Contributors', 'Major Misses', 'Note']
  const sortedData = [...data].sort((a, b) => b.score - a.score)

  const rows = sortedData.map((p, index) => {
    return [
      index + 1,
      p.country,
      p.score,
      p.homeBonus,
      regionMap[p.id] || 'Unknown',
      p.keyAccess.join('; '),
      p.topContributors.map(c => `${c.country}: ${c.value}M`).join('; '),
      p.misses.map(m => `${m.country}: ${m.value}M`).join('; '),
      p.note ? p.note.text : ''
    ]
  })

  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  return csvContent
}

function downloadCSV(data) {
  const csv = generateCSV(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'passport-ranking-total-experience-index.csv'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default function PassportRanking() {
  const [currentSort, setCurrentSort] = React.useState('score')
  const [currentFilter, setCurrentFilter] = React.useState('')
  const [currentRegion, setCurrentRegion] = React.useState('all')
  const [expandedIds, setExpandedIds] = React.useState(new Set())
  const [tooltipContent, setTooltipContent] = React.useState('')
  const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 })

  const sortedData = [...passportData].sort((a, b) => {
    if (currentSort === 'score') {
      return b.score - a.score
    }
    return a.country.localeCompare(b.country)
  })

  const filteredData = sortedData.filter(p => {
    const matchesSearch = p.country.toLowerCase().includes(currentFilter.toLowerCase())
    const matchesRegion = currentRegion === 'all' || regionMap[p.id] === currentRegion
    return matchesSearch && matchesRegion
  })

  const toggleExpand = (id) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <Layout>
      <Head>
        <title>Passport Ranking: The Total Experience Index | Ivan Braun</title>
        <meta name="description" content="A revolutionary passport ranking based on total tourism potential - measuring the sum of annual visitors to all accessible destinations, not just country count." />
        <meta name="keywords" content="passport ranking, passport index, total experience index, visa-free travel, passport power, tourism potential" />
        <link rel="canonical" href="https://aiandtractors.com/passport-ranking" />
      </Head>

      <div className="passport-page">
        <div className="header-section">
          <h1>The Total Experience Index</h1>
          <p className="subtitle">A passport ranking based on total tourism potential - measuring the sum of annual visitors to all accessible destinations, not just country count.</p>
          <p className="passport-count">{passportData.length} passports ranked</p>
        </div>

        <div className="container">
          <div className="methodology-box">
            <h2>The Methodology</h2>
            <p>Unlike traditional passport rankings that count the number of visa-free countries, this index calculates a score based on <strong>total accessible tourism volume</strong>. The logic: accessing France (100M visitors) matters more than accessing a small island nation.</p>
            <div className="formula">
              Score = Sum(Annual Visitors of all Visa-Free/eTA/VOA destinations) + Annual Visitors of Home Country
            </div>
            <p className="small-text">Data based on UNWTO 2023/2024 approximate visitor numbers. The "Home Bonus" reflects that your own country's tourism infrastructure is fully accessible to you.</p>
          </div>

          <div className="map-container">
            <h2>Global Passport Power Map</h2>
            {tooltipContent && (
              <div
                className="map-tooltip"
                style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
              >
                {tooltipContent}
              </div>
            )}
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 130,
                center: [0, 30]
              }}
              style={{ width: '100%', height: 'auto' }}
            >
              <ZoomableGroup>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      // world-atlas uses ISO numeric codes as geo.id
                      const numericId = geo.id
                      const passportId = isoNumericMap[numericId]
                      const passport = passportId ? passportById[passportId] : null
                      const fillColor = passport ? getGradientColor(passport.score) : '#e5e7eb'

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={fillColor}
                          stroke="#fff"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: 'none' },
                            hover: { outline: 'none', stroke: '#000', strokeWidth: 1.5 },
                            pressed: { outline: 'none' }
                          }}
                          onMouseEnter={(e) => {
                            const name = geo.properties.name || geo.properties.NAME || 'Unknown'
                            if (passport) {
                              setTooltipContent(`${passport.flag} ${passport.country}: ${formatNumber(passport.score)}`)
                            } else {
                              setTooltipContent(name)
                            }
                            setTooltipPosition({ x: e.clientX + 10, y: e.clientY - 30 })
                          }}
                          onMouseMove={(e) => {
                            setTooltipPosition({ x: e.clientX + 10, y: e.clientY - 30 })
                          }}
                          onMouseLeave={() => {
                            setTooltipContent('')
                          }}
                        />
                      )
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
            <div className="map-legend">
              <span className="legend-label">Low</span>
              <div className="legend-gradient"></div>
              <span className="legend-label">High</span>
              <span className="legend-item" style={{marginLeft: '1rem'}}><span className="legend-color" style={{background: '#e5e7eb'}}></span> No data</span>
            </div>
          </div>

          <div className="controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by country name..."
                value={currentFilter}
                onChange={(e) => setCurrentFilter(e.target.value)}
              />
            </div>
            <div className="filter-controls">
              <select
                className="filter-select"
                value={currentRegion}
                onChange={(e) => setCurrentRegion(e.target.value)}
              >
                <option value="all">All Regions</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="Americas">Americas</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
              </select>
              <select
                className="filter-select"
                value={currentSort}
                onChange={(e) => setCurrentSort(e.target.value)}
              >
                <option value="score">Sort by Score</option>
                <option value="name">Sort by Name</option>
              </select>
              <button
                className="export-btn"
                onClick={() => downloadCSV(passportData)}
              >
                Export CSV
              </button>
            </div>
          </div>

          <div className="results-count">
            Showing {filteredData.length} of {passportData.length} passports
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th className="rank-col">Rank</th>
                  <th className="country-col">Country</th>
                  <th className="score-col">Visitors</th>
                  <th className="access-col">Key Access</th>
                  <th className="expand-col"></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((passport, index) => {
                  const rank = currentSort === 'score' ? index + 1 : '-'
                  const rankClass = rank <= 3 ? `rank-${rank}` : ''
                  const progressWidth = (passport.score / maxScore) * 100
                  const isExpanded = expandedIds.has(passport.id)

                  // Sort top contributors by value descending
                  const sortedContributors = [...passport.topContributors].sort((a, b) => b.value - a.value)

                  return (
                    <React.Fragment key={passport.id}>
                      <tr
                        className={`clickable ${isExpanded ? 'expanded' : ''}`}
                        onClick={() => toggleExpand(passport.id)}
                      >
                        <td className={`rank ${rankClass}`}>{rank}</td>
                        <td className="country-cell">
                          <span className="flag">{passport.flag}</span>
                          <span className="country-name">{passport.country}</span>
                        </td>
                        <td className="score-cell">
                          <div className="score-value">{formatNumber(passport.score)}</div>
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${progressWidth}%`, background: getGradientColor(passport.score) }}
                            ></div>
                          </div>
                        </td>
                        <td className="key-access">
                          {passport.keyAccess.map((k, i) => (
                            <span key={i} className="key-access-tag">{k}</span>
                          ))}
                        </td>
                        <td className="expand-cell">
                          <span className={`expand-icon ${isExpanded ? 'rotated' : ''}`}>▼</span>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="detail-row">
                          <td colSpan="5">
                            <div className="detail-content">
                              <div className="detail-grid">
                                <div className="detail-section home-bonus-section">
                                  <h4>Home Bonus</h4>
                                  <div className="home-bonus-value">+{passport.homeBonus}M</div>
                                </div>
                                <div className="detail-section">
                                  <h4>Top Contributors</h4>
                                  {sortedContributors.map((c, i) => (
                                    <div key={i} className="detail-item">
                                      <span className="country">{c.country}</span>
                                      <span className="value positive">+{c.value}M</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="detail-section">
                                  <h4>Major Misses</h4>
                                  {passport.misses.length > 0 ? passport.misses.map((c, i) => (
                                    <div key={i} className="detail-item">
                                      <span className="country">{c.country}</span>
                                      <span className="value negative">{c.value}M</span>
                                    </div>
                                  )) : <p className="no-misses">No major restrictions!</p>}
                                </div>
                              </div>
                              {passport.note && (
                                <div className="smart-note">
                                  <h5>{passport.note.title}</h5>
                                  <p>{passport.note.text}</p>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="footer-info">
            <p>Data sources: UNWTO Tourism Statistics 2023/2024</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .passport-page {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem 3rem;
        }

        .header-section {
          text-align: center;
          padding: 3rem 0 2rem;
        }

        .header-section h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--primary-color);
        }

        .subtitle {
          font-size: 1.1rem;
          color: var(--secondary-color);
          max-width: 700px;
          margin: 0 auto 1rem;
        }

        .passport-count {
          font-size: 0.9rem;
          color: var(--accent-color);
          font-weight: 600;
        }

        .methodology-box {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .map-container {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          position: relative;
        }

        .map-container h2 {
          font-size: 1.2rem;
          color: var(--primary-color);
          margin-bottom: 1rem;
        }

        .map-tooltip {
          position: fixed;
          background: rgba(0, 0, 0, 0.85);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.85rem;
          pointer-events: none;
          z-index: 1000;
          white-space: nowrap;
        }

        .map-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .legend-gradient {
          width: 200px;
          height: 16px;
          border-radius: 3px;
          background: linear-gradient(to right,
            hsl(0, 75%, 48%),
            hsl(25, 85%, 50%),
            hsl(45, 85%, 50%),
            hsl(75, 70%, 42%),
            hsl(120, 75%, 48%)
          );
        }

        .legend-label {
          font-size: 0.8rem;
          color: var(--secondary-color);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--secondary-color);
        }

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 3px;
        }

        .export-btn {
          padding: 0.75rem 1.25rem;
          border: 1px solid var(--accent-color);
          border-radius: 8px;
          background: var(--accent-color);
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .export-btn:hover {
          background: #3347b0;
        }

        .methodology-box h2 {
          font-size: 1.2rem;
          color: var(--primary-color);
          margin-bottom: 1rem;
        }

        .methodology-box p {
          color: var(--secondary-color);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .formula {
          background: var(--bg-color);
          border-left: 4px solid var(--accent-color);
          padding: 1rem 1.25rem;
          border-radius: 0 8px 8px 0;
          font-family: 'Courier New', monospace;
          color: var(--primary-color);
          font-size: 0.9rem;
          overflow-x: auto;
        }

        .small-text {
          font-size: 0.85rem;
          margin-top: 1rem;
          margin-bottom: 0;
        }

        .controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .results-count {
          color: var(--secondary-color);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .search-box {
          flex: 1;
          min-width: 200px;
        }

        .search-box input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background: var(--card-bg);
          color: var(--primary-color);
          font-size: 1rem;
        }

        .search-box input:focus {
          outline: none;
          border-color: var(--accent-color);
        }

        .filter-controls {
          display: flex;
          gap: 0.5rem;
        }

        .filter-select {
          padding: 0.75rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background: var(--card-bg);
          color: var(--primary-color);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 140px;
        }

        .filter-select:hover {
          border-color: var(--accent-color);
        }

        .filter-select:focus {
          outline: none;
          border-color: var(--accent-color);
        }

        .table-container {
          background: var(--card-bg);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border-color);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: var(--secondary-color);
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.5px;
          border-bottom: 1px solid var(--border-color);
          background: var(--bg-color);
        }

        .rank-col { width: 60px; }
        .country-col { width: 200px; }
        .score-col { width: 150px; }
        .access-col { }
        .expand-col { width: 40px; }

        td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--border-color);
          vertical-align: middle;
        }

        tr:last-child td {
          border-bottom: none;
        }

        tr.clickable {
          cursor: pointer;
        }

        tr.clickable:hover {
          background: var(--bg-color);
        }

        tr.expanded {
          background: var(--bg-color);
        }

        .rank {
          font-weight: 700;
          font-size: 1rem;
          color: var(--secondary-color);
        }

        .rank-1 { color: #fbbf24; }
        .rank-2 { color: #9ca3af; }
        .rank-3 { color: #d97706; }

        .country-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .flag {
          font-size: 1.5rem;
          line-height: 1;
        }

        .country-name {
          font-weight: 500;
          color: var(--primary-color);
          font-size: 0.95rem;
        }

        .score-cell {
          min-width: 120px;
        }

        .score-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--primary-color);
          margin-bottom: 4px;
        }

        .progress-bar {
          height: 4px;
          background: var(--border-color);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.5s ease;
        }

        .key-access {
          font-size: 0.8rem;
        }

        .key-access-tag {
          display: inline-block;
          background: var(--bg-color);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          margin: 2px;
          font-size: 0.75rem;
          color: var(--secondary-color);
        }

        .expand-cell {
          text-align: center;
        }

        .expand-icon {
          color: var(--secondary-color);
          font-size: 0.7rem;
          transition: transform 0.3s;
          display: inline-block;
        }

        .expand-icon.rotated {
          transform: rotate(180deg);
        }

        .detail-row td {
          padding: 0;
          background: var(--bg-color);
        }

        .detail-content {
          padding: 1.5rem;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 120px 1fr 1fr;
          gap: 1rem;
        }

        .detail-section {
          background: var(--card-bg);
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .detail-section h4 {
          color: var(--accent-color);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.75rem;
        }

        .home-bonus-section {
          flex: 0 0 auto;
          min-width: 120px;
          max-width: 150px;
          text-align: center;
        }

        .home-bonus-value {
          font-size: 1.8rem;
          font-weight: 600;
          color: #16a34a;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.9rem;
        }

        .detail-item:last-child {
          border-bottom: none;
        }

        .detail-item .country {
          color: var(--primary-color);
        }

        .detail-item .value {
          font-weight: 600;
        }

        .detail-item .value.positive {
          color: #22c55e;
        }

        .detail-item .value.negative {
          color: #ef4444;
        }

        .no-misses {
          color: var(--secondary-color);
          font-size: 0.9rem;
          margin: 0;
        }

        .smart-note {
          background: linear-gradient(135deg, rgba(69, 93, 204, 0.05), rgba(69, 93, 204, 0.1));
          border: 1px solid var(--accent-color);
          border-radius: 8px;
          padding: 1rem;
          margin-top: 1rem;
        }

        .smart-note h5 {
          color: var(--accent-color);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .smart-note p {
          color: var(--secondary-color);
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.5;
        }

        .footer-info {
          text-align: center;
          padding: 2rem;
          color: var(--secondary-color);
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .passport-page {
            padding: 0 1rem 2rem;
          }

          .header-section h1 {
            font-size: 1.8rem;
          }

          th, td {
            padding: 0.75rem 0.5rem;
          }

          .access-col {
            display: none;
          }

          .key-access {
            display: none;
          }

          .country-col {
            width: auto;
          }

          .detail-grid {
            grid-template-columns: 1fr;
          }

          .home-bonus-section {
            max-width: none;
          }

          .controls {
            flex-direction: column;
          }

          .filter-controls {
            width: 100%;
            flex-direction: column;
          }

          .filter-select {
            width: 100%;
          }

          .export-btn {
            width: 100%;
          }

          .map-legend {
            gap: 0.5rem;
          }

          .legend-gradient {
            width: 120px;
          }

          .legend-item {
            font-size: 0.7rem;
          }

          .legend-label {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </Layout>
  )
}
