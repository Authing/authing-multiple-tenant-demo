import { BrandSetting } from "@/pages/BrandSetting";
import { CreateOrganization } from "@/pages/CreateOrganization";
import { DocExplain } from "@/pages/DocExplain";
import { GetStart } from "@/pages/GetStart";
import { InviteUser } from "@/pages/InviteUser";
import { PleaseLogin } from "@/pages/PleaseLogin";
import { TravelStep } from "@/pages/TravelStep";
import { StepConfig, STEP_KEYS } from "@/pages/TravelStep/stepConfig";
import { Navigate, RouteObject } from "react-router-dom";
import { Layout } from "../components/Layout";

export default [
  {
    path: "/",
    id: "root",
    // element: <Layout />,
    children: [
      { index: true, element: <Navigate to={"/please-login"} /> },
      {
        path: "/please-login",
        id: "login",
        element: <PleaseLogin />,
      },
      {
        path: "/step",
        element: <TravelStep />,
        children: [
          {
            index: true,
            element: (
              <Navigate
                to={`/step/${StepConfig[STEP_KEYS.CREATE_ORGANIZTION].path}`}
              />
            ),
          },
          {
            path: `/step/${StepConfig[STEP_KEYS.CREATE_ORGANIZTION].path}`,
            id: STEP_KEYS.CREATE_ORGANIZTION,
            element: <CreateOrganization />,
          },
          {
            path: `/step/${StepConfig[STEP_KEYS.INVITE_USER].path}`,
            id: STEP_KEYS.INVITE_USER,
            element: <InviteUser />,
          },
          {
            path: `/step/${StepConfig[STEP_KEYS.BRAND_SETTING].path}`,
            id: STEP_KEYS.BRAND_SETTING,
            element: <BrandSetting />,
          },
          {
            path: `/step/${StepConfig[STEP_KEYS.DOC_EXPLAIN].path}`,
            id: STEP_KEYS.DOC_EXPLAIN,
            element: <DocExplain />,
          },
        ],
      },
      { path: "/get-started", id: "get-started", element: <GetStart /> },
    ],
  },
] as RouteObject[];
