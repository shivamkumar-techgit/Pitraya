import React from "react";
import { FaInstagram, FaXTwitter, FaYoutube, FaSpotify } from "react-icons/fa6";
import IconButton from "@/components/buttons/IconButton";
import { cn } from "@/lib/utils";

export type SocialLinksProps = React.HTMLAttributes<HTMLDivElement>;

export default function SocialLinks({ className, ...props }: SocialLinksProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)} {...props}>
      <span className="text-xs font-semibold text-gold-accent uppercase tracking-widest">
        Connect With Our Sanctum
      </span>
      <div className="flex items-center gap-3">
        <IconButton
          ariaLabel="Instagram"
          variant="outline"
          shape="circle"
          size="md"
          icon={<FaInstagram className="h-4 w-4" />}
        />
        <IconButton
          ariaLabel="Twitter"
          variant="outline"
          shape="circle"
          size="md"
          icon={<FaXTwitter className="h-4 w-4" />}
        />
        <IconButton
          ariaLabel="YouTube"
          variant="outline"
          shape="circle"
          size="md"
          icon={<FaYoutube className="h-4 w-4" />}
        />
        <IconButton
          ariaLabel="Spotify Sacred Playlists"
          variant="outline"
          shape="circle"
          size="md"
          icon={<FaSpotify className="h-4 w-4" />}
        />
      </div>
    </div>
  );
}
