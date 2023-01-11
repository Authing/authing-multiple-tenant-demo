import "./index.less";

import {
  Button,
  ButtonProps,
  Form,
  FormItemProps,
  Input,
  notification,
  Select,
  SelectProps,
  Skeleton,
} from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getInviteLink, sendInviteEmails } from "@/api/organization";
import { useGlobalState } from "@/context/globalContext";

const ExpireOptions = [
  { label: "1天", value: "1" },
  { label: "3天", value: "3" },
  { label: "7天", value: "7" },
  { label: "永久", value: "none" },
];

const LinkCopy = (props: { value?: string }) => {
  const { value } = props;
  return (
    <Skeleton active paragraph={false} loading={!value}>
      <div>{value}</div>
    </Skeleton>
  );
};

const ExpireSelect = (props: Partial<SelectProps>) => {
  const { value, onChange, options } = props;
  return (
    <div>
      <span>有效期为</span>
      &nbsp;
      <Select
        value={value}
        style={{ width: "5em" }}
        onChange={onChange}
        options={options}
      />
    </div>
  );
};

const EmailSelect = (
  props: Partial<SelectProps & { submitBtn: ButtonProps }>
) => {
  const { submitBtn, ...selectProps } = props;
  return (
    <Input.Group size="large" compact>
      <Select mode="tags" style={{ width: "80%" }} {...selectProps}></Select>
      <Button type="primary" {...submitBtn}>
        邀请
      </Button>
    </Input.Group>
  );
};

export const InviteUser = () => {
  const [form] = Form.useForm();
  const [{ appId }] = useGlobalState();
  const [searchParams] = useSearchParams();
  const [, setUpdate] = useState({});
  const formValues = form.getFieldsValue();
  const [validityTerm, setValidityTerm] = useState("7");
  const [inviteLoading, setInviteLoading] = useState(false);
  const tenantId = searchParams.get("tenant_id")!;

  useEffect(() => {
    if (!appId || !validityTerm || !tenantId) return;
    getInviteLink({
      validityTerm,
      appId,
      tenantId,
    }).then(({ data }) => {
      const link = data?.list?.[0]?.inviteLink;
      form.setFieldsValue({ "invite-link": link });
    });
  }, [validityTerm, appId, tenantId]);

  const handleInvite = useCallback(async () => {
    const data = await form.validateFields(["emails"]);
    setInviteLoading(true);
    const { data: { list } = {} } = await getInviteLink({
      validityTerm,
      appId,
      tenantId,
      emails: data?.emails,
    });
    const recordIds = list?.map((it) => it.recordId) ?? [];
    return sendInviteEmails({ recordIds })
      .then(() => {
        form.setFieldsValue({ emails: [] });
        notification.success({ message: "邀请成功" });
      })
      .catch((e) => {
        notification.success({ message: e?.message ?? "邀请失败" });
      })
      .finally(() => {
        setInviteLoading(false);
      });
  }, [form]);

  const inviteButtonProps = useMemo<ButtonProps>(
    () => ({
      onClick: handleInvite,
      disabled: !formValues.emails?.length,
      loading: inviteLoading,
    }),
    [formValues, handleInvite]
  );

  const formItems = useMemo(
    () =>
      [
        {
          label: <h4>通过链接邀请：</h4>,
          name: "invite-link",
          children: <LinkCopy />,
        },
        {
          label: <h4>邀请有效期：</h4>,
          children: (
            <ExpireSelect
              value={validityTerm}
              options={ExpireOptions}
              onChange={setValidityTerm}
            />
          ),
        },
        {
          label: <h4>通过邮件邀请：</h4>,
          name: "emails",
          rules: [
            {
              type: "array",
              defaultField: { type: "email", message: "邮箱格式不正确" },
            },
          ],
          children: (
            <EmailSelect
              submitBtn={inviteButtonProps}
              onChange={() => setUpdate({})}
            />
          ),
        },
      ] as FormItemProps[],
    [inviteButtonProps]
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
