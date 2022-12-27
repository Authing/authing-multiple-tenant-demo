import "./index.less";

import { Form, FormItemProps, Switch, Tooltip } from "antd";
import classNames from "classnames";
import { useCallback } from "react";

import env from "@/config/env";
import {
  GuardGlobalStateProps,
  useGuardGlobalState,
} from "@/context/guardContext";
import { BASE_URL } from "@/utils/baseUrl";
import { QuestionCircleOutlined, RightOutlined } from "@ant-design/icons";

import { BackgroundPicker } from "../BackgroundPicker";
import { Code } from "../Code";
import { UploadImage } from "../UploadImage";
import { default as defaultCodeCss } from "./default-code-css.css";

export interface GuardConfigPannelProps {
  className?: string;
  style?: React.CSSProperties;
}

const UPLOAD_ACTION = `${BASE_URL}/api/v2/upload?folder=photos`;

export const GuardConfigPannel = (props: GuardConfigPannelProps) => {
  const { style, className } = props;
  const [form] = Form.useForm();
  const [guardState, setGuardState] = useGuardGlobalState();

  const handleFormValuesChange = useCallback(
    (values: any, allValues: GuardGlobalStateProps) => {
      setGuardState(allValues);
    },
    []
  );

  const formItems = (
    [
      {
        label: (
          <div>
            <div className="mtd-label-header">自定义背景</div>
            <span className="mtd-label-desc">登录框加载和展示的背景</span>
          </div>
        ),
        name: ["publicConfig", "loadingBackground"],
        children: <BackgroundPicker action={UPLOAD_ACTION} />,
      },
      {
        label: (
          <div>
            <div className="mtd-label-header">自定义加载图标</div>
            <span className="mtd-label-desc">登录框加载时将会展示</span>
          </div>
        ),
        name: ["publicConfig", "customLoading"],
        children: <UploadImage action={UPLOAD_ACTION} />,
      },
      {
        label: (
          <div>
            <div className="mtd-label-header">
              自定义 CSS
              <Tooltip
                title={
                  <>
                    不知道怎么写？
                    <a
                      href={`${env(
                        "DOC_HOST"
                      )}/guides/customize/global-guard/#%E8%87%AA%E5%AE%9A%E4%B9%89-css`}
                      // eslint-disable-next-line react/jsx-no-target-blank
                      target="_blank"
                    >
                      查看教程
                      <RightOutlined />
                    </a>
                  </>
                }
              >
                <QuestionCircleOutlined
                  style={{
                    color: "#00000073",
                    marginLeft: 4,
                  }}
                />
              </Tooltip>
            </div>
            <span className="mtd-label-desc">实现更精细的登录样式配置</span>
          </div>
        ),
        className: "authing-mtd-switch-css",
        name: ["publicConfig", "cssEnabled"],
        valuePropName: "checked",
        children: <Switch />,
      },
      form.getFieldValue(["publicConfig", "cssEnabled"]) && {
        noStyle: true,
        name: ["publicConfig", "css"],
        initialValue: defaultCodeCss,
        children: <Code className="authing-mtd-code-css" mode="css" />,
      },
    ] as FormItemProps[]
  ).filter(Boolean);
  return (
    <div
      className={classNames("authing-mtd-guard-config-pannel", className)}
      style={style}
    >
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleFormValuesChange}
      >
        {formItems.map((it, i) => (
          <Form.Item key={i} {...it} />
        ))}
      </Form>
    </div>
  );
};
