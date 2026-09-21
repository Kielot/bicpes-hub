import { useEffect, useLayoutEffect, useRef, useState, } from "react";

type Platform = {
  id: string;
  name: string;
  short: string;
  accent:
    | "amber"
    | "coral"
    | "violet"
    | "primary"
    | "mid"
    | "ok";
};

type ChipDiagramProps = {
  platforms?: Platform[];
  width?: number | string;
};

const DEFAULT_PLATFORMS: Platform[] = [
  {
    id: "hub",
    name: "Tool and Component Hub",
    short: "Component Hub",
    accent: "amber",
  },
  {
    id: "events",
    name: "Events calendar",
    short: "Events",
    accent: "coral",
  },
  {
    id: "board",
    name: "Announcement board",
    short: "Updates",
    accent: "violet",
  },
  {
    id: "membership",
    name: "Membership portal",
    short: "Membership",
    accent: "primary",
  },
  {
    id: "directory",
    name: "Member directory",
    short: "Directory",
    accent: "ok",
  },
];

const ACCENTS: Record<
  Platform["accent"],
  string
> = {
  primary: "#2C69E2",
  amber: "#F5A524",
  violet: "#7A5AF8",
  coral: "#EE5F55",
  mid: "#3F8AC9",
  ok: "#1B9A68",
};

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] =
    useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    setReduced(mediaQuery.matches);

    const handleChange = (
      event: MediaQueryListEvent,
    ) => {
      setReduced(event.matches);
    };

    mediaQuery.addEventListener(
      "change",
      handleChange,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange,
      );
    };
  }, []);

  return reduced;
};

