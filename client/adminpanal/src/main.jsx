import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import MainLayOut from "./Common/MainLayOut.jsx";
import Dashboard from "./Dashboard.jsx";
import ViewUser from "./DropDownItems/User/ViewUser.jsx";
import NewsLatter from "./DropDownItems/Enquiry/NewsLatter.jsx";
import ContactEnquiry from "./DropDownItems/Enquiry/ContactEnquiry.jsx";
import AddColor from "./DropDownItems/Color/AddColor.jsx";
import ViewColor from "./DropDownItems/Color/ViewColor.jsx";
import AddMarerial from "./DropDownItems/Materials/AddMarerial.jsx";
import ViewMaterial from "./DropDownItems/Materials/ViewMaterial.jsx";
import AddParent from "./DropDownItems/Parent Categorys/AddParent.jsx";
import ViewParent from "./DropDownItems/Parent Categorys/ViewParent.jsx";
import AddSubCategory from "./DropDownItems/Sub Categorys/AddSubCategory.jsx";
import ViewSabCategory from "./DropDownItems/Sub Categorys/ViewSabCategory.jsx";
import AddSubSubCategory from "./DropDownItems/Sub sub Categorys/AddSubSubCategory.jsx";
import ViewSubSubCategaory from "./DropDownItems/Sub sub Categorys/ViewSubSubCategaory.jsx";
import AddProduct from "./DropDownItems/Products/AddProduct.jsx";
import ViewProduct from "./DropDownItems/Products/ViewProduct.jsx";
import WhyChooseUs from "./DropDownItems/Why Choose Us/WhyChooseUs.jsx";
import ViewWhyChooseUs from "./DropDownItems/Why Choose Us/ViewWhyChooseUs.jsx";
import AddOrder from "./DropDownItems/Order/AddOrder.jsx";
import AddSider from "./DropDownItems/Slider/AddSider.jsx";
import ViewSider from "./DropDownItems/Slider/ViewSider.jsx";
import AddCountry from "./DropDownItems/Country/AddCountry.jsx";
import ViewCountry from "./DropDownItems/Country/ViewCountry.jsx";
import AddTestimonials from "./DropDownItems/Testimonials/AddTestimonials.jsx";
import ViewTestimonials from "./DropDownItems/Testimonials/ViewTestimonials.jsx";
import AddFaq from "./DropDownItems/Faqs/AddFaq.jsx";
import ViewFaq from "./DropDownItems/Faqs/ViewFaq.jsx";
import Profile from "./Common/Profile/Profile.jsx";
import CompanyProfile from "./Common/Profile/CompanyProfile.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<MainLayOut />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/view-user" element={<ViewUser />} />
          <Route path="/contact-enquirys" element={<ContactEnquiry />} />
          <Route path="/newslatters" element={<NewsLatter />} />
          <Route path="/add-color" element={<AddColor />} />
          <Route path="/view-color" element={<ViewColor />} />
          <Route path="/add-material" element={<AddMarerial />} />
          <Route path="/view-material" element={<ViewMaterial />} />
          <Route path="/add-parent-category" element={<AddParent />} />
          <Route path="/view-parent-category" element={<ViewParent />} />
          <Route path="/add-sub-category" element={<AddSubCategory />} />
          <Route path="/view-sub-category" element={<ViewSabCategory />} />
          <Route path="/add-sub-sub-category" element={<AddSubSubCategory />} />
          <Route
            path="/view-sub-sub-category"
            element={<ViewSubSubCategaory />}
          />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/view-product" element={<ViewProduct />} />
          <Route path="/add-why-choose-us" element={<WhyChooseUs />} />
          <Route path="/view-why-choose-us" element={<ViewWhyChooseUs />} />
          <Route path="add-order" element={<AddOrder />} />
          <Route path="add-slider" element={<AddSider />} />
          <Route path="/view-slider" element={<ViewSider />} />
          <Route path="/add-country" element={<AddCountry />} />
          <Route path="/view-country" element={<ViewCountry />} />
          <Route path="/add-testimonials" element={<AddTestimonials />} />
          <Route path="/view-testimonials" element={<ViewTestimonials />} />
          <Route path="/add-faqs" element={<AddFaq />} />
          <Route path="/view-faqs" element={<ViewFaq />} />
          <Route path="/profile" element={<Profile />} />
          <Route path={"/company-profile"} element={<CompanyProfile/>}></Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
