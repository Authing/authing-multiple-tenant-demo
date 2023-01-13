import { createElement, ReactNode } from "react";
import { HeadingComponent } from "react-markdown/lib/ast-to-react";
import { Options as TocOptions } from "rehype-toc";

const getReactElementText = (children: ReactNode | ReactNode[]) => {
  if (typeof children === "string") return children;
  if (!Array.isArray(children)) return "";
  const texts: string[] = [];
  const str = children.reduce((str, child: any) => {
    if (typeof child !== "object") return child as string;
    if (child?.props?.children?.length) {
      str += getReactElementText(child?.props?.children);
    }
    return str;
  }, "");
  texts.push(str as string);
  return texts.join("");
};

export const MdHeading: HeadingComponent = ({ level, children }) => {
  const titleStr = getReactElementText(children);
  const id = `${level}-${titleStr}`;
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
