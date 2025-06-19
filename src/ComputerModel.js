import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function ComputerModel({ width = 300, height = 300 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 0.5);
    directional.position.set(5, 5, 5);
    scene.add(directional);

    const material = new THREE.MeshStandardMaterial({ color: 0x4e9cff });

    // Monitor
    const monitorGeom = new THREE.BoxGeometry(2, 1.3, 0.1);
    const monitor = new THREE.Mesh(monitorGeom, material);
    monitor.position.y = 0.9;
    scene.add(monitor);

    // Stand
    const standGeom = new THREE.BoxGeometry(0.1, 0.5, 0.1);
    const stand = new THREE.Mesh(standGeom, material);
    stand.position.y = 0.45;
    scene.add(stand);

    // Base
    const baseGeom = new THREE.BoxGeometry(0.8, 0.05, 0.8);
    const base = new THREE.Mesh(baseGeom, material);
    base.position.y = 0.025;
    scene.add(base);

    camera.position.set(0, 1, 4);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: width + 'px', height: height + 'px', margin: '20px auto' }}
    />
  );
}

export default ComputerModel;
