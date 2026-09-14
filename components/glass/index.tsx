import { cn } from '@/lib/utils';

/**
 * Glass primitives.
 *
 * Every glass surface on the site comes from here, so the material is defined
 * once and the cost of it is accounted for in one place. See app/glass.css for
 * what a surface is actually made of and why there are five layers to it.
 *
 * The `material` prop is a budget, not a style choice:
 *
 *   thin    a bar over content that must stay readable through it
 *   regular the default — panels, cards, sheets
 *   thick   something that should obscure what it covers: menus, dialogs
 *   clear   barely there; for surfaces that only need an edge
 *   static  the look with no backdrop filter at all
 *
 * `static` exists because `backdrop-filter` makes the compositor re-sample
 * everything behind the element on every frame it changes. Three or four live
 * glass surfaces on screen is comfortable. Twenty is a dropped frame budget,
 * so anything that repeats down a list should be static.
 */

export type GlassMaterial = 'thin' | 'regular' | 'thick' | 'clear' | 'static';

const MATERIAL: Record<GlassMaterial, string> = {
  thin: 'glass glass-thin',
  regular: 'glass',
  thick: 'glass glass-thick',
  clear: 'glass glass-clear',
  static: 'glass glass-static',
};

type SurfaceProps<T extends React.ElementType> = {
  as?: T;
  material?: GlassMaterial;
  /** Adds the lift-and-settle response. Only for things that are clickable. */
  interactive?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function Glass<T extends React.ElementType = 'div'>({
  as,
  material = 'regular',
  interactive = false,
  className,
  children,
  ...rest
}: SurfaceProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof SurfaceProps<T>>) {
  const Tag = (as ?? 'div') as React.ElementType;
  return (
    <Tag
      className={cn(MATERIAL[material], interactive && 'glass-interactive', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * The field behind the glass.
 *
 * Glass over a flat colour is invisible — there has to be something worth
 * refracting behind it. Fixed to the viewport so content scrolls across it and
 * each surface picks up different colour as it passes. Rendered once, in the
 * layout, beneath everything.
 */
export function AmbientField() {
  return <div className="ambient-field" aria-hidden="true" />;
}
