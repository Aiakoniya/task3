const express = require('express')
const app = express()

// Функция для поиска НОД (Наибольший Общий Делитель)
function gcd(a, b) {
	return b === 0 ? a : gcd(b, a % b)
}

// Функция для поиска НОК (Наименьшее Общее Кратное)
function lcm(a, b) {
	return (a * b) / gcd(a, b)
}

// Проверка, является ли строка натуральным числом (строго целое > 0)
function isNatural(str) {
	if (!str || !/^\d+$/.test(str)) return false
	const num = Number(str)
	return num > 0
}

// Эндпоинт, сформированный из вашего email: aigerima.nurlanova@gmail.com
app.get('/aigerima_nurlanova_gmail_com', (req, res) => {
	const { x, y } = req.query

	// Устанавливаем заголовок чистого текста, как требует задание
	res.setHeader('Content-Type', 'text/plain')

	// Если x или y не переданы или не являются натуральными числами
	if (!isNatural(x) || !isNatural(y)) {
		return res.send('NaN')
	}

	const numX = parseInt(x, 10)
	const numY = parseInt(y, 10)

	const result = lcm(numX, numY)

	// Отправляем строго строку с цифрами
	res.send(result.toString())
})

// Настройка порта (динамический для хостингов вроде Render/Railway или 3000 локально)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Сервер успешно запущен на порту ${PORT}`)
})
