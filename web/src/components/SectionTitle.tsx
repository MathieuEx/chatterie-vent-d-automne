import type { ElementType } from "react";

type SectionTitleProps = {
  prefix?: string;
  emphasis: string;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
};

export default function SectionTitle({
  prefix,
  emphasis,
  as: Tag = "h2",
  className = "title-section",
  style,
}: SectionTitleProps) {
  return (
    <Tag className={className} style={style}>
      {prefix ? `${prefix} ` : null}
      <em>{emphasis}</em>
    </Tag>
  );
}
