import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideDrawer from "./components/drawer/SideDrawer";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/User/History";
import Password from "./pages/User/Password";
import Wishlist from "./pages/User/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { currentUser } from "./functions/auth";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

const App = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user: ", user);
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((error) => console.log(error));
      }
    });
    return () => unsubscribe();
  }, [auth, dispatch]);

  return (
    <>
      <Header />
      <ToastContainer />
      <SideDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/category/:slug" element={<CategoryHome />} />
        <Route path="/sub/:slug" element={<SubHome />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="register/complete/*" element={<RegisterComplete />} />
        <Route path="forgot/password/*" element={<ForgotPassword />} />
        <Route
          path="user/history/*"
          element={
            <UserRoute>
              <History />
            </UserRoute>
          }
        />
        <Route
          path="user/password/*"
          element={
            <UserRoute>
              <Password />
            </UserRoute>
          }
        />
        <Route
          path="user/wishlist/*"
          element={
            <UserRoute>
              <Wishlist />
            </UserRoute>
          }
        />{" "}
        <Route
          path="checkout"
          element={
            <UserRoute>
              <Checkout />
            </UserRoute>
          }
        />
        <Route
          path="admin/dashboard/*"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="admin/category/:slug"
          element={
            <AdminRoute>
              <CategoryUpdate />
            </AdminRoute>
          }
        />
        <Route
          path="admin/category"
          element={
            <AdminRoute>
              <CategoryCreate />
            </AdminRoute>
          }
        />
        <Route
          path="admin/sub"
          element={
            <AdminRoute>
              <SubCreate />
            </AdminRoute>
          }
        />
        <Route
          path="admin/sub/:slug"
          element={
            <AdminRoute>
              <SubUpdate />
            </AdminRoute>
          }
        />
        <Route
          path="admin/product"
          element={
            <AdminRoute>
              <ProductCreate />
            </AdminRoute>
          }
        />
        <Route
          path="admin/products"
          element={
            <AdminRoute>
              <AllProducts />
            </AdminRoute>
          }
        />
        <Route
          path="admin/product/:slug"
          element={
            <AdminRoute>
              <ProductUpdate />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
