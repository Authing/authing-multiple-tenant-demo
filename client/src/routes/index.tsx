import { BrandSetting } from "@/pages/BrandSetting";
import { CreateOrganization } from "@/pages/CreateOrganization";
import { DocExplain } from "@/pages/DocExplain";
import { GetStart } from "@/pages/GetStart";
import { InviteUser } from "@/pages/InviteUser";
import { Home } from "@/pages/Home";
import { TravelStep } from "@/pages/TravelStep";
import { StepConfig, STEPS } from "@/pages/TravelStep/stepConfig";
import { Navigate, RouteObject } from "react-router-dom";
import { Layout } from "../components/Layout";

export default [
  {
    path: "/home",
    id: "home",
    element: <Home />,
  },
  {
    path: "/",
    id: "root",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/home" /> },
      {
        path: "/step",
        element: <TravelStep />,
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
