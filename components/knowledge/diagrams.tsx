import {
  Bar,
  Chip,
  Flag,
  Frame,
  Panel,
  Pass,
  Rule,
  Tag,
  Trace,
  Value,
  seq,
  travel,
} from '@/components/diagrams/kit';

/**
 * Process diagrams for the service walkthrough.
 *
 * Each one is built to be read before the paragraph beside it is read. That
 * means two things the earlier pass did not do: the drawing names its own
 * parts, and the motion performs the verb rather than fading the picture in.
 * "Reconciliation" is two columns with lines tracing between the rows that
 * agree and a flag on the one that does not — not an abstract arrangement of
 * rectangles that could illustrate anything.
 *
 * Structure is static; only the action loops. See the DIAGRAM MOTION block in
 * globals.css for the vocabulary and the reduced-motion contract.
 */

type P = { active: boolean };

/* ------------------------------------------------------------------ */
/* normalise — ragged input sorted into named heads                     */
/* ------------------------------------------------------------------ */
export function NormaliseDiagram({ active }: P) {
  const rows = [92, 58, 78, 46];
  const heads = ['GOODS', 'SERVICES', 'CAPITAL'];
  const target = [0, 2, 1, 0];

  return (
    <Frame
      active={active}
      cycle={5600}
      label="Ragged purchase rows being sorted into named accounting heads"
    >
      <Tag x={14} y={22}>
        AS RECEIVED
      </Tag>
      <Rule x1={14} y1={30} x2={116} y2={30} />
      {rows.map((w, i) => (
        <Bar key={i} x={14} y={42 + i * 18} w={w} />
      ))}

      {/* Each row leaves the pile and lands under its head. */}
      {rows.map((w, i) => (
        <g
          key={`m${i}`}
          className="dg-travel"
          style={travel(300 + i * 520, 0, 0, 176, (target[i] - i) * 18 + 6)}
        >
          <Bar x={14} y={42 + i * 18} w={Math.min(w, 74)} tone="accent" />
        </g>
      ))}

      <Tag x={306} y={22} anchor="end">
        CLASSIFIED
      </Tag>
      <Rule x1={190} y1={30} x2={306} y2={30} />
      {heads.map((h, i) => (
        <g key={h}>
          <Tag x={190} y={52 + i * 34} tone="quiet">
            {h}
          </Tag>
          <Rule x1={190} y1={58 + i * 34} x2={306} y2={58 + i * 34} tone="faint" />
        </g>
      ))}

      <Value x={14} y={168} size={10} tone="quiet">
        1,284 rows
      </Value>
      <Value
        x={306}
        y={168}
        size={10}
        tone="accent"
        anchor="end"
        className="dg-appear"
        style={seq(2400)}
      >
        0 unclassified
      </Value>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* match — two independent records, line by line                        */
/* ------------------------------------------------------------------ */
export function MatchDiagram({ active }: P) {
  const rows = [0, 1, 2, 3];
  const y = (i: number) => 54 + i * 24;
  const unmatched = 2;

  return (
    <Frame
      active={active}
      cycle={5600}
      label="Two independent records compared line by line, with one line left unmatched"
    >
      <Tag x={14} y={28}>
        GSTR-2B
      </Tag>
      <Tag x={306} y={28} anchor="end">
        YOUR BOOKS
      </Tag>
      <Rule x1={14} y1={36} x2={110} y2={36} />
      <Rule x1={210} y1={36} x2={306} y2={36} />

      {rows.map((i) => (
        <g key={i}>
          <Bar x={14} y={y(i)} w={82} h={7} tone={i === unmatched ? 'caution' : 'context'} />
          {i === unmatched ? null : <Bar x={224} y={y(i)} w={82} h={7} />}
        </g>
      ))}

      {/* Lines trace between the pairs that agree. */}
      {rows
        .filter((i) => i !== unmatched)
        .map((i, n) => (
          <Trace key={i} d={`M 100 ${y(i) + 3.5} H 220`} delay={400 + n * 460} />
        ))}

      {/* The one that does not. */}
      <path
        d={`M 100 ${y(unmatched) + 3.5} H 186`}
        stroke="var(--caution)"
        strokeWidth="1.4"
        strokeDasharray="3 3"
        opacity="0.7"
      />
      <Flag cx={204} cy={y(unmatched) + 3.5} delay={0} />

      <Value x={14} y={168} size={10} tone="accent">
        3 matched
      </Value>
      <Value
        x={306}
        y={168}
        size={10}
        tone="caution"
        anchor="end"
        className="dg-flag dg-c"
        style={seq(200)}
      >
        1 unmatched
      </Value>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* chase — a supplier default, pursued until the credit lands           */
/* ------------------------------------------------------------------ */
export function ChaseDiagram({ active }: P) {
  return (
    <Frame
      active={active}
      cycle={6000}
      label="A reminder sent to a defaulting supplier, and the input credit returning"
    >
      <Panel x={14} y={40} w={84} h={54} />
      <Tag x={56} y={34} anchor="middle">
        YOU
      </Tag>
      <Panel x={222} y={40} w={84} h={54} tone="dashed" />
      <Tag x={264} y={34} anchor="middle">
        SUPPLIER
      </Tag>

      {/* Out: the reminder. Back: the credit. */}
      <Trace d="M 100 56 H 220" delay={200} tone="structure" dashed />
      <Chip x={104} y={49} delay={500} dx={94} tone="context" />
      <Tag x={160} y={44} anchor="middle" tone="quiet">
        REMINDER
      </Tag>

      <Trace d="M 220 84 H 100" delay={2400} />
      <Chip x={196} y={77} delay={2700} dx={-94} />
      <Tag x={160} y={106} anchor="middle" tone="accent" className="dg-appear" style={seq(2700)}>
        CREDIT RETURNED
      </Tag>

      {/* The ledger slot that was empty, filled. */}
      <Rule x1={14} y1={128} x2={306} y2={128} />
      <Tag x={14} y={146}>
        ITC LEDGER
      </Tag>
      <rect x={196} y={138} width={110} height={10} rx="1" fill="var(--hairline-strong)" />
      <g className="dg-grow dg-l" style={seq(3400)}>
        <rect x={196} y={138} width={110} height={10} rx="1" fill="var(--accent)" />
      </g>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* offset — credit applied against liability, and what is left to pay   */
/* ------------------------------------------------------------------ */
export function OffsetDiagram({ active }: P) {
  return (
    <Frame
      active={active}
      cycle={5600}
      label="Input credit set off against output liability, leaving the net amount payable"
    >
      <Tag x={14} y={30}>
        OUTPUT LIABILITY
      </Tag>
      <rect x={14} y={40} width={292} height={20} rx="2" fill="var(--ink-3)" fillOpacity="0.3" />
      <Value x={306} y={34} size={10} tone="quiet" anchor="end">
        4,18,600
      </Value>

      <Tag x={14} y={88}>
        CREDIT AVAILABLE
      </Tag>
      <rect x={14} y={98} width={214} height={20} rx="2" fill="var(--hairline-strong)" />
      <g className="dg-grow dg-l" style={seq(400)}>
        <rect x={14} y={98} width={214} height={20} rx="2" fill="var(--accent)" />
      </g>
      <Value x={306} y={92} size={10} tone="accent" anchor="end">
        3,06,400
      </Value>

      {/* The credit is consumed out of the liability, left to right. */}
      <g className="dg-grow dg-l" style={seq(1500)}>
        <rect
          x={14}
          y={40}
          width={214}
          height={20}
          rx="2"
          fill="var(--accent)"
          fillOpacity="0.22"
        />
      </g>
      <path d="M 228 64 V 94" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="2 3" />

      <Rule x1={14} y1={140} x2={306} y2={140} />
      <Tag x={14} y={162} tone="ink">
        NET PAYABLE
      </Tag>
      <Value
        x={306}
        y={164}
        size={14}
        tone="accent"
        anchor="end"
        className="dg-appear"
        style={seq(2600)}
      >
        1,12,200
      </Value>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* archive — papers indexed now so one can be pulled later              */
/* ------------------------------------------------------------------ */
export function ArchiveDiagram({ active }: P) {
  const sheets = [0, 1, 2, 3];
  return (
    <Frame
      active={active}
      cycle={6000}
      label="Working papers filed into an indexed folder, and one retrieved later"
    >
      <Tag x={14} y={26}>
        WORKING PAPERS
      </Tag>

      {/* Sheets settle into the stack. */}
      {sheets.map((i) => (
        <g
          key={i}
          className="dg-appear"
          style={seq(200 + i * 380, { ['--fy' as string]: '-14px' })}
        >
          <rect
            x={20 + i * 5}
            y={44 + i * 13}
            width={116}
            height={11}
            rx="1.5"
            fill="var(--surface)"
            stroke="var(--hairline-strong)"
            strokeWidth="1"
          />
          <Bar x={26 + i * 5} y={47 + i * 13} w={62 - i * 6} h={4} />
        </g>
      ))}

      {/* Indexed, with a tab per year. */}
      <Panel x={186} y={40} w={120} h={82} />
      <Tag x={246} y={32} anchor="middle">
        INDEXED
      </Tag>
      {['AY 23', 'AY 24', 'AY 25'].map((t, i) => (
        <g key={t} className="dg-appear" style={seq(1700 + i * 300)}>
          <rect
            x={198}
            y={54 + i * 22}
            width={40}
            height={13}
            rx="1.5"
            fill="var(--accent)"
            fillOpacity={i === 1 ? 1 : 0.25}
          />
          <Bar x={246} y={57 + i * 22} w={48} h={6} tone={i === 1 ? 'accent' : 'context'} />
        </g>
      ))}
      <Trace d="M 142 92 H 184" delay={1500} />

      {/* Fourteen months on, one comes back out. */}
      <Rule x1={14} y1={142} x2={306} y2={142} />
      <Chip x={198} y={150} delay={3400} dx={-150} />
      <Tag x={14} y={136} tone="accent" className="dg-appear" style={seq(3400)}>
        RETRIEVED ON NOTICE
      </Tag>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* inspect — a document read closely, one clause located                */
/* ------------------------------------------------------------------ */
export function InspectDiagram({ active }: P) {
  const lines = [124, 106, 132, 96, 120, 112, 84];
  const hit = 3;
  return (
    <Frame
      active={active}
      cycle={5600}
      label="A notice read line by line until the operative clause is located"
    >
      {/* The notice sits right, leaving a real column for the finding rather
          than a few units of margin that long words ran straight out of. */}
      <rect
        x={124}
        y={14}
        width={182}
        height={148}
        rx="2"
        fill="var(--surface)"
        stroke="var(--hairline-strong)"
        strokeWidth="1"
      />
      {lines.map((w, i) => (
        <Bar key={i} x={138} y={34 + i * 18} w={w} h={5} tone={i === hit ? 'accent' : 'context'} />
      ))}

      {/* The reading head. */}
      <g
        className="dg-sweep"
        style={seq(200, { ['--fy' as string]: '0px', ['--ty' as string]: '90px' })}
      >
        <rect x={124} y={28} width={182} height={14} fill="var(--accent)" fillOpacity="0.1" />
        <line x1={124} y1={42} x2={306} y2={42} stroke="var(--accent)" strokeWidth="1" />
      </g>

      {/* What it found. 20 units of leading, left aligned in its own column. */}
      <g className="dg-appear" style={seq(2600)}>
        <path d="M 118 82 h -6 v 24 h 6" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
        <Tag x={14} y={80} tone="accent">
          s.148
        </Tag>
        <Tag x={14} y={100}>
          LIMITATION
        </Tag>
        <Tag x={14} y={120}>
          EXPIRED
        </Tag>
      </g>

      <Tag x={14} y={158}>
        7 OF 7 READ
      </Tag>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* assemble — scattered evidence becomes one submission                 */
/* ------------------------------------------------------------------ */
export function AssembleDiagram({ active }: P) {
  const pieces = [
    { x: 14, y: 26, w: 62, label: 'LEDGERS', dx: 108, dy: 30 },
    { x: 14, y: 122, w: 62, label: 'BANK', dx: 108, dy: -48 },
    { x: 246, y: 26, w: 60, label: 'CONTRACTS', dx: -114, dy: 48 },
    { x: 246, y: 122, w: 60, label: 'CASE LAW', dx: -114, dy: -30 },
  ];
  return (
    <Frame
      active={active}
      cycle={6000}
      label="Separate pieces of evidence assembled into a single submission"
    >
      {/* The submission being built. */}
      <rect
        x={116}
        y={40}
        width={88}
        height={96}
        rx="2"
        fill="var(--surface)"
        stroke="var(--accent)"
        strokeWidth="1.3"
      />
      <Tag x={160} y={32} anchor="middle" tone="accent">
        SUBMISSION
      </Tag>

      {pieces.map((p, i) => (
        <g key={p.label}>
          <Tag x={p.x + (p.x > 160 ? p.w : 0)} y={p.y - 6} anchor={p.x > 160 ? 'end' : 'start'}>
            {p.label}
          </Tag>
          <rect
            x={p.x}
            y={p.y}
            width={p.w}
            height={20}
            rx="2"
            fill="var(--ink-3)"
            fillOpacity="0.22"
          />
          <g className="dg-travel" style={travel(300 + i * 560, 0, 0, p.dx, p.dy)}>
            <rect x={p.x} y={p.y} width={p.w} height={20} rx="2" fill="var(--accent)" />
          </g>
        </g>
      ))}

      {/* Rows landing in the document. */}
      {[0, 1, 2, 3].map((i) => (
        <Bar
          key={i}
          x={128}
          y={56 + i * 20}
          w={64 - (i % 2) * 14}
          h={5}
          tone="accent"
          className="dg-appear"
          style={seq(900 + i * 560)}
        />
      ))}
      <Value x={160} y={158} size={10} tone="quiet" anchor="middle">
        1 file · 4 sources
      </Value>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* compare — two regimes, and the cost of choosing wrong                */
/* ------------------------------------------------------------------ */
export function CompareDiagram({ active }: P) {
  const BASE = 146;
  const cols = [
    { x: 46, label: 'OLD REGIME', h: 60, value: '3,64,000', win: false },
    { x: 190, label: 'NEW REGIME', h: 40, value: '3,15,800', win: true },
  ];
  return (
    <Frame
      active={active}
      cycle={5600}
      label="Two tax regimes computed side by side, with the cheaper one and the difference"
    >
      {/* The saving gets its own band across the top, separated by a rule.
          Sharing the upper area with the taller bar's figure put the two
          numbers on top of each other once the small-screen scale was applied. */}
      <g className="dg-appear" style={seq(1900)}>
        <Tag x={14} y={20}>
          DIFFERENCE
        </Tag>
        <Value x={14} y={52} size={13} tone="accent">
          −48,200
        </Value>
      </g>
      <Pass cx={286} cy={32} delay={1600} r={11} />
      <Rule x1={14} y1={64} x2={306} y2={64} />

      <Rule x1={14} y1={BASE} x2={306} y2={BASE} />
      {cols.map((c, i) => (
        <g key={c.label}>
          <g
            className="dg-grow"
            style={
              {
                ...seq(300 + i * 420),
                transformBox: 'fill-box',
                transformOrigin: 'center bottom',
              } as React.CSSProperties
            }
          >
            <rect
              x={c.x}
              y={BASE - c.h}
              width={84}
              height={c.h}
              rx="2"
              fill={c.win ? 'var(--accent)' : 'var(--ink-3)'}
              fillOpacity={c.win ? 1 : 0.28}
            />
          </g>
          <Value
            x={c.x + 42}
            y={BASE - c.h - 8}
            size={11}
            anchor="middle"
            tone={c.win ? 'accent' : 'quiet'}
          >
            {c.value}
          </Value>
          <Tag x={c.x + 42} y={166} anchor="middle" tone={c.win ? 'ink' : 'quiet'}>
            {c.label}
          </Tag>
        </g>
      ))}
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* structure — entities arranged deliberately, not by accident          */
/* ------------------------------------------------------------------ */
export function StructureDiagram({ active }: P) {
  const kids = [
    { x: 20, label: 'OPERATIONS' },
    { x: 124, label: 'IP' },
    { x: 228, label: 'PROPERTY' },
  ];
  return (
    <Frame
      active={active}
      cycle={5800}
      label="A holding entity with three subsidiaries arranged beneath it"
    >
      <rect x={116} y={20} width={88} height={30} rx="3" fill="var(--accent)" />
      <Tag x={160} y={39} anchor="middle" style={{ fill: 'var(--accent-ink)' }}>
        HOLDING
      </Tag>

      <Trace d="M 160 50 V 74" delay={300} />
      <Trace d="M 62 74 H 258" delay={700} tone="structure" />

      {kids.map((k, i) => (
        <g key={k.label}>
          <Trace d={`M ${k.x + 36} 74 V 100`} delay={1100 + i * 320} />
          <g className="dg-appear" style={seq(1400 + i * 320)}>
            <rect
              x={k.x}
              y={100}
              width={72}
              height={30}
              rx="3"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.2"
            />
            <Tag x={k.x + 36} y={119} anchor="middle" tone="accent">
              {k.label}
            </Tag>
          </g>
          <Tag x={k.x + 36} y={152} anchor="middle">
            {['PVT LTD', 'LLP', 'PVT LTD'][i]}
          </Tag>
        </g>
      ))}
    </Frame>
  );
}

/* ------------------------------------------------------------------ */

export const DIAGRAMS = {
  normalise: NormaliseDiagram,
  match: MatchDiagram,
  chase: ChaseDiagram,
  offset: OffsetDiagram,
  archive: ArchiveDiagram,
  inspect: InspectDiagram,
  assemble: AssembleDiagram,
  compare: CompareDiagram,
  structure: StructureDiagram,
} as const;

export type DiagramKey = keyof typeof DIAGRAMS;
