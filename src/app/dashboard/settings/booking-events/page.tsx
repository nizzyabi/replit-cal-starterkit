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
      <h1 className="text-3xl font-bold">Manage Booking Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventTypes.map((eventType) => (
          <Card key={eventType.id}>
            <CardHeader>
              <CardTitle className='flex items-center justify-between'>
                <p>{eventType.title}</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>
                      Edit
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <EventTypeDelete eventTypeId={eventType.id} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardTitle>
              
            </CardHeader>
            
            
          </Card>
        ))}
      </div>
      <div className="flex items-center">
        <div className="mr-auto flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                Add Haircut Session
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
    </Fragment>
  );
}
