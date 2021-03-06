import React from "react";
import CartTrigger from "./CartTrigger";
import CartBoxDropDown from "./CartBoxDropDown";
import CartList from "./CartList";
import CartDropDownItem from "./CartDropDownItem";
import CartFooter from "./CartFooter";
export const index = () => {
  return (
    <li className="dropdown cart_dropdown">
      <CartTrigger cartCount={2} />
      <CartBoxDropDown>
        <CartList>
          <CartDropDownItem
            name="شیر نارگیل"
            image="/images/product_img1.png"
            price={6.400}
            count={2}
          />
          <CartDropDownItem
            name="شیر کم چرب"
            image="/images/product_img3.png"
            price={4.000}
            count={2}
          />
        </CartList>
        <CartFooter />
      </CartBoxDropDown>
    </li>
  );
};
export default index;
