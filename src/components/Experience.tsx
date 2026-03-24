import { Environment, PresentationControls, Float, useScroll } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CarModel } from './CarModel'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

export const Experience = ({ modelPath, scaleMultiplier = 1 }: { modelPath: string, scaleMultiplier?: number }) => {
  const scroll = useScroll()
  const carRef = useRef<THREE.Group>(null)
  const isBaseModel =
    modelPath.includes('ford_f150_raptor.glb') && !modelPath.includes('ford_f150_raptor_police.glb')
  const isPoliceModel = modelPath.includes('ford_f150_raptor_police.glb')
  const is2017Model = modelPath.includes('2017_ford_f-150_raptor.glb')

  useFrame((_, delta) => {
    if (carRef.current && scroll) {
      // scroll.offset is 0 at top, 1 at bottom
      const r1 = scroll.range(0, 1 / 2) // page 1 -> 2
      const r2 = scroll.range(1 / 2, 1 / 2) // page 2 -> 3
      
      // Interpolate rotation
      const targetRotationY = -Math.PI / 4 + (r1 * Math.PI) + (r2 * -Math.PI/1.5)
      carRef.current.rotation.y = THREE.MathUtils.damp(carRef.current.rotation.y, targetRotationY, 4, delta)
      
      // Interpolate position X
      const targetX = 0 + (r1 * 3) + (r2 * -8)
      carRef.current.position.x = THREE.MathUtils.damp(carRef.current.position.x, targetX, 4, delta)

      // Interpolate Scale slightly on deep scroll
      const baseScale = 1.5 * scaleMultiplier
      const scrollScale = 0.3 * scaleMultiplier
      const targetScale = baseScale + (r2 * scrollScale)
      carRef.current.scale.setScalar(THREE.MathUtils.damp(carRef.current.scale.x, targetScale, 4, delta))
    }
  })

  return (
    <>
      <ambientLight intensity={0.2} color="#ffffff" />
      <directionalLight
        position={[5, 10, 5]}
        intensity={isBaseModel ? 3 : isPoliceModel ? 1.5 : is2017Model ? 2.0 : 2.3}
        color={isBaseModel ? '#00F0FF' : '#58d4ff'}
      />
      <directionalLight
        position={[-5, 5, -5]}
        intensity={isBaseModel ? 3 : isPoliceModel ? 1.5 : is2017Model ? 2.0 : 2.3}
        color={isBaseModel ? '#B026FF' : '#ab78ff'}
      />
      <spotLight position={[0, 15, 0]} angle={0.5} penumbra={1} intensity={4} color="#ffffff" />
      
      <Environment preset="night" blur={0.4} />

      <PresentationControls 
        global 
        rotation={[0, 0, 0]} 
        polar={[-Math.PI / 6, Math.PI / 6]} 
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <Float rotationIntensity={0.2} floatIntensity={1} speed={2}>
          <Suspense fallback={null}>
            <group ref={carRef} scale={1.5 * scaleMultiplier} position={[0, -1.0, 0]}>
              <CarModel modelPath={modelPath} />
            </group>
          </Suspense>
        </Float>
      </PresentationControls>

      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.5} intensity={1.5} />
      </EffectComposer>
    </>
  )
}
