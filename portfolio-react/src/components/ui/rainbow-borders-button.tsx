import type { ReactNode, AnchorHTMLAttributes } from 'react'

interface RainbowButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

export function RainbowButton({ children, ...props }: RainbowButtonProps) {
  return (
    <div className="rainbow-border-wrapper">
      <a className="rainbow-border-inner" {...props}>
        {children}
      </a>
    </div>
  )
}
