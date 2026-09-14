/**
 * One drawing per service.
 *
 * Twenty-two of them, each showing the mechanism of the thing rather than
 * decorating it: what goes in, what happens to it, what comes out. The service
 * title sits directly beside the drawing, so these carry at most a couple of
 * labels — the drawing does not need to name itself.
 *
 * Two decisions worth stating, because they are the difference between this
 * helping and this being a page full of noise:
 *
 * 1. They play once as you scroll to them and then hold. Twenty-two looping
 *    animations on one page would fight each other and fight the reader; the
 *    held final frame is the part that explains anything. Same rule as the
 *    practice marks.
 *
 * 2. The frame is 200x96, not the 320x176 used elsewhere. A small frame in a
 *    wide column is magnified rather than shrunk, so these opt out of the
 *    small-screen type boost — `.dg-mini` pins the scale at 1 — and the type
 *    is authored smaller to compensate.
 *
 * Server rendered, no client JavaScript, settle to the finished state under
 * prefers-reduced-motion.
 */

const W = 200;
const H = 96;

type P = { className?: string };

/** Sequencing for one piece of a drawing. */
function at(ms: number, fy = 6, fx = 0): React.CSSProperties {
  return {
    ['--d' as string]: `${ms}ms`,
    ['--fy' as string]: `${fy}px`,
    ['--fx' as string]: `${fx}px`,
  } as React.CSSProperties;
}

function Frame({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`dg-mini h-auto w-full ${className ?? ''}`}
      role="img"
      aria-label={label}
    >
      {children}
    </svg>
  );
}

/** Caption. Small — the service title is right next to it. */
function T({
  x,
  y,
  children,
  anchor = 'start',
  tone = 'quiet',
  delay,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  tone?: 'quiet' | 'accent' | 'caution' | 'ink' | 'onAccent';
  delay?: number;
}) {
  const fill = {
    quiet: 'var(--ink-2)',
    accent: 'var(--accent)',
    caution: 'var(--caution)',
    ink: 'var(--ink)',
    onAccent: 'var(--accent-ink)',
  }[tone];
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      textAnchor={anchor}
      letterSpacing="0.7"
      data-dg-fs=""
      className={delay === undefined ? undefined : 'dg-once'}
      style={{
        fontFamily: 'var(--font-sans)',
        ['--dg-fs' as string]: 7,
        ...(delay === undefined ? {} : at(delay)),
      }}
    >
      {children}
    </text>
  );
}

/** A row of data. Context by default, the subject in the accent. */
function B({
  x,
  y,
  w,
  h = 5,
  tone = 'ctx',
  delay,
  fx = 0,
  fy = 6,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  tone?: 'ctx' | 'accent' | 'caution' | 'onAccent';
  delay?: number;
  fx?: number;
  fy?: number;
}) {
  const fill = {
    ctx: 'var(--ink-3)',
    accent: 'var(--accent)',
    caution: 'var(--caution)',
    onAccent: 'var(--accent-ink)',
  }[tone];
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="1"
      fill={fill}
      fillOpacity={tone === 'ctx' ? 0.28 : tone === 'onAccent' ? 0.8 : 1}
      className={delay === undefined ? undefined : 'dg-once'}
      style={delay === undefined ? undefined : at(delay, fy, fx)}
    />
  );
}

/** A container: a document, a box, a stage. */
function Box({
  x,
  y,
  w,
  h,
  tone = 'plain',
  delay,
  fy = 6,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: 'plain' | 'dashed' | 'accent' | 'solid';
  delay?: number;
  fy?: number;
}) {
  const p =
    tone === 'accent'
      ? { fill: 'var(--accent)', fillOpacity: 0.08, stroke: 'var(--accent)', strokeWidth: 1 }
      : tone === 'dashed'
        ? { fill: 'none', stroke: 'var(--hairline-strong)', strokeWidth: 1, strokeDasharray: '3 3' }
        : tone === 'solid'
          ? { fill: 'var(--accent)', stroke: 'none' }
          : { fill: 'var(--surface)', stroke: 'var(--hairline-strong)', strokeWidth: 1 };
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="2"
      className={delay === undefined ? undefined : 'dg-once'}
      style={delay === undefined ? undefined : at(delay, fy)}
      {...p}
    />
  );
}

/** A connector that draws itself on. */
function Line({
  d,
  delay,
  tone = 'accent',
  dashed,
}: {
  d: string;
  delay: number;
  tone?: 'accent' | 'quiet' | 'caution';
  dashed?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={
        tone === 'accent'
          ? 'var(--accent)'
          : tone === 'caution'
            ? 'var(--caution)'
            : 'var(--hairline-strong)'
      }
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={dashed ? '0.03 0.04' : '1'}
      className="dg-once-trace"
      style={at(delay)}
    />
  );
}

