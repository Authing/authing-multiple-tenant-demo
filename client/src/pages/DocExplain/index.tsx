import "./index.less";

import { Markdown } from "@/components/Markdown";

import markdownText from "./explain.md?raw";

export const DocExplain = () => {
  return (
    <div className="authing_mtd-doc-explain">
      <Markdown markdown={markdownText} />
    </div>
  );
};
