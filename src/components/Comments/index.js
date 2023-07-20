import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {count: 0, name: '', comment: '', commentsList: []}

  onChangeName = event => this.setState({name: event.target.value})

  onChangeComment = event => this.setState({comment: event.target.value})

  addComment = event => {
    event.preventDefault()
    const {count, name, comment} = this.state

    if (name === '' && comment === '') {
      return
    }

    const newItem = {
      id: uuidv4(),
      name,
      comment,
      isLiked: false,
      bgColor: initialContainerBackgroundClassNames[count % 7],
    }

    this.setState(prevSatate => ({
      commentsList: [...prevSatate.commentsList, newItem],
      count: prevSatate.count + 1,
      name: '',
      comment: '',
    }))
  }

  likeStatus = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDeleteComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachComment => id !== eachComment.id,
      ),
      count: prevState.count - 1,
    }))
  }

  render() {
    const {count, name, comment, commentsList} = this.state

    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="comments-title">Comments</h1>
          <div className="input-container">
            <form onSubmit={this.addComment}>
              <p className="heading">Say something about 4.0 Technologies</p>
              <input
                className="name-input"
                placeholder="Your Name"
                value={name}
                onChange={this.onChangeName}
              />
              <br />
              <textarea
                cols="50"
                rows="10"
                className="comment-box"
                placeholder="Your Comment"
                value={comment}
                onChange={this.onChangeComment}
              />
              <br />
              <button
                className="add-comment-btn"
                type="submit"
                data-testid="delete"
              >
                Add Comment
              </button>
            </form>
            <div>
              <img
                className="image"
                alt="comments"
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              />
            </div>
          </div>
          <hr />
          <p className="comments-count">
            <span className="count"> {count} </span> Comments
          </p>

          <ul className="comments-list-container">
            {commentsList.map(comments => (
              <CommentItem
                key={comments.id}
                comments={comments}
                likeStatus={this.likeStatus}
                onDeleteComment={this.onDeleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
