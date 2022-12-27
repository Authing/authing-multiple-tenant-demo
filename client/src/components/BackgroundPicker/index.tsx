import { Radio } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";

import { RGBAPicker } from "./RGBAPicker";
import { ImagePicker } from "./ImagePicker";

export interface BackgroundPickerProps {
  value?: string;
  onChange?: (value: string | null) => void;
}

export enum BackgroundType {
  RGBA = "RGBA",
  URL = "URL",
}

const DEFAULT_COLOR = `rgba(248,249,255,100)`;

export const BackgroundPicker = (props: BackgroundPickerProps) => {
  const { value = DEFAULT_COLOR, onChange } = props;
  const valueMap: Record<BackgroundType, string | undefined> = useMemo(
    () => ({
      RGBA: value?.match?.(/^\s*(rgba\([^;]*\));?\s*$/)?.[1],
      URL: value?.match?.(/^\s*(url[^;]*);?\s*$/)?.[1],
    }),
    [value]
  );
  const [type, setType] = useState<BackgroundType>(BackgroundType.RGBA);

  useEffect(() => {
    if (!value) return;
    if (valueMap.RGBA) setType(BackgroundType.RGBA);
    else if (valueMap.URL) setType(BackgroundType.URL);
  }, [valueMap, value]);

  const handleChangeType = useCallback<
    NonNullable<Parameters<typeof Radio.Group>[0]["onChange"]>
  >(
    (e) => {
      const type = e?.target?.value;
      setType(type);
      onChange?.(value ?? DEFAULT_COLOR);
    },
    [value, onChange]
  );

  const handlePickerChange = useCallback(
    (color: string | null) => {
      onChange?.(color);
    },
    [onChange]
  );

  const Pickers: Record<BackgroundType, React.ReactNode> = useMemo(
    () => ({
      RGBA: <RGBAPicker value={valueMap.RGBA} onChange={handlePickerChange} />,
      URL: <ImagePicker value={valueMap.URL} onChange={handlePickerChange} />,
    }),
    [valueMap, handlePickerChange]
  );

  return (
    <>
      <Radio.Group value={type} onChange={handleChangeType}>
        <Radio value={BackgroundType.RGBA}>纯色背景</Radio>
        <Radio value={BackgroundType.URL}>图片背景</Radio>
      </Radio.Group>
      {Pickers[type]}
    </>
  );
};