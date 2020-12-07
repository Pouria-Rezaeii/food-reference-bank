import { IRules } from "./models";

const rules: IRules = {
  user: {
    static: [],
  },
  company: {
    static: ["company:edit" , "company:manage-site"],
  },
  admin: {
    static: [
      "company:edit", ///********havasm bashe in vas admin nist  */
      "main-site:edit",
      "company:create",
	  "company:companylist",
      "category:update",
      "category:read",
      "category:delete",
      "category:create",
	"company:manage-site"
    ],
  },
};

export default rules;
