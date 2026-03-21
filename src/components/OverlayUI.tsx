import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { CarData } from '../App'

interface OverlayUIProps {
  models: CarData[]
  currentIndex: number
  onSelectModel: (idx: number) => void
}

const TypewriterText = ({ text, delay = 0.4 }: { text: string; delay?: number }) => {
  const letters = text.split("")
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: delay }
    }
  }
  const child = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 20 } }
  }
  return (
    <motion.p 
      variants={container} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }}
      className="subtitle uppercase ml-2 mt-8 text-sm font-bold text-[#E0E5EC] max-w-2xl"
      style={{ letterSpacing: '0.2em' }}
    >
      {letters.map((char, index) => (
        <motion.span key={index} variants={child} style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
          {char}
        </motion.span>
      ))}
    </motion.p>
  )
}

export const OverlayUI = ({ models, currentIndex, onSelectModel }: OverlayUIProps) => {
  const activeModel = models[currentIndex];

  return (
    <div className="scroll-wrapper">
      {/* Global HUD Elements */}
      <div className="hud-brackets">
        <div className="hud-brackets-bottom"></div>
      </div>

      {/* Page 1 */}
      <section className="section-page">
        <header className="overlay-header">
          <h2 className="logo pointer-events-auto">FORD RAPTOR</h2>
          <nav className="nav-links">
            <p>Performance</p>
            <p>Design</p>
            <p>Pre-order</p>
          </nav>
        </header>

        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="title transform uppercase tracking-widest text-[#00F0FF]"
            style={{ fontSize: '10vw', lineHeight: 0.8, fontWeight: 900, textShadow: '0 0 20px rgba(0, 240, 255, 0.4)' }}
          >
            {activeModel.heroTitle[0]} <br className="lg:hidden" /> {activeModel.heroTitle[1]}
          </motion.h1>
          
          <TypewriterText key={activeModel.id} text={activeModel.heroSubtitle} delay={0.4} />
          
          {/* Telemetry data */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="telemetry-data mt-6"
          >
            <p><span className="accent-text">SYS.ID:</span> {activeModel.sysId}</p>
            <p><span className="accent-text">CLASS:</span> {activeModel.carClass}</p>
            <p><span className="accent-text">STATUS:</span> {activeModel.status}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="telemetry-data border-l-0"
            style={{ borderLeft: 'none', paddingLeft: 0 }}
          >
            <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>SELECT CHASSIS CONFIGURATION:</p>
            <div className="config-selector">
              {models.map((model, idx) => (
                <button 
                  key={model.id}
                  onClick={() => onSelectModel(idx)}
                  className={`config-btn ${idx === currentIndex ? 'active' : ''}`}
                >
                  [{model.id.toUpperCase()}]
                </button>
              ))}
            </div>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.1, type: "spring", stiffness: 200 }}
            className="tech-btn"
            onClick={() => alert("Initializing configurator...")}
          >
            [ INIT COMMS ]
          </motion.button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.8, type: "spring" }}
          className="scroll-indicator pointer-events-auto"
        >
          <p className="scroll-text">Explore Engine</p>
          <ChevronDown className="animate-bounce" size={20} />
        </motion.div>
      </section>

      {/* Page 2 */}
      <section className="section-page right-align">
        <div className="hero-content right-text">
          <motion.h2 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hero-title display-font text-right"
          >
            {activeModel.engineTitle[0]} <br/> {activeModel.engineTitle[1]}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
            className="hero-subtitle text-right mt-4"
          >
            {activeModel.engineDesc}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="telemetry-data text-right inline-block ml-auto mt-6 border-left-0 border-r-2"
            style={{ borderLeft: 'none', borderRight: '2px solid #00F0FF', paddingLeft: 0, paddingRight: '1.5rem'}}
          >
            <p><span className="accent-text">PWR_OUT:</span> {activeModel.pwrOut}</p>
            <p><span className="accent-text">TRQ_OUT:</span> {activeModel.trqOut}</p>
            <p><span className="accent-text">ENG_TYP:</span> {activeModel.engType}</p>
          </motion.div>
        </div>
      </section>

      {/* Page 3 */}
      <section className="section-page">
        <div className="hero-content">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hero-title display-font"
          >
            {activeModel.suspensionTitle[0]} <br/> {activeModel.suspensionTitle[1]}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="hero-subtitle mt-4"
          >
            {activeModel.suspensionDesc}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="telemetry-data mt-6"
          >
            <p><span className="accent-text">DAMPING:</span> {activeModel.damping}</p>
            <p><span className="accent-text">TRAVEL:</span> {activeModel.travel}</p>
            <p><span className="accent-text">G_FORCE:</span> {activeModel.gForce}</p>
          </motion.div>

          <div className="content-block mt-16 text-center flex flex-col items-center justify-center">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="title uppercase tracking-widest text-[#00F0FF]"
              style={{ fontSize: '6vw', fontWeight: 900, textShadow: '0 0 15px rgba(0, 240, 255, 0.5)' }}
            >
              THE ULTIMATE<br/>PREDATOR
            </motion.h2>
            <motion.button 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
              className="tech-btn"
              onClick={() => alert("Pre-order placed!")}
            >
              [ EXECUTE OVERRIDE ]
            </motion.button>
          </div>

        </div>
      </section>
    </div>
  )
}
