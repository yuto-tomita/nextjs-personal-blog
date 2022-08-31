import { FC, ReactNode } from 'react'

type Variant = 'title' | 'text'

interface TextProps {
	className?: string
	children: ReactNode
	variant: Variant
}

const Text: FC<TextProps> = ({ className, children, variant }) => {
  const textClass = () => {
    const classes = {
      title: 'text-3xl font-bold',
      text: 'text-xs font-bold'
    }

    return classes[variant]
  }

  return (
    <div className={`${textClass()}, ${className}`}>
      {children}
    </div>
  )
}

export default Text

