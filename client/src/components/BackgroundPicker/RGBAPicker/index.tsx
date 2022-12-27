import "./index.less";

import { Popover } from "antd";

import { useCallback } from "react";
import { SketchPicker } from "react-color";

export interface RGBAPickerProps {
  value?: string;
  onChange?: (value: string) => void;
}
export const RGBAPicker = (props: RGBAPickerProps) => {
  const { value, onChange } = props;
  const handleChange = useCallback<
    NonNullable<ConstructorParameters<typeof SketchPicker>[0]["onChange"]>
  >(
    ({ rgb }) => {
      const initRgba = `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
      onChange?.(initRgba);
    },
    [onchange]
  );

  return (
    <div className="authing-mtd-rgba-picker-color">
      <Popover content={<SketchPicker color={value} onChange={handleChange} />}>
        <div className="color-show-area" style={{ backgroundColor: value }} />
      </Popover>
    </div>
  );
};
