import { 
  allEvents, 
  getEventsByYear, 
  getAvailableYears 
} from '../data/events';

describe('Events Data (English-only)', () => {
  test('should expose every supported event year', () => {
    const availableYears = getAvailableYears()

    expect(availableYears).toEqual(['2025', '2026', '2027', '2028'])
  });

  test('should return events for valid years', () => {
    getAvailableYears().forEach(year => {
      expect(getEventsByYear(year).length).toBeGreaterThan(0)
    })
  });

  test('should return empty array for invalid years', () => {
    expect(getEventsByYear('2024')).toEqual([])
    expect(getEventsByYear('2099')).toEqual([])
  });

  test('should have valid English-only event structure', () => {
    allEvents.forEach(event => {
      expect(event.id).toBeDefined()
      expect(event.name).toBeDefined()
      expect(typeof event.name).toBe('string') // Not an object anymore
      expect(event.description).toBeDefined()
      expect(typeof event.description).toBe('string') // Not an object anymore
      expect(event.focus).toBeDefined()
      expect(typeof event.focus).toBe('string') // Not an object anymore
    });
  });

  test('should have reasonable data', () => {
    allEvents.forEach(event => {
      expect(event.attendees).toBeGreaterThan(0)
      expect(event.attendees).toBeLessThan(1000000)
      expect(event.location).toBeDefined()
      expect(event.country).toBeDefined()
    });
  });
});
