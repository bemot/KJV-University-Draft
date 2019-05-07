import { gql } from 'apollo-boost'

export const GET_BOOKS = gql`
	query {
		getBooks {
			_id
			bookName
			bookNumber
			chapterCount
		}
	}
`
export const GET_BOOK = gql`
	query bookQuery($name: String!) {
		getOneBook(name: $name) {
			_id
			bookTitle
			bookName
			chapterCount
			chapters {
				_id
				chapterNumber
				verses {
					_id
					verseNumber
					verseText
				}
			}
		}
	}
`

export const SIGNIN_USER = gql`
	mutation($username: String!, $password: String!) {
		signinUser(username: $username, password: $password) {
			token
		}
	}
`

export const SIGNUP_USER = gql`
	mutation($username: String!, $email: String!, $password: String!) {
		signupUser(username: $username, email: $email, password: $password) {
			token
		}
	}
`
