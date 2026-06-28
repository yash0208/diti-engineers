import type { LucideIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ContactInfoProps = React.ComponentProps<"div"> & {
  icon: LucideIcon;
  label: string;
  value: string;
};

type HoursItem = {
  label: string;
  value: string;
};

export type ContactCardProps = React.ComponentProps<"div"> & {
  title: string;
  description: string;
  contactInfo?: ContactInfoProps[];
  hoursHeading?: string;
  hoursItems?: HoursItem[];
  formSectionClassName?: string;
};

export function ContactCard({
  title,
  description,
  contactInfo,
  hoursHeading,
  hoursItems,
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <div
      className={cn(
        "relative grid w-full rounded-md border border-border-light bg-surface-card-light shadow-card md:grid-cols-2 md:max-h-[min(82svh,640px)] lg:grid-cols-3",
        className,
      )}
      {...props}
    >
      <PlusIcon
        className="absolute -top-3 -left-3 size-6 text-accent-primary"
        aria-hidden
      />
      <PlusIcon
        className="absolute -top-3 -right-3 size-6 text-accent-primary"
        aria-hidden
      />
      <PlusIcon
        className="absolute -bottom-3 -left-3 size-6 text-accent-primary"
        aria-hidden
      />
      <PlusIcon
        className="absolute -right-3 -bottom-3 size-6 text-accent-primary"
        aria-hidden
      />
      <div className="flex flex-col justify-between lg:col-span-2">
        <div className="relative space-y-3 px-4 py-5 md:p-6">
          <h2 className="text-h3 text-text-heading-light">{title}</h2>
          <p className="max-w-xl text-sm leading-relaxed text-text-primary-light">
            {description}
          </p>
          <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {contactInfo?.map((info, index) => (
              <ContactInfo key={`${info.label}-${index}`} {...info} />
            ))}
          </div>
          {hoursItems && hoursItems.length > 0 ? (
            <div className="border-t border-border-light pt-3">
              {hoursHeading ? (
                <p className="text-eyebrow text-text-muted">{hoursHeading}</p>
              ) : null}
              <dl className="mt-2 grid gap-2 sm:grid-cols-3">
                {hoursItems.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs font-medium text-text-heading-light">
                      {item.label}
                    </dt>
                    <dd className="mt-0.5 text-xs text-text-muted">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </div>
      </div>
      <div
        className={cn(
          "flex w-full items-center overflow-y-auto border-t border-border-light bg-surface-muted/40 p-4 md:col-span-1 md:max-h-[min(82svh,640px)] md:border-t-0 md:border-l md:p-5",
          formSectionClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ContactInfo({
  icon: Icon,
  label,
  value,
  className,
  ...props
}: ContactInfoProps) {
  return (
    <div className={cn("flex items-center gap-2.5 py-1.5", className)} {...props}>
      <div className="rounded-sm bg-accent-muted p-2">
        <Icon className="size-4 text-accent-primary" aria-hidden />
      </div>
      <div>
        <p className="text-sm font-medium text-text-heading-light">{label}</p>
        <p className="text-xs text-text-muted">{value}</p>
      </div>
    </div>
  );
}
