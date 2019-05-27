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
			chapter_count
		}
	}
`
export const GET_BOOK = gql`
	query bookQuery($name: String!) {
		getOneBook(name: $name) {
			id
			book_title
			book_title_2
			book_name
			chapter_count
			chapters {
				id
				chapter_number
				verses {
					id
					verse_number
					verse_text
				}
			}
		}
	}
`

export const GET_BOOKMARKS = gql`
	query BookmarkQuery($token: String!) {
		getBookmarks(token: $token) {
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
