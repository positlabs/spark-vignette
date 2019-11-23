// https://github.com/kamend/StickyNose-SparkAR?fbclid=IwAR0r43fLHGEUZ8hqlu-MJ2od74d6vcc9vFI2tfTGsYEkk38tMVkR7XauhMM
const Scene = require('Scene')
const Patches = require('Patches')
const FaceTracking = require('FaceTracking')
const R = require('Reactive')
const face = FaceTracking.face(0)
const cam = Scene.root.find("Camera")

var focalPlane = cam.focalPlane
const camCoords = face.cameraTransform.applyTo(face.nose.tip)

var u = R.add(R.div(R.div(camCoords.x, R.div(focalPlane.width, 2)), 2), 0.5)
var v = R.add(R.div(R.div(camCoords.y, R.div(focalPlane.height, 2)), 2), 0.5)

Patches.setScalarValue("mu", u)
Patches.setScalarValue("mv", R.sub(1.0, v))
