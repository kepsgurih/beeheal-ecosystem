import { liveblocks } from "@/lib/liveblock";
import { getColorFromId } from "@/lib/randColor";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;
  const user = {
    id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      colors: getColorFromId(id),
    },
  };

  try {
    const session = liveblocks.prepareSession(id, { userInfo: user.info });
    session.allow(`liveblocks:task:*`, session.FULL_ACCESS);
    const { status, body } = await session.authorize();
    return new NextResponse(body, { status });
  } catch (error) {
    console.error("Error authorizing user:", error);
    return NextResponse.json({ error: "Failed to authorize user" }, { status: 500 });
  }
}