import { SVGAttributes } from 'react'

export default function Background(props: SVGAttributes<SVGElement>): JSX.Element {
  return (
    <svg {...props} width="877" height="968" viewBox="0 0 877 968" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_91_1704)">
        <mask id="mask0_91_1704" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="877" height="968">
          <path d="M877 0H0V968H877V0Z" fill="#f3f4f6" />
        </mask>
        <g mask="url(#mask0_91_1704)">
          <path
            d="M25 725.5C-190.667 725.5 -365.5 550.667 -365.5 335C-365.5 119.333 -190.667 -55.5 25 -55.5C240.667 -55.5 415.5 119.333 415.5 335C415.5 550.667 240.667 725.5 25 725.5Z"
            stroke="#1F2937"
          />
          <path
            opacity="0.3"
            d="M25 802.5C-233.193 802.5 -442.5 593.193 -442.5 335C-442.5 76.8069 -233.193 -132.5 25 -132.5C283.193 -132.5 492.5 76.8069 492.5 335C492.5 593.193 283.193 802.5 25 802.5Z"
            stroke="#1F2937"
          />
          <path
            opacity="0.1"
            d="M25 892.5C-282.899 892.5 -532.5 642.899 -532.5 335C-532.5 27.1013 -282.899 -222.5 25 -222.5C332.899 -222.5 582.5 27.1013 582.5 335C582.5 642.899 332.899 892.5 25 892.5Z"
            stroke="#1F2937"
          />
          <g filter="url(#filter0_f_91_1704)">
            <path
              d="M38 450C-283.982 450 -545 347.249 -545 220.5C-545 93.7506 -283.982 -9 38 -9C359.982 -9 621 93.7506 621 220.5C621 347.249 359.982 450 38 450Z"
              fill="#f3f4f6"
            />
          </g>
          <g filter="url(#filter1_f_91_1704)">
            <path
              d="M-163 411C-307.699 411 -425 328.397 -425 226.5C-425 124.603 -307.699 42 -163 42C-18.3014 42 99 124.603 99 226.5C99 328.397 -18.3014 411 -163 411Z"
              fill="#f3f4f6"
            />
          </g>
        </g>
      </g>
      <defs>
        <filter id="filter0_f_91_1704" x="-769" y="-233" width="1614" height="907" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="112" result="effect1_foregroundBlur_91_1704" />
        </filter>
        <filter id="filter1_f_91_1704" x="-649" y="-182" width="972" height="817" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="112" result="effect1_foregroundBlur_91_1704" />
        </filter>
        <clipPath id="clip0_91_1704">
          <rect width="877" height="968" fill="#f3f4f6" />
        </clipPath>
      </defs>
    </svg>
  )
}
