import "./index.less";

import { Button, Modal, notification, Progress, Space, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import classNames from "classnames";
import { useCallback, useState } from "react";

import { BASE_URL } from "@/utils/baseUrl";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";

export interface UploadImageProps {
  value?: string;
  onChange?: (value: string | null) => void;
  action?: Parameters<typeof Upload>[0]["action"];
}

const UPLOAD_ACTION = `${BASE_URL}/api/v2/upload?folder=photos`;

export const UploadImage = (props: UploadImageProps) => {
  const { value, onChange, action = UPLOAD_ACTION } = props;
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
          message: "上传失败，请稍后重试",
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
      <div className={classNames("custom-icon", { "no-border": !value })}>
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
            <img src={value} width={54} />
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
        action={action}
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
