import { BrandSetting } from "@/pages/BrandSetting";
import { CreateOrganization } from "@/pages/CreateOrganization";
import { DocExplain } from "@/pages/DocExplain";
import { GetStart } from "@/pages/GetStart";
import { InviteUser } from "@/pages/InviteUser";
import { Login } from "@/pages/Login";
import { StepHome } from "@/pages/StepHome";
import { StepConfig, STEPS } from "@/pages/StepHome/stepConfig";
import { Navigate, RouteObject } from "react-router-dom";
import { Layout } from "../components/Layout";

export default [
  {
    path: "/login",
    id: "home",
    element: <Login />,
  },
  {
    path: "/",
    id: "root",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/login" /> },
      {
        path: "/step",
        element: <StepHome />,
        children: [
          {
            index: true,
            element: <Navigate to={`/step/${StepConfig[STEPS.step1].path}`} />,
          },
          {
            path: `/step/${StepConfig[STEPS.step1].path}`,
            id: STEPS.step1,
            element: <CreateOrganization />,
          },
          {
            path: `/step/${StepConfig[STEPS.step2].path}`,
            id: STEPS.step2,
            element: <InviteUser />,
          },
          {
            path: `/step/${StepConfig[STEPS.step3].path}`,
            id: STEPS.step3,
            element: <BrandSetting />,
          },
          {
            path: `/step/${StepConfig[STEPS.step4].path}`,
            id: STEPS.step4,
            element: <DocExplain />,
          },
        ],
      },
      { path: "/get-started", id: "get-started", element: <GetStart /> },
    ],
  },
] as RouteObject[];
