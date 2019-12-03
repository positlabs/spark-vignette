// https://github.com/kamend/StickyNose-SparkAR
const Scene = require('Scene')
const Patches = require('Patches')
const R = require('Reactive')
const FaceTracking = require('FaceTracking')

const face = FaceTracking.face(0)
const cam = Scene.root.find("Camera")
const focalPlane = cam.focalPlane
const camCoords = face.cameraTransform.applyTo(face.nose.tip)

const u = R.add(R.div(R.div(camCoords.x, R.div(focalPlane.width, 2)), 2), .5)
var v = R.add(R.div(R.div(camCoords.y, R.div(focalPlane.height, 2)), 2), .5)
v = R.sub(1, v)

Patches.setPointValue(`face_2d`, R.point(u, v, 0))

/*

  // 2D face tracking is broken, but maybe one day it will work
  const FaceTracking2D = require('FaceTracking2D')
  const face2d = FaceTracking2D.face(0).boundingBox
  const u = face2d.center.x
  const v = face2d.center.y
  const size = face2d.height

  Patches.setPointValue('face_2d', R.point(u, v, size))

  const D = require('Diagnostics')
  D.watch('x', face2d.center.x)
  D.watch('y', face2d.center.y)
  D.watch('width', face2d.width)
  D.watch('height', face2d.height)

*/
