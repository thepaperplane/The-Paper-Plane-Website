import { B, Box, Frame, Line, T, Tick, at } from '@/components/services/service-diagrams';

/**
 * Service drawings, second half: books, technology and design.
 *
 * Split from the first file only for length — same frame, same kit, same rule
 * that each drawing shows the mechanism rather than decorating the entry.
 *
 * The technology and design drawings are deliberately the plainest of the set.
 * Someone choosing a web developer is not shopping for a rendering strategy,
 * so these show a page being laid out, a person signing in, an invoice being
 * paid — not an architecture.
 */

type P = { className?: string };

/* ================================================================== */
/* Books & Audit Readiness                                            */
/* ================================================================== */

/** The month closed: vouchers matched, bank agreed, month ticked. */
function Bookkeeping({ className }: P) {
  const rows = [0, 1, 2];
  return (
    <Frame
      className={className}
      label="Vouchers matched against the bank and posted to the ledger, and the month closed"
    >
      <T x={10} y={14}>
        VOUCHERS
      </T>
      {rows.map((i) => (
        <B key={i} x={10} y={20 + i * 15} w={38 - (i % 2) * 8} h={10} delay={i * 110} fx={-8} />
      ))}

      <T x={72} y={14} tone="accent">
        BANK
      </T>
      {rows.map((i) => (
        <B key={i} x={72} y={20 + i * 15} w={34} h={10} tone="accent" delay={i * 110 + 60} fx={8} />
      ))}

      {/* Each pair agreed. */}
      {rows.map((i) => (
        <Line key={i} d={`M 52 ${25 + i * 15} H 68`} delay={340 + i * 110} />
      ))}

      <path d="M 10 74 H 190" stroke="var(--hairline-strong)" strokeWidth="1" />
      <T x={10} y={90}>
        MONTH CLOSED
      </T>
      <Tick cx={168} cy={40} delay={800} />
      <B x={120} y={82} w={68} h={6} tone="accent" delay={950} />
    </Frame>
  );
}

/** A sample pulled from the whole, and what it turns up. */
function InternalAudit({ className }: P) {
  const grid = Array.from({ length: 24 }, (_, i) => i);
  const picked = new Set([3, 9, 14, 20]);
  const flagged = 14;
  return (
    <Frame
      className={className}
      label="A sample of entries tested against the whole population, with the exceptions flagged"
    >
      <T x={10} y={14}>
        ALL ENTRIES
      </T>
      {grid.map((i) => {
        const col = i % 8;
        const row = Math.floor(i / 8);
        const isPicked = picked.has(i);
        return (
          <rect
            key={i}
            x={10 + col * 13}
            y={20 + row * 13}
            width={9}
            height={9}
            rx="1"
            fill={i === flagged ? 'var(--caution)' : isPicked ? 'var(--accent)' : 'var(--ink-3)'}
            fillOpacity={i === flagged || isPicked ? 1 : 0.2}
            className={isPicked ? 'dg-once' : undefined}
            style={isPicked ? at(300 + (i % 5) * 130, 0) : undefined}
          />
        );
      })}
      <T x={10} y={80}>
        SAMPLE TESTED
      </T>

      <Line d="M 118 40 H 138" delay={760} tone="quiet" />
      <Box x={142} y={22} w={48} h={40} delay={860} />
      <T x={166} y={36} anchor="middle" tone="caution" delay={940}>
        1 EXCEPTION
      </T>
      <B x={150} y={44} w={32} tone="caution" delay={1000} />
      <B x={150} y={52} w={22} delay={1050} />
    </Frame>
  );
}

