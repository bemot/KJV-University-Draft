import { gql } from 'apollo-boost'

export const GET_CURRENT_USER = gql`
	query {
		getCurrentUser {
			id
			username
			email
			avatar
			createdAt
			updatedAt
		}
	}
`

export const GET_BOOKS = gql`
	query {
		getBooks {
			id
			book_name
			book_title
			book_title_2
			chapter_count
		}
	}
`
export const GET_CHAPTERS = gql`
	query chapterQuery($name: String!) {
		getChapters(name: $name) {
			id
			book_name
			chapter_number
		}
	}
`

export const GET_VERSES = gql`
	query verseQuery($name: String!, $chapter: Int!) {
		getVerses(name: $name, chapter: $chapter) {
			id
			book_name
			chapter_number
			verse_number
			verse_text
		}
	}
`

export const GET_BOOKMARKS = gql`
	query BookmarkQuery($token: String!, $book: String!, $chapterNum: Int!) {
		getBookmarks(token: $token, book: $book, chapterNum: $chapterNum) {
			id
			comment
			color
			dark
			favorite
			verse {
				id
				book_name
				chapter_number
				verse_number
				verse_text
			}
			createdAt
			updatedAt
		}
	}
`

export const CREATE_BOOKMARK = gql`
	mutation(
		$verseId: Int!
		$comment: String
		$color: String!
		$dark: Boolean
		$favorite: Boolean
		$token: String!
	) {
		createBookmark(
			verseId: $verseId
			comment: $comment
			color: $color
			dark: $dark
			favorite: $favorite
			token: $token
		)
	}
`
export const UPDATE_BOOKMARK = gql`
	mutation($update: String, $id: Int!, $token: String!) {
		updateBookmark(update: $update, id: $id, token: $token)
	}
`

export const SIGNIN_USER = gql`
	mutation($username: String!, $password: String!) {
		signInUser(username: $username, password: $password) {
			token
		}
	}
`

export const SIGNUP_USER = gql`
	mutation($username: String!, $email: String!, $password: String!) {
		signUpUser(username: $username, email: $email, password: $password) {
			token
		}
	}
`
