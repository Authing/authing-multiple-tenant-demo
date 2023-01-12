import ReactMarkdown from "react-markdown";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import { Options as TocOptions, toc } from "rehype-toc";
import remarkGfm from "remark-gfm";

import { MdCode } from "./MdCode";
import { MdHeading, MdTocConfig } from "./MdHeading";

export interface MarkdownType {
  markdown: string;
}
export const Markdown = (props: MarkdownType) => {
  const { markdown } = props;

  const components: ReactMarkdownOptions["components"] = {
    code: MdCode,
    h1: MdHeading,
    h2: MdHeading,
    h3: MdHeading,
    h4: MdHeading,
    h5: MdHeading,
    h6: MdHeading,
  };
  return (
    <ReactMarkdown
      children={markdown}
      rehypePlugins={[[toc, MdTocConfig], rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={components}
    />
  );
};
