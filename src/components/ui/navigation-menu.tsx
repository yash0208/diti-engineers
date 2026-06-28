import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ArrowRightIcon, ChevronDownIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { GridCard } from "@/components/ui/grid-card";

type NavItemType = {
  title: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex w-full flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        "group inline-flex w-max items-center justify-center rounded-md px-4 py-1 text-sm font-medium transition-[color,box-shadow] outline-none hover:bg-surface-muted hover:text-text-heading-light focus:bg-surface-muted focus:text-text-heading-light focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-accent-primary/50 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-surface-muted/50 data-[state=open]:text-text-heading-light data-[state=open]:hover:bg-surface-muted data-[state=open]:focus:bg-surface-muted",
        className,
      )}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "top-0 left-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:border-border-light group-data-[viewport=false]/navigation-menu:bg-surface-card-light group-data-[viewport=false]/navigation-menu:text-text-heading-light group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-300 group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 **:data-[slot=navigation-menu-link]:focus:outline-none **:data-[slot=navigation-menu-link]:focus:ring-0",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className="absolute inset-x-0 top-full isolate z-50 flex justify-center">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top-center overflow-hidden rounded-md border border-border-light bg-surface-card-light text-text-heading-light shadow data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex flex-col justify-center gap-1 rounded-sm px-4 py-1 text-sm transition-all outline-none hover:bg-surface-muted hover:text-text-heading-light focus:bg-surface-muted focus:text-text-heading-light focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-accent-primary/50 data-[active=true]:bg-surface-muted/50 data-[active=true]:text-text-heading-light data-[active=true]:hover:bg-surface-muted data-[active=true]:focus:bg-surface-muted [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-text-muted",
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in",
        className,
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border-light shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
}

function NavGridCard({
  link,
  ...props
}: React.ComponentProps<"div"> & {
  link: NavItemType;
}) {
  return (
    <NavigationMenuPrimitive.Link asChild>
      <Link to={link.href} className="block h-full">
        <GridCard {...props}>
          {link.icon && (
            <link.icon className="relative size-5 text-text-heading-light/80" />
          )}
          <div className="relative">
            <span className="text-sm font-medium text-text-heading-light/80">
              {link.title}
            </span>
            {link.description && (
              <p className="mt-2 text-xs text-text-muted">{link.description}</p>
            )}
          </div>
        </GridCard>
      </Link>
    </NavigationMenuPrimitive.Link>
  );
}

function NavSmallItem({
  item,
  className,
  ...props
}: Omit<React.ComponentProps<typeof NavigationMenuLink>, "href"> & {
  item: Omit<NavItemType, "description">;
}) {
  return (
    <NavigationMenuLink
      asChild
      className={cn(
        "flex-row items-center gap-2.5 px-3 py-2.5 w-full min-w-0",
        className,
      )}
      {...props}
    >
      <Link to={item.href} className="group flex w-full min-w-0 items-center gap-2.5">
        {item.icon && (
          <item.icon className="size-4 shrink-0 text-text-muted" aria-hidden />
        )}
        <span className="min-w-0 flex-1 text-sm leading-snug">{item.title}</span>
        <ArrowRightIcon
          aria-hidden
          className="size-3.5 shrink-0 text-text-muted opacity-0 transition-opacity group-hover:opacity-100"
        />
      </Link>
    </NavigationMenuLink>
  );
}

function NavLargeItem({
  link,
  className,
  ...props
}: Omit<React.ComponentProps<typeof NavigationMenuLink>, "href"> & {
  link: NavItemType;
}) {
  return (
    <NavigationMenuLink asChild {...props}>
      <Link
        to={link.href}
        className={cn(
          "group relative flex flex-col justify-center border border-border-light bg-surface-card-light p-0",
          className,
        )}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <div className="space-y-1">
            <span className="text-sm leading-none font-medium">{link.title}</span>
            {link.description && (
              <p className="line-clamp-1 text-xs text-text-muted">
                {link.description}
              </p>
            )}
          </div>
          {link.icon && <link.icon className="size-6 text-text-muted" />}
        </div>
      </Link>
    </NavigationMenuLink>
  );
}

function NavItemMobile({
  item,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "to"> & {
  item: NavItemType;
}) {
  return (
    <Link
      to={item.href}
      className={cn(
        "group relative flex gap-x-2 rounded-sm p-2 text-sm transition-all outline-none hover:bg-surface-muted hover:text-text-heading-light focus:bg-surface-muted focus:text-text-heading-light focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-accent-primary/50 data-[active=true]:bg-surface-muted/50 data-[active=true]:text-text-heading-light [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-text-muted",
        className,
      )}
      {...props}
    >
      <div className="flex size-10 items-center justify-center rounded-md border border-border-light bg-accent-muted/40">
        {item.icon && <item.icon />}
      </div>
      <div className="flex h-10 flex-col justify-center">
        <p className="text-sm">{item.title}</p>
        {item.description && (
          <span className="line-clamp-1 text-xs leading-snug text-text-muted">
            {item.description}
          </span>
        )}
      </div>
    </Link>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  NavGridCard,
  NavSmallItem,
  NavLargeItem,
  NavItemMobile,
  type NavItemType,
};
