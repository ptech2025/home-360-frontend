interface IconProps {
  className?: string;
}

export const TextLineIcon = ({ className }: IconProps) => {
  return (
    <svg
      width="127"
      height="22"
      className={className}
      viewBox="0 0 127 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.18"
        d="M1 1.81205C29.354 1.19926 91.9677 0.341353 115.59 1.81205C145.118 3.65041 107.463 3.65042 57.3469 9.39531C7.23066 15.1402 74.6844 13.1869 87.6875 21"
        stroke="#112358"
        strokeWidth="2"
      />
    </svg>
  );
};

export const FeatureShapeIcon = ({ className }: IconProps) => {
  return (
    <svg
      width="385"
      height="360"
      className={className}
      viewBox="0 0 385 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.31">
        <circle
          cx="192.747"
          cy="95.247"
          r="263.421"
          transform="rotate(-0.179901 192.747 95.247)"
          stroke="#C76A3B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 3"
        />
        <circle
          cx="192.747"
          cy="95.2467"
          r="210.551"
          transform="rotate(-0.179901 192.747 95.2467)"
          fill="#CCD6E1"
          fillOpacity="0.05"
          stroke="#C76A3B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 3"
        />
        <circle
          cx="192.747"
          cy="95.2468"
          r="160.464"
          transform="rotate(-0.179901 192.747 95.2468)"
          fill="#53708F"
          fillOpacity="0.1"
        />
        <circle
          cx="192.747"
          cy="95.2474"
          r="107.595"
          transform="rotate(-0.179901 192.747 95.2474)"
          fill="#324456"
          fillOpacity="0.12"
        />
      </g>
    </svg>
  );
};

