import { Button } from "@components/ui/button";
import Image from "next/image";

export default function Toolbar() {
  return (
    <div className="">
      <Button>
        <Image src="/public/favicon.ico" alt="Favicon" />
      </Button>
    </div>
  );
}
