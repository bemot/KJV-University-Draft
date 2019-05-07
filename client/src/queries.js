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
