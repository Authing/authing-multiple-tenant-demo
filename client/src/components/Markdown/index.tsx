import ReactMarkdown from "react-markdown";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { MdCode } from "./MdCode";
import { MdHeading } from "./MdHeading";

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
    img: ({ node, ...res }) => <img style={{ marginBottom: "1em" }} {...res} />,
  };
  return (
    <ReactMarkdown
      children={markdown}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={components}
    />
  );
};