export const HeroEllipseIcon = ({ className }: IconProps) => {
  return (
    <svg
      width="1417"
      height="403"
      className={className}
      viewBox="0 0 1417 403"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5" filter="url(#filter0_f_3001_24077)">
        <ellipse cx="679.5" cy="466" rx="437.5" ry="166" fill="#E48B59" />
      </g>
      <defs>
        <filter
          id="filter0_f_3001_24077"
          x="-58"
          y="0"
          width="1475"
          height="932"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="150"
            result="effect1_foregroundBlur_3001_24077"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const FailureCrossIcon = ({ className }: IconProps) => {
  return (
    <svg
      width="100"
      height="100"
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 0C77.595 0 100 22.405 100 50C100 77.595 77.595 100 50 100C22.405 100 0 77.595 0 50C0 22.405 22.405 0 50 0Z"
        fill="#EF1D3B"
      />
      <path d="M66.1 66.1988L33.7 33.7988L66.1 66.1988Z" fill="#0A1AED" />
      <path
        d="M66.1 66.1988L33.7 33.7988"
        stroke="#FFB3B3"
        strokeWidth="14.58"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M33.7 66.1988L66.1 33.7988L33.7 66.1988Z" fill="#0A1AED" />
      <path
        d="M33.7 66.1988L66.1 33.7988"
        stroke="#FFB3B3"
        strokeWidth="14.58"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M66.1 66.1988L33.7 33.7988L66.1 66.1988Z" fill="#0A1AED" />
      <path
        d="M66.1 66.1988L33.7 33.7988"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M33.7 66.1988L66.1 33.7988L33.7 66.1988Z" fill="#0A1AED" />
      <path
        d="M33.7 66.1988L66.1 33.7988"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SuccessCheckIcon = ({ className }: IconProps) => {
  return (
    <svg
      width="136"
      height="136"
      className={className}
      viewBox="0 0 136 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M38.5711 106.049C17.6918 89.8073 13.9267 59.6677 30.1687 38.7884C46.4107 17.909 76.5503 14.1439 97.4296 30.3859C118.309 46.6279 122.074 76.7675 105.832 97.6468C89.7201 118.359 59.9304 122.23 39.0732 106.434"
        stroke="#17D578"
        strokeWidth="4"
      />
      <path
        d="M51.0938 76.9401C54.7961 80.5351 59.9991 85.5876 59.9991 85.5876L94.6311 50.9102C94.6311 50.9102 94.9261 50.6535 95.3682 50.1621"
        stroke="#17D578"
        strokeWidth="4.15"
      />
    </svg>
  );
};

export const PromptStarIcon = ({ className }: IconProps) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 2.5C5.72324 2.5 5.91943 2.64799 5.98076 2.86264L6.52289 4.7601C6.76018 5.59062 7.40938 6.23982 8.2399 6.47711L10.1374 7.01924C10.352 7.08057 10.5 7.27676 10.5 7.5C10.5 7.72324 10.352 7.91943 10.1374 7.98076L8.2399 8.52289C7.40938 8.76019 6.76018 9.40938 6.52289 10.2399L5.98076 12.1374C5.91943 12.352 5.72324 12.5 5.5 12.5C5.27676 12.5 5.08057 12.352 5.01924 12.1374L4.47711 10.2399C4.23982 9.40938 3.59062 8.76019 2.7601 8.52289L0.862639 7.98076C0.647989 7.91943 0.5 7.72324 0.5 7.5C0.5 7.27676 0.647989 7.08057 0.862639 7.01924L2.7601 6.47711C3.59062 6.23982 4.23982 5.59062 4.47711 4.7601L5.01924 2.86264C5.08057 2.64799 5.27676 2.5 5.5 2.5Z"
        fill="#3C6098"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5 0.5C11.7294 0.5 11.9294 0.656149 11.9851 0.878732L12.1576 1.56904C12.3144 2.19604 12.804 2.6856 13.431 2.84235L14.1213 3.01493C14.3439 3.07057 14.5 3.27057 14.5 3.5C14.5 3.72943 14.3439 3.92943 14.1213 3.98507L13.431 4.15765C12.804 4.3144 12.3144 4.80396 12.1576 5.43096L11.9851 6.12127C11.9294 6.34385 11.7294 6.5 11.5 6.5C11.2706 6.5 11.0706 6.34385 11.0149 6.12127L10.8424 5.43096C10.6856 4.80396 10.196 4.3144 9.56904 4.15765L8.87873 3.98507C8.65615 3.92943 8.5 3.72943 8.5 3.5C8.5 3.27057 8.65615 3.07057 8.87873 3.01493L9.56904 2.84235C10.196 2.6856 10.6856 2.19604 10.8424 1.56904L11.0149 0.878732C11.0706 0.656149 11.2706 0.5 11.5 0.5Z"
        fill="#3C6098"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 9.5C10.7152 9.5 10.9063 9.63772 10.9743 9.84189L11.2372 10.6304C11.3367 10.929 11.571 11.1633 11.8696 11.2628L12.6581 11.5257C12.8623 11.5937 13 11.7848 13 12C13 12.2152 12.8623 12.4063 12.6581 12.4743L11.8696 12.7372C11.571 12.8367 11.3367 13.071 11.2372 13.3696L10.9743 14.1581C10.9063 14.3623 10.7152 14.5 10.5 14.5C10.2848 14.5 10.0937 14.3623 10.0257 14.1581L9.76283 13.3696C9.66329 13.071 9.42898 12.8367 9.13037 12.7372L8.34189 12.4743C8.13771 12.4063 8 12.2152 8 12C8 11.7848 8.13771 11.5937 8.34189 11.5257L9.13037 11.2628C9.42898 11.1633 9.66329 10.929 9.76283 10.6304L10.0257 9.84189C10.0937 9.63772 10.2848 9.5 10.5 9.5Z"
        fill="#3C6098"
      />
    </svg>
  );
};

export const StarIcon = ({ className }: IconProps) => {
  return (
    <svg
      width="33"
      height="33"
      viewBox="0 0 33 33"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.49935 29.8334V23.1667M6.49935 9.83335V3.16669M3.16602 6.50002H9.83268M3.16602 26.5H9.83268M17.8327 4.50002L15.5204 10.5118C15.1444 11.4895 14.9564 11.9783 14.6641 12.3895C14.4049 12.7539 14.0865 13.0723 13.7221 13.3314C13.311 13.6238 12.8221 13.8118 11.8445 14.1878L5.83268 16.5L11.8445 18.8123C12.8221 19.1883 13.311 19.3763 13.7221 19.6686C14.0865 19.9278 14.4049 20.2462 14.6641 20.6106C14.9564 21.0217 15.1444 21.5106 15.5204 22.4882L17.8327 28.5L20.1449 22.4882C20.5209 21.5106 20.7089 21.0217 21.0013 20.6106C21.2604 20.2462 21.5788 19.9278 21.9432 19.6686C22.3544 19.3763 22.8432 19.1883 23.8209 18.8123L29.8327 16.5L23.8209 14.1878C22.8432 13.8118 22.3544 13.6238 21.9432 13.3314C21.5788 13.0723 21.2604 12.7539 21.0013 12.3895C20.7089 11.9783 20.5209 11.4895 20.1449 10.5118L17.8327 4.50002Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ScrewIcon = ({ className }: IconProps) => {
  return (
    <svg
      width="32"
      height="32"
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_193_9521)">
        <path
          opacity="0.2"
          d="M25.9829 15.3975L28.0804 12.7725C27.7974 11.7091 27.3741 10.688 26.8216 9.73629L23.4841 9.36129C23.2175 9.06091 22.9332 8.77666 22.6329 8.51004L22.2579 5.17129C21.3051 4.62208 20.2837 4.20175 19.2204 3.92129L16.5954 6.01754C16.194 5.99379 15.7917 5.99379 15.3904 6.01754L12.7654 3.92004C11.7053 4.20379 10.6877 4.62707 9.7391 5.17879L9.3641 8.51629C9.06372 8.78291 8.77947 9.06716 8.51285 9.36754L5.1741 9.74254C4.62489 10.6953 4.20455 11.7167 3.9241 12.78L6.02035 15.405C5.9966 15.8064 5.9966 16.2087 6.02035 16.61L3.92285 19.235C4.20576 20.2985 4.62907 21.3196 5.1816 22.2713L8.5191 22.6463C8.78572 22.9467 9.06997 23.2309 9.37035 23.4975L9.74535 26.8363C10.6981 27.3855 11.7195 27.8058 12.7829 28.0863L15.4079 25.99C15.8092 26.0138 16.2115 26.0138 16.6129 25.99L19.2379 28.0875C20.3013 27.8046 21.3224 27.3813 22.2741 26.8288L22.6491 23.4913C22.9495 23.2247 23.2337 22.9404 23.5004 22.64L26.8391 22.265C27.3883 21.3123 27.8086 20.2909 28.0891 19.2275L25.9929 16.6025C26.0133 16.201 26.0099 15.7987 25.9829 15.3975ZM16.0004 21C15.0114 21 14.0447 20.7068 13.2225 20.1574C12.4003 19.608 11.7594 18.8271 11.381 17.9135C11.0025 16.9998 10.9035 15.9945 11.0964 15.0246C11.2894 14.0547 11.7656 13.1638 12.4648 12.4645C13.1641 11.7652 14.055 11.289 15.0249 11.0961C15.9948 10.9032 17.0001 11.0022 17.9138 11.3806C18.8274 11.7591 19.6083 12.3999 20.1577 13.2222C20.7071 14.0444 21.0004 15.0111 21.0004 16C21.0004 17.3261 20.4736 18.5979 19.5359 19.5356C18.5982 20.4733 17.3264 21 16.0004 21Z"
          fill="#5B7B9D"
        />
        <path
          d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21Z"
          stroke="#263238"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.17867 22.2613C4.62614 21.3096 4.20283 20.2885 3.91992 19.225L6.01742 16.6C5.99367 16.1987 5.99367 15.7964 6.01742 15.395L3.92117 12.77C4.2036 11.7064 4.62604 10.685 5.17742 9.73254L8.51617 9.35754C8.78279 9.05716 9.06704 8.77291 9.36742 8.50629L9.74242 5.16879C10.6935 4.62004 11.7132 4.20011 12.7749 3.92004L15.3999 6.01754C15.8012 5.99379 16.2036 5.99379 16.6049 6.01754L19.2299 3.92129C20.2936 4.20372 21.315 4.62616 22.2674 5.17754L22.6424 8.51629C22.9428 8.78291 23.2271 9.06716 23.4937 9.36754L26.8312 9.74254C27.3837 10.6942 27.807 11.7153 28.0899 12.7788L25.9924 15.4038C26.0162 15.8051 26.0162 16.2075 25.9924 16.6088L28.0887 19.2338C27.8082 20.2971 27.3879 21.3186 26.8387 22.2713L23.4999 22.6463C23.2333 22.9467 22.9491 23.2309 22.6487 23.4975L22.2737 26.835C21.322 27.3876 20.3009 27.8109 19.2374 28.0938L16.6124 25.9963C16.2111 26.02 15.8087 26.02 15.4074 25.9963L12.7824 28.0925C11.7191 27.8121 10.6977 27.3918 9.74492 26.8425L9.36992 23.5038C9.06954 23.2372 8.78529 22.9529 8.51867 22.6525L5.17867 22.2613Z"
          stroke="#263238"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_193_9521">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CubeIcon = ({ className }: IconProps) => {
  return (
    <svg
      width="32"
      height="32"
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_193_9509)">
        <path
          opacity="0.2"
          d="M16 16.1362V29C15.832 28.9993 15.667 28.9563 15.52 28.875L4.52 22.855C4.36293 22.769 4.23181 22.6425 4.14035 22.4886C4.04888 22.3347 4.00041 22.159 4 21.98V10.025C4.00005 9.88407 4.02986 9.74478 4.0875 9.61621L16 16.1362Z"
          fill="#5B7B9D"
        />
        <path
          d="M4.08789 9.61499L16.0004 16.135L27.9129 9.61499"
          stroke="#263238"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.48 3.12505L27.48 9.14755C27.6371 9.23349 27.7682 9.36003 27.8597 9.51394C27.9511 9.66786 27.9996 9.84351 28 10.0226V21.9776C27.9996 22.1566 27.9511 22.3322 27.8597 22.4862C27.7682 22.6401 27.6371 22.7666 27.48 22.8526L16.48 28.8751C16.3328 28.9556 16.1678 28.9978 16 28.9978C15.8322 28.9978 15.6672 28.9556 15.52 28.8751L4.52 22.8526C4.36293 22.7666 4.23181 22.6401 4.14035 22.4862C4.04888 22.3322 4.00041 22.1566 4 21.9776V10.0226C4.00041 9.84351 4.04888 9.66786 4.14035 9.51394C4.23181 9.36003 4.36293 9.23349 4.52 9.14755L15.52 3.12505C15.6672 3.04453 15.8322 3.00232 16 3.00232C16.1678 3.00232 16.3328 3.04453 16.48 3.12505Z"
          stroke="#263238"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 16.1362V29"
          stroke="#263238"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_193_9509">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ElectricIcon = ({ className }: IconProps) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_193_9498)">
        <path
          opacity="0.2"
          d="M20 2L18 12L26 15L12 30L14 20L6 17L20 2Z"
          fill="#5B7B9D"
        />
        <path
          d="M20 2L18 12L26 15L12 30L14 20L6 17L20 2Z"
          stroke="#263238"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_193_9498">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export const PipeIcon = ({ className }: IconProps) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_193_9467)">
        <path
          opacity="0.2"
          d="M14 21V18C14 16.9391 14.4214 15.9217 15.1716 15.1716C15.9217 14.4214 16.9391 14 18 14H21V6H18C14.8174 6 11.7652 7.26428 9.51472 9.51472C7.26428 11.7652 6 14.8174 6 18V21H14Z"
          fill="#5B7B9D"
        />
        <path
          d="M14 21V18C14 16.9391 14.4214 15.9217 15.1716 15.1716C15.9217 14.4214 16.9391 14 18 14H21"
          stroke="#263238"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 6H18C14.8174 6 11.7652 7.26428 9.51472 9.51472C7.26428 11.7652 6 14.8174 6 18V21"
          stroke="#263238"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 5H22C21.4477 5 21 5.44772 21 6V14C21 14.5523 21.4477 15 22 15H24C24.5523 15 25 14.5523 25 14V6C25 5.44772 24.5523 5 24 5Z"
          stroke="#263238"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 21H6C5.44772 21 5 21.4477 5 22V24C5 24.5523 5.44772 25 6 25H14C14.5523 25 15 24.5523 15 24V22C15 21.4477 14.5523 21 14 21Z"
          stroke="#263238"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 25V29"
          stroke="#263238"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 25V29"
          stroke="#263238"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29 6H25"
          stroke="#263238"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29 14H25"
          stroke="#263238"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_193_9467">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const GoogleIcon = ({ className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      className={className}
      fill="none"
    >
      <path
        d="M22.56 12.4219C22.56 11.6419 22.49 10.8919 22.36 10.1719H12V14.4269H17.92C17.665 15.8019 16.89 16.9669 15.725 17.7469V20.5069H19.28C21.36 18.5919 22.56 15.7719 22.56 12.4219Z"
        fill="#4285F4"
      />
      <path
        d="M11.9999 23.1717C14.9699 23.1717 17.4599 22.1867 19.2799 20.5067L15.7249 17.7467C14.7399 18.4067 13.4799 18.7967 11.9999 18.7967C9.13492 18.7967 6.70992 16.8617 5.84492 14.2617H2.16992V17.1117C3.97992 20.7067 7.69992 23.1717 11.9999 23.1717Z"
        fill="#34A853"
      />
      <path
        d="M5.845 14.2614C5.625 13.6014 5.5 12.8964 5.5 12.1714C5.5 11.4464 5.625 10.7414 5.845 10.0814V7.23145H2.17C1.4 8.7643 0.999321 10.4561 1 12.1714C1 13.9464 1.425 15.6264 2.17 17.1114L5.845 14.2614Z"
        fill="#F7CE45"
      />
      <path
        d="M11.9999 5.54688C13.6149 5.54688 15.0649 6.10187 16.2049 7.19187L19.3599 4.03688C17.4549 2.26188 14.9649 1.17188 11.9999 1.17188C7.69992 1.17188 3.97992 3.63687 2.16992 7.23187L5.84492 10.0819C6.70992 7.48187 9.13492 5.54688 11.9999 5.54688Z"
        fill="#EA4335"
      />
    </svg>
  );
};

export const BlurShadow = ({ className }: { className: string }) => {
  return (
    <svg
      width="1440"
      height="958"
      viewBox="0 0 1440 958"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_46_3470)">
        <path
          d="M-786.872 -3C-885.169 46.9318 -988.664 173.203 -616.266 278.831C-150.768 410.867 56.1204 373.032 263.78 680.343C429.909 926.192 343.808 686.005 279.991 535.181C242.422 463.886 100.586 303.539 -166.207 232.502C-433 161.465 -549.104 45.9021 -573.807 -3H-786.872ZM85.7257 -318C-3.01025 -272.944 -95.2078 -177.066 45.5304 -78H36.0861C-62.2113 -28.0684 -94.4401 51.8734 277.958 157.502C742.466 289.257 758.233 312.59 964.636 618.043L965.958 620C1132.09 865.849 1094.77 699.005 1030.95 548.181C993.38 476.886 923.543 228.539 656.75 157.502C546.672 128.192 462.248 91.3007 399.311 54.6406C877.769 173.947 981.622 86.2301 1219.27 437.774C1422.54 738.464 1317.19 444.7 1239.1 260.231C1193.14 173.034 1171.59 56.9179 845.15 -29.9648C518.711 -116.848 376.649 -258.189 346.423 -318H85.7257ZM-36.8212 116C-100.488 148.333 -167.52 230.1 73.6788 298.5C375.179 384 509.179 359.5 643.679 558.5C751.279 717.7 695.512 562.167 654.179 464.5C629.845 418.333 537.979 314.5 365.179 268.5C192.379 222.5 117.179 147.667 101.179 116H-36.8212Z"
          fill="url(#paint0_linear_46_3470)"
          fillOpacity="0.86"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_46_3470"
          x="-1051"
          y="-490"
          width="2560"
          height="1448"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="86"
            result="effect1_foregroundBlur_46_3470"
          />
        </filter>
        <linearGradient
          id="paint0_linear_46_3470"
          x1="1501.23"
          y1="988"
          x2="30.008"
          y2="146.268"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.525" stopColor="white" />
          <stop offset="1" stopColor="#D5F1FD" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const OrangeCircleRight = ({ className }: { className: string }) => {
  return (
    <svg
      width="454"
      height="446"
      className={className}
      viewBox="0 0 454 446"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.31">
        <circle
          cx="364"
          cy="364"
          r="363"
          stroke="#C76A3B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 3"
        />
        <circle
          cx="364"
          cy="364"
          r="290.144"
          fill="#CCD6E1"
          fillOpacity="0.05"
          stroke="#C76A3B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 3"
        />
        <circle
          cx="364"
          cy="364"
          r="221.123"
          fill="#53708F"
          fillOpacity="0.1"
        />
        <circle
          cx="364"
          cy="364"
          r="148.268"
          fill="#324456"
          fillOpacity="0.12"
        />
      </g>
    </svg>
  );
};
export const OrangeCircleLeft = ({ className }: { className: string }) => {
  return (
    <svg
      width="286"
      className={className}
      height="529"
      viewBox="0 0 286 529"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.31">
        <circle
          cx="21.2469"
          cy="264.247"
          r="263.421"
          transform="rotate(-0.179901 21.2469 264.247)"
          stroke="#C76A3B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 3"
        />
        <circle
          cx="21.247"
          cy="264.247"
          r="210.551"
          transform="rotate(-0.179901 21.247 264.247)"
          fill="#CCD6E1"
          fillOpacity="0.05"
          stroke="#C76A3B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 3"
        />
        <circle
          cx="21.247"
          cy="264.247"
          r="160.464"
          transform="rotate(-0.179901 21.247 264.247)"
          fill="#53708F"
          fillOpacity="0.1"
        />
        <circle
          cx="21.2469"
          cy="264.247"
          r="107.595"
          transform="rotate(-0.179901 21.2469 264.247)"
          fill="#324456"
          fillOpacity="0.12"
        />
      </g>
    </svg>
  );
};
