import type { PageHeader as PageHeaderContent } from "@/lib/sanity/types";

type Props = {
  content?: PageHeaderContent | null;
  /** Valeurs affichées tant que rien n'est saisi dans le CMS. */
  fallback: PageHeaderContent;
};

/**
 * En-tête des pages simples (Nos Chats, Nos Chatons, Contact, pages légales).
 * Chaque morceau vient du CMS quand il est rempli, sinon du texte de repli.
 */
export default function PageHeader({ content, fallback }: Props) {
  const sectionLabel = content?.sectionLabel ?? fallback.sectionLabel;
  const titlePrefix = content?.titlePrefix ?? fallback.titlePrefix;
  const titleEmphasis = content?.titleEmphasis ?? fallback.titleEmphasis;
  const titleSuffix = content?.titleSuffix ?? fallback.titleSuffix;
  const introText = content?.introText ?? fallback.introText;

  return (
    <>
      {sectionLabel && (
        <p className="section-label" style={{ justifyContent: "center" }}>
          {sectionLabel}
        </p>
      )}

      <h1
        className="title-hero"
        style={{ textAlign: "center", fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
      >
        {titlePrefix ? `${titlePrefix} ` : ""}
        {titleEmphasis && <em>{titleEmphasis}</em>}
        {titleSuffix ? ` ${titleSuffix}` : ""}
      </h1>

      {introText && (
        <p className="body-text" style={{ margin: "0 auto", textAlign: "center" }}>
          {introText}
        </p>
      )}
    </>
  );
}
