import "./index.less";

import { Form, FormItemProps, Switch, Tooltip } from "antd";
import classNames from "classnames";
import { merge } from "lodash";
import { useCallback, useState } from "react";

import env from "@/config/env";
import { useGuardGlobalState } from "@/context/guardContext";
import { QuestionCircleOutlined, RightOutlined } from "@ant-design/icons";

export interface GuardConfigPannelProps {
  className?: string;
  style?: React.CSSProperties;
}

export const GuardConfigPannel = (props: GuardConfigPannelProps) => {
  const { style, className } = props;
  const [form] = Form.useForm();
  const [, setUpdate] = useState({});
  const [guardState, setGuardState] = useGuardGlobalState();

  const handleFormValuesChange = useCallback((values: any, allValues: any) => {
    setGuardState(merge({}, guardState, allValues));
  }, []);

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
      },
      {
        label: (
          <div>
            <div className="mtd-label-header">自定义加载图标</div>
            <span className="mtd-label-desc">登录框加载时将会展示</span>
          </div>
        ),
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
        children: <Switch onChange={() => setUpdate({})} />, // 强制刷新，更新组件
      },
      form.getFieldValue(["publicConfig", "cssEnabled"]) && {
        noStyle: true,
        name: ["publicConfig", "css"],
        children: <input />,
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
