function Productview({products}) {
    return (
        <main>
            <h2 className="viewhead">View Products</h2>
            <div className="row">
                {products.map((product, index) => (
                    <div className="product-card col-md-3" key={index}>
                        <h3>{product.name}</h3>

                        <p>Price: ₹{product.price}</p>

                        <p>Category: {product.category}</p>

                        <p>{product.description}</p>
                    </div>
                ))}
            </div>
            
            </main>
        ); 
}
export default Productview;