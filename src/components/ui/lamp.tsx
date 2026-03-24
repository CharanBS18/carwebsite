import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

export const LampContainer = ({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) => {
  return (
    <div className={cn('lamp-bg-wrapper', className)}>
      <div className="lamp-core">
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="lamp-beam lamp-beam-left"
        >
          <div className="lamp-mask lamp-mask-bottom" />
          <div className="lamp-mask lamp-mask-side-left" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="lamp-beam lamp-beam-right"
        >
          <div className="lamp-mask lamp-mask-side-right" />
          <div className="lamp-mask lamp-mask-bottom" />
        </motion.div>
        <div className="lamp-floor-blur" />
        <div className="lamp-backdrop-blur" />
        <div className="lamp-glow-main" />
        <motion.div
          initial={{ width: '8rem' }}
          whileInView={{ width: '16rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="lamp-glow-small"
        />
        <motion.div
          initial={{ width: '15rem' }}
          whileInView={{ width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="lamp-line"
        />
        <div className="lamp-cutoff" />
      </div>

      {children ? <div className="lamp-content">{children}</div> : null}
    </div>
  )
}
