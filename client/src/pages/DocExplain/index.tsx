import "./index.less";

import env from "@/config/env";

export const DocExplain = () => {
  return (
    <div className="authing_mtd-doc-explain">
      <h4 className="mtd-title">创建租户</h4>
      <h4 className="mtd-title">修改租户信息</h4>
      <h4 className="mtd-title">创建租户成员</h4>
      <h4 className="mtd-title">修改租户成员信息</h4>
      <h4 className="mtd-title">
        更多 API 可查看&nbsp;
        <a href={env("DOC_API_URL")}>{env("DOC_API_URL")}</a>
      </h4>
    </div>
  );
};
