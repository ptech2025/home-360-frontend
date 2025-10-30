export function LogoSvg({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="32"
      viewBox="0 0 28 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_126_22501)">
        <path
          d="M27.1286 24.4097V29.092C27.1286 30.1637 26.2611 31.0319 25.1904 31.0319H19.3774C19.3774 29.8722 19.0381 28.7909 18.4523 27.8826C18.2858 27.6247 18.1002 27.3796 17.8969 27.1521C17.2519 26.4313 16.4308 25.8738 15.5025 25.5438C15.4545 25.5262 15.4065 25.5102 15.3585 25.4958C14.7935 25.3116 14.1917 25.2122 13.5659 25.2122C12.9401 25.2122 12.3367 25.3116 11.7717 25.4942C11.7237 25.5102 11.6741 25.5262 11.6277 25.5438C10.6978 25.8722 9.87674 26.4313 9.23334 27.1521C9.02847 27.3796 8.84281 27.6247 8.67796 27.8826C8.09217 28.7909 7.75286 29.8706 7.75286 31.0303H1.93822C0.867476 31.0303 0 30.1621 0 29.0904V24.4097L5.01119 19.3942L5.3441 19.0626L7.75126 16.6533L8.88763 15.516L10.8258 13.5777L11.6277 12.7751L12.7641 11.6378C13.2074 11.1941 13.9244 11.1941 14.3678 11.6378L15.5025 12.7735L16.306 13.5777L18.2426 15.516L19.0461 16.3201L19.379 16.6533L21.7877 19.0642L22.119 19.3958L23.2538 20.5315L24.5262 21.805L25.9923 23.2723L27.127 24.4081L27.1286 24.4097Z"
          fill="#2D6B50"
        />
        <path
          d="M7.75126 0V11.1668L3.40588 15.516L2.60403 16.3185L0 18.9232V0H7.75126Z"
          fill="#2D6B50"
        />
      </g>
      <defs>
        <clipPath id="clip0_126_22501">
          <rect width="28" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function LogoWithText({ className }: { className?: string }) {
  return (
    <div className={`flex relative w-max gap-2 items-end ${className}`}>
      <LogoSvg />
      <h3 className="text-lg font-black font-circular-black text-main-green">
        <span>Home</span>
        <span className="text-main-yellow">360</span>
      </h3>
      <svg
        width="9"
        height="9"
        viewBox="0 0 9 9"
        fill="none"
        className="absolute top-1 -right-2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="4.5" cy="4.5" r="3.25" stroke="#F59E0B" strokeWidth="2.5" />
      </svg>
    </div>
  );
}
