const express = require('express')
const app = express()

// Функция для поиска НОД с использованием BigInt (защита от переполнения и падения сервера)
function gcd(a, b) {
	return b === 0n ? a : gcd(b, a % b)
}

// Функция для поиска НОК с использованием BigInt
function lcm(a, b) {
	if (a === 0n || b === 0n) return 0n
	return (a * b) / gcd(a, b)
}

// Проверка, является ли строка натуральным числом
function isNatural(str) {
	if (!str || typeof str !== 'string') return false
	// Проверяем, что в строке только цифры и число больше нуля
	return /^\d+$/.test(str) && BigInt(str) > 0n
}

app.get('/aigerima_nurlanova_gmail_com', (req, res) => {
	const { x, y } = req.query

	// Используем writeHead, чтобы отдать СТРОГО text/plain без автоматических добавок вроде charset=utf-8
	if (!isNatural(x) || !isNatural(y)) {
		res.writeHead(200, { 'Content-Type': 'text/plain' })
		return res.end('NaN')
	}

	try {
		const numX = BigInt(x)
		const numY = BigInt(y)
		const result = lcm(numX, numY)

		res.writeHead(200, { 'Content-Type': 'text/plain' })
		res.end(result.toString())
	} catch (error) {
		// Защита: если произойдет любая непредвиденная ошибка, сервер не упадет, а вернет NaN
		res.writeHead(200, { 'Content-Type': 'text/plain' })
		res.end('NaN')
	}
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`)
})
