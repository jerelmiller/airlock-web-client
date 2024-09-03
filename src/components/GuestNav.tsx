import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { fragments } from "../fragments";
import { gql, TypedDocumentNode, useFragment } from "@apollo/client";
import { GuestNav_guestFragment } from "./__generated__/GuestNav.types";

interface GuestNavProps {
  guest: GuestNav_guestFragment;
}

const GUEST_NAV_FRAGMENT: TypedDocumentNode<GuestNav_guestFragment> = gql`
  fragment GuestNav_guest on Guest {
    id
    funds
  }
`;

fragments.register(GUEST_NAV_FRAGMENT);

export function GuestNav({ guest }: GuestNavProps) {
  const { data, complete } = useFragment({
    fragment: GUEST_NAV_FRAGMENT,
    from: guest,
  });

  if (!complete) {
    return null;
  }

  return (
    <>
      <Button as={NavLink} to="/wallet" variant="ghost">
        ¤{data.funds}
      </Button>
      <Button as={NavLink} to="/trips" variant="ghost">
        My trips
      </Button>
    </>
  );
}