/** Old books moved across without losing the history. */
function AccountingSystems({ className }: P) {
  return (
    <Frame
      className={className}
      label="Existing books migrated into new accounting software with the history intact"
    >
      <Box x={10} y={20} w={58} h={50} tone="dashed" delay={0} />
      <T x={39} y={16} anchor="middle">
        OLD BOOKS
      </T>
      {[0, 1, 2, 3].map((i) => (
        <B key={i} x={18} y={28 + i * 11} w={42 - (i % 2) * 10} delay={i * 90} />
      ))}

      {/* Moving across, row by row. */}
      {[0, 1, 2].map((i) => (
        <g key={i} className="dg-once" style={at(420 + i * 150, 0, -46)}>
          <rect x={86} y={32 + i * 12} width={28} height={7} rx="1" fill="var(--accent)" />
        </g>
      ))}

      <Box x={132} y={20} w={58} h={50} tone="accent" delay={700} />
      <T x={161} y={16} anchor="middle" tone="accent">
        NEW SYSTEM
      </T>
      {[0, 1, 2, 3].map((i) => (
        <B
          key={i}
          x={140}
          y={28 + i * 11}
          w={42 - (i % 2) * 10}
          tone="accent"
          delay={820 + i * 90}
        />
      ))}
      <T x={10} y={88}>
        NOTHING LOST IN THE MOVE
      </T>
    </Frame>
  );
}

/** Gross pay split into what is kept and what is filed. */
function PayrollHrms({ className }: P) {
  const parts = [
    { w: 64, tone: 'accent' as const, label: 'NET PAY' },
    { w: 22, tone: 'ctx' as const, label: 'PF' },
    { w: 18, tone: 'ctx' as const, label: 'ESI' },
    { w: 26, tone: 'ctx' as const, label: 'TDS' },
  ];
  let x = 10;
  return (
    <Frame
      className={className}
      label="Gross salary split into take-home pay and the statutory deductions filed each month"
    >
      <T x={10} y={16}>
        GROSS SALARY
      </T>
      <rect x={10} y={22} width={180} height={14} rx="2" fill="var(--ink-3)" fillOpacity="0.22" />

      {parts.map((p, i) => {
        const el = (
          <g key={p.label}>
            <rect
              x={x}
              y={44}
              width={p.w}
              height={16}
              rx="2"
              fill={p.tone === 'accent' ? 'var(--accent)' : 'var(--ink-3)'}
              fillOpacity={p.tone === 'accent' ? 1 : 0.3}
              className="dg-once"
              style={at(200 + i * 140, 0, -10)}
            />
            <T x={x + p.w / 2} y={72} anchor="middle" tone={i === 0 ? 'accent' : 'quiet'}>
              {p.label}
            </T>
          </g>
        );
        x += p.w + 6;
        return el;
      })}

      <Line d="M 10 82 H 190" delay={820} tone="quiet" dashed />
      <T x={10} y={94}>
        PAYSLIP OUT, RETURNS FILED
      </T>
    </Frame>
  );
}

/* ================================================================== */
/* Digital Infrastructure                                             */
/* ================================================================== */

/** A page laying itself out, and holding up on a phone. */
function WebDesign({ className }: P) {
  return (
    <Frame
      className={className}
      label="A page laid out once and holding its shape on a large screen and a phone"
    >
      {/* Desktop. */}
      <Box x={10} y={14} w={118} h={68} delay={0} />
      <rect x={10} y={14} width={118} height={10} rx="2" fill="var(--accent)" />
      <B x={20} y={32} w={60} h={8} tone="accent" delay={160} />
      <B x={20} y={46} w={94} delay={260} />
      <B x={20} y={55} w={76} delay={320} />
      <B x={20} y={64} w={86} delay={380} />

      {/* Phone, same page. */}
      <Box x={140} y={14} w={34} h={68} delay={520} />
      <rect x={140} y={14} width={34} height={8} rx="2" fill="var(--accent)" />
      <B x={146} y={30} w={22} h={6} tone="accent" delay={620} />
      <B x={146} y={42} w={22} delay={680} />
      <B x={146} y={50} w={16} delay={720} />
      <B x={146} y={58} w={20} delay={760} />

      <T x={10} y={94}>
        ONE DESIGN, EVERY SCREEN
      </T>
    </Frame>
  );
}

