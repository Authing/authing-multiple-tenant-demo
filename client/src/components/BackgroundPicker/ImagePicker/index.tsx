import "./index.less";

import {
  Button,
  Modal,
  notification,
  Progress,
  Select,
  Space,
  Upload,
} from "antd";
import { RcFile, UploadFile } from "antd/es/upload";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import env from "@/config/env";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const BASE_PATH = env("API_BASE_URL");
export interface ImagePickerProps {
  value?: string;
  onChange?: (value: string | null) => void;
}

const ImageLayoutEnum = {
  COVER: { label: "充满屏幕", value: "center/cover" },
  CONTAIN: { label: "适合于屏幕", value: "center/contain no-repeat" },
  FULL: { label: "拉伸以充满屏幕", value: "center/100% 100%" },
  CENTER: { label: "居中", value: "center  no-repeat" },
  REPEAT: { label: "平铺", value: "repeat" },
} as const;

const REGEXPS = Object.entries(ImageLayoutEnum).map(
  ([key, it]) =>
    [key, RegExp(`\\s+${it?.value}$`)] as [keyof typeof ImageLayoutEnum, RegExp]
);

export const ImagePicker = (props: ImagePickerProps) => {
  const { value, onChange } = props;
  const [upLoadReady, setUpLoadReady] = useState(true); // 是否可以上传
  const [upLoadPercent, setUpLoadPercent] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const fileRef = useRef<UploadFile>();
  const btnRef = useRef<HTMLElement>(null);
  const [imageLayout, setImageLayout] =
    useState<keyof typeof ImageLayoutEnum>("COVER");
  const handleBeforeUpload = useCallback((file: RcFile) => {
    setUploadError(false);
    if (
      ["image/png", "image/jpeg", "image/jpg"].includes(file?.type) &&
      file?.size / 1024 / 1024 <= 2
    ) {
      setUpLoadReady(false);
      return true;
    }
    setUploadError(true);
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
        setUpLoadReady(true);
        setUpLoadPercent(0);
        const url = file?.response?.data?.url;
        const layout = ImageLayoutEnum[imageLayout];
        const background = `url(${url}) ${layout?.value}`;
        onChange?.(background);
        fileRef.current = file;
      }
      if (file?.status === "error") {
        setUpLoadPercent(0);
        notification.error({
          message: "上传失败，请稍后重试",
        });
        setUploadError(true);
      }
    },
    [onChange]
  );
  const handleUploadingClick = useCallback(
    (e: any) => {
      if (uploadError) return;
      notification.warning({ message: "正在上传，请稍后" });
      e.stopPropagation();
    },
    [uploadError]
  );
  const handleDelete = useCallback(() => {
    Modal.confirm({
      title: "确定删除该背景图片吗？",
      okCancel: true,
      onOk: () => {
        onChange?.(null);
      },
    });
  }, [onChange]);
  const handleReUpload = useCallback(() => {
    btnRef.current?.click?.();
  }, []);

  const ImageLayoutOptions = useMemo(() => {
    return Object.entries(ImageLayoutEnum).map((it) => ({
      ...it?.[1],
      label: it?.[1]?.label,
      value: it?.[0],
    }));
  }, []);

  const handleSelect = useCallback(
    (imageLayout: keyof typeof ImageLayoutEnum) => {
      setImageLayout(imageLayout);
      const url = fileRef.current?.response?.data?.url;
      const layout = ImageLayoutEnum[imageLayout];
      if (!url) return;
      const background = `url(${url}) ${layout?.value}`;
      onChange?.(background);
    },
    [onChange]
  );

  useEffect(() => {
    if (!value) return;
    const [layout] = REGEXPS.find(([, it]) => it.test(value)) ?? [];
    if (!layout) return;
    setImageLayout(layout);
    const url = value?.match(/url\(\s*(['"]!?)(.*)(\1)\s*\)/)?.[2];
    if (url) {
      fileRef.current = {
        uid: Math.random().toString(16).slice(2),
        name: url?.match(/\/([^/]+)$/)?.[1]!,
        response: { data: { url } },
      };
    }
  }, [value]);

  return (
    <>
      <Upload
        className={classNames("authing-mtd-image-picker-upload", {
          "no-dashborder": !!value || !upLoadReady,
        })}
        accept=".jpg,.jpeg,.png"
        listType="picture-card"
        showUploadList={false}
        action={`${BASE_PATH}/api/v2/upload?folder=photos`}
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}
      >
        {upLoadReady ? (
          value ? (
            <div
              className="mtd-picture-mask"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mtd-picture" style={{ background: value }}>
                <Space className="mtd-picture-model" size={32}>
                  <div className="mtd-picture-delete" onClick={handleDelete}>
                    <DeleteOutlined />
                    删除
                  </div>
                  <div className="mtd-picture-reload" onClick={handleReUpload}>
                    <ReloadOutlined />
                    重传
                  </div>
                </Space>
              </div>
            </div>
          ) : (
            <div>
              <PlusOutlined />
              <div className="upload-cover-title">点击或拖入图片</div>
              <div className="upload-cover-desc">JPG、JPEG、PNG 不超过 2 M</div>
            </div>
          )
        ) : (
          <div onClick={handleUploadingClick}>
            {!uploadError ? (
              <>
                <div>{fileRef.current?.name}</div>
                <Progress
                  showInfo={false}
                  width={40}
                  percent={upLoadPercent}
                  style={{ width: "60%" }}
                  status={uploadError ? "exception" : "active"}
                />
              </>
            ) : (
              <div className="mtd-upload-error">
                <div>
                  <ExclamationCircleOutlined />
                  &nbsp;上传失败
                </div>
                <Button type="link">点击重试</Button>
              </div>
            )}
          </div>
        )}
        <Button style={{ display: "none" }} ref={btnRef} />
      </Upload>
      {value && (
        <Select
          value={imageLayout}
          className="authing-mtd-image-picker-select"
          options={ImageLayoutOptions}
          onChange={handleSelect}
        ></Select>
      )}
    </>
  );
};
