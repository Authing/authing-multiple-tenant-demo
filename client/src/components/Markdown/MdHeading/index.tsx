import { createElement } from "react";
import { HeadingComponent } from "react-markdown/lib/ast-to-react";
import { Options as TocOptions } from "rehype-toc";

export const MdHeading: HeadingComponent = ({ level, children }) => {
  const id = `${level}-${children.toString()}`;
  return createElement(
    `h${level}`,
    { id },
    <a href={`#${id}`} style={{ color: "inherit" }}>
      {children}
    </a>
  );
};

export const MdTocConfig: TocOptions = {
  headings: ["h1", "h2", "h3", "h4", "h5", "h6"],
  customizeTOCItem: (toc, headings) => {
    const level = headings.tagName.match(/^h(\d+)$/)?.[1];
    const href = (title: string) => `#${level}-${title}`;
    toc.children.forEach((it: any) => {
      if (it.tagName === "a") {
        const title = it?.children
          ?.filter((ch: any) => ch?.type === "text")
          ?.map((it: any) => it?.value)
          ?.join("-");
        it.properties.href = href(title);
      }
    });
    return toc;
  },
};
