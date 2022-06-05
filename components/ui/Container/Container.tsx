import { FC, CSSProperties } from 'react'
import styles from './Container.module.css'

interface ContainerProps {
  children?: any;
  style?: CSSProperties;
}

const Container: FC<ContainerProps> = ({ children, style }) => {
  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  )
}

export default Container
