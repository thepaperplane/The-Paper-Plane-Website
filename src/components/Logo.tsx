import React from "react";

interface LogoProps {
  className?: string;
  size?: number | string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10", size }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The Paper Plane logo"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <g id="paper-plane-logo">
        {/* === BOTTOM CURVED ARCS / SWOOSH TRAIL (Bright Sky Blue) === */}
        {/* Outer Main Bottom Swoosh */}
        <path
          d="M 125 185 C 130 205, 160 215, 205 200 C 240 188, 260 160, 268 140 C 260 155, 238 180, 200 190 C 165 200, 140 190, 132 178 Z"
          fill="#309ae6"
        />
        <path
          d="M 115 198 C 122 218, 155 228, 200 212 C 235 200, 252 175, 258 160 C 250 172, 232 192, 195 203 C 160 212, 132 204, 122 192 Z"
          fill="#309ae6"
        />

        {/* === STACKED PAPER DOCUMENTS (Sky Blue Outline & Sheets) === */}
        {/* Sheet 3 (Bottom-most paper) */}
        <g id="paper-sheet-3">
          <path
            d="M 160 152 L 200 132 L 210 162 L 170 182 Z"
            fill="none"
            stroke="#309ae6"
            strokeWidth="5"
            strokeLinejoin="round"
          />
        </g>

        {/* Sheet 2 (Middle paper) */}
        <g id="paper-sheet-2">
          <path
            d="M 148 135 L 188 115 L 202 148 L 162 168 Z"
            fill="#ffffff"
            stroke="#309ae6"
            strokeWidth="5.5"
            strokeLinejoin="round"
          />
          {/* Top Right Corner Fold */}
          <path
            d="M 178 115 L 188 115 L 188 125 L 178 115 Z"
            fill="#309ae6"
          />
        </g>

        {/* Sheet 1 (Top paper) */}
        <g id="paper-sheet-1">
          <path
            d="M 135 118 L 175 98 L 192 135 L 152 155 Z"
            fill="#ffffff"
            stroke="#218be0"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          {/* Top Right Corner Fold */}
          <path
            d="M 163 98 L 175 98 L 175 110 L 163 98 Z"
            fill="#218be0"
          />
          {/* Document Content Lines */}
          <line x1="145" y1="125" x2="168" y2="114" stroke="#218be0" strokeWidth="3" strokeLinecap="round" />
          <line x1="148" y1="133" x2="175" y2="120" stroke="#218be0" strokeWidth="3" strokeLinecap="round" />
          <line x1="152" y1="141" x2="172" y2="131" stroke="#218be0" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Additional accent arc directly under plane */}
        <path
          d="M 142 165 C 160 185, 195 185, 230 165 C 205 180, 170 180, 148 165 Z"
          fill="#1c75c8"
        />

        {/* === DARK NAVY PAPER PLANE (Top Right) === */}
        {/* Main Upper Wing (Lightest Navy) */}
        <path
          d="M 182 118 L 295 72 L 208 178 L 210 128 Z"
          fill="#123262"
        />

        {/* Outer Right Wing Fold (Medium Dark Navy) */}
        <path
          d="M 295 72 L 208 178 L 268 142 Z"
          fill="#0a1d3a"
        />

        {/* Underbody Shadow / Keel (Darkest Navy) */}
        <path
          d="M 182 118 L 210 128 L 208 178 L 188 142 Z"
          fill="#061226"
        />

        {/* Top Fold Specular Highlight / Shading Line */}
        <path
          d="M 182 118 L 295 72 L 210 128 Z"
          fill="#1a427f"
        />
      </g>
    </svg>
  );
};
