const transposeMatrix = function (matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    // Создаем новую матрицу для хранения результата транспонирования
    const result = [];
    for (let i = 0; i < cols; i++) {
        result[i] = [];
        for (let j = 0; j < rows; j++) {
            result[i][j] = matrix[j][i];
        }
    }

    return result;
}

export default transposeMatrix