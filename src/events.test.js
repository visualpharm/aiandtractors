import { 
  allEvents, 
  getEventsByYear, 
  getAvailableYears 
} from '../data/events';

describe('Events Data (English-only)', () => {
  test('should have events for supported years only', () => {
    const availableYears = getAvailableYears()
    
    expect(availableYears).toContain('2025')
    expect(availableYears).toContain('2026')
    expect(availableYears).not.toContain('2027')
    expect(availableYears).not.toContain('2028')
  });

  test('should return events for valid years', () => {
    const events2025 = getEventsByYear('2025')
    const events2026 = getEventsByYear('2026')
    
    expect(events2025.length).toBeGreaterThan(0)
    expect(events2026.length).toBeGreaterThan(0)
  });

  test('should return empty array for invalid years', () => {
    const events2027 = getEventsByYear('2027')
    const events2028 = getEventsByYear('2028')
    
    expect(events2027).toEqual([])
    expect(events2028).toEqual([])
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