/** Different people, different views of the same system. */
function WebApps({ className }: P) {
  const people = [
    { y: 16, label: 'OWNER', w: 76 },
    { y: 40, label: 'STAFF', w: 52 },
    { y: 64, label: 'CLIENT', w: 34 },
  ];
  return (
    <Frame
      className={className}
      label="One system where the owner, staff and clients each sign in and see only their own part"
    >
      {people.map((p, i) => (
        <g key={p.label}>
          <g className="dg-once" style={at(i * 170, 0)}>
            <circle cx={20} cy={p.y + 8} r={7} fill="var(--accent)" fillOpacity={0.9 - i * 0.22} />
          </g>
          <T x={32} y={p.y + 11}>
            {p.label}
          </T>
          <Line d={`M 76 ${p.y + 8} H 100`} delay={200 + i * 170} tone="quiet" />
          <rect
            x={104}
            y={p.y + 2}
            width={p.w}
            height={13}
            rx="2"
            fill="var(--accent)"
            fillOpacity={0.16}
            stroke="var(--accent)"
            strokeWidth="1"
            className="dg-once"
            style={at(380 + i * 170, 0, -12)}
          />
        </g>
      ))}
      <T x={10} y={94}>
        EACH SEES ONLY THEIR OWN
      </T>
    </Frame>
  );
}

/** An invoice going out and the money coming back. */
function FinancialSaas({ className }: P) {
  return (
    <Frame
      className={className}
      label="An invoice issued, paid by card or UPI, and marked off automatically"
    >
      <Box x={10} y={14} w={52} h={54} delay={0} />
      <T x={36} y={28} anchor="middle" tone="accent" delay={80}>
        INVOICE
      </T>
      <B x={18} y={36} w={36} tone="accent" delay={150} />
      <B x={18} y={45} w={26} delay={200} />
      <B x={18} y={54} w={32} delay={250} />

      <Line d="M 66 40 H 92" delay={380} />

      {['CARD', 'UPI'].map((m, i) => (
        <g key={m}>
          <rect
            x={96}
            y={20 + i * 26}
            width={44}
            height={18}
            rx="2"
            fill="var(--accent)"
            fillOpacity={0.14}
            stroke="var(--accent)"
            strokeWidth="1"
            className="dg-once"
            style={at(520 + i * 130, 0)}
          />
          <T x={118} y={32 + i * 26} anchor="middle" tone="accent" delay={580 + i * 130}>
            {m}
          </T>
        </g>
      ))}

      <Line d="M 144 40 H 162" delay={820} />
      <Tick cx={178} cy={40} delay={920} />
      <T x={10} y={90}>
        MARKED PAID IN THE BOOKS
      </T>
    </Frame>
  );
}

/** Figures read off a document and checked without anyone typing. */
function Automation({ className }: P) {
  return (
    <Frame
      className={className}
      label="Figures read off an invoice automatically, checked against the books, and only the mismatch raised"
    >
      <Box x={10} y={14} w={46} h={56} delay={0} />
      {[0, 1, 2, 3].map((i) => (
        <B key={i} x={16} y={22 + i * 12} w={34 - (i % 2) * 8} delay={i * 80} />
      ))}
      <T x={10} y={82}>
        INVOICE
      </T>

      {/* The read. */}
      <g className="dg-once" style={at(360, 0)}>
        <rect x={10} y={14} width={46} height={12} fill="var(--accent)" fillOpacity="0.18" />
        <path d="M 10 26 H 56" stroke="var(--accent)" strokeWidth="1" />
      </g>

      <Line d="M 60 42 H 84" delay={520} tone="quiet" dashed />

      {/* Matched against the books. */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={88}
            y={22 + i * 16}
            width={40}
            height={10}
            rx="1"
            fill="var(--accent)"
            fillOpacity="0.85"
            className="dg-once"
            style={at(640 + i * 110, 0, -8)}
          />
          {i === 1 ? null : <Line d={`M 130 ${27 + i * 16} H 146`} delay={820 + i * 110} />}
        </g>
      ))}
      <g className="dg-once" style={at(1040, 0)}>
        <circle cx={158} cy={43} r={8} fill="var(--caution)" />
        <path d="M 158 39 v 4" stroke="var(--ground)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx={158} cy={47} r={0.9} fill="var(--ground)" />
      </g>
      <T x={88} y={82}>
        MISMATCH RAISED
      </T>
    </Frame>
  );
}

/* ================================================================== */
/* Brand & Visual Design                                              */
/* ================================================================== */

