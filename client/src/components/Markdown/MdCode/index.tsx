import "./index.less";

import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";

import { Code, CodeProps } from "@/components/Code";
import { CopyOutlined } from "@ant-design/icons";

export type MarkdownCodeType = NonNullable<
  ReactMarkdownOptions["components"]
>["code"];

export const MdCode: MarkdownCodeType = ({ children, ...res }) => {
  const language = res?.className?.match(/language-(\w+)/)?.[1];
  return (
    <div className="markdown-code-wrapper">
      <Code
        mode={language as CodeProps["mode"]}
        value={children?.toString()}
        minHeight="30"
        editable={false}
        basicSetup={{ highlightActiveLineGutter: false }}
      />
      <CopyOutlined className="md-code-copy" />
    </div>
  );
};
