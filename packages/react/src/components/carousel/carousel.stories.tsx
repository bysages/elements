import { useCarousel } from "@ark-ui/react/carousel";
import type { Meta } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";

import { Carousel } from ".";

const meta: Meta = { title: "Components/Media/Carousel" };
export default meta;

const slides = [
  { src: "https://picsum.photos/seed/bs-1/640/360", alt: "Mountain path" },
  { src: "https://picsum.photos/seed/bs-2/640/360", alt: "Coastal cliff" },
  { src: "https://picsum.photos/seed/bs-3/640/360", alt: "Forest canopy" },
  { src: "https://picsum.photos/seed/bs-4/640/360", alt: "River bend" },
  { src: "https://picsum.photos/seed/bs-5/640/360", alt: "Valley fog" },
];

function chevron(dir: "left" | "right" | "up" | "down") {
  const rotation = { left: 180, up: -90, right: 0, down: 90 }[dir];
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
      style={rotation ? { transform: `rotate(${rotation}deg)` } : undefined}
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

function slide_(index: number) {
  return (
    <Carousel.Item key={index} index={index}>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          height: "12rem",
          borderRadius: "var(--bs-radius-lg)",
          background: "var(--bs-color-surface-inset)",
          color: "var(--bs-color-text-tertiary)",
          fontSize: "var(--bs-font-size-sm)",
        }}
      >
        Slide {index + 1}
      </div>
    </Carousel.Item>
  );
}

function images(): ReactNode {
  return slides.map((slide, index) => (
    <Carousel.Item key={index} index={index}>
      <img src={slide.src} alt={slide.alt} width={640} height={360} />
    </Carousel.Item>
  ));
}

function strip(rootProps: any, items: ReactNode, indicators?: ReactNode) {
  const vertical = rootProps.orientation === "vertical";
  return (
    <Carousel.Root {...rootProps}>
      <Carousel.Control>
        <Carousel.PrevTrigger>{chevron(vertical ? "up" : "left")}</Carousel.PrevTrigger>
        <Carousel.ItemGroup>{items}</Carousel.ItemGroup>
        <Carousel.NextTrigger>{chevron(vertical ? "down" : "right")}</Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.IndicatorGroup>
        {indicators ?? slides.map((_, index) => <Carousel.Indicator key={index} index={index} />)}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  );
}

/** Prev/next as quiet outline controls, the lane clipped to one slide,
 * dots underneath with the current page in ink. */
export const Basic = {
  args: {
    orientation: "horizontal",
  },
  render: (args: any) =>
    strip({ slideCount: slides.length, orientation: args.orientation }, images()),
};

/** The lane rises: slides travel bottom to top. */
export const Vertical = {
  render: () =>
    strip({ slideCount: slides.length, orientation: "vertical", defaultPage: 0 }, images()),
};

/** Two leaves per page; each peek of the next slide invites the turn. */
export const SlidesPerPage = {
  render: () => strip({ slideCount: slides.length, slidesPerPage: 2, spacing: "16px" }, images()),
};

/** Every slide its own width; the lane breathes between them. */
export const VariableSize = {
  render: () =>
    strip(
      {
        slideCount: slides.length,
        slidesPerPage: 1.5,
        spacing: "40px",
        autoResize: true,
      } as any,
      slides.map((_, index) => slide_(index)),
    ),
};

/** The strip turns itself: autoplay with loop, paused while hovered. */
export const Autoplay = {
  render: () => strip({ slideCount: slides.length, autoplay: true, loop: true }, images()),
};

/** Thumbnails as the page marks: the active thumbnail holds the ink
 * hairline. */
export const ThumbnailIndicator = {
  render: () =>
    strip(
      { slideCount: slides.length, defaultPage: 0 },
      images(),
      slides.map((slide, index) => (
        <Carousel.Indicator key={index} index={index}>
          <img src={slide.src} alt="" width={96} height={54} />
        </Carousel.Indicator>
      )),
    ),
};

/** A plain button may drive the strip — the context api scrolls to a
 * chosen page. */
function ScrollToDriver() {
  const carousel = useCarousel({ slideCount: slides.length });
  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <button
        type="button"
        onClick={() => carousel.scrollToIndex(3)}
        style={{
          justifySelf: "start",
          border: "1px solid var(--bs-color-border)",
          background: "var(--bs-color-surface-2)",
          borderRadius: "var(--bs-radius-sm)",
          padding: "0.25rem 0.625rem",
          font: "inherit",
          fontSize: "var(--bs-font-size-sm)",
          cursor: "pointer",
        }}
      >
        Go to slide 4
      </button>
      <Carousel.RootProvider value={carousel}>
        <Carousel.ItemGroup>{slides.map((_, index) => slide_(index))}</Carousel.ItemGroup>
        <Carousel.IndicatorGroup>
          {slides.map((_, index) => (
            <Carousel.Indicator key={index} index={index} />
          ))}
        </Carousel.IndicatorGroup>
      </Carousel.RootProvider>
    </div>
  );
}

export const ScrollTo = {
  render: () => <ScrollToDriver />,
};

/** Slides come and go while the strip keeps its page — add one and the
 * count follows. */
export const DynamicSlides = {
  render: () => {
    const [count, setCount] = useState(4);
    const [page, setPage] = useState(0);
    return (
      <div style={{ display: "grid", gap: "0.75rem", maxWidth: "36rem" }}>
        <button
          type="button"
          onClick={() => setCount((value) => value + 1)}
          style={{
            justifySelf: "start",
            border: "1px solid var(--bs-color-border)",
            background: "var(--bs-color-surface-2)",
            borderRadius: "var(--bs-radius-sm)",
            padding: "0.25rem 0.625rem",
            font: "inherit",
            fontSize: "var(--bs-font-size-sm)",
            cursor: "pointer",
          }}
        >
          Add slide
        </button>
        <Carousel.Root
          slideCount={count}
          page={page}
          onPageChange={(e: { page: number }) => setPage(e.page)}
        >
          <Carousel.ItemGroup>
            {Array.from({ length: count }, (_, index) => slide_(index))}
          </Carousel.ItemGroup>
          <Carousel.IndicatorGroup>
            {Array.from({ length: count }, (_, index) => (
              <Carousel.Indicator key={index} index={index} />
            ))}
          </Carousel.IndicatorGroup>
        </Carousel.Root>
      </div>
    );
  },
};

/** The page answers to the caller — the strip only mirrors. */
export const Controlled = {
  render: () => {
    const [page, setPage] = useState(0);
    return (
      <Carousel.Root
        slideCount={slides.length}
        page={page}
        onPageChange={(e: { page: number }) => setPage(e.page)}
      >
        <Carousel.ItemGroup>{images()}</Carousel.ItemGroup>
        <Carousel.IndicatorGroup>
          {slides.map((_, index) => (
            <Carousel.Indicator key={index} index={index} />
          ))}
        </Carousel.IndicatorGroup>
      </Carousel.Root>
    );
  },
};
