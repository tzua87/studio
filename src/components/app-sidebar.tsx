'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrainCircuit, BookOpen, ChevronDown, LayoutDashboard, Lightbulb } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from './ui/button';
import { SUBJECTS } from '@/lib/data';

export function AppSidebar() {
  const pathname = usePathname();
  const [isSubjectsOpen, setIsSubjectsOpen] = React.useState(true);

  const isActive = (path: string) => pathname === path;
  const isSubjectActive = (slug: string) => pathname.startsWith(`/subjects/${slug}`);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <BrainCircuit />
            </Link>
          </Button>
          <h1 className="text-lg font-semibold font-headline">NexusLearn</h1>
          <div className="grow" />
          <SidebarTrigger className="hidden md:flex" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/dashboard')} tooltip="Dashboard">
              <Link href="/dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <Collapsible open={isSubjectsOpen} onOpenChange={setIsSubjectsOpen}>
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        <BookOpen />
                        <span>Subjects</span>
                        <ChevronDown
                            className={cn(
                            'ml-auto h-4 w-4 transition-transform',
                            isSubjectsOpen && 'rotate-180'
                            )}
                        />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
            </SidebarMenuItem>
            <CollapsibleContent className="pl-4">
              {SUBJECTS.map((subject) => (
                <SidebarMenuItem key={subject.slug} className="my-1">
                  <SidebarMenuButton asChild isActive={isSubjectActive(subject.slug)} tooltip={subject.name}>
                    <Link href={`/subjects/${subject.slug}`}>
                      <subject.icon />
                      <span>{subject.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive('/explore')} tooltip="Explore Concepts">
              <Link href="/explore">
                <Lightbulb />
                <span>Explore</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger className="flex md:hidden" />
      </SidebarFooter>
    </Sidebar>
  );
}