/** A tick in a ring — accepted, cleared, passed. */
function Tick({ cx, cy, delay, r = 11 }: { cx: number; cy: number; delay: number; r?: number }) {
  return (
    <g className="dg-once" style={at(delay, 0)}>
      <circle cx={cx} cy={cy} r={r} fill="var(--ground)" stroke="var(--accent)" strokeWidth="1.2" />
      <path
        d={`M ${cx - r * 0.4} ${cy} l ${r * 0.27} ${r * 0.29} l ${r * 0.55} -${r * 0.6}`}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/* ================================================================== */
/* Tax Architecture & GST                                             */
/* ================================================================== */

/** Several income sources resolving into one return. */
function IncomeTaxFiling({ className }: P) {
  const sources = ['SALARY', 'CAPITAL', 'OTHER'];
  return (
    <Frame
      className={className}
      label="Separate income sources gathered into a single return and acknowledged"
    >
      {sources.map((s, i) => (
        <g key={s}>
          <B x={10} y={18 + i * 22} w={40} h={12} delay={i * 110} fx={-8} />
          <T x={14} y={27 + i * 22}>
            {s}
          </T>
          <Line d={`M 54 ${24 + i * 22} H 84`} delay={220 + i * 110} tone="quiet" dashed />
        </g>
      ))}
      <Box x={88} y={14} w={56} h={68} delay={560} />
      <T x={116} y={28} anchor="middle" tone="accent" delay={640}>
        ITR
      </T>
      {[0, 1, 2].map((i) => (
        <B key={i} x={96} y={38 + i * 12} w={40 - i * 8} tone="accent" delay={700 + i * 90} />
      ))}
      <Tick cx={172} cy={48} delay={1060} />
    </Frame>
  );
}

/** Three monthly returns feeding the annual one. */
function MasterGst({ className }: P) {
  const months = Array.from({ length: 12 }, (_, i) => i);
  return (
    <Frame
      className={className}
      label="Monthly GST returns filed through the year, reconciled into the annual return"
    >
      <T x={10} y={16}>
        GSTR-1 · 3B, MONTHLY
      </T>
      {months.map((m) => (
        <rect
          key={`c${m}`}
          x={10 + m * 13.2}
          y={24}
          width={11}
          height={16}
          rx="1.5"
          fill="var(--accent)"
          fillOpacity={0.3 + (m % 3) * 0.14}
          className="dg-once"
          style={at(m * 60, 5)}
        />
      ))}
      <Line d="M 100 46 V 58" delay={820} />
      <Box x={62} y={58} w={76} h={26} tone="accent" delay={900} />
      <T x={100} y={74} anchor="middle" tone="accent" delay={960}>
        GSTR-9 · 9C
      </T>
    </Frame>
  );
}

/** Goods crossing the border without tax blocking them. */
function ExportImport({ className }: P) {
  return (
    <Frame
      className={className}
      label="Goods clearing the border under a letter of undertaking, with no tax paid up front"
    >
      <T x={10} y={16}>
        YOUR GOODS
      </T>
      <Box x={10} y={22} w={44} h={30} delay={0} />
      <B x={18} y={32} w={28} tone="accent" delay={120} />
      <B x={18} y={41} w={20} tone="accent" delay={200} />

      {/* The border. */}
      <path
        d="M 100 16 V 80"
        stroke="var(--hairline-strong)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <T x={100} y={11} anchor="middle">
        CUSTOMS
      </T>

      {/* The undertaking that lets it through. */}
      <g className="dg-once" style={at(420, 0)}>
        <rect x={82} y={24} width={36} height={16} rx="2" fill="var(--accent)" />
        <text
          x={100}
          y={35}
          fill="var(--accent-ink)"
          textAnchor="middle"
          letterSpacing="0.7"
          data-dg-fs=""
          style={{ fontFamily: 'var(--font-sans)', ['--dg-fs' as string]: 7 }}
        >
          LUT
        </text>
      </g>

      <Line d="M 58 60 H 142" delay={620} />
      <Box x={146} y={44} w={44} h={30} delay={860} />
      <T x={112} y={90}>
        NO TAX BLOCKED
      </T>
    </Frame>
  );
}

/* ================================================================== */
/* Scrutiny Defence & Appeals                                         */
/* ================================================================== */

/** A notice in, the documents it asks for out. */
function Sec143142({ className }: P) {
  return (
    <Frame
      className={className}
      label="A notice received, the documents it asks for gathered and returned within the deadline"
    >
      <Box x={10} y={14} w={48} h={40} delay={0} />
      <B x={16} y={22} w={30} tone="caution" delay={90} />
      <B x={16} y={31} w={36} delay={150} />
      <B x={16} y={40} w={24} delay={210} />
      <T x={10} y={66} tone="caution">
        NOTICE
      </T>

      <Line d="M 62 34 H 88" delay={320} tone="quiet" />

      {[0, 1, 2].map((i) => (
        <B
          key={i}
          x={92}
          y={16 + i * 14}
          w={36}
          h={10}
          tone="accent"
          delay={480 + i * 120}
          fy={8}
        />
      ))}
      <T x={92} y={72}>
        DOCUMENTS PRODUCED
      </T>

      <Line d="M 132 34 H 158" delay={880} />
      <Tick cx={176} cy={34} delay={1000} />
    </Frame>
  );
}

/** A closed year reopened, and pushed back. */
function Sec148({ className }: P) {
  const years = [0, 1, 2, 3, 4];
  return (
    <Frame
      className={className}
      label="A previously closed assessment year reopened, and the reassessment resisted on the record"
    >
      <T x={10} y={16}>
        CLOSED YEARS
      </T>
      {years.map((y) => (
        <rect
          key={y}
          x={10 + y * 26}
          y={22}
          width={20}
          height={18}
          rx="2"
          fill="var(--ink-3)"
          fillOpacity={y === 1 ? 0 : 0.22}
          stroke={y === 1 ? 'var(--caution)' : 'none'}
          strokeWidth="1.2"
          className="dg-once"
          style={at(y * 90)}
        />
      ))}
      {/* The one they came back for. */}
      <g className="dg-once" style={at(560, 0)}>
        <path d="M 46 46 V 58" stroke="var(--caution)" strokeWidth="1.2" strokeDasharray="2 2" />
        <T x={36} y={70} tone="caution">
          REOPENED
        </T>
      </g>
      <Line d="M 96 64 H 140" delay={760} />
      <Box x={144} y={50} w={46} h={28} tone="accent" delay={900} />
      <T x={167} y={68} anchor="middle" tone="accent" delay={960}>
        DEFENDED
      </T>
    </Frame>
  );
}

/** A demand reduced, and held while it is argued. */
function DemandPenalty({ className }: P) {
  return (
    <Frame
      className={className}
      label="A tax demand argued down, with recovery stayed while it is contested"
    >
      <T x={10} y={16}>
        DEMAND RAISED
      </T>
      <rect x={10} y={22} width={130} height={18} rx="2" fill="var(--caution)" fillOpacity="0.75" />
      <T x={146} y={35} tone="caution">
        FULL
      </T>

      {/* Reduced. */}
      <g
        className="dg-once"
        style={
          {
            ...at(420, 0),
            transformBox: 'fill-box',
            transformOrigin: 'left center',
          } as React.CSSProperties
        }
      >
        <rect x={10} y={48} width={54} height={18} rx="2" fill="var(--accent)" />
      </g>
      <T x={70} y={61} tone="accent" delay={520}>
        AFTER DEFENCE
      </T>

      {/* Held while argued. */}
      <g className="dg-once" style={at(760)}>
        <path d="M 10 78 H 190" stroke="var(--hairline-strong)" strokeWidth="1" />
        <T x={10} y={92}>
          RECOVERY STAYED MEANWHILE
        </T>
      </g>
    </Frame>
  );
}

/** An order escalated, and a refund coming back. */
function Appeals({ className }: P) {
  const steps = [
    { x: 10, label: 'ORDER' },
    { x: 76, label: 'CIT(A)' },
    { x: 142, label: 'RELIEF' },
  ];
  return (
    <Frame
      className={className}
      label="An adverse order taken to first appeal, and the refund recovered"
    >
      {steps.map((s, i) => (
        <g key={s.label}>
          <Box
            x={s.x}
            y={20 - i * 4}
            w={48}
            h={26}
            tone={i === 2 ? 'accent' : 'plain'}
            delay={i * 220}
          />
          <T
            x={s.x + 24}
            y={36 - i * 4}
            anchor="middle"
            tone={i === 2 ? 'accent' : 'quiet'}
            delay={i * 220 + 60}
          >
            {s.label}
          </T>
          {i < 2 ? (
            <Line d={`M ${s.x + 52} ${33 - i * 4} H ${s.x + 62}`} delay={140 + i * 220} />
          ) : null}
        </g>
      ))}
      <Line d="M 166 50 V 66 H 34" delay={700} />
      <g className="dg-once" style={at(980, 0)}>
        <rect x={10} y={60} width={22} height={13} rx="2" fill="var(--accent)" />
      </g>
      <T x={10} y={88} tone="accent">
        REFUND RECOVERED
      </T>
    </Frame>
  );
}

/* ================================================================== */
/* Structuring & Incorporation                                        */
/* ================================================================== */

/** Papers in, a registered company out. */
function CompanyIncorporation({ className }: P) {
  return (
    <Frame
      className={className}
      label="Founder documents filed and a registered company issued with its identification number"
    >
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Box x={10} y={12 + i * 26} w={40} h={20} delay={i * 110} />
          <B x={16} y={20 + i * 26} w={24} delay={i * 110 + 70} />
        </g>
      ))}
      <T x={10} y={94}>
        DIN · DSC · MOA
      </T>
      <Line d="M 54 46 H 86" delay={420} tone="quiet" dashed />
      <Box x={90} y={20} w={64} h={52} tone="accent" delay={620} />
      <T x={122} y={38} anchor="middle" tone="accent" delay={700}>
        CERTIFICATE
      </T>
      <B x={100} y={46} w={44} tone="accent" delay={780} />
      <B x={100} y={55} w={30} tone="accent" delay={840} />
      <Tick cx={176} cy={46} delay={980} />
    </Frame>
  );
}

