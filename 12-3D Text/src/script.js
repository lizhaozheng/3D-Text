import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'


/**
 * Base
*/
// Debug
const gui = new GUI({
  title:'Hello Three.js',
})
gui.hide()


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
*/
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/5.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Fonts
*/
const Material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture, })
Material.matcap = matcapTexture
const fontLoader = new FontLoader()

fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json',
  (font) => {
    const textGeometry = new TextGeometry(
      'Hello Three.js',
      {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      }
    )
    textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //   - textGeometry.boundingBox.max.x-0.02 * 0.5,
    //   - textGeometry.boundingBox.max.y-0.02 * 0.5,
    //   - textGeometry.boundingBox.max.z-0.02 * 0.5
    // )
    textGeometry.center()
    const text = new THREE.Mesh(textGeometry, Material)
    scene.add(text)
  }
)
/**
 * dount 
 */
const dountGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
for (let i = 0; i < 100; i++) {
  // dount 甜甜圈
  const dount = new THREE.Mesh(dountGeometry, Material)
  scene.add(dount)
  dount.position.x = (Math.random() - 0.5) * 10
  dount.position.y = (Math.random() - 0.5) * 10
  dount.position.z = (Math.random() - 0.5) * 10
  dount.rotation.x = Math.random() * Math.PI
  dount.rotation.y = Math.random() * Math.PI
  const scale = Math.random()
  dount.scale.set(scale, scale, scale)
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()