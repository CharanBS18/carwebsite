import { Canvas } from '@react-three/fiber'
import { Experience } from './components/Experience'
import { OverlayUI } from './components/OverlayUI'
import { Suspense, useState } from 'react'
import { ScrollControls, Scroll } from '@react-three/drei'
import { CustomLoader } from './components/CustomLoader'
import { LampBackground } from './components/LampBackground'

export interface CarData {
  id: string; name: string; path: string; scaleMultiplier: number;
  heroTitle: string[]; heroSubtitle: string;
  sysId: string; carClass: string; status: string;
  engineTitle: string[]; engineDesc: string; pwrOut: string; trqOut: string; engType: string;
  suspensionTitle: string[]; suspensionDesc: string; damping: string; travel: string; gForce: string;
}

export const MODELS: CarData[] = [
  { 
    id: 'base', name: 'Raptor Base', path: `${import.meta.env.BASE_URL}models/ford_f150_raptor.glb`, scaleMultiplier: 1.1,
    heroTitle: ['UNLEASH', 'THE BEAST.'],
    heroSubtitle: 'Discover the pinnacle of off-road performance. Engineered for the extremes. Designed to dominate any terrain.',
    sysId: 'FRD-RPT-001', carClass: 'EXTREME OFF-ROAD', status: 'OPERATIONAL',
    engineTitle: ['TWIN-TURBO', 'V6 POWER.'],
    engineDesc: 'Heart-pounding 450 horsepower. 510 lb-ft of torque. The high-output 3.5L EcoBoost engine delivers unrelenting power when you need it most.',
    pwrOut: '450 HP @ 5850 RPM', trqOut: '510 LB-FT @ 3000 RPM', engType: '3.5L V6 TWIN-TURBO',
    suspensionTitle: ['FOX LIVE', 'VALVE SHOCKS.'],
    suspensionDesc: 'Position-sensitive damping adjustability. Conquer the harshest environments with suspension that thinks as fast as you drive.',
    damping: 'ELECTRONIC CONTROL', travel: '14.0" FR / 15.0" RR', gForce: 'SENSOR ARRAY ACTIVE'
  },
  { 
    id: '2017', name: '2017 Raptor', path: `${import.meta.env.BASE_URL}models/2017_ford_f-150_raptor.glb`, scaleMultiplier: 120,
    heroTitle: ['GEN-2', 'LEGEND.'],
    heroSubtitle: 'The truck that redefined the off-road landscape. A lightweight military-grade aluminum body paired with advanced suspension.',
    sysId: 'FRD-RPT-GEN2', carClass: 'TACTICAL BAJA', status: 'ARCHIVED',
    engineTitle: ['FIRST-GEN', 'ECOBOOST.'],
    engineDesc: 'The game-changing 2nd Generation 3.5L V6. Generating massive low-end torque for uncompromised desert running capability.',
    pwrOut: '450 HP @ 5000 RPM', trqOut: '510 LB-FT @ 3500 RPM', engType: '3.5L V6 ECOBOOST',
    suspensionTitle: ['FOX 3.0', 'INTERNAL BYPASS.'],
    suspensionDesc: 'Nine zones of damping control for maximum bottom-out resistance. Built to sustain violent impacts at high velocity.',
    damping: 'PASSIVE BYPASS', travel: '13.0" FR / 13.9" RR', gForce: 'MANUAL OVERRIDE'
  },
  { 
    id: '2024r', name: '2024 Raptor R', path: `${import.meta.env.BASE_URL}models/2024_ford_f-150_raptor_r.glb`, scaleMultiplier: 120,
    heroTitle: ['APEX', 'PREDATOR.'],
    heroSubtitle: 'The most powerful, fastest, and most extreme high-performance F-150 Raptor ever created by Ford Performance.',
    sysId: 'FRD-RPT-R', carClass: 'APEX OFF-ROAD', status: 'CLASSIFIED',
    engineTitle: ['SUPERCHARGED', 'V8 FURY.'],
    engineDesc: '720 horsepower. A gargantuan 5.2L Supercharged V8 engine directly ripped from the Mustang GT500 and aggressively tuned for off-road.',
    pwrOut: '720 HP @ 6650 RPM', trqOut: '640 LB-FT @ 4250 RPM', engType: '5.2L V8 SUPERCHARGED',
    suspensionTitle: ['FOX DUAL', 'LIVE VALVE.'],
    suspensionDesc: 'Independent compression and rebound damping control. Automatically adapts hardware firmness hundreds of times per second.',
    damping: 'DUAL ELECTRONIC', travel: '14.0" FR / 15.0" RR', gForce: 'ADAPTIVE MAPPING'
  },
  { 
    id: 'police', name: 'Police Interceptor', path: `${import.meta.env.BASE_URL}models/ford_f150_raptor_police.glb`, scaleMultiplier: 1.1,
    heroTitle: ['PURSUIT', 'INTERCEPTOR.'],
    heroSubtitle: 'Tactical pursuit vehicle engineered for extreme environments. Outfitted with heavy-duty pursuit reinforcements.',
    sysId: 'FRD-INT-99', carClass: 'LAW ENFORCEMENT', status: 'ACTIVE PURSUIT',
    engineTitle: ['PURSUIT', 'TUNED V6.'],
    engineDesc: 'Calibrated specifically for sustained high-speed operations. Features heavily encrypted engine telemetry and override codes.',
    pwrOut: 'CLASSIFIED', trqOut: 'CLASSIFIED', engType: 'PURSUIT V6',
    suspensionTitle: ['HEAVY-DUTY', 'REINFORCED.'],
    suspensionDesc: 'Upgraded payload capacity and pursuit-tuned suspension geometry to handle extreme weight and high-speed evasive maneuvers.',
    damping: 'HD TACTICAL', travel: '12.0" FR / 13.5" RR', gForce: 'CLASSIFIED'
  }
]

function App() {
  const [currentModelIndex, setCurrentModelIndex] = useState(0)

  return (
    <>
      <LampBackground />
      <Canvas
        shadows
        camera={{ position: [0, 2, 8], fov: 45 }}
        dpr={[1, 1]}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
        className="canvas-container"
      >
        {/* <color attach="background" args={['#0B0D17']} /> */}
        <Suspense fallback={null}>
          <ScrollControls pages={3} damping={0.25} distance={1.5}>
            <Experience
              modelPath={MODELS[currentModelIndex].path}
              scaleMultiplier={MODELS[currentModelIndex].scaleMultiplier}
            />
            <Scroll html style={{ width: '100vw' }}>
              <OverlayUI
                models={MODELS}
                currentIndex={currentModelIndex}
                onSelectModel={setCurrentModelIndex}
              />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
      <CustomLoader />
    </>
  )
}

export default App
