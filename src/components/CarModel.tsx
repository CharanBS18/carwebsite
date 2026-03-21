import { useGLTF, useAnimations, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { forwardRef, useEffect, useRef } from 'react'
import * as THREE from 'three'

interface CarModelProps extends React.ComponentProps<'group'> {
  modelPath: string
}

export const CarModel = forwardRef<THREE.Group, CarModelProps>(({ modelPath, ...props }, ref) => {
  const localRef = useRef<THREE.Group>(null)
  const scroll = useScroll()
  const { scene, animations } = useGLTF(modelPath)
  const { actions } = useAnimations(animations, localRef)

  useEffect(() => {
    // Setup animations to be scrubbing mode
    if (actions) {
      Object.values(actions).forEach((action) => {
        if (action) {
          action.reset().play()
          action.paused = true // Hardware pause so we can manually drive the clock
        }
      })
    }
    return () => {
      // Cleanup animations on unmount or model swap
      if (actions) {
        Object.values(actions).forEach((action) => {
          if (action) action.stop()
        })
      }
    }
  }, [actions, modelPath])

  useFrame(() => {
    if (actions && scroll) {
      // Map the scroll range (0.4 to 1.0) into animation progress (0% to 100%)
      // This means the doors start opening halfway down the page and are fully open at the bottom.
      const scrollOffset = scroll.offset
      const animationProgress = THREE.MathUtils.clamp((scrollOffset - 0.4) * (1 / 0.6), 0, 1)

      Object.values(actions).forEach((action) => {
        if (action) {
          const duration = action.getClip().duration
          action.time = animationProgress * duration
        }
      })
    }
  })

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      // Removed castShadow and receiveShadow for massive performance gains. ContactShadows handles ground shadows.
      
      // Enhance materials for a more cinematic look
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.envMapIntensity = 2.0;
        // DO NOT set needsUpdate = true here; changing envMapIntensity is a uniform change and does not require shader re-compilation
      }
    }
  })

  return (
    <group ref={ref} {...props} dispose={null}>
      <group ref={localRef}>
        <primitive object={scene} />
      </group>
    </group>
  )
})