/** One owner, and the registrations that make it trade. */
function Proprietorship({ className }: P) {
  const regs = ['GST', 'MSME', 'BANK'];
  return (
    <Frame className={className} label="A sole owner set up with the registrations needed to trade">
      <g className="dg-once" style={at(0, 0)}>
        <circle cx={32} cy={40} r={13} fill="var(--accent)" />
        <circle cx={32} cy={35} r={4.4} fill="var(--accent-ink)" />
        <path d="M 24 50 a 8 8 0 0 1 16 0" fill="var(--accent-ink)" />
      </g>
      <T x={32} y={70} anchor="middle">
        ONE OWNER
      </T>
      {regs.map((r, i) => (
        <g key={r}>
          <Line d={`M 48 40 C 70 40 72 ${20 + i * 24} 94 ${20 + i * 24}`} delay={260 + i * 150} />
          <Box x={98} y={12 + i * 24} w={60} h={18} delay={420 + i * 150} />
          <T x={128} y={24 + i * 24} anchor="middle" delay={480 + i * 150}>
            {r}
          </T>
        </g>
      ))}
    </Frame>
  );
}

/** Partners, and the deed that binds them. */
function Partnership({ className }: P) {
  return (
    <Frame
      className={className}
      label="Partners and their agreed shares recorded in a registered deed"
    >
      {[0, 1].map((i) => (
        <g key={i} className="dg-once" style={at(i * 160, 0)}>
          <circle
            cx={24}
            cy={26 + i * 44}
            r={11}
            fill="var(--accent)"
            fillOpacity={0.85 - i * 0.25}
          />
        </g>
      ))}
      <T x={24} y={92} anchor="middle">
        PARTNERS
      </T>
      <Line d="M 38 26 C 58 26 58 48 76 48" delay={300} />
      <Line d="M 38 70 C 58 70 58 48 76 48" delay={380} />
      <Box x={80} y={16} w={68} h={64} delay={600} />
      <T x={114} y={32} anchor="middle" tone="accent" delay={680}>
        DEED
      </T>
      {[0, 1, 2].map((i) => (
        <B key={i} x={88} y={42 + i * 12} w={52 - i * 10} tone="accent" delay={740 + i * 90} />
      ))}
      <Tick cx={172} cy={48} delay={1050} />
    </Frame>
  );
}

