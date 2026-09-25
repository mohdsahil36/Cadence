"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import {
  BENTO_THEME,
  BentoVisual,
  type BentoId,
} from "@/components/illustrations/bento-visuals";
import { loginContent } from "../content";
import { fadeUp } from "./motion";

export function FeatureCell({
  feature,
  index,
}: {
  feature: (typeof loginContent.features.items)[number];
  index: number;
}) {
  const theme = BENTO_THEME[feature.id as BentoId] ?? BENTO_THEME.scoring;
  const isWide = feature.span === "two-thirds";
  const span = isWide ? "lg:col-span-2" : "lg:col-span-1";

  return (
    <motion.div className={span} variants={fadeUp} custom={index}>
      <Card className="nocta-bento-card group flex h-full min-h-64 cursor-default flex-col gap-0 overflow-hidden rounded-[1.75rem] border-0 py-0 ring-0 transition-shadow duration-150 ease-out sm:min-h-72">
        {isWide ? (
          <div className="flex h-full min-h-72 flex-col gap-4 p-6 sm:flex-row sm:items-stretch sm:gap-6 sm:p-8">
            <div className="flex w-full shrink-0 flex-col justify-center gap-3 sm:w-[34%] sm:max-w-xs">
              <h3 className={`text-xl leading-snug sm:text-2xl ${theme.title}`}>
                {feature.title}
              </h3>
              <p className={`text-sm leading-6 ${theme.muted}`}>
                {feature.description}
              </p>
            </div>
            <div className="min-h-48 flex-1 sm:min-h-0">
              <BentoVisual id={feature.id} wide />
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col p-6 sm:p-7">
            <div className="mb-5 min-h-32 flex-1 sm:min-h-36">
              <BentoVisual id={feature.id} />
            </div>
            <h3 className={`text-lg leading-snug sm:text-xl ${theme.title}`}>
              {feature.title}
            </h3>
            <p className={`mt-2 text-sm leading-6 ${theme.muted}`}>
              {feature.description}
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
