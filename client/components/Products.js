import React, { Component } from 'react';
//the non-default exports go in the curly brackets

class Products extends Component {
  baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1';
  state={ products: [] };
  //no constructor needed because these are class variables
  //when inside a class, don't need to call const for functions.

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    $.ajax({
      url: `${this.baseUrl}/products`,
      type: 'GET',
      dataType: 'JSON'
    }).done( products => {
      this.setState({ products });
    }).fail( data => {
      console.log(data);
    });
  }

deleteProduct = (id) => {
  $.ajax({
    url: `${this.baseUrl}/products/${id}`,
    type: 'DELETE',
    dataType: 'JSON'
  }).done( data => {
    this.state.products.filter( product => {
      return product.id !== id;
    });
    this.setState({ products });
  }).fail( data => {
// TODO: handle this in a better way for the user.
  console.log(data);
  });
}

  displayProducts = () => {
    let { products } = this.state;
    if(products.length) {
      return products.map( product => {
        return(
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.base_price}</td>
            <td>
              <button 
              className="btn red" 
              onClick={ () => this.deleteProduct(product.id) }>
              Delete
              </button>
            </td>
          </tr>
        )
      });
    } else {
      return(<h3>No Products Found.</h3>);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { name, price, description } = this.refs;
    $.ajax({
      url: `${this.baseUrl}/products`,
      type: "POST",
      dataType: "JSON",
      data: {product: { name: name.value, description: description.value, base_price: price.value } }
    }).done( product => {
      this.setState({ products: [product, ...this.state.products] });
      this.refs.addForm.reset();
      name.focus();
    }).fail( data => {
      //TODO: Handle this in a more user friendly way
      console.log(data);
    });
  }

  render() {
    return(
      <div>
        <h3 className="center">All Products From API</h3>
        <form ref ="addForm" onSubmit={ this.handleSubmit }>
          <input 
          autoFocus={true}
          type="text" 
          required 
          placeholder="Product Name" 
          ref="name" />
          <br />
          <textarea ref="description" 
          required 
          placeholder="Product Description"
          className="materialize-textarea">
          </textarea>
          <br />
          <input 
          type="number" 
          placeholder="Product Price" 
          ref="price" 
          required 
          min='1' max='500' />
          <br />
          <input 
          type="submit" 
          value="Add Product"
          className="btn" />
        </form>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Description</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody>
            { this.displayProducts() }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Products;