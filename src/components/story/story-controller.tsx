"use client";

import { useEffect } from "react";

import { type StoryFrame, startStory } from "@/components/story/story-engine";

type StoryControllerProps = {
  readonly rootId: string;
  readonly frames: readonly StoryFrame[];
  readonly cuts: readonly number[];
};

/**
 * Единственный клиентский кусок скроллтеллинга. Разметка и тексты приходят
 * с сервера в HTML сразу (первая сцена видна без JS), а здесь подключается
 * движок кадров. Ничего не рисует.
 */
export function StoryController({
  rootId,
  frames,
  cuts,
}: StoryControllerProps) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return undefined;
    return startStory(root, { frames, cuts });
  }, [rootId, frames, cuts]);

  return null;
}
