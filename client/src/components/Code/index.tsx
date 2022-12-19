import { color } from "@uiw/codemirror-extensions-color";
import { langs } from "@uiw/codemirror-extensions-langs";
import { materialDark } from "@uiw/codemirror-theme-material";
import CodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";

export interface CodeProps extends ReactCodeMirrorProps {
  mode: keyof typeof langs;
}

export const Code = (props: CodeProps) => {
  const { mode, ...mirrorProps } = props;
  return (
    <CodeMirror
      minHeight="150px"
      theme={materialDark}
      extensions={[color, langs[mode]()]}
      {...mirrorProps}
      basicSetup={{
        lineNumbers: true,
        indentOnInput: true,
        autocompletion: true,
        highlightActiveLine: false,
        ...(mirrorProps?.basicSetup as any),
      }}
    />
  );
};
