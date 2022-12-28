import "./index.less";

import { Button, Col, Form, FormItemProps, Input, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { UploadImage } from "@/components/UploadImage";

import { STEP_KEYS, StepConfig } from "../TravelStep/stepConfig";

export const CreateOrganization = () => {
  const [form] = Form.useForm();
  const nav = useNavigate();

  const formItems = useMemo(
    () =>
      [
        {
          label: <h4>组织名称</h4>,
          required: true,
          name: "name",
          children: <Input placeholder="请输入企业或组织机构名称" />,
        },
        {
          label: <h4>组织描述</h4>,
          name: "descption",
          children: <TextArea placeholder="请输入组织描述" />,
        },
        { label: <h4>组织头像</h4>, name: "logo", children: <UploadImage /> },
      ] as FormItemProps[],
    []
  );
  const handleSubmit = useCallback(() => {
    const data = form.getFieldsValue();
    console.log("提交表单：", data);
    nav(`/step/${StepConfig[STEP_KEYS.INVITE_USER].path}`);
  }, []);
  const handleClear = useCallback(() => {
    form.resetFields();
  }, [form]);
  return (
    <div className="authing-mtd-create-organization">
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
        <Button type="primary" onClick={handleSubmit}>
          创建
        </Button>
        <Button onClick={handleClear}>清空</Button>
      </Space>
    </div>
  );
};
