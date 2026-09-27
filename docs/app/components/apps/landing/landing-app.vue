<script setup lang="ts">
import BrandWall from "./brand-wall.vue";
import FaqList from "./faq-list.vue";
import FeatureGrid from "./feature-grid.vue";
import GalleryWall from "./gallery-wall.vue";
import HeroSection from "./hero-section.vue";
import PricingTable from "./pricing-table.vue";
import SiteFooter from "./site-footer.vue";
import SiteHeader from "./site-header.vue";
import VoicesList from "./voices-list.vue";
</script>

<template>
  <div class="contents">
    <SiteHeader />
    <main>
      <HeroSection />
      <BrandWall />
      <GalleryWall />
      <FeatureGrid />
      <VoicesList />
      <PricingTable />
      <FaqList />
    </main>
    <SiteFooter />
  </div>
</template>