const ChipDiagram = ({
  platforms = DEFAULT_PLATFORMS,
  width = "100%",
}: ChipDiagramProps) => {
  const reduceMotion =
    usePrefersReducedMotion();

  const svgRef =
    useRef<SVGSVGElement>(null);

  const [pillWidths, setPillWidths] =
    useState<number[]>([]);

  /*
   * ------------------------------------------------------------
   * PLATFORM POSITIONS
   * ------------------------------------------------------------
   */

  const positions = [
    {
      x: 440,
      y: 40,
      circleX: 460,
      textX: 474,
      textY: 62,
    },
    {
      x: 464,
      y: 125,
      circleX: 484,
      textX: 498,
      textY: 147,
    },
    {
      x: 462,
      y: 213,
      circleX: 482,
      textX: 496,
      textY: 235,
    },
    {
      x: 464,
      y: 296,
      circleX: 484,
      textX: 498,
      textY: 318,
    },
    {
      x: 440,
      y: 386,
      circleX: 460,
      textX: 474,
      textY: 408,
    },
  ];

  /*
   * ------------------------------------------------------------
   * MEASURE PLATFORM TEXT
   * ------------------------------------------------------------
   *
   * The SVG text is measured after the font has loaded.
   * The pill width is then calculated from the actual
   * rendered text width.
   */

  const measurePills = () => {
    if (!svgRef.current) return;

    const textElements =
      svgRef.current.querySelectorAll<SVGTextElement>(
        ".board-pill-text",
      );

    if (!textElements.length) return;

    const widths = Array.from(
      textElements,
    ).map((text) => {
      const textWidth =
        text.getComputedTextLength();

      /*
       * Space required for:
       *
       * left padding
       * circle
       * gap
       * text
       * right padding
       */
      const calculatedWidth =
        textWidth + 46;

      /*
       * Minimum width prevents very short
       * labels from creating tiny pills.
       */
      const minimumWidth = 110;

      /*
       * Prevent the pill from going outside
       * the 600px SVG viewBox.
       */
      const maxWidth =
        598 -
        (positions[
          textElements.length > 0
            ? Array.from(
                textElements,
              ).indexOf(text)
            : 0
        ]?.x ?? 440);

      return Math.min(
        Math.max(
          calculatedWidth,
          minimumWidth,
        ),
        maxWidth,
      );
    });

    setPillWidths(widths);
  };

  useLayoutEffect(() => {
    /*
     * First measurement.
     */
    measurePills();

    /*
     * Measure again after fonts have loaded.
     *
     * This is important because getComputedTextLength()
     * can return an incorrect value before the custom
     * font has finished loading.
     */
    if (document.fonts) {
      document.fonts.ready.then(() => {
        measurePills();
      });
    }

    /*
     * Recalculate if the browser window changes size.
     */
    window.addEventListener(
      "resize",
      measurePills,
    );

    return () => {
      window.removeEventListener(
        "resize",
        measurePills,
      );
    };
  }, [platforms]);

  /*
   * ------------------------------------------------------------
   * SVG
   * ------------------------------------------------------------
   */

  return (
    <svg
      ref={svgRef}
      className="board"
      viewBox="0 0 600 460"
      width={width}
      height="auto"
      role="img"
      aria-label="The BICpES chip connected by circuit traces to the organization's platforms"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "block",
        width: "100%",
        height: "auto",
        overflow: "visible",
      }}
    >
      <style>
        {`
          .board-trace {
            fill: none;
            stroke: #3F8AC9;
            stroke-width: 3;
            stroke-linecap: round;
            stroke-linejoin: round;
          }

          .board-pad {
            fill: #FFFFFF;
            stroke: #3F8AC9;
            stroke-width: 3;
          }

          .board-chip-body {
            fill: #FFFFFF;
            stroke: #061435;
            stroke-width: 2.5;
          }

          .board-pin {
            fill: #3F8AC9;
          }

          .board-chip-label {
            font-family: 'Michroma',
              'Eurostile',
              'Arial Black',
              system-ui,
              sans-serif;

            font-size: 15px;
            letter-spacing: -0.05em;
            fill: #061435;
          }

          .board-pill {
            fill: #FFFFFF;
            stroke: #2C69E2;
            stroke-width: 2;
            transition:
              fill 0.2s ease,
              stroke-width 0.2s ease;
          }

          .board-pill-text {
            font-family: 'Source Sans 3',
              'Myriad Pro',
              system-ui,
              -apple-system,
              'Segoe UI',
              sans-serif;

            font-weight: 600;
            font-size: 14.5px;
            fill: #061435;
          }

          .board-pill-link {
            cursor: pointer;
          }

          .board-pill-link:hover .board-pill {
            fill: #E4ECFB;
          }

          .board-pill-link:focus-visible {
            outline: none;
          }

          .board-pill-link:focus-visible .board-pill {
            stroke-width: 4;
          }

          .board-pulse {
            fill: #F5A524;
          }

          ${
            reduceMotion
              ? `
                .board-pulse {
                  display: none;
                }
              `
              : `
                .board-trace {
                  stroke-dasharray: 1;
                  animation:
                    board-draw
                    1.5s
                    ease-out
                    both;
                }

                @keyframes board-draw {
                  from {
                    stroke-dashoffset: 1;
                  }

                  to {
                    stroke-dashoffset: 0;
                  }
                }
              `
          }
        `}
      </style>

      {/* ============================================================
          CIRCUIT TRACES
          ============================================================ */}

      <g>
        {/* Right — top */}

        <path
          className="board-trace"
          pathLength="1"
          id="tr-0"
          d="M350 130 V92 L385 57 H440"
        />

        {/* Right — upper middle */}

        <path
          className="board-trace"
          pathLength="1"
          id="tr-1"
          d="M390 190 H409 L457 142 H464"
        />

        {/* Right — middle */}

        <path
          className="board-trace"
          pathLength="1"
          id="tr-2"
          d="M390 230 H462"
        />

        {/* Right — lower middle */}

        <path
          className="board-trace"
          pathLength="1"
          id="tr-3"
          d="M390 270 H409 L452 313 H464"
        />

        {/* Right — bottom */}

        <path
          className="board-trace"
          pathLength="1"
          id="tr-4"
          d="M350 330 V368 L385 403 H440"
        />

        {/* Left */}

        <path
          className="board-trace"
          pathLength="1"
          d="M190 190 H130 L100 160 H60"
        />

        <path
          className="board-trace"
          pathLength="1"
          d="M190 230 H150 L144 221 L132 239 L120 221 L108 239 L102 230 H54"
        />

        <path
          className="board-trace"
          pathLength="1"
          d="M190 270 H130 L100 300 H60"
        />

        {/* Top */}

        <path
          className="board-trace"
          pathLength="1"
          d="M230 130 V90 L200 60 H150"
        />

        <path
          className="board-trace"
          pathLength="1"
          d="M290 130 V46"
        />

        {/* Bottom */}

        <path
          className="board-trace"
          pathLength="1"
          d="M230 330 V370 L200 400 H150"
        />

        <path
          className="board-trace"
          pathLength="1"
          d="M290 330 V414"
        />
      </g>

      {/* ============================================================
          CONNECTION PADS
          ============================================================ */}

      <g>
        <circle
          className="board-pad"
          cx="54"
          cy="160"
          r="6"
        />

        <circle
          className="board-pad"
          cx="48"
          cy="230"
          r="6"
        />

        <circle
          className="board-pad"
          cx="54"
          cy="300"
          r="6"
        />

        <circle
          className="board-pad"
          cx="144"
          cy="60"
          r="6"
        />

        <circle
          className="board-pad"
          cx="290"
          cy="40"
          r="6"
        />

        <circle
          className="board-pad"
          cx="144"
          cy="400"
          r="6"
        />

        <circle
          className="board-pad"
          cx="290"
          cy="420"
          r="6"
        />
      </g>

      {/* ============================================================
          CHIP BODY
          ============================================================ */}

      <rect
        className="board-chip-body"
        x="190"
        y="130"
        width="200"
        height="200"
        rx="22"
      />

      {/* ============================================================
          CHIP PINS
          ============================================================ */}

      <g className="board-pin">
        {/* Top */}

        <rect
          x="225"
          y="118"
          width="10"
          height="14"
          rx="3"
        />

        <rect
          x="285"
          y="118"
          width="10"
          height="14"
          rx="3"
        />

        <rect
          x="345"
          y="118"
          width="10"
          height="14"
          rx="3"
        />

        {/* Bottom */}

        <rect
          x="225"
          y="328"
          width="10"
          height="14"
          rx="3"
        />

        <rect
          x="285"
          y="328"
          width="10"
          height="14"
          rx="3"
        />

        <rect
          x="345"
          y="328"
          width="10"
          height="14"
          rx="3"
        />

        {/* Left */}

        <rect
          x="178"
          y="185"
          width="14"
          height="10"
          rx="3"
        />

        <rect
          x="178"
          y="225"
          width="14"
          height="10"
          rx="3"
        />

        <rect
          x="178"
          y="265"
          width="14"
          height="10"
          rx="3"
        />

        {/* Right */}

        <rect
          x="388"
          y="185"
          width="14"
          height="10"
          rx="3"
        />

        <rect
          x="388"
          y="225"
          width="14"
          height="10"
          rx="3"
        />

        <rect
          x="388"
          y="265"
          width="14"
          height="10"
          rx="3"
        />
      </g>

      {/* ============================================================
          CHIP INDICATOR
          ============================================================ */}

      <circle
        cx="212"
        cy="152"
        r="4.5"
        className="board-pin"
      />

      {/* ============================================================
          CENTERED BICpES LOGO
          ============================================================ */}

      {/*
       * Chip:
       *
       * x = 190
       * y = 130
       * width = 200
       * height = 200
       *
       * Therefore center:
       *
       * x = 190 + 100 = 290
       * y = 130 + 100 = 230
       *
       * Logo:
       *
       * width  = 100
       * height = 105
       *
       * Centering:
       *
       * x = 290 - 100 / 2 = 240
       * y = 230 - 105 / 2 = 177.5
       */}

      <image
        href="/bicpes-logo.png"
        x="240"
        y="177.5"
        width="100"
        height="105"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* ============================================================
          PLATFORM PILLS
          ============================================================ */}

      {platforms
        .slice(0, 5)
        .map((platform, index) => {
          const position =
            positions[index];

          if (!position) return null;

          /*
           * The calculated width based on the
           * actual SVG text measurement.
           *
           * Use 140px temporarily while the
           * measurement is being performed.
           */
          const pillWidth =
            pillWidths[index] ?? 140;

          return (
            <a
              key={platform.id}
              className="board-pill-link"
              href="#platforms"
              aria-label={platform.name}
            >
              <rect
                className="board-pill"
                x={position.x}
                y={position.y}
                width={pillWidth}
                height="34"
                rx="17"
              />

              <circle
                cx={position.circleX}
                cy={position.y + 17}
                r="5"
                fill={
                  ACCENTS[
                    platform.accent
                  ]
                }
              />

              <text
                className="board-pill-text"
                x={position.textX}
                y={position.textY}
              >
                {platform.short ||
                  platform.name}
              </text>
            </a>
          );
        })}

      {/* ============================================================
          ANIMATED SIGNAL PULSES
          ============================================================ */}

      {!reduceMotion && (
        <g className="board-pulse-group">
          {/* Pulse 1 */}

          <circle
            className="board-pulse"
            r="5"
            opacity="0"
          >
            <set
              attributeName="opacity"
              to="1"
              begin="1.6s"
              fill="freeze"
            />

            <animateMotion
              dur="3.4s"
              begin="1.6s"
              repeatCount="indefinite"
            >
              <mpath href="#tr-0" />
            </animateMotion>
          </circle>

          {/* Pulse 2 */}

          <circle
            className="board-pulse"
            r="5"
            opacity="0"
          >
            <set
              attributeName="opacity"
              to="1"
              begin="2.4s"
              fill="freeze"
            />

            <animateMotion
              dur="3s"
              begin="2.4s"
              repeatCount="indefinite"
            >
              <mpath href="#tr-1" />
            </animateMotion>
          </circle>

          {/* Pulse 3 */}

          <circle
            className="board-pulse"
            r="5"
            opacity="0"
          >
            <set
              attributeName="opacity"
              to="1"
              begin="3.1s"
              fill="freeze"
            />

            <animateMotion
              dur="2.6s"
              begin="3.1s"
              repeatCount="indefinite"
            >
              <mpath href="#tr-2" />
            </animateMotion>
          </circle>

          {/* Pulse 4 */}

          <circle
            className="board-pulse"
            r="5"
            opacity="0"
          >
            <set
              attributeName="opacity"
              to="1"
              begin="3.9s"
              fill="freeze"
            />

            <animateMotion
              dur="3.2s"
              begin="3.9s"
              repeatCount="indefinite"
            >
              <mpath href="#tr-3" />
            </animateMotion>
          </circle>

          {/* Pulse 5 */}

          <circle
            className="board-pulse"
            r="5"
            opacity="0"
          >
            <set
              attributeName="opacity"
              to="1"
              begin="4.6s"
              fill="freeze"
            />

            <animateMotion
              dur="3.6s"
              begin="4.6s"
              repeatCount="indefinite"
            >
              <mpath href="#tr-4" />
            </animateMotion>
          </circle>
        </g>
      )}
    </svg>
  );
};

export default ChipDiagram;
