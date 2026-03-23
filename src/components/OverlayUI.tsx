import { motion } from 'framer-motion'
import type { CarData } from '../App'

interface OverlayUIProps {
  models: CarData[]
  currentIndex: number
  onSelectModel: (idx: number) => void
}

const MinimalistText = ({ text, delay = 0.4 }: { text: string; delay?: number }) => {
  const words = text.split(" ")
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay }
    }
  }
  const child = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  }
  return (
    <motion.p 
      variants={container} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }}
      className="hero-subtitle"
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} style={{ display: 'inline-block', marginRight: '0.3em' }}>
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}

export const OverlayUI = ({ models, currentIndex, onSelectModel }: OverlayUIProps) => {
  const activeModel = models[currentIndex];

  return (
    <div className="scroll-wrapper">
      
      {/* Page 1: Overview and Config */}
      <section className="section-page">
        <header className="overlay-header">
          <motion.h2 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1.5, ease: "easeOut" as const }}
            className="logo pointer-events-auto text-white"
          >
            FORD RAPTOR
          </motion.h2>
          <motion.nav 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" as const }}
            className="nav-links"
          >
            <p>Performance</p>
            <p>Design</p>
            <p className="accent-text">Pre-order</p>
          </motion.nav>
        </header>

        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" as const }}
            className="hero-title text-white"
          >
            {activeModel.heroTitle[0]} <br className="lg:hidden" /> {activeModel.heroTitle[1]}
          </motion.h1>
          
          <MinimalistText key={activeModel.id} text={activeModel.heroSubtitle} delay={0.4} />
          
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '2rem' }}>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" as const }}
              className="glass-panel"
              style={{ padding: '2rem' }}
            >
              <p className="telemetry-label" style={{ marginBottom: '1rem' }}>CHASSIS CONFIGURATION / /</p>
              <div className="config-selector">
                {models.map((model, idx) => (
                  <button 
                    key={model.id}
                    onClick={() => onSelectModel(idx)}
                    className={`config-btn ${idx === currentIndex ? 'active' : ''}`}
                  >
                    {model.id.toUpperCase()}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" as const }}
              className="glass-panel telemetry-data"
            >
              <div className="telemetry-item">
                <span className="telemetry-label">SYS.ID</span>
                <span className="telemetry-value accent-text">{activeModel.sysId}</span>
              </div>
              <div className="telemetry-item">
                <span className="telemetry-label">CLASS</span>
                <span className="telemetry-value">{activeModel.carClass}</span>
              </div>
              <div className="telemetry-item">
                <span className="telemetry-label">STATUS</span>
                <span className="telemetry-value text-gradient">{activeModel.status}</span>
              </div>
            </motion.div>

          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="scroll-indicator pointer-events-auto"
        >
          <p className="scroll-text">Scroll to Explore</p>
          <div className="scroll-line animate-slide"></div>
        </motion.div>
      </section>

      {/* Page 2: Engine Performance */}
      <section className="section-page right-align">
        <div className="hero-content right-text" style={{ marginTop: 'auto', marginBottom: '10rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" as const }}
            className="hero-title text-right text-white"
            style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
          >
            {activeModel.engineTitle[0]} <br/> <span className="text-gradient">{activeModel.engineTitle[1]}</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" as const }}
            className="hero-subtitle text-right mt-4"
          >
            {activeModel.engineDesc}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" as const }}
            className="glass-panel telemetry-data mt-8"
          >
            <div className="telemetry-item">
              <span className="telemetry-label">PWR_OUT</span>
              <span className="telemetry-value text-white">{activeModel.pwrOut}</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">TRQ_OUT</span>
              <span className="telemetry-value text-white">{activeModel.trqOut}</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">ENG_TYP</span>
              <span className="telemetry-value accent-text">{activeModel.engType}</span>
            </div>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="tech-btn mt-8"
            onClick={() => alert("Initializing configurator...")}
          >
            Configure Performance
          </motion.button>
        </div>
      </section>

      {/* Page 3: Suspension / Chassis */}
      <section className="section-page">
        <div className="hero-content">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" as const }}
            className="hero-title text-white"
            style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
          >
            {activeModel.suspensionTitle[0]} <br/> <span className="text-gradient">{activeModel.suspensionTitle[1]}</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" as const }}
            className="hero-subtitle mt-4"
          >
            {activeModel.suspensionDesc}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="glass-panel telemetry-data mt-8"
          >
            <div className="telemetry-item">
              <span className="telemetry-label">DAMPING</span>
              <span className="telemetry-value text-white">{activeModel.damping}</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">TRAVEL</span>
              <span className="telemetry-value text-white">{activeModel.travel}</span>
            </div>
            <div className="telemetry-item">
              <span className="telemetry-label">G_FORCE</span>
              <span className="telemetry-value accent-text">{activeModel.gForce}</span>
            </div>
          </motion.div>

          <div className="content-block mt-24 flex flex-col items-center justify-center w-full" style={{ opacity: 0.2 }}>
            <motion.h2 
              initial={{ opacity: 0, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="logo text-center"
              style={{ fontSize: '8vw', letterSpacing: '0.15em' }}
            >
              FORD PERFORMANCE
            </motion.h2>
          </div>
        </div>
      </section>
    </div>
  )
}
