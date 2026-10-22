import React from 'react';

/**
 * Authentic vector brand icons for Adobe Creative Cloud applications
 * Designed with precise brand colors, rounded squircle borders, and typography.
 */

export const PhotoshopIcon: React.FC<{ className?: string; size?: number }> = ({
  className = "w-10 h-10",
  size = 40,
}) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background Squircle */}
    <rect width="48" height="48" rx="10" fill="#001E36" />
    <rect x="1" y="1" width="46" height="46" rx="9" stroke="#31A8FF" strokeWidth="2" strokeOpacity="0.4" />
    {/* "Ps" Lettering */}
    <text
      x="12"
      y="33"
      fill="#31A8FF"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="21"
      letterSpacing="-0.5"
    >
      Ps
    </text>
  </svg>
);

export const IllustratorIcon: React.FC<{ className?: string; size?: number }> = ({
  className = "w-10 h-10",
  size = 40,
}) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background Squircle */}
    <rect width="48" height="48" rx="10" fill="#330000" />
    <rect x="1" y="1" width="46" height="46" rx="9" stroke="#FF9A00" strokeWidth="2" strokeOpacity="0.4" />
    {/* "Ai" Lettering */}
    <text
      x="13"
      y="33"
      fill="#FF9A00"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="21"
      letterSpacing="-0.5"
    >
      Ai
    </text>
  </svg>
);

export const InDesignIcon: React.FC<{ className?: string; size?: number }> = ({
  className = "w-10 h-10",
  size = 40,
}) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background Squircle */}
    <rect width="48" height="48" rx="10" fill="#2B001A" />
    <rect x="1" y="1" width="46" height="46" rx="9" stroke="#FF3366" strokeWidth="2" strokeOpacity="0.4" />
    {/* "Id" Lettering */}
    <text
      x="14"
      y="33"
      fill="#FF3366"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="21"
      letterSpacing="-0.5"
    >
      Id
    </text>
  </svg>
);

/**
 * Vivid Pixel Logo Vector
 */
export const VividPixelLogo: React.FC<{ className?: string; size?: number }> = ({
  className = "w-9 h-9",
  size = 36,
}) => (
  <svg
    viewBox="0 0 40 40"
    width={size}
    height={size}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="10" fill="#141414" stroke="#262626" strokeWidth="1.5" />
    <path
      d="M10 12L20 28L30 12"
      stroke="#FF6B00"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="18" y="10" width="4" height="4" rx="1" fill="#FF9A00" />
    <circle cx="20" cy="20" r="2.5" fill="#FFFFFF" />
  </svg>
);
