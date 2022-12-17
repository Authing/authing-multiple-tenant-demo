import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export interface SandBoxContext {
  window: Window | null;
  document: Document | null;
  target: HTMLIFrameElement | null;
}

export interface SandBoxProps {
  children?: React.ReactNode;
  iframeProps?: React.IframeHTMLAttributes<any>;
  headContent?: React.ReactNode;
  /** 内部挂载节点 */
  mountedRoot?: string;
  style?: React.CSSProperties;
  className?: string;
  /** 组件挂载完成 */
  onMounted?: () => void;
  /** 组件初始化完成 */
  onLoaded?: (options?: SandBoxContext) => void;
}

export const SandBox = (props: SandBoxProps) => {
  const {
    children,
    onMounted,
    onLoaded,
    iframeProps,
    headContent,
    mountedRoot,
    className,
    style,
  } = props;
  const [isMounted, setIsMounted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const document = useMemo(
    () => iframeRef.current?.contentDocument,
    [iframeRef.current]
  );

  useEffect(() => {
    setIsMounted(true);
    onMounted?.();
    return () => setIsMounted(false);
  }, []);
  const handleLoaded = useCallback<React.ReactEventHandler<HTMLIFrameElement>>(
    (e) => {
      iframeProps?.onLoad?.(e);
      const target = e.currentTarget;
      const document = target?.contentDocument;
      const window = target?.contentWindow;
      onLoaded?.({ target, document, window });
    },
    []
  );
  const computedChildren = useMemo<React.ReactNode>(() => {
    if (!document) return null;
    const headDOM = createPortal(headContent, document?.head!);
    const root = mountedRoot
      ? document?.querySelector?.(mountedRoot ?? "") ?? document?.body
      : document?.body;
    const contentDOM = createPortal(children, root!);
    return [headDOM, contentDOM];
  }, [document, headContent, mountedRoot, children]);
  return (
    <div
      className={className}
      style={{ width: "100%", height: "100%", ...style }}
    >
      <iframe
        {...iframeProps}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          ...iframeProps?.style,
        }}
        ref={iframeRef}
        onLoad={handleLoaded}
      >
        {isMounted && computedChildren}
      </iframe>
    </div>
  );
};
