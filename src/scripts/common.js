import { curry, range, map } from 'ramda'

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
