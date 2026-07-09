// SidebarIcons.js
import { FaChartPie } from "react-icons/fa6";
import { FaMessage } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineWaterDrop } from "react-icons/md";
import { SiMaterialdesignicons } from "react-icons/si";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import { SlQuestion } from "react-icons/sl";
import { LuNotebookPen } from "react-icons/lu";
import { FaLocationArrow } from "react-icons/fa";
import { LuUserRoundPen } from "react-icons/lu";
import { LuMessagesSquare } from "react-icons/lu";
import { MdOutlineEventNote } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { FaSliders } from "react-icons/fa6";

import ViewUser from "../DropDownItems/User/ViewUser";

export const Icons = [
  {
    id: 1,
    icon: <FaChartPie />,
    label: "Dashboard",
    path: "/home",
  },
  {
    id: 2,
    icon: <IoPersonSharp />,
    label: "User",
    arrow: <IoIosArrowDown />,
    dropdown: [
      {
        id: 1,
        icon: <LuUserRoundPen />,
        label: "View User",
        path: "/view-user",
      },
    ],
  },
  {
    id: 3,
    icon: <FaMessage />,
    label: "Enquirys",
    arrow: <IoIosArrowDown />,
    dropdown: [
      {
        id: 1,
        icon: <LuMessagesSquare />,
        label: "Contact Enquirys",
        path: "/contact-enquirys",
      },
      {
        id: 2,
        icon: <LuMessagesSquare />,
        label: "Newslatters",
        path: "/newslatters",
      },
    ],
  },
  {
    id: 4,
    icon: <MdOutlineWaterDrop />,
    label: "Color",
    arrow: <IoIosArrowDown />,
    dropdown: [
      {
        id: 1,
        icon: <SiMaterialdesignicons />,
        label: "Add Color",
        path: "/add-color",
      },
      {
        id: 2,
        icon: <SiMaterialdesignicons />,
        label: "View Color",
        path: "/view-color",
      },
    ],
  },
  {
    id: 5,
    icon: <SiMaterialdesignicons />,
    label: "Materials",
    arrow: <IoIosArrowDown />,
    dropdown: [
      {
        id: 1,
        icon: <SiMaterialdesignicons />,
        label: "Add Material",
        path: "/add-material",
      },
      {
        id: 2,
        icon: <SiMaterialdesignicons />,
        label: "View Material",
        path: "/view-material",
      },
    ],
  },
  {
    id: 6,
    icon: <AiOutlineAlignLeft />,
    label: "Parent Categorys",
    arrow: <IoIosArrowDown />,
    dropdown: [
      {
        id: 1,
        icon: <AiOutlineAlignLeft />,
        label: "Add Parent Category",
        path: "/add-parent-category",
      },
      {
        id: 2,
        icon: <AiOutlineAlignLeft />,
        label: "View Parent Category",
        path: "/view-parent-category",
      },
    ],
  },
  {
    id: 7,
    icon: <AiOutlineAlignLeft />,
    label: "Sub Categorys",
    arrow: <IoIosArrowDown />,
    dropdown: [
      {
        id: 1,
        icon: <AiOutlineAlignLeft />,
        label: "Add Sub Category",
        path: "/add-sub-category",
      },
      {
        id: 2,
        icon: <AiOutlineAlignLeft />,
        label: "View Sub Category",
        path: "/view-sub-category",
      },
    ],
  },
  {
    id: 8,
    icon: <AiOutlineAlignLeft />,
    label: "Sub sub Categorys",
    arrow: <IoIosArrowDown />,
    dropdown: [
      {
        id: 1,
        icon: <AiOutlineAlignLeft />,
        label: "Add Sub Sub Category",
        path: "/add-sub-sub-category",
      },
      {
        id: 2,
        icon: <AiOutlineAlignLeft />,
        label: "View Sub Sub Category",
        path: "/view-sub-sub-category",
      },
    ],
  },
  {
    id: 9,
    icon: <FaShoppingBag />,
    label: "Products",
    arrow: <IoIosArrowDown />,
    dropdown: [
      {
        id: 1,
        icon: <FaShoppingBag />,
        label: "Add Product",
        path: "/add-product",
  },{
        id: 2,
        icon: <FaShoppingBag />,
        label: "View Product",
        path: "/view-product",
      },
    ],
  },
  {
    id: 10,
    icon: <SlQuestion />,
    label: "Why Choose Us",
    arrow: <IoIosArrowDown />,
    dropdown: [
      {
        id: 1,
        icon: <SlQuestion />,
        label: "Add Why Choose Us",
        path: "/add-why-choose-us",
  },{
        id: 2,
        icon: <SlQuestion />,
        label: "View Why Choose Us",
        path: "/view-why-choose-us",
      },
    ],
  },
  {
    id: 11,
    icon: <LuNotebookPen />,
    label: "Order",
    arrow: <IoIosArrowDown />,
    dropdown: [
      {
        id: 1,
        icon: <LuNotebookPen />,
        label: "Add Order",
        path: "/add-order",
  },],
  },
  {
    id: 12,
    icon: <FaSliders />,
    label: "Slider",
    arrow: <IoIosArrowDown />,
    dropdown: [
      {
        id: 1,
        icon: <FaSliders />,
        label: "Add Slider",
        path: "/add-slider",
  },{
        id: 2,
        icon: <FaSliders />,
        label: "View Slider",
        path: "/view-slider",
  },
  ],
},
  {
    id: 13,
    icon: <FaLocationArrow />,
    label: "Country",
    arrow: <IoIosArrowDown />,
    dropdown: [
      {
        id: 1,
        icon: <FaLocationArrow />,
        label: "Add Country",
        path: "/add-country",
  },{
        id: 2,
        icon: <FaLocationArrow />,
        label: "View Country",
        path: "/view-country",
  },],
},
  {
    id: 14,
    icon: <LuUserRoundPen />,
    label: "Testimonials",
    arrow: <IoIosArrowDown />,
    dropdown: [
      {
        id: 1,
        icon: <LuUserRoundPen />,
        label: "Add Testimonials",
        path    : "/add-testimonials",
  },{
        id: 2,
        icon: <LuUserRoundPen />,
        label: "View Testimonials",
        path: "/view-testimonials",
  },],
},
  {
    id: 15,
    icon: <LuMessagesSquare />,
    label: "Faqs",
    arrow: <IoIosArrowDown />,
    dropdown: [
      {
        id: 1,
        icon: <LuMessagesSquare />,
        label: "Add Faqs",
        path    : "/add-faqs",
  },{
        id: 2,
        icon: <LuMessagesSquare />,
        label: "View Faqs",
        path: "/view-faqs",
  },],
},
  {
    id: 16,
    icon: <MdOutlineEventNote />,
    label: "Terms & Conditions",
    arrow: <IoIosArrowDown />,
  },
];
