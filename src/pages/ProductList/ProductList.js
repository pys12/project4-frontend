import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteProduct,
  createProduct,
} from "../../redux/actions/productActions";
import { CREATE_PRODUCT_RESET } from "../../redux/constants/productConstants";
import './ProductList.css'

const ProductList = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.productList
  );

  const { success: deleted } = useSelector((state) => state.deleteProduct);
  const { success: created,product:createdProduct } = useSelector((state) => state.createProduct);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch({ type: CREATE_PRODUCT_RESET });
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }
    if (created) {
      history.push(`/admin/products/${createdProduct._id}/edit`)
    } else {
      dispatch(getProducts())
    }
  }, [dispatch, history, userInfo, deleted, created,createdProduct]);

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <div className="admin-page-btn">
        <Button className="my-3" onClick={createHandler}>
          Create Product
        </Button>
      </div>
      {loading ? (
        <div> Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : products.length > 0 ? (
        <Table hover responsive>
          <thead>
            <tr className='col-name'>
              <th>Product ID</th>
              <th>Artist</th>
              <th>Title</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.artist}</td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>
                  <LinkContainer to={`/admin/products/${product._id}/edit`}>
                    <Button variant="outline-primary" className="edit-btn">
                      <i className="far fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="outline-warning"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="far fa-trash-alt"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h3>No products found</h3>
      )}
    </>
  );
};

export default ProductList;
