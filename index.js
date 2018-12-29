let renderer, scene, camera, container

function init() {
  container = document.createElement('div')
  document.body.appendChild(container)

  camera = new THREE.PerspectiveCamera(
    75, // view angle
    window.innerWidth / window.innerHeight, // Aspect ratio (?)
    0.1, // near
    1000 // far
  )
  camera.position.set(0, 0, 10)
  camera.lookAt(0, 0, 0)

  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer()

  renderer.setSize(window.innerWidth, window.innerHeight)
  container.appendChild(renderer.domElement)
}

init()
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

function animate() {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}

animate()