/** Projections a lender will accept. */
function ProjectReports({ className }: P) {
  const bars = [18, 28, 24, 38, 46, 58];
  return (
    <Frame
      className={className}
      label="Financial projections built into a report a lender will accept"
    >
      <T x={10} y={16}>
        PROJECTIONS
      </T>
      <path d="M 10 74 H 104" stroke="var(--hairline-strong)" strokeWidth="1" />
      {bars.map((h, i) => (
        <g
          key={i}
          className="dg-once"
          style={
            {
              ...at(i * 100, 0),
              transformBox: 'fill-box',
              transformOrigin: 'center bottom',
            } as React.CSSProperties
          }
        >
          <rect
            x={12 + i * 16}
            y={74 - h}
            width={12}
            height={h}
            rx="1"
            fill="var(--accent)"
            fillOpacity={0.4 + i * 0.1}
          />
        </g>
      ))}
      <Line d="M 110 46 H 130" delay={680} tone="quiet" />
      <Box x={134} y={20} w={56} h={52} delay={800} />
      <T x={162} y={38} anchor="middle" tone="accent" delay={880}>
        REPORT
      </T>
      <Tick cx={162} cy={58} delay={1020} r={9} />
    </Frame>
  );
}

export const TAX_SET = { IncomeTaxFiling, MasterGst, ExportImport };
export const SCRUTINY_SET = { Sec143142, Sec148, DemandPenalty, Appeals };
export const STRUCTURE_SET = {
  CompanyIncorporation,
  Proprietorship,
  Partnership,
  ProjectReports,
};

export { at, Frame, T, B, Box, Line, Tick };
