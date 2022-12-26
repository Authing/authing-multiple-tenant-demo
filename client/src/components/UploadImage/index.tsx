import "./index.less";

import { Button, Modal, notification, Progress, Space, Upload } from "antd";

import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import env from "@/config/env";
import { useCallback, useState } from "react";
import defaultIcon from "./defaultIcon.svg";
import { RcFile } from "antd/es/upload";

const BASEURL = env("API_BASE_URL");

export interface UploadImageProps {
  value?: string;
  onChange?: (value: string | null) => void;
}

export const UploadImage = (props: UploadImageProps) => {
  const { value, onChange } = props;
  const [upLoading, setUpLoading] = useState(false);
  const [upLoadPercent, setUpLoadPercent] = useState(0);
  const handleBeforeUpload = useCallback((file: RcFile) => {
    if (
      ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"].includes(
        file.type
      ) &&
      file.size / 1024 / 1024 <= 1
    ) {
      setUpLoading(true);
      return true;
    }
    notification.error({
      message: "上传失败，请注意上传图片的格式、尺寸和大小",
    });
    return false;
  }, []);
  const handleChange = useCallback<
    NonNullable<Parameters<typeof Upload>[0]["onChange"]>
  >(
    (info) => {
      const file = info?.file;
      setUpLoadPercent(file?.percent!);
      if (file?.status === "done") {
        setUpLoading(false);
        setUpLoadPercent(0);
        onChange?.(file?.response?.data?.url);
      }
      if (file?.status === "error") {
        setUpLoading(false);
        setUpLoadPercent(0);
        notification.error({
          message: "上传失败，请检查网络后重试",
        });
      }
    },
    [onChange]
  );
  const handleDelete = useCallback(() => {
    Modal.confirm({
      title: "提示",
      content: "确定删除并恢复默认图标?",
      okCancel: true,
      cancelText: "取消",
      okText: "确定",
      onOk: () => onChange?.(null),
    });
  }, []);
  return (
    <Space className="upload-wrapper">
      <div className="custom-icon">
        <div className="icon">
          {upLoading ? (
            <Progress
              showInfo={false}
              width={40}
              type="circle"
              strokeColor="#1890ff"
              percent={upLoadPercent}
            />
          ) : (
            <img src={value ?? defaultIcon} width={54} />
          )}
        </div>
        {value && (
          <div className="mask" onClick={handleDelete}>
            <DeleteOutlined />
          </div>
        )}
      </div>
      <Upload
        accept=".jpg,.jpeg,.png,.svg"
        listType="text"
        action={`${BASEURL}/api/v2/upload?folder=photos`}
        showUploadList={false}
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}
      >
        <Button className="upload-btn">
          <UploadOutlined />
          上传图标
        </Button>
      </Upload>
    </Space>
  );
};
