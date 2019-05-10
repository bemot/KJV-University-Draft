import { gql } from 'apollo-boost'

export const GET_CURRENT_USER = gql`
	query {
		getCurrentUser {
			_id
			username
			email
			avatar
			joinDate
			updatedAt
			favorites {
				verse {
					verseText
				}
				comment
				color
			}
			bookedmarked {
				verse {
					verseText
				}
				comment
				color
			}
		}
	}
`

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
			bookTitle2
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
