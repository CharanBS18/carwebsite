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

  useEffect(() => {
    const isBaseModel =
      modelPath.includes('ford_f150_raptor.glb') && !modelPath.includes('ford_f150_raptor_police.glb')
    const isPoliceModel = modelPath.includes('ford_f150_raptor_police.glb')
    const is2017Model = modelPath.includes('2017_ford_f-150_raptor.glb')

    const needsGroundCleanup =
      modelPath.includes('2017_ford_f-150_raptor.glb') ||
      modelPath.includes('2024_ford_f-150_raptor_r.glb') ||
      modelPath.includes('ford_f150_raptor_police.glb')

    const groundLikeName =
      /(^|[_.\-\s])(base|ground|floor|plane|shadow|platform|pedestal|stand|stage|terrain)([_.\-\s]|$)/i

    scene.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return

      const mesh = child as THREE.Mesh
      // Removed castShadow and receiveShadow for massive performance gains. ContactShadows handles ground shadows.

      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]

      // Keep visual parity with the base model: reduce overly strong reflections on non-base variants.
      materials.forEach((mat) => {
        if (!(mat instanceof THREE.MeshStandardMaterial)) return
        mat.envMapIntensity = isBaseModel ? 2.0 : isPoliceModel ? 0.65 : is2017Model ? 1.0 : 1.2
        if (!isBaseModel) {
          // Keep noticeable but controlled tint/reflection on non-base variants.
          if (isPoliceModel) {
            mat.metalness = THREE.MathUtils.clamp(mat.metalness * 0.85 + 0.08, 0.12, 0.32)
            mat.roughness = THREE.MathUtils.clamp(mat.roughness * 1.05, 0.58, 0.9)
          } else if (is2017Model) {
            mat.metalness = THREE.MathUtils.clamp(mat.metalness * 0.92 + 0.14, 0.2, 0.5)
            mat.roughness = THREE.MathUtils.clamp(mat.roughness * 0.96, 0.42, 0.78)
          } else {
            mat.metalness = THREE.MathUtils.clamp(mat.metalness * 0.95 + 0.18, 0.24, 0.58)
            mat.roughness = THREE.MathUtils.clamp(mat.roughness * 0.92, 0.35, 0.72)
          }
        }
      })

      if (!needsGroundCleanup) return

      const meshName = mesh.name ?? ''
      const hasGroundMaterial = materials.some((mat) => {
        const materialName = (mat as THREE.Material | undefined)?.name ?? ''
        return groundLikeName.test(materialName)
      })

      // Fallback heuristic: hide large, ultra-thin horizontal meshes near the bottom of the model.
      const geometry = mesh.geometry
      if (!geometry.boundingBox) geometry.computeBoundingBox()
      const bbox = geometry.boundingBox

      let looksLikePlatform = false
      if (bbox) {
        const size = new THREE.Vector3()
        const center = new THREE.Vector3()
        bbox.getSize(size)
        bbox.getCenter(center)
        const isLargeFlatSurface = size.y < 0.08 && (size.x > 2.4 || size.z > 2.4)
        const isLowInModel = center.y < 0.35
        looksLikePlatform = isLargeFlatSurface && isLowInModel
      }

      if (groundLikeName.test(meshName) || hasGroundMaterial || looksLikePlatform) {
        mesh.visible = false
      }
    })
  }, [scene, modelPath])

  return (
    <group ref={ref} {...props} dispose={null}>
      <group ref={localRef}>
        <primitive object={scene} />
      </group>
    </group>
  )
})
