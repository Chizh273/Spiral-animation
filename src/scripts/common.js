import { curry, range, map } from 'ramda'
import { MAX_ANGLE, MIN_ANGLE } from './constants'

export const generateCanvas = (width, height) => {
  const canvas = document.createElement('canvas')
  canvas.classList.add('canvas')

  canvas.width = width
  canvas.height = height

  return canvas
}

export const generateFigure = curry((points, size, acceleration, angle) =>
  map(
    i =>
      polarCoordinateToCartesianCoordinate(
        angle * i * acceleration / (2 * Math.PI),
        angle * i
      ),
    range(0, points)
  )
)

export const applyOffset = curry((offset, point) => ({
  x: offset.x + point.x,
  y: offset.y + point.y
}))

export const polarCoordinateToCartesianCoordinate = (distance, angle) => ({
  x: distance * Math.cos(angle),
  y: distance * Math.sin(angle)
})

export const getAngleStepDirection = angle => {
  if (angle < MAX_ANGLE + 1 && angle > MAX_ANGLE - 1) {
    return -0.1
  } else if (angle < MIN_ANGLE + 1 && angle > MIN_ANGLE - 1) {
    return 0.1
  }
}
