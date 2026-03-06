import React, { useEffect, useRef } from 'react'

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3)
}

export default function HeroScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    let disposed = false
    let cleanup = () => {}

    const startScene = async () => {
      const mount = mountRef.current
      if (!mount || disposed) return

      const [
        { Scene },
        { PerspectiveCamera },
        { WebGLRenderer },
        { SRGBColorSpace },
        { AmbientLight },
        { DirectionalLight },
        { Mesh },
        { BoxGeometry },
        { MeshStandardMaterial },
        { BufferGeometry },
        { BufferAttribute },
        { PointsMaterial },
        { Points },
      ] = await Promise.all([
        import('three/src/scenes/Scene.js'),
        import('three/src/cameras/PerspectiveCamera.js'),
        import('three/src/renderers/WebGLRenderer.js'),
        import('three/src/constants.js'),
        import('three/src/lights/AmbientLight.js'),
        import('three/src/lights/DirectionalLight.js'),
        import('three/src/objects/Mesh.js'),
        import('three/src/geometries/BoxGeometry.js'),
        import('three/src/materials/MeshStandardMaterial.js'),
        import('three/src/core/BufferGeometry.js'),
        import('three/src/core/BufferAttribute.js'),
        import('three/src/materials/PointsMaterial.js'),
        import('three/src/objects/Points.js'),
      ])

      if (disposed) return

      const scene = new Scene()
      const camera = new PerspectiveCamera(48, 1, 0.1, 120)
      camera.position.set(6.4, 4.9, 8.2)
      camera.lookAt(0, 1.6, 0)

      const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7))
      renderer.outputColorSpace = SRGBColorSpace
      mount.appendChild(renderer.domElement)

      const ambient = new AmbientLight(0xffffff, 0.78)
      scene.add(ambient)

      const sun = new DirectionalLight(0xffd59d, 1.18)
      sun.position.set(7, 10, 6)
      scene.add(sun)

      const fill = new DirectionalLight(0x97c8ff, 0.48)
      fill.position.set(-7, 3, -2)
      scene.add(fill)

      const staticMeshes = []
      const dynamicMeshes = []

      const makeBox = (width, height, depth, color) => (
        new Mesh(
          new BoxGeometry(width, height, depth),
          new MeshStandardMaterial({
            color,
            metalness: 0.28,
            roughness: 0.62,
            emissive: 0x000000,
          })
        )
      )

      const ground = makeBox(9.2, 0.32, 7.4, 0x202a33)
      ground.position.set(0, -1.6, 0)
      scene.add(ground)
      staticMeshes.push(ground)

      const base = makeBox(4.1, 0.5, 4.1, 0x324250)
      base.position.set(0, -1.2, 0)
      scene.add(base)
      staticMeshes.push(base)

      const columns = []
      const columnOffsets = [
        [-1.56, 0, -1.56],
        [1.56, 0, -1.56],
        [-1.56, 0, 1.56],
        [1.56, 0, 1.56],
      ]
      columnOffsets.forEach(offset => {
        const column = makeBox(0.24, 4.2, 0.24, 0x415160)
        column.position.set(offset[0], 0.2, offset[2])
        columns.push(column)
        scene.add(column)
      })
      staticMeshes.push(...columns)

      const floors = []
      const floorCount = 12
      for (let index = 0; index < floorCount; index += 1) {
        const slab = makeBox(3.7, 0.22, 3.7, index % 2 === 0 ? 0x51677a : 0x5d7588)
        const targetY = -0.95 + index * 0.34
        slab.position.set(0, -4.8, 0)
        slab.userData.targetY = targetY
        slab.userData.delay = index * 0.19
        floors.push(slab)
        scene.add(slab)
      }
      dynamicMeshes.push(...floors)

      const topCap = makeBox(3.9, 0.26, 3.9, 0xd39d2e)
      topCap.position.set(0, -4.8, 0)
      topCap.userData.targetY = floors[floors.length - 1].userData.targetY + 0.28
      topCap.userData.delay = floorCount * 0.19 + 0.2
      floors.push(topCap)
      dynamicMeshes.push(topCap)
      scene.add(topCap)

      const craneTower = makeBox(0.19, 5.2, 0.19, 0xe0b95d)
      craneTower.position.set(-2.75, 1.08, -2.5)
      scene.add(craneTower)
      staticMeshes.push(craneTower)

      const craneArm = makeBox(4.2, 0.12, 0.18, 0xe0b95d)
      craneArm.position.set(-0.78, 3.58, -2.5)
      scene.add(craneArm)
      staticMeshes.push(craneArm)

      const hookLine = makeBox(0.03, 2.1, 0.03, 0xe4d5b8)
      hookLine.position.set(0.95, 2.34, -2.5)
      scene.add(hookLine)
      staticMeshes.push(hookLine)

      const scaffoldRows = []
      for (let index = 0; index < 4; index += 1) {
        const row = makeBox(0.05, 3.7, 3.4, 0x8b989f)
        row.position.set(2.02, 0.15 + index * 0.38, 0)
        scaffoldRows.push(row)
        scene.add(row)
      }
      staticMeshes.push(...scaffoldRows)

      const dustGeometry = new BufferGeometry()
      const dustCount = 120
      const points = new Float32Array(dustCount * 3)
      for (let index = 0; index < dustCount * 3; index += 3) {
        points[index] = (Math.random() - 0.5) * 8
        points[index + 1] = Math.random() * 4.5 - 1.5
        points[index + 2] = (Math.random() - 0.5) * 8
      }
      dustGeometry.setAttribute('position', new BufferAttribute(points, 3))
      const dustMaterial = new PointsMaterial({
        color: 0xffd8a1,
        size: 0.032,
        transparent: true,
        opacity: 0.68,
      })
      const dust = new Points(dustGeometry, dustMaterial)
      scene.add(dust)

      const setSize = () => {
        const { clientWidth, clientHeight } = mount
        if (!clientWidth || !clientHeight) return
        renderer.setSize(clientWidth, clientHeight)
        camera.aspect = clientWidth / clientHeight
        camera.updateProjectionMatrix()
      }

      setSize()
      window.addEventListener('resize', setSize)

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      let frameId = 0
      const startTime = performance.now()

      const renderFrame = now => {
        const seconds = (now - startTime) / 1000

        floors.forEach((slab, index) => {
          const local = clamp((seconds - slab.userData.delay) / 0.72, 0, 1)
          const eased = easeOutCubic(local)
          slab.position.y = -4.8 + (slab.userData.targetY + 4.8) * eased

          const baseColor = index === floors.length - 1 ? 0xd39d2e : index % 2 === 0 ? 0x51677a : 0x5d7588
          slab.material.color.setHex(baseColor)
          slab.material.emissive.setHex(0x5a3d0f)
          slab.material.emissiveIntensity = (1 - local) * 0.17
        })

        dust.rotation.y += 0.0012
        dust.rotation.x = Math.sin(seconds * 0.25) * 0.05

        const builtProgress = clamp((seconds - 0.4) / 3.8, 0, 1)
        const idle = Math.sin(seconds * 0.7) * 0.045 * builtProgress
        craneArm.rotation.y = idle
        hookLine.position.x = 0.95 + Math.sin(seconds * 0.9) * 0.12 * builtProgress

        camera.position.x = 6.4 + Math.sin(seconds * 0.26) * 0.16
        camera.lookAt(0, 1.45, 0)

        renderer.render(scene, camera)
        frameId = window.requestAnimationFrame(renderFrame)
      }

      if (reduceMotion) {
        floors.forEach(slab => {
          slab.position.y = slab.userData.targetY
        })
        renderer.render(scene, camera)
      } else {
        frameId = window.requestAnimationFrame(renderFrame)
      }

      cleanup = () => {
        window.cancelAnimationFrame(frameId)
        window.removeEventListener('resize', setSize)

        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement)
        }

        staticMeshes.forEach(mesh => {
          mesh.geometry.dispose()
          mesh.material.dispose()
        })

        dynamicMeshes.forEach(mesh => {
          mesh.geometry.dispose()
          mesh.material.dispose()
        })

        dust.geometry.dispose()
        dust.material.dispose()
        renderer.dispose()
      }
    }

    const node = mountRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      entries => {
        const inView = entries.some(entry => entry.isIntersecting)
        if (inView) {
          observer.disconnect()
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => startScene(), { timeout: 600 })
          } else {
            setTimeout(() => startScene(), 140)
          }
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(node)

    return () => {
      disposed = true
      observer.disconnect()
      cleanup()
    }
  }, [])

  return <div ref={mountRef} className="hero__scene" aria-hidden="true" />
}
