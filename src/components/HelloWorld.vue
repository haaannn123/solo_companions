<script setup lang="ts">
import { ref } from 'vue'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import vueLogo from '../assets/vue.svg'

</script>

<template>
  <section class="hero">
    <div class="hero-content">
      <p class="brand">SOLO COMPANIONS</p>
      <h1>Your pet’s best friend</h1>
    </div>
  </section>

  <div class="ticks"></div>

  <section id="availability" class="availability">
    <div class="availability-content">
      <p class="eyebrow">PET SITTING</p>
      <h2>My Pet Sitting Availability</h2>
      <p>View my current availability and plan your pet’s next stay.</p>

      <iframe
        class="calendar"
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&showPrint=0&src=MGU5Mjc4OWY1N2I5MGViMGQyZDc1YmRjZTYxYTIyMjhhZTM3OWUzODU3Y2Q1M2ZlODQ1NzQ3OTdjZTY5M2E3OUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%234285f4&color=%23aca0bd" 
        title="Solo Companions pet sitting availability"
        height="600"
        frameborder="0"
        scrolling="no"
      ></iframe>
    </div>
  </section>

  <div class="ticks"></div>
  <section id="spacer"></section>
</template>
