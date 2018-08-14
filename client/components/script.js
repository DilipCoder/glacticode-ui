// Create an empty scene
import * as THREE from 'three'

export default function init() {
  // Create an empty scene
  const scene = new THREE.Scene()

  // Create a basic perspective camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.x = 0
  camera.position.y = 1
  camera.position.z = 2
  camera.lookAt(scene.position)

  // Create a renderer with Antialiasing
  const renderer = new THREE.WebGLRenderer({antialias: true})

  // Configure renderer clear color
  renderer.setClearColor('#000000')

  // Configure renderer size
  renderer.setSize(window.innerWidth, window.innerHeight)

  // Append Renderer to DOM
  document.body.appendChild(renderer.domElement)

  // ------------------------------------------------
  // FUN STARTS HERE
  // ------------------------------------------------

  // Create a Cube Mesh with basic material
  const geometry = new THREE.SphereBufferGeometry(1, 10, 10)
  // const material = new THREE.MeshPhongMaterial({color: 0xffffff})
  const material = new THREE.MeshLambertMaterial({color: '#499785'})
  const sphere = new THREE.Mesh(geometry, material)

   //create particles
  //  const particles

   //lighting
   const ambientLight = new THREE.AmbientLight()
   scene.add(ambientLight)

  const light = new THREE.DirectionalLight()
  light.position.set(200, 100, 200)
  light.castShadow = true
  light.shadow.camera.left = -100
  light.shadow.camera.right = 100
  light.shadow.camera.top = 100
  light.shadow.camera.bottom = -100
  scene.add(light)

  // Add sphere to Scene
  scene.add(sphere)

  // Render Loop
  const render = function() {
    requestAnimationFrame(render)

    sphere.rotation.x += 0.001
    sphere.rotation.y += 0.001

    // Render the scene
    renderer.render(scene, camera)
  }

  render()
}
