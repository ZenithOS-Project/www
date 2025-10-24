"use client";

import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { useState } from "react";

export default function CalculatorApp() {
  const [value, setValue] = useState("");

  const doCalc = () => {
    const parts = value.split(/([+\-])/);
    console.log(parts);

    let result = parseInt(parts[0] || "0");

    for (let i = 1; i < parts.length; i += 2) {
      console.log(parts[i]);
      const operator = parts[i];
      let number = parseInt(parts[i + 1] || "0");

      if (operator === "+") {
        result += number;
      } else if (operator === "-") {
        result -= number;
      }
    }

    setValue(result.toString());
  };
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4">
        <Input readOnly value={value} className="text-right text-2xl" />
        <div className="grid grid-cols-3 gap-2">
          {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"].map((key) => (
            <Button
              variant={"outline"}
              key={key}
              onClick={() => setValue(value + key)}
              className="h-12 text-lg select-none"
            >
              {key}
            </Button>
          ))}
          <Button
            variant={"secondary"}
            onClick={() => setValue(value + "+")}
            className="h-12 text-lg select-none"
          >
            +
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => setValue(value + "-")}
            className="h-12 text-lg select-none"
          >
            -
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={"destructive"}
            onClick={() => setValue("")}
            className="h-12 text-lg select-none"
          >
            C
          </Button>
          <Button
            className="col-span-2 h-12 text-lg select-none"
            onClick={() => doCalc()}
            disabled={!value || !parseInt(value[value.length - 1] || "0")}
          >
            =
          </Button>
        </div>
      </div>
    </div>
  );
}
