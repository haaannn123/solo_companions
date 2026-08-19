import { onMounted, ref } from 'vue'

export interface CalendarEvent {
  id: string
  summary?: string
  description?: string
  start: {
    date?: string
    dateTime?: string
  }
  end: {
    date?: string
    dateTime?: string
  }
}

export function useCalendarEvents() {
  const events = ref<CalendarEvent[]>([])
  const isLoading = ref(true)
  const hasError = ref(false)

  const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID
  const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY

  async function loadCalendarEvents() {
    if (!calendarId || !apiKey) {
      hasError.value = true
      isLoading.value = false
      return
    }

    try {
      const parameters = new URLSearchParams({
        key: apiKey,
        singleEvents: 'true',
        orderBy: 'startTime',
        timeMin: new Date().toISOString(),
        maxResults: '20',
        timeZone: 'America/New_York',
      })

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${parameters}`,
      )

      if (!response.ok) {
        throw new Error('Calendar events could not be loaded.')
      }

      const data = await response.json()
      events.value = data.items ?? []
    } catch {
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  onMounted(loadCalendarEvents)

  return { events, isLoading, hasError }
}