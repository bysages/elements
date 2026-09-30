<script setup lang="ts">
import { areaY, chartColors, defineChart } from "@bysages/charts";
import { scaleBand } from "@bysages/charts/scales/band";
import { scaleLinear } from "@bysages/charts/scales/linear";
import { Chart, type ChartDefinition } from "@bysages/charts/vue";
import { Button, Card, Progress } from "@bysages/vue";

import { cashCollected, channels } from "./data";
import { toaster } from "./toast";

const definition = defineChart({
  marks: [
    areaY(cashCollected, {
      x: "month",
      y: "cash",
      fill: chartColors.success,
      fillOpacity: 0.14,
      strokeWidth: 2,
    }),
  ],
  scales: {
    x: { scale: scaleBand, padding: 0.24 },
    y: { scale: scaleLinear, nice: true, grid: true, axis: { label: "Cash (k$)" } },
  },
}) as ChartDefinition;
</script>

<template>
  <div class="grid content-start gap-5">
    <div class="grid grid-cols-[repeat(auto-fit,minmax(min(22rem,100%),1fr))] gap-5">
      <Card.Root>
        <Card.Header>
          <Card.Title>Cash collected</Card.Title>
          <Card.Description>The same twelve months, as money in the door.</Card.Description>
        </Card.Header>
        <Card.Content>
          <Chart :definition="definition" aria-label="Cash collected by month, area chart" />
        </Card.Content>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>Where accounts come from</Card.Title>
          <Card.Description>Share of the active book by channel.</Card.Description>
        </Card.Header>
        <Card.Content class="grid content-start gap-4">
          <Progress.Root v-for="row in channels" :key="row.channel" :model-value="row.share">
            <Progress.Label>{{ row.channel }} · {{ row.accounts }}</Progress.Label>
            <Progress.ValueText />
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        </Card.Content>
      </Card.Root>
    </div>

    <Card.Root>
      <Card.Header>
        <Card.Title>Quarterly pack</Card.Title>
        <Card.Description>
          Everything on this page, laid out for the board deck - assembled on demand.
        </Card.Description>
      </Card.Header>
      <Card.Footer>
        <Button
          @click="
            toaster.create({
              title: 'Report exported',
              description: 'Q3 pack rendered with the figures on this page.',
              type: 'success',
            })
          "
        >
          Export Q3 pack
        </Button>
        <Button
          variant="ghost"
          @click="
            toaster.create({
              title: 'Scheduled',
              description: 'The pack will render on the first of each quarter.',
              type: 'info',
            })
          "
        >
          Schedule quarterly
        </Button>
      </Card.Footer>
    </Card.Root>
  </div>
</template>
