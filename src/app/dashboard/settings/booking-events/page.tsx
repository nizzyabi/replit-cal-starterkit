import EventTypeCreateForm from "./event-type-create";
import { EventTypeDelete } from "./event-type-delete";
import { ButtonSubmit } from "@/app/_components/submit-button";
import { auth } from "@/auth";
import { cal } from "@/cal/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { MoreHorizontal, PlusCircle, Video } from "lucide-react";
import { Fragment } from "react";

export default async function DashboardSettingsBookingEvents() {
  const sesh = await auth();
  if (!sesh?.user.id) {
    return <div>Not logged in</div>;
  }
  const getEventTypes = await cal({ user: { id: sesh?.user.id } }).get("/v2/event-types");
  if (getEventTypes.status === "error") {
    console.error("[dashboard/settings/booking-events/page.tsx] Error fetching event types", getEventTypes);
    // TODO debug this error
    console.warn(`[dashboard/settings/booking-events/page.tsx] Error fetching event types. Check logs above`);
  }
  const eventTypes = getEventTypes?.data?.eventTypeGroups?.flatMap((group) => group.eventTypes) ?? [
    {
      length: 60,
      slug: "60min",
      title: "60min",
      description: "A 60 minute session",
      locations: [
        {
          type: "location",
          link: "https://cal.com/locations/1",
        },
      ],
      id: 1,
    },
    {
      length: 30,
      slug: "30min",
      title: "30min",
      description: "A 30 minute session",
      locations: [
        {
          type: "location",
          link: "https://cal.com/locations/1",
        },
      ],
      id: 2,
    },
  ];
  return (
    <Fragment>
      <div className="flex items-center">
        <div className="mr-auto flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="size-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Haircut Session</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a new Booking Event</DialogTitle>
              </DialogHeader>
              <EventTypeCreateForm permalink="/dashboard/settings/booking-events">
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    {(
                      [
                        // Remove the 'length' field from here
                        {
                          name: "slug",
                          label: "Booking URL",
                          pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
                          required: true,
                        },
                        {
                          name: "title",
                          label: "Title",
                          type: "text",
                          minlength: "3",
                          maxlength: "30",
                          required: true,
                        },
                      ] as const
                    ).map(({ name, label, ...inputAttributes }) => (
                      <Fragment key={name}>
                        <Label htmlFor={name} className="text-right">
                          {label}
                        </Label>
                        <Input id={name} name={name} {...inputAttributes} className="col-span-3" />
                      </Fragment>
                    ))}
                    {/* Add a hidden input for the fixed duration */}
                    <input type="hidden" name="length" value="60" />
                  </div>
                </div>
                <DialogFooter className="sm:justify-content justify-center">
                  <ButtonSubmit variant="default">Save</ButtonSubmit>
                </DialogFooter>
              </EventTypeCreateForm>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Event Name</CardTitle>
          <CardDescription>Manage your event type and view their sales performance.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking Name</TableHead>

                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventTypes.map((eventType) => (
                <TableRow key={eventType.id}>
                  <TableCell>
                    <div className="font-medium capitalize">{eventType.title}</div>
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <EventTypeDelete eventTypeId={eventType.id} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {eventTypes.length > 0 ? 1 : 0}-{eventTypes.length > 10 ? 10 : eventTypes.length}
            </strong>{" "}
            of <strong>{eventTypes.length}</strong> event types
          </div>
        </CardFooter>
      </Card>
    </Fragment>
  );
}
