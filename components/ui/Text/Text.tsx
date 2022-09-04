import { FC, ReactNode } from 'react'

type Variant = 'title' | 'text' | 'resumeTitle'

interface TextProps {
	className?: string
	children: ReactNode
	variant: Variant
}

const Text: FC<TextProps> = ({ className, children, variant }) => {
  const textClass = () => {
    const classes = {
      title: 'text-3xl font-bold',
      text: 'text-xs',
      resumeTitle: 'font-bold'
    }

    return classes[variant]
  }

  const propClassName = () => {
    return className || ''
  }

  return (
    <div className={`${textClass()} ${propClassName()}`}>
      {children}
    </div>
  )
}

export default Text

