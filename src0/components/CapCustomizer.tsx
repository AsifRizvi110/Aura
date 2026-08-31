import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DecalGeometry } from "three/examples/jsm/geometries/DecalGeometry.js";
import {
  Rotate3D,
  ZoomIn,
  Hand,
  RotateCcw,
  Upload,
  Download,
  X,
  Box,
} from "lucide-react";

const COLORS = [
  "#d91f26",
  "#151719",
  "#263b67",
  "#17613b",
  "#ffffff",
  "#bfc1c3",
  "#d9c19b",
  "#1258a4",
];

type ViewType = "front" | "threeQuarter" | "side" | "back" | "top";

export const CapCustomizer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  const modelRef = useRef<THREE.Group | null>(null);
  const frontCapMeshRef = useRef<THREE.Mesh | null>(null);
  const logoDecalRef = useRef<THREE.Mesh | null>(null);
  const currentLogoImg = useRef<HTMLImageElement | null>(null);

  const [capColor, setCapColor] = useState("#151719");
  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [view, setView] = useState<ViewType>("front");

  // =========================================================
  // 1. CAP COLOR UPDATE
  // =========================================================
  const updateCapColor = (color: string) => {
    if (!modelRef.current) return;

    modelRef.current.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      if (child.name === "UploadedFrontLogo") return; // Logo color ko change nahi hone dena

      const mesh = child as THREE.Mesh;

      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            mat.color.set(color);
            mat.roughness = 0.75;
            mat.metalness = 0.05;
            mat.needsUpdate = true;
          }
        });
      } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.color.set(color);
        mesh.material.roughness = 0.75;
        mesh.material.metalness = 0.05;
        mesh.material.needsUpdate = true;
      }
    });
  };

  // =========================================================
  // 2. REMOVE OLD LOGO
  // =========================================================
  const removeOldLogo = () => {
    const decal = logoDecalRef.current;
    if (!decal) return;

    if (decal.geometry) decal.geometry.dispose();
    const mat = decal.material as THREE.MeshBasicMaterial;
    if (mat?.map) mat.map.dispose();
    mat?.dispose();

    decal.removeFromParent();
    logoDecalRef.current = null;
  };

  // =========================================================
  // 3. CREATE LOGO TEXTURE
  // =========================================================
  const createLogoTexture = (image: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const canvasSize = 1024;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    const maxWidth = 960;
    const maxHeight = 960;
    const scale = Math.min(maxWidth / image.width, maxHeight / image.height);
    const width = image.width * scale;
    const height = image.height * scale;
    const x = (canvasSize - width) / 2;
    const y = (canvasSize - height) / 2;

    ctx.drawImage(image, x, y, width, height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.needsUpdate = true;

    return texture;
  };

  // =========================================================
  // 4. FIND FRONT CAP POSITION & APPLY LOGO (FIXED DECAL LOGIC)
  // =========================================================
  const createFrontLogo = (image: HTMLImageElement) => {
    const capMesh = frontCapMeshRef.current;
    const targetParent = modelRef.current || sceneRef.current;

    if (!capMesh || !targetParent) {
      console.warn("Target cap mesh not available for logo application.");
      return;
    }

    removeOldLogo();

    const texture = createLogoTexture(image);
    if (!texture) return;

    capMesh.updateWorldMatrix(true, true);

    // Front Panel Raycasting
    const box = new THREE.Box3().setFromObject(capMesh);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Front forehead position calculation
    const rayOrigin = new THREE.Vector3(center.x, center.y + size.y * 0.1, box.max.z + 5);
    const rayDirection = new THREE.Vector3(0, 0, -1);

    const raycaster = new THREE.Raycaster(rayOrigin, rayDirection);
    const hits = raycaster.intersectObject(capMesh, true);

    let hitPoint: THREE.Vector3;
    let hitNormal = new THREE.Vector3(0, 0, 1);

    if (hits.length > 0) {
      hitPoint = hits[0].point.clone();
      if (hits[0].face) {
        hitNormal = hits[0].face.normal.clone().applyMatrix3(
          new THREE.Matrix3().getNormalMatrix(hits[0].object.matrixWorld)
        ).normalize();
      }
    } else {
      hitPoint = new THREE.Vector3(center.x, center.y + size.y * 0.1, box.max.z);
    }

    // Orientation Calculation using Normal
    const dummy = new THREE.Object3D();
    dummy.position.copy(hitPoint);
    dummy.lookAt(hitPoint.clone().add(hitNormal));
    dummy.rotation.z = 0; // Upright logo
    const orientation = dummy.rotation;

    // Aspect Ratio & Dimensions
    const logoMaxWidth = 0.55;
    const logoMaxHeight = 0.38;
    const imageRatio = image.width / image.height;

    let logoWidth = logoMaxWidth;
    let logoHeight = logoWidth / imageRatio;

    if (logoHeight > logoMaxHeight) {
      logoHeight = logoMaxHeight;
      logoWidth = logoHeight * imageRatio;
    }

    const decalSize = new THREE.Vector3(logoWidth, logoHeight, 0.4);

    const decalGeometry = new DecalGeometry(
      capMesh,
      hitPoint,
      orientation,
      decalSize
    );

    const decalMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      polygonOffsetUnits: -4,
      side: THREE.DoubleSide,
      toneMapped: false,
    });

    const decalMesh = new THREE.Mesh(decalGeometry, decalMaterial);
    decalMesh.name = "UploadedFrontLogo";
    decalMesh.renderOrder = 999; // Har halat mein cap ke upar render hoga

    // Scene ke bajaye direct Cap ke andar add kiya taake sath rotate ho
    sceneRef.current?.add(decalMesh);
    logoDecalRef.current = decalMesh;
  };

  // =========================================================
  // 5. CAMERA VIEW POSITIONS
  // =========================================================
  const setCameraView = (newView: ViewType) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    setView(newView);

    const positions: Record<ViewType, THREE.Vector3> = {
      front: new THREE.Vector3(0, 0.15, 3.2),
      threeQuarter: new THREE.Vector3(2.4, 0.4, 2.5),
      side: new THREE.Vector3(3.3, 0.2, 0),
      back: new THREE.Vector3(0, 0.2, -3.2),
      top: new THREE.Vector3(0, 3.4, 0.1),
    };

    camera.position.copy(positions[newView]);
    controls.target.set(0, 0, 0);
    controls.update();
  };

  // =========================================================
  // 6. DOWNLOAD PREVIEW
  // =========================================================
  const downloadImage = () => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;

    if (!renderer || !scene || !camera) return;

    renderer.render(scene, camera);
    const link = document.createElement("a");
    link.download = "aura-custom-cap.png";
    link.href = renderer.domElement.toDataURL("image/png");
    link.click();
  };

  // =========================================================
  // 7. LOGO UPLOAD HANDLERS
  // =========================================================
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (!result) return;

      setLogoPreview(result);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        currentLogoImg.current = img;
        createFrontLogo(img);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleRemoveLogo = () => {
    removeOldLogo();
    currentLogoImg.current = null;
    setLogoPreview("");
    setFileName("");
  };

  // =========================================================
  // 8. THREE.JS INITIALIZATION
  // =========================================================
  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 800;
    const height = currentMount.clientHeight || 600;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 3.2);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    currentMount.replaceChildren(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 1.5;
    controls.maxDistance = 5.5;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // Lighting Setup
    scene.add(new THREE.AmbientLight(0xffffff, 2.5));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 2.0);
    fillLight.position.set(-4, 2, 4);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 2.0);
    backLight.position.set(0, 3, -5);
    scene.add(backLight);

    // Loader Logic
    const loader = new GLTFLoader();
    loader.load(
      "/cap.glb",
      (gltf) => {
        const model = gltf.scene;

        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);
        model.updateMatrixWorld(true);

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 2.0;
        const scale = targetSize / maxDim;

        model.scale.setScalar(scale);
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale;
        model.position.z = -center.z * scale;
        model.updateMatrixWorld(true);

        let largestMesh: THREE.Mesh | null = null;
        let largestVolume = 0;

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.material = new THREE.MeshStandardMaterial({
              color: capColor,
              roughness: 0.75,
              metalness: 0.05,
            });
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const meshBox = new THREE.Box3().setFromObject(mesh);
            const meshSize = meshBox.getSize(new THREE.Vector3());
            const volume = meshSize.x * meshSize.y * meshSize.z;

            if (volume > largestVolume) {
              largestVolume = volume;
              largestMesh = mesh;
            }

            if (
              mesh.name.toLowerCase().includes("crown") ||
              mesh.name.toLowerCase().includes("cap") ||
              mesh.name === "Cube_Cap_0"
            ) {
              frontCapMeshRef.current = mesh;
            }
          }
        });

        if (!frontCapMeshRef.current && largestMesh) {
          frontCapMeshRef.current = largestMesh;
        }

        modelRef.current = model;
        scene.add(model);

        updateCapColor(capColor);

        if (currentLogoImg.current) {
          createFrontLogo(currentLogoImg.current);
        }

        setLoading(false);
      },
      undefined,
      () => {
        // Procedural Fallback Cap
        const fallbackGroup = new THREE.Group();
        const dome = new THREE.Mesh(
          new THREE.SphereGeometry(0.9, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5),
          new THREE.MeshStandardMaterial({ color: capColor, roughness: 0.75 })
        );
        dome.position.y = -0.1;
        fallbackGroup.add(dome);

        const brim = new THREE.Mesh(
          new THREE.CylinderGeometry(1.0, 1.1, 0.04, 32, 1, false, 0, Math.PI),
          new THREE.MeshStandardMaterial({ color: capColor, roughness: 0.75 })
        );
        brim.position.set(0, -0.1, 0.5);
        brim.rotation.x = 0.2;
        fallbackGroup.add(brim);

        frontCapMeshRef.current = dome;
        modelRef.current = fallbackGroup;
        scene.add(fallbackGroup);
        setLoading(false);
      }
    );

    const handleResize = () => {
      if (!currentMount || !renderer || !camera) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      removeOldLogo();
      renderer.dispose();
      if (currentMount) currentMount.innerHTML = "";
    };
  }, []);

  const viewItems = [
    { id: "front" as ViewType, label: "Front" },
    { id: "threeQuarter" as ViewType, label: "3/4" },
    { id: "side" as ViewType, label: "Side" },
    { id: "back" as ViewType, label: "Back" },
    { id: "top" as ViewType, label: "Top" },
  ];

  return (
    <section className="w-full min-h-screen bg-transparent flex flex-col items-center justify-center pt-4 pb-12 px-4 md:px-6">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight uppercase">
          Design Your Signature <span className="text-[#F27D26]">Cap in 3D</span>
        </h1>
        <p className="text-neutral-400 text-xs sm:text-sm mt-3 max-w-lg mx-auto">
          Upload your logo, pick custom materials & preview 360° in real-time.
        </p>
      </div>

      <div className="w-full max-w-[1500px] flex flex-col md:flex-row gap-6 items-stretch">
        {/* SIDEBAR */}
        <aside className="w-full md:w-[320px] shrink-0 bg-[#202223] text-white rounded-3xl p-6 flex flex-col gap-4 shadow-2xl justify-between">
          <div>
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Rotate3D size={23} />
              </div>
              <div>
                <h2 className="text-lg font-bold">CAP CUSTOMIZER</h2>
                <p className="text-[9px] text-neutral-400 uppercase tracking-widest">3D Studio</p>
              </div>
            </div>

            {/* COLOR */}
            <div className="bg-[#292b2d] rounded-2xl p-4 mt-4">
              <h3 className="font-bold text-xs uppercase tracking-wide mb-3">1. Choose Cap Color</h3>
              <div className="grid grid-cols-4 gap-2.5">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setCapColor(color);
                      updateCapColor(color);
                    }}
                    className={`h-10 rounded-lg border-2 transition ${
                      capColor.toLowerCase() === color.toLowerCase()
                        ? "border-white scale-105 shadow-md"
                        : "border-white/20"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* LOGO */}
            <div className="bg-[#292b2d] rounded-2xl p-4 mt-4">
              <h3 className="font-bold text-xs uppercase tracking-wide mb-3">2. Upload Your Logo</h3>

              {logoPreview ? (
                <div className="relative h-28 rounded-xl border border-white/15 bg-black/30 flex items-center justify-center mb-3">
                  <img src={logoPreview} alt="Logo" className="max-w-[90%] max-h-[90%] object-contain" />
                  <button
                    onClick={handleRemoveLogo}
                    className="absolute right-2 top-2 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center hover:bg-black transition"
                  >
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <div className="h-28 rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center text-neutral-500 mb-3">
                  <Upload size={25} />
                  <span className="text-[11px] mt-2">No logo uploaded</span>
                </div>
              )}

              <label className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl border border-white/20 hover:bg-white/10 cursor-pointer transition">
                <Upload size={17} />
                <span className="text-xs font-medium truncate">{fileName || "Upload Logo"}</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* QUICK TOOLS */}
            <div className="bg-[#292b2d] rounded-2xl p-4 mt-4">
              <h3 className="font-bold text-xs uppercase tracking-wide mb-3">3. Quick Tools</h3>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setCameraView("threeQuarter")}
                  className="h-12 rounded-xl bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-1 transition"
                >
                  <Rotate3D size={17} />
                  <span className="text-[9px]">Rotate</span>
                </button>

                <button
                  onClick={() => {
                    const camera = cameraRef.current;
                    if (camera) camera.position.multiplyScalar(0.85);
                  }}
                  className="h-12 rounded-xl bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-1 transition"
                >
                  <ZoomIn size={17} />
                  <span className="text-[9px]">Zoom</span>
                </button>

                <button
                  onClick={() => {
                    if (controlsRef.current) controlsRef.current.enablePan = true;
                  }}
                  className="h-12 rounded-xl bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-1 transition"
                >
                  <Hand size={17} />
                  <span className="text-[9px]">Pan</span>
                </button>

                <button
                  onClick={() => setCameraView("front")}
                  className="h-12 rounded-xl bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-1 transition"
                >
                  <RotateCcw size={17} />
                  <span className="text-[9px]">Reset</span>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={downloadImage}
            className="w-full mt-6 bg-[#e1262d] hover:bg-[#c91d24] py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider shadow-lg transition"
          >
            <Download size={18} />
            DOWNLOAD 3D RENDER
          </button>
        </aside>

        {/* 360 VIEWER */}
        <main className="relative flex-1 min-h-[600px] h-[720px] bg-[#141618]/70 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
          <div className="absolute top-5 left-5 z-30">
            <div className="bg-[#202223]/90 text-white rounded-xl px-4 py-2 flex items-center gap-2.5 border border-white/10 shadow-xl">
              <Box size={18} className="text-[#F27D26]" />
              <div>
                <p className="text-[9px] uppercase text-neutral-400">Interactive</p>
                <p className="text-xs font-bold">360° Studio</p>
              </div>
            </div>
          </div>

          {loading && (
            <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#141618]/90">
              <div className="text-center">
                <div className="w-10 h-10 border-4 border-[#F27D26] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs text-neutral-300 font-mono tracking-wider uppercase">Loading 3D Cap...</p>
              </div>
            </div>
          )}

          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* VIEW BUTTONS */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2.5 bg-black/40 backdrop-blur-md p-2 rounded-2xl border border-white/10">
            {viewItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCameraView(item.id)}
                className={`w-[65px] h-[65px] rounded-xl transition flex flex-col items-center justify-center gap-1 ${
                  view === item.id
                    ? "bg-[#F27D26] text-white shadow-[0_0_15px_rgba(242,125,38,0.4)]"
                    : "bg-white/5 text-neutral-300 hover:bg-white/15"
                }`}
              >
                <Rotate3D size={16} />
                <span className="text-[10px] font-bold uppercase">{item.label}</span>
              </button>
            ))}
          </div>

          {/* INSTRUCTION */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
            <div className="px-6 py-2.5 bg-black/70 backdrop-blur-md text-white rounded-full text-xs border border-white/10 shadow-2xl whitespace-nowrap">
              Drag to rotate <span className="mx-2 text-[#F27D26]">•</span> Scroll to zoom <span className="mx-2 text-[#F27D26]">•</span> Right click to pan
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};