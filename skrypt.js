
var ProductCategoryRow = React.createClass({
  render: function() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>);
  }
});

var ProductRow = React.createClass({
  render: function() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

var ProductTable = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    }.bind(this));
    return (
      <table>
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    );
  },
  render: function() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          ref="filterTextInput"
          onChange={this.handleChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            ref="inStockOnlyInput"
            onChange={this.handleChange}
          />
          {' '}
          pokaż tylko dostępne produkty
        </p>
      </form>
    );
  }
});

var FilterableProductTable = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      inStockOnly: false
    };
  },

  handleUserInput: function(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },

  render: function() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onUserInput={this.handleUserInput}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
});


var PRODUCTS = [
  {category: 'Sport', price: '50 zł', stocked: true, name: 'Piłka'},
  {category: 'Sport', price: '120 zł', stocked: true, name: 'Rękawice'},
  {category: 'Sport', price: '250 zł', stocked: false, name: 'Torba sportowa'},
  
  {category: 'Elektryka', price: '99 zł', stocked: true, name: 'Ładowarka'},
  {category: 'Elektryka', price: '59 zł', stocked: false, name: 'Etui Smasung'},
  {category: 'Elektryka', price: '999 zł', stocked: true, name: 'Samsung s10'},
  
    {category: 'Odzież', price: '59 zł', stocked: true, name: 'T-shirt'},
  {category: 'Odzież', price: '99 zł', stocked: true, name: 'Jeansy czarne'},
  {category: 'Odzież', price: '399 zł', stocked: true, name: 'Buty nike'},

    {category: 'Odżywki Sportowe', price: '120 zł', stocked: true, name: 'Białko serwatkowe'},
  {category: 'Odżywki Sportowe', price: '79 zł', stocked: true, name: 'Kreatyna'},
  {category: 'Odżywki Sportowe', price: '2 zł', stocked: true, name: 'Baton proteinowy'},
  
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
