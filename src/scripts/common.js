import { range } from 'lodash'

export const generateCanvas = (width, height) => {
  const canvas = document.createElement('canvas')
  canvas.classList.add('canvas')

  canvas.width = width
  canvas.height = height

  return canvas
}

export const generateFigure = (points, size, acceleration, angle) => {
  return range(0, points).map(i =>
    polarCoordinateToCartesianCoordinate(
      angle * i * acceleration / (2 * Math.PI),
      angle * i
    )
  )
}

export const applyOffset = (offset, point) => ({
  x: offset.x + point.x,
  y: offset.y + point.y,
})

export const polarCoordinateToCartesianCoordinate = (distance, angle) => ({
  x: distance * Math.cos(angle),
  y: distance * Math.sin(angle),
})
