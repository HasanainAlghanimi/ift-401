// components/PageHeader.tsx
import React from "react";

type Props = { title: string; subtitle?: string; actions?: React.ReactNode };

export default function PageHeader({ title, subtitle, actions }: Props) {
  return (
    <section className="pageheader">
      <div className="pageheader__text">
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {actions ? <div className="pageheader__actions">{actions}</div> : null}
    </section>
  );
}
