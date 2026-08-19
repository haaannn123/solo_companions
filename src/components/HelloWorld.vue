<script setup lang="ts">
  import { computed } from 'vue'

  import {
    useCalendarEvents,
    type CalendarEvent,
  } from '../composables/useCalendarEvents'

  const { events, isLoading, hasError } = useCalendarEvents()

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'America/New_York',
  })

  function localDate(date: string) {
    return new Date(`${date}T12:00:00`)
  }

  function getEventStart(event: CalendarEvent) {
    return event.start.date
      ? localDate(event.start.date)
      : new Date(event.start.dateTime!)
  }

  function getEventEnd(event: CalendarEvent) {
    if (event.end.date) {
      const endDate = localDate(event.end.date)

      // All-day Google events end on the following date.
      endDate.setDate(endDate.getDate() - 1)

      return endDate
    }

    return new Date(event.end.dateTime!)
  }

  function formatEventDate(event: CalendarEvent) {
    const start = getEventStart(event)
    const end = getEventEnd(event)

    const formattedStart = dateFormatter.format(start)
    const formattedEnd = dateFormatter.format(end)

    return formattedStart === formattedEnd
      ? formattedStart
      : `${formattedStart}–${formattedEnd}`
  }

  const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  timeZone: 'America/New_York',
  })

  const monthYearFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'America/New_York',
  })

  function getEventDateParts(event: CalendarEvent) {
    const start = getEventStart(event)
    const end = getEventEnd(event)

    return {
      month: monthFormatter.format(start).toUpperCase(),
      days:
        start.toDateString() === end.toDateString()
          ? `${start.getDate()}`
          : `${start.getDate()}–${end.getDate()}`,
    }
  }

  function getEventTone(event: CalendarEvent) {
    const title = (event.summary || '').toLowerCase()

    if (title.includes('available')) return 'is-available'
    if (title.includes('drop')) return 'is-drop-in'

    return 'is-unavailable'
  }

  const agendaGroups = computed(() => {
    const groups = new Map<string, CalendarEvent[]>()

    for (const event of events.value) {
      const month = monthYearFormatter.format(getEventStart(event))

      if (!groups.has(month)) {
        groups.set(month, [])
      }

      groups.get(month)!.push(event)
    }

    return [...groups.entries()].map(([month, events]) => ({
      month,
      events,
    }))
  })
</script>

<template>
  <section class="hero">
    <div class="hero-content">
      <p class="brand">SOLO COMPANIONS</p>
      <h1>Care that feels familiar.</h1>
    </div>
  </section>

  <section id="availability" class="availability">
    <div class="availability-content">
      <p class="eyebrow">PET SITTING</p>
      <h2>My Pet Sitting Availability</h2>
      <p>View my current availability and plan your pet’s next stay.</p>
        <div class="calendar-frame desktop-calendar">
          <iframe
            class="calendar"
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&showPrint=0&src=MGU5Mjc4OWY1N2I5MGViMGQyZDc1YmRjZTYxYTIyMjhhZTM3OWUzODU3Y2Q1M2ZlODQ1NzQ3OTdjZTY5M2E3OUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%234285f4&color=%23aca0bd" 
            title="Solo Companions pet sitting availability"
            height="600"
            frameborder="0"
            scrolling="no"
          ></iframe>
        </div>

        <div class="mobile-agenda">
          <p v-if="isLoading" class="agenda-message">
            Loading availability…
          </p>

          <p v-else-if="hasError" class="agenda-message">
            Availability is being updated. Please check back shortly.
          </p>

          <p v-else-if="events.length === 0" class="agenda-message">
            No upcoming dates are listed right now.
          </p>

          <ul v-else class="agenda-list">
            <li v-for="event in events" :key="event.id" class="agenda-card">
              <div class="agenda-date-box">
                <span class="agenda-date-month">
                  {{ getEventDateParts(event).month }}
                </span>

                <span class="agenda-date-days">
                  {{ getEventDateParts(event).days }}
                </span>
              </div>

              <p class="agenda-status" :class="getEventTone(event)">
                {{ event.summary || 'Unavailable' }}
              </p>

              <!-- <span class="agenda-arrow" aria-hidden="true">›</span> -->
            </li>
          </ul>
        </div>
        
    </div>
  </section>

  <section id="about" class="about">
    <div class="about-content">
      <div class="about-heading">
        <p class="eyebrow">ABOUT SOLO COMPANIONS</p>
        <h2>Thoughtful pet care that keeps their routine close to home.</h2>
      </div>

      <div class="about-copy">
        <p>
          With many years of pet-sitting experience, I understand that choosing a sitter
          means trusting someone with a member of your family.
          I value building long-term
          relationships with pets and their families, so every visit feels
          familiar, consistent, and caring.
        </p>

        <p>
          Every pet has their own routine, personality, and little ways of doing
          things. I love learning the details—from a favorite walk route to the
          quirks—because those are the things that help a pet feel most comfortable 
          while their person is away.
        </p>
        
      </div>
    </div>
  </section>

  <section id="contact" class="contact">
  <div class="contact-content">
    <p class="eyebrow">GET IN TOUCH</p>
    <h2>Looking for pet care?</h2>
    <p>
      I'm currently accepting inquiries through referrals.
      Tell me a little about your pet and the dates you need.
    </p>

    <a
      class="contact-button"
      href="https://docs.google.com/forms/d/e/1FAIpQLSdw4_gwSZwrVYkGKaZ7D0YRWLKd08Fa4egbDOq5doVLUQmWNQ/viewform?usp=dialog"
      target="_blank"
      rel="noreferrer"
    >
      Send an inquiry
    </a>
  </div>
  </section>

  <div class="ticks"></div>
  <section id="spacer"></section>
</template>
