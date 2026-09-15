"use client";

import Image from "next/image";
import {
  FiArrowUpRight,
  FiAward,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import type { EducationItem } from "@/app/data/about";

interface DocumentData {
  name?: string;
  role?: string;
  image?: string;
  location?: string;
  bio?: string;
  focus?: string;
  education?: EducationItem[];
  certifications?: string[];
  achievements?: string[];
  shortDescription?: string;
  description?: string;
  highlights?: string[];
  tech?: string[];
  github?: string;
  live?: string;
  year?: number;
  category?: string;
  featured?: boolean;
  email?: string;
  phoneNo?: string;
  linkedin?: string;
  fiverr?: string;
  resume?: string;
}

interface DocumentViewerProps {
  title: string;
  data: DocumentData;
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
    <span className="h-px w-6 bg-emerald-400/60" />
    {children}
  </h2>
);

export const DocumentViewer = ({ title, data }: DocumentViewerProps) => {
  const isContact = Boolean(
    data.email || data.phoneNo || data.linkedin || data.fiverr,
  );

  return (
    <article className="mx-auto max-w-3xl space-y-7">
      <header className="relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-5 sm:p-7">
        <div className="absolute -right-14 -top-16 size-44 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          {data.image && (
            <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl border border-emerald-300/35 bg-black shadow-[0_0_28px_rgba(16,185,129,0.16)] sm:size-32">
              <Image
                src={data.image}
                alt={`${data.name ?? title} profile portrait`}
                fill
                priority
                sizes="(max-width: 640px) 112px, 128px"
                className="object-cover"
              />
            </div>
          )}
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {data.featured && (
                <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-200">
                  Featured
                </span>
              )}
              {data.category && (
                <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                  {data.category}
                </span>
              )}
              {data.year && (
                <span className="text-[11px] text-slate-400">{data.year}</span>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {data.name ?? title}
            </h1>
            {data.role && (
              <p className="mt-1 text-base font-medium text-emerald-300 sm:text-lg">
                {data.role}
              </p>
            )}
            {data.location && (
              <p className="mt-2 flex items-center gap-2 text-xs text-slate-400 sm:text-sm">
                <FiMapPin aria-hidden="true" /> {data.location}
              </p>
            )}
            {data.shortDescription && (
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                {data.shortDescription}
              </p>
            )}
          </div>
        </div>
      </header>

      {data.bio && (
        <section>
          <SectionTitle>Profile</SectionTitle>
          <p className="text-sm leading-7 text-slate-200 sm:text-base">{data.bio}</p>
          {data.focus && (
            <p className="mt-3 border-l-2 border-emerald-400/50 pl-4 text-sm leading-6 text-slate-400">
              {data.focus}
            </p>
          )}
        </section>
      )}

      {data.description && (
        <section>
          <SectionTitle>Overview</SectionTitle>
          <p className="text-sm leading-7 text-slate-200 sm:text-base">
            {data.description}
          </p>
        </section>
      )}

      {data.highlights && data.highlights.length > 0 && (
        <section>
          <SectionTitle>Highlights</SectionTitle>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {data.highlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-xl border border-white/8 bg-white/[0.025] p-3 text-sm leading-6 text-slate-300"
              >
                <span className="mr-2 text-emerald-400">$</span>
                {highlight}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.education && (
        <section>
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-3">
            {data.education.map((education) => (
              <div
                key={`${education.institution}-${education.degree}`}
                className="rounded-xl border border-white/8 bg-white/[0.025] p-4"
              >
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
                  <div>
                    <p className="font-semibold text-slate-100">{education.degree}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {education.institution}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-medium text-emerald-300">
                    {education.year}
                  </span>
                </div>
                {education.details && (
                  <p className="mt-2 text-xs text-slate-500">{education.details}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.certifications && (
        <section>
          <SectionTitle>Certifications</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-2">
            {data.certifications.map((certification) => (
              <div
                key={certification}
                className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.025] p-3 text-sm text-slate-300"
              >
                <FiAward className="mt-0.5 shrink-0 text-amber-300" aria-hidden="true" />
                {certification}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.achievements && (
        <section>
          <SectionTitle>Achievements</SectionTitle>
          <ul className="space-y-2">
            {data.achievements.map((achievement) => (
              <li key={achievement} className="flex gap-3 text-sm leading-6 text-slate-300">
                <span className="text-emerald-400">▸</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.tech && (
        <section>
          <SectionTitle>Technology</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {data.tech.map((technology) => (
              <span
                key={technology}
                className="rounded-md border border-emerald-400/20 bg-emerald-400/[0.07] px-2.5 py-1.5 text-xs text-emerald-200"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>
      )}

      {isContact && (
        <section>
          <SectionTitle>Connect</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.email && (
              <a className="contact-card" href={`mailto:${data.email}`}>
                <FiMail aria-hidden="true" />
                <span>{data.email}</span>
              </a>
            )}
            {data.phoneNo && (
              <a className="contact-card" href={`tel:${data.phoneNo.replaceAll(" ", "")}`}>
                <FiPhone aria-hidden="true" />
                <span>{data.phoneNo}</span>
              </a>
            )}
            {data.linkedin && (
              <a className="contact-card" href={data.linkedin} target="_blank" rel="noreferrer">
                <FiLinkedin aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            )}
            {data.github && (
              <a className="contact-card" href={data.github} target="_blank" rel="noreferrer">
                <FiGithub aria-hidden="true" />
                <span>GitHub</span>
              </a>
            )}
            {data.fiverr && (
              <a className="contact-card" href={data.fiverr} target="_blank" rel="noreferrer">
                <FiArrowUpRight aria-hidden="true" />
                <span>Fiverr</span>
              </a>
            )}
          </div>
        </section>
      )}

      {(data.github || data.live || data.resume) && (
        <footer className="flex flex-wrap gap-3 border-t border-white/10 pt-5">
          {data.github && (
            <a
              href={data.github}
              target="_blank"
              rel="noreferrer"
              className="action-button action-button-primary"
            >
              <FiGithub aria-hidden="true" /> {isContact ? "Open GitHub" : "View source"}
            </a>
          )}
          {data.live && (
            <a href={data.live} target="_blank" rel="noreferrer" className="action-button">
              <FiArrowUpRight aria-hidden="true" /> Live demo
            </a>
          )}
          {data.resume && (
            <a href={data.resume} target="_blank" rel="noreferrer" download="Aazib-Abdullah-CV.pdf" className="action-button action-button-primary">
              <FiDownload aria-hidden="true" /> Open latest CV
            </a>
          )}
        </footer>
      )}
    </article>
  );
};
