<script setup lang="ts">
import { Breadcrumb, Card } from "@bysages/vue";

// Namespace parts ride the family object — import it, then destructure.
const { Header, Title, Description, Content, Footer } = Card;
const { Root, List, Item, Link, Current, Separator } = Breadcrumb;
</script>

<template>
  <main style="display: grid; gap: 2rem; max-inline-size: 40rem; margin: 3rem auto">
    <Card>
      <Header>
        <Title>Elements on Nuxt</Title>
        <Description> Auto-imported components, dressed by the paper-and-ink system. </Description>
      </Header>
      <Content>
        <Root>
          <List>
            <Item><Link href="#home">Home</Link></Item>
            <Separator />
            <Item><Current>Playground</Current></Item>
          </List>
        </Root>
      </Content>
      <Footer style="display: flex; gap: 0.75rem">
        <Button>Ink, the default</Button>
        <Button variant="outline">Outline</Button>
        <Badge tone="success">Celadon accent</Badge>
      </Footer>
    </Card>
  </main>
</template>
