import { IRules } from "./models";

const rules: IRules = {
  user: {
    static: ["company:create"],
  },
  company: {
    static: ["company:edit", "company:manage-site","company:products"],
  },
  admin: {
    static: [
      "main-site:edit",
      "company:companylist",
      "category:update",
      "category:read",
      "category:delete",
      "category:create",
      "company:create",
    ],
  },
  adminCompany:{
    static:[
      "company:edit",
      "company:create",
      "main-site:edit",
      "company:companylist",
      "category:update",
      "category:read",
      "category:delete",
      "category:create",
      "company:manage-site",
      "company:products"
    ]
  },
};

export default rules;
