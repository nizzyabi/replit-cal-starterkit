/* eslint-disable */
// @ts-nocheck
import { BookingsTable } from "./_components/bookings-table";
import { CalAccount, auth } from "@/auth";
import { cal } from "@/cal/api";
import { stripCalOAuthClientIdFromEmail } from "@/cal/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import dayjs from "dayjs";
import { type GetBookingsInput } from "node_modules/@calcom/atoms/dist/packages/platform/types";

export default async function Dashboard() {
  const sesh = await auth();
  if (!sesh.user.id) {
    return <div className="text-center text-lg mt-10">You are not logged in</div>;
  }

  const filters = ["upcoming", "recurring", "past", "cancelled", "unconfirmed"] satisfies Array<
    GetBookingsInput["filters"]["status"]
  >;

  const bookingResponses = await Promise.all(
    filters.map((filter) =>
      cal({ user: { id: sesh?.user.id } }).get("/v2/bookings", {
        query: { "filters[status]": filter, cursor: 0, limit: 20 },
      })
    )
  );

  const bookings = bookingResponses.flatMap((response, idx) => {
    if (response.status === "error") {
      console.warn(
        `Unable to fetch bookings for filter '${filters[idx]}' with status '${response.status}'`,
        response
      );
      return [];
    }
    return response.data.bookings;
  });

  const lastWeekBookings = bookings.filter((booking) => {
    const startOfWeek = dayjs().startOf("week").subtract(1, "week");
    const endOfWeek = dayjs().endOf("week").subtract(1, "week");
    return dayjs(booking.startTime).isAfter(startOfWeek) && dayjs(booking.startTime).isBefore(endOfWeek);
  });

  const thisWeekBookings = bookings.filter((booking) => {
    const startOfWeek = dayjs().startOf("week");
    const endOfWeek = dayjs().endOf("week");
    return dayjs(booking.startTime).isAfter(startOfWeek) && dayjs(booking.startTime).isBefore(endOfWeek);
  });

  const lastMonthBookings = bookings.filter((booking) => {
    const startOfMonth = dayjs().startOf("month").subtract(1, "month");
    const endOfMonth = dayjs().endOf("month").subtract(1, "month");
    return dayjs(booking.startTime).isAfter(startOfMonth) && dayjs(booking.startTime).isBefore(endOfMonth);
  });

  const thisMonthBookings = bookings.filter((booking) => {
    const startOfMonth = dayjs().startOf("month");
    const endOfMonth = dayjs().endOf("month");
    return dayjs(booking.startTime).isAfter(startOfMonth) && dayjs(booking.startTime).isBefore(endOfMonth);
  });

  const thisYearBookings = bookings.filter((booking) => {
    const startOfYear = dayjs().startOf("year");
    const endOfYear = dayjs().endOf("year");
    return dayjs(booking.startTime).isAfter(startOfYear) && dayjs(booking.startTime).isBefore(endOfYear);
  });

  return (
    <main className="flex flex-col gap-6 p-4 md:p-8">
      <h1 className="text-4xl font-bold tracking-tight mb-6">Dashboard</h1>
      <CalAccount>
        {(calAccount) => (
          <BookingsTable
            bookings={{
              all: bookings,
              currentWeek: thisWeekBookings,
              currentMonth: thisMonthBookings,
              currentYear: thisYearBookings,
            }}
            user={{
              timeZone: calAccount.timeZone,
              username: calAccount.username,
              email: stripCalOAuthClientIdFromEmail(calAccount.email),
            }}
          />
        )}
      </CalAccount>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardDescription>This Week</CardDescription>
            <CardTitle className="text-4xl font-semibold">{thisWeekBookings.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={thisWeekBookings.length} max={100} className='mt-3'/>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardDescription>This Month</CardDescription>
            <CardTitle className="text-4xl font-semibold">{thisMonthBookings.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={thisMonthBookings.length} max={2} className='mt-3'/>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardDescription>This Year</CardDescription>
            <CardTitle className="text-4xl font-semibold">{thisYearBookings.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={thisYearBookings.length} max={2} className='mt-3'/>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
