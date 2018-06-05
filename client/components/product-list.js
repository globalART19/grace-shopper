import React, { Component } from 'react'
import ProductCard from './product-card'
import { connect } from 'react-redux'

const mapStateToProps = (initialState) => {
  return {
    productList: initialState.productList
  }
}

const mapDispatchToProps = (dispatch) => {
}

class ProductList extends Component {
  render () {
    return (
      <div>
        <h2>All Products</h2>
        <ul>
          <ProductCard />
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)