import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchUserProductReview, postUserProductReview} from '../store'
import history from '../history'

const mapStateToProps = ( store ) => {
  return ({
    userProductReview: store.review.userProductReview
  })
}


const mapDispatchToProps = (dispatch) => {
  return ({
    fetchUserProductReview: (productId) => {
      return (
        dispatch(fetchUserProductReview(productId))
      )
    },
    postUserProductReview: (product, review) => {
      return (
        dispatch(postUserProductReview(product, review))
      )
    }
  })
}


class ReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      rating: '',
      description: '',
      redirect: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const productId = Number(this.props.match.params.id)
    await this.props.fetchUserProductReview(productId)
    this.setState({
      title: this.props.userProductReview.title,
      rating: this.props.userProductReview.rating,
      description: this.props.userProductReview.description,
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.className]: evt.target.value
    })
  }

  handleSubmit = async (evt) => {
    evt.preventDefault()
    const productId = Number(this.props.match.params.id)
    console.log('this.State is: ', this.state)
    await this.props.postUserProductReview(productId, this.state)
    console.log('this.State is: ', this.state)
    await this.setState({
      title: this.props.userProductReview.title,
      rating: this.props.userProductReview.rating,
      description: this.props.userProductReview.description,
      redirect: true,
    })
    history.push('/')
  }

  render() {
    //if (this.state.redirect) {
    //  console.log('this.state', this.state)
    //  return <Redirect to='/' />
    //}
    return (

      <div>
        <h1> Review Form       </h1>
        <h2> Product Title     </h2>
        <form onSubmit={this.handleSubmit} >
          <button>
            hello world
          </button>
          <div>
            <label > Review Title </label>
            <input
              className="title"
              value={this.state.title}
              onChange={this.handleChange}
              type="text" />
          </div>
          <div>
            <label > Review Rating </label>
            <input
              className="rating"
              value={this.state.rating}
              onChange={this.handleChange}
              type="number"
              min="1"
              max="5" />
          </div>
          <div>
            <label > Review Description </label>
            <input
              className="description"
              value={this.state.description}
              onChange={this.handleChange}
              type="text" />
          </div>
          <button onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    )
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
