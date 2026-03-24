import type { SVGProps } from 'react';
import { memo } from 'react';
import { BRAND_ICON_GLYPHS, type SimpleBrandId } from './brandIconGlyphs';

export type { SimpleBrandId } from './brandIconGlyphs';

export type SimpleBrandIconProps = Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> & {
  brand: SimpleBrandId;
  size: number;
};

/** Brand mark SVG; paths live in `brandIconGlyphs`. */
export const SimpleBrandIcon = memo(function SimpleBrandIcon({
  brand,
  size,
  className,
  'aria-hidden': ariaHidden,
  ...rest
}: SimpleBrandIconProps) {
  const icon = BRAND_ICON_GLYPHS[brand];
  const hidden = ariaHidden ?? true;
  return (
    <svg
      role={hidden ? 'presentation' : 'img'}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      aria-hidden={hidden}
      focusable="false"
      {...rest}
    >
      {!hidden ? <title>{icon.title}</title> : null}
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
});
