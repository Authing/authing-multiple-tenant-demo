import "./index.less";

import { Button, Form, FormItemProps, Input, notification, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createOrg } from "@/api/organization";
import { UploadImage } from "@/components/UploadImage";
import { DefaultTenantLogo } from "@/constants";

import { StepConfig, STEPS } from "../TravelStep/stepConfig";
import { useGlobalState } from "@/context/globalContext";

export const CreateOrganization = () => {
  const [{ appId }] = useGlobalState();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const nav = useNavigate();

  const formItems = useMemo(
    () =>
      [
        {
          label: <h4>组织名称</h4>,
          rules: [{ required: true, message: "请输入企业或组织机构名称" }],
          name: "name",
          children: <Input placeholder="请输入企业或组织机构名称" />,
        },
        {
          label: <h4>组织描述</h4>,
          name: "description",
          children: <TextArea placeholder="请输入组织描述" />,
        },
        {
          label: <h4>组织头像</h4>,
          name: "logo",
          initialValue: DefaultTenantLogo,
          children: <UploadImage />,
        },
      ] as FormItemProps[],
    []
  );

  const handleSubmit = useCallback(() => {
    form.validateFields().then((data) => {
      setLoading(true);
      createOrg({
        name: data?.name,
        appIds: [appId],
        logo: data?.logo,
        description: data?.description,
      })
        .then(() => {
          notification.success({ message: "创建组织成功" });
          nav(`/step/${StepConfig[STEPS.step2].path}`);
        })
        .catch(() => {
          notification.error({ message: "创建组织失败" });
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, [form, appId]);

  const handleClear = useCallback(() => {
    form.resetFields();
  }, [form]);
  return (
    <div className="authing_mtd-create-organization">
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
      <Space size={24} className="mtd-btn">
        <Button type="primary" loading={loading} onClick={handleSubmit}>
          创建
        </Button>
        <Button onClick={handleClear}>清空</Button>
      </Space>
    </div>
  );
};
