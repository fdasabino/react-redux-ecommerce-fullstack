// Packages
import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-datepicker/dist/react-datepicker.css";

// Functions
import { currentUser } from "./functions/auth";

//Components & Routes
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/banner/Banner";
import Footer from "./components/footer/Footer";
import ActionDrawer from "./components/action_drawer/ActionDrawer";
import UserRoute from "./components/routes/userRoute/UserRoute";
import AdminRoute from "./components/routes/adminRoute/AdminRoute";

//Pages

const Home = lazy(() => import("./pages/Home/Home"));
const SingleProductHome = lazy(() => import("./pages/product/single_product/SingleProductHome"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubCategoriesHome = lazy(() => import("./pages/sub_categories/SubCategoriesHome"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Shop = lazy(() => import("./pages/shop/Shop"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const Login = lazy(() => import("./pages/auth/Login/Login"));
const Register = lazy(() => import("./pages/auth/Register/Register"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword/ForgotPassword"));
const OrderHistory = lazy(() => import("./pages/user/order_history/OrderHistory"));
const ChangePassword = lazy(() => import("./pages/user/change_password/ChangePassword"));
const Wishlist = lazy(() => import("./pages/user/wishlist/Wishlist"));

const AdminDashboard = lazy(() => import("./pages/admin/admin_dashboard/AdminDashboard"));
const CreateCategory = lazy(() => import("./pages/admin/category/create_category/CreateCategory"));
const UpdateCategory = lazy(() => import("./pages/admin/category/update_category/UpdateCategory"));
const CreateSubCategory = lazy(() =>
  import("./pages/admin/sub_category/create_sub_category/CreateSubCategory")
);
const UpdateSubCategory = lazy(() =>
  import("./pages/admin/sub_category/update_sub_category/UpdateSubCategory")
);
const CreateProduct = lazy(() => import("./pages/admin/product/create_product/CreateProduct"));
const AllProducts = lazy(() => import("./pages/admin/product/all_products/AllProducts"));
const UpdateProduct = lazy(() => import("./pages/admin/product/update_product/UpdateProduct"));
const CreateCouponPage = lazy(() => import("./pages/admin/coupons/CreateCouponPage"));
const Payment = lazy(() => import("./pages/payment/Payment"));

const App = () => {
  const dispatch = useDispatch();

  // Check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                _id: res.data._id,
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                token: idTokenResult.token,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    //cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="row">
          <div className="col text-center">
            <h3 className="block-heading">Loading...</h3>
            <div className="lds-dual-ring" />
          </div>
        </div>
      }
    >
      <Banner />
      <Navbar />
      <ToastContainer
        position="top-center"
        theme="colored"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <ActionDrawer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:slug" component={SingleProductHome} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub-category/:slug" component={SubCategoriesHome} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <UserRoute exact path="/user/history" component={OrderHistory} />
        <UserRoute exact path="/user/password" component={ChangePassword} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <UserRoute exact path="/payment" component={Payment} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CreateCategory} />
        <AdminRoute exact path="/admin/category/:slug" component={UpdateCategory} />
        <AdminRoute exact path="/admin/sub-category" component={CreateSubCategory} />
        <AdminRoute exact path="/admin/sub-category/:slug" component={UpdateSubCategory} />
        <AdminRoute exact path="/admin/product" component={CreateProduct} />
        <AdminRoute exact path="/products/:count" component={AllProducts} />
        <AdminRoute exact path="/admin/product/:slug" component={UpdateProduct} />
        <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
      </Switch>
      <Footer />
    </Suspense>
  );
};

export default App;
