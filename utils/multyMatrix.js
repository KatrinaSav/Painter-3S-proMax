const multiplyMatrix = function (m1, m2) {
  let result = []

  // Проверяем, возможно ли умножение матриц
  if (m1[0].length !== m2.length) {
    console.error('Невозможно умножить данные матрицы')
    return
  }

  for (let i = 0; i < m1.length; i++) {
    result[i] = []
    for (let j = 0; j < m2[0].length; j++) {
      let sum = 0
      for (let k = 0; k < m1[0].length; k++) {
        sum += m1[i][k] * m2[k][j]
      }
      result[i][j] = sum
    }
  }

  return result
}

export default multiplyMatrix
