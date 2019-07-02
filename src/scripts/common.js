import { curry, range, map } from 'ramda'

export const generateCanvas = (width, height) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.classList.add('canvas')

  canvas.width = width
  canvas.height = height

  document.body.appendChild(canvas)

  return { canvas, ctx }
}

export const generateFigure = (points, size, acceleration, angle) =>
  map(
    i =>
      polarCoordinateToCartesianCoordinate(
        angle * i * acceleration / (2 * Math.PI),
        angle * i
      ),
    range(0, points)
  )

export const applyOffset = curry((offset, point) => ({
  x: offset.x + point.x,
  y: offset.y + point.y
}))

export const polarCoordinateToCartesianCoordinate = (distance, angle) => ({
  x: distance * Math.cos(angle),
  y: distance * Math.sin(angle)
})
