import "./index.less";

import { Button, Form, FormItemProps, Input, notification, Select } from "antd";
import { useCallback, useMemo, useState } from "react";

const ExpireOptions = [
  { label: "1天", value: "1" },
  { label: "3天", value: "3" },
  { label: "7天", value: "7" },
  { label: "永久", value: "none" },
];

const EmailSelect = (props: any) => {
  return (
    <Input.Group size="large" compact>
      <Select mode="tags" style={{ width: "80%" }} {...props}></Select>
      <Button type="primary" onClick={props?.onSubmit}>
        邀请
      </Button>
    </Input.Group>
  );
};

export const InviteUser = () => {
  const [form] = Form.useForm();
  const [expire, setExpire] = useState<string>("7");
  const handleInvite = useCallback(() => {
    form.validateFields(["email"]).then((data) => {
      console.log("校验成功，可以调接口", data);
      //TODO: 调接口
      notification.success({ message: "邀请成功" });
    });
  }, []);
  const handleExpireSelect = useCallback<
    NonNullable<Parameters<typeof Select>[0]["onChange"]>
  >((value) => {
    setExpire(value as string);
  }, []);
  const formItems = useMemo(
    () =>
      [
        {
          label: <h4>通过链接邀请：</h4>,
          children: "ddd",
        },
        {
          label: <h4>邀请有效期</h4>,
          children: (
            <div>
              <span>有效期为</span>
              &nbsp;
              <Select
                value={expire}
                style={{ width: "5em" }}
                onChange={handleExpireSelect}
                options={ExpireOptions}
              />
            </div>
          ),
        },
        {
          label: <h4>通过邮件邀请：</h4>,
          name: "email",
          rules: [
            {
              type: "array",
              defaultField: { type: "email", message: "邮箱格式不正确" },
            },
          ],
          children: <EmailSelect onSubmit={handleInvite} />,
        },
      ] as FormItemProps[],
    []
  );
  return (
    <div className="authing_mtd-invite-user">
      <Form
        className="mtd-form"
        form={form}
        layout="vertical"
        wrapperCol={{ span: 14 }}
      >
        {formItems.map((it, i) => (
          <Form.Item key={i} {...it} />
        ))}
      </Form>
    </div>
  );
};
