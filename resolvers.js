const { AuthenticationError } = require('apollo-server')
const fs = require('fs')
const Book = require('./models/Book')
const Song = require('./models/Song')
const User = require('./models/User')
const Verse = require('./models/Verse')
const Chapter = require('./models/Chapter')
const BookmarkedVerse = require('./models/BookmarkedVerse')
const db = require('./config/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Create JWT Token
const createToken = (user, secret, expiresIn) => {
	const { username, email } = user
	// Sign JWT with secret & expiration date
	return jwt.sign({ username, email }, secret, { expiresIn })
}

// Read json file for uploading to DB
function readBibleJSONFile(bookName) {
	return new Promise((resolve, reject) => {
		fs.readFile(`./json files/${bookName}.json`, 'utf-8', (err, data) => {
			err ? reject(err) : resolve(JSON.parse(data))
		})
	})
}

module.exports = {
	Query: {
		getBooks: async (parent, args, context) => {
			db.sync()
			return await Book.findAll({
				include: [{ model: Chapter, include: [Verse] }]
			}).map(books => {
				return books.get({ plain: true })
			})
		},
		getOneBook: async (parent, args, context) => {
			return await Book.findOne({
				where: { book_name: args.name },
				include: [{ model: Chapter, include: [Verse] }]
			}).map(books => {
				return books.get({ plain: true })
			})
		},
		// getUser: async (parent, { id }, context) => {
		// 	const user = await User.findByPk(id)
		// 	return user
		// },
		getCurrentUser: async (parent, _args, { currentUser }) => {
			if (!currentUser) {
				return null
			}

			return await User.findOne({
				where: { username: currentUser.username }
			})
		}
		// getSongs: async (parent, args, context) => {
		// 	try {
		// 		return await Song.findAll()
		// 	} catch (err) {
		// 		return err
		// 	}
		// }
	},
	Mutation: {
		signInUser: async (parent, { username, password }, conext) => {
			// See if user exist
			const user = await User.findOne({ where: { username } })
			if (!user) {
				throw new Error('User not found')
			}
			// Else compare passwords to see if it's valid
			const isValidPassword = await bcrypt.compare(password, user.password)
			if (!isValidPassword) {
				throw new Error('Invalid Password')
			}
			// Else return object with token and expiration date
			return { token: createToken(user, process.env.SECRET, '1hr') }
		},
		signUpUser: async (parent, { username, email, password }, context) => {
			try {
				await db.sync({ force: true })
				// See if user exist
				const foundUser = await User.findOne({ where: { username } })
				const foundEmail = await User.findOne({ where: { email } })
				if (foundUser) {
					throw new Error('A User with that username already exists.')
				}
				if (foundEmail) {
					throw new Error('An account with that email already exists.')
				}
				// Else create new user
				const newUser = await User.create({
					username,
					email,
					password
				})
				return { token: createToken(newUser, process.env.SECRET, '1hr') }
			} catch (err) {
				return err
			}
		},
		createBookmark: async (parent, args, context) => {
			try {
				if (args.token) {
					const validUser = await jwt.verify(args.token, process.env.SECRET)
					const foundUser = await User.findOne({
						where: { username: validUser.username }
					})
					await db.sync()
					await BookmarkedVerse.create({
						verse: args.verse,
						comment: args.comment,
						color: args.color,
						dark: args.dark,
						favorite: args.favorite,
						userId: foundUser.id
					})
					return true
				} else {
					throw new AuthenticationError(
						'Your session has ended. Please sign in again.'
					)
				}
			} catch (err) {
				return err
			}
		},
		createSong: async (parent, args, context) => {
			try {
				await db.sync()
				await Song.create({
					name: args.name,
					author: args.author,
					songNumber: args.songNumber,
					stanzas: args.chorus,
					chorus: args.stanzas
				})
				return true
			} catch (err) {
				console.log(err)
				return false
			}
		},
		createBook: async (parent, args, context) => {
			try {
				const book = await readBibleJSONFile('Genesis')
				await Book.create({
					book_title: book.book_title,
					book_title_2: book.book_title_2,
					book_name: book.book_name,
					chapter_count: book.chapter_count,
					total_book_verses: book.total_book_verses,
					total_book_words: book.total_book_words,
					total_book_letters: book.total_book_letters,
					total_book_characters: book.total_book_characters
				})
				return true
			} catch (err) {
				console.log(err)
				return false
			}
		},
		createChapter: async (parent, args, context) => {
			try {
				const book = await readBibleJSONFile('Genesis')
				book.chapters.forEach(async chapter => {
					// await db.sync()
					await Chapter.create({
						book_name: chapter.book_name,
						chapter_number: chapter.chapter_number,
						total_verse_count: chapter.total_verse_count,
						total_word_count: chapter.total_word_count,
						total_letter_count: chapter.total_letter_count,
						total_character_count: chapter.total_character_count
					})
				})
				return true
			} catch (err) {
				console.log(err)
				return false
			}
		},
		createVerse: async (parent, args, context) => {
			try {
				const verses = await readBibleJSONFile('Genesis')
				verses.forEach(async verse => {
					// await db.sync()
					await Verse.create({
						book_name: verse.bookName,
						chapter_number: verse.chapterNumber,
						verse_number: verse.verseNumber,
						verse_text: verse.verseText,
						word_count: verse.wordCount,
						letter_count: verse.letterCount,
						character_count: verse.characterCount
					})
					return true
				})
			} catch (err) {
				console.log(err)
				return false
			}
		}
	}
}