/** A mark, a typeface and a palette, agreeing with each other. */
function BrandIdentity({ className }: P) {
  const swatches = [1, 0.7, 0.45, 0.25];
  return (
    <Frame
      className={className}
      label="A logo, typeface and colour palette built as one set with rules for using them"
    >
      <g className="dg-once" style={at(0, 0)}>
        <rect x={10} y={16} width={44} height={44} rx="3" fill="var(--accent)" />
        <path d="M 22 46 L 32 26 L 42 46 Z" fill="var(--accent-ink)" />
      </g>
      <T x={32} y={72} anchor="middle">
        MARK
      </T>

      <g className="dg-once" style={at(240)}>
        <text
          x={70}
          y={44}
          fill="var(--ink)"
          data-dg-fs=""
          style={{ fontFamily: 'var(--font-display)', ['--dg-fs' as string]: 30 }}
        >
          Aa
        </text>
      </g>
      <T x={70} y={72}>
        TYPE
      </T>

      {swatches.map((o, i) => (
        <rect
          key={i}
          x={124 + i * 18}
          y={26}
          width={14}
          height={24}
          rx="2"
          fill="var(--accent)"
          fillOpacity={o}
          className="dg-once"
          style={at(460 + i * 110, 6)}
        />
      ))}
      <T x={124} y={72}>
        COLOUR
      </T>
      <Line d="M 10 84 H 190" delay={900} tone="quiet" dashed />
      <T x={10} y={94}>
        ONE SET, WITH RULES
      </T>
    </Frame>
  );
}

/** A deck put in the order that wins the room. */
function PitchCollateral({ className }: P) {
  const slides = [0, 1, 2, 3];
  return (
    <Frame
      className={className}
      label="A deck ordered so the argument builds slide by slide to the ask"
    >
      {slides.map((i) => (
        <g key={i}>
          <Box
            x={10 + i * 44}
            y={22}
            w={38}
            h={30}
            tone={i === 3 ? 'accent' : 'plain'}
            delay={i * 150}
          />
          <B
            x={16 + i * 44}
            y={30}
            w={26 - (i % 2) * 6}
            tone={i === 3 ? 'accent' : 'ctx'}
            delay={i * 150 + 70}
          />
          <B
            x={16 + i * 44}
            y={38}
            w={18}
            tone={i === 3 ? 'accent' : 'ctx'}
            delay={i * 150 + 110}
          />
          <T x={29 + i * 44} y={64} anchor="middle" tone={i === 3 ? 'accent' : 'quiet'}>
            {['PROBLEM', 'PROOF', 'PLAN', 'ASK'][i]}
          </T>
        </g>
      ))}
      <Line d="M 10 78 H 190" delay={700} />
      <T x={10} y={92}>
        BUILT TO BE READ IN ORDER
      </T>
    </Frame>
  );
}

/** A flat sheet folding into the thing on the shelf. */
function MarketingSystems({ className }: P) {
  return (
    <Frame
      className={className}
      label="A flat printed design folding into finished packaging that matches across every piece"
    >
      {/* The flat net. */}
      <g className="dg-once" style={at(0)}>
        <path
          d="M 10 30 h 26 v 26 h -26 z M 36 30 h 26 v 26 h -26 z M 62 30 h 20 v 26 h -20 z M 36 16 h 26 v 14 h -26 z"
          fill="none"
          stroke="var(--hairline-strong)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <rect x={40} y={36} width={18} height={14} rx="1" fill="var(--accent)" fillOpacity="0.6" />
      </g>
      <T x={10} y={70}>
        FLAT ARTWORK
      </T>

      <Line d="M 92 40 H 112" delay={420} tone="quiet" />

      {/* Folded. */}
      <g className="dg-once" style={at(620, 0)}>
        <path
          d="M 120 30 l 26 -10 l 26 10 v 34 l -26 10 l -26 -10 z"
          fill="var(--accent)"
          fillOpacity="0.14"
          stroke="var(--accent)"
          strokeWidth="1.1"
        />
        <path d="M 120 30 l 26 10 l 26 -10" fill="none" stroke="var(--accent)" strokeWidth="1.1" />
        <path d="M 146 40 v 34" stroke="var(--accent)" strokeWidth="1.1" />
      </g>
      <T x={146} y={88} anchor="middle" tone="accent">
        ON THE SHELF
      </T>
    </Frame>
  );
}

export const BOOKS_SET = { Bookkeeping, InternalAudit, AccountingSystems, PayrollHrms };
export const DIGITAL_SET = { WebDesign, WebApps, FinancialSaas, Automation };
export const DESIGN_SET = { BrandIdentity, PitchCollateral, MarketingSystems };